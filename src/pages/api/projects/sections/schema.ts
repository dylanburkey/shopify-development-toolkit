import type { APIRoute } from 'astro';
import { getDB } from '../../../../lib/db';

/**
 * Save custom schema for a section in a project
 * POST /api/projects/sections/schema
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { projectSlug, sectionId, customSchema } = body as {
      projectSlug?: string;
      sectionId?: number;
      customSchema?: Record<string, unknown>;
    };

    // Validation
    if (!projectSlug || !sectionId || !customSchema) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate schema structure
    if (!customSchema.name || !Array.isArray(customSchema.settings) || !Array.isArray(customSchema.blocks)) {
      return new Response(
        JSON.stringify({ error: 'Invalid schema structure. Must include name, settings, and blocks arrays.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = getDB(locals);

    // Verify project exists
    const project = await db.prepare('SELECT id FROM projects WHERE slug = ?')
      .bind(projectSlug)
      .first();

    if (!project) {
      return new Response(
        JSON.stringify({ error: 'Project not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify section exists in project
    const section = await db.prepare('SELECT id, section_slug FROM project_sections WHERE id = ? AND project_id = ?')
      .bind(sectionId, project.id)
      .first();

    if (!section) {
      return new Response(
        JSON.stringify({ error: 'Section not found in project' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Save custom schema
    const customSchemaJson = JSON.stringify(customSchema);
    await db.prepare('UPDATE project_sections SET custom_schema = ? WHERE id = ?')
      .bind(customSchemaJson, sectionId)
      .run();

    // Update project timestamp
    await db.prepare('UPDATE projects SET updated_at = ? WHERE id = ?')
      .bind(new Date().toISOString(), project.id)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Custom schema saved successfully',
        sectionId,
        schema: customSchema,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save custom schema';
    console.error('Save custom schema error:', error);

    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

/**
 * Get current schema for a section (custom or library)
 * GET /api/projects/sections/schema?project={slug}&sectionId={id}
 */
export const GET: APIRoute = async ({ url, locals }) => {
  try {
    const projectSlug = url.searchParams.get('project');
    const sectionId = url.searchParams.get('sectionId');

    if (!projectSlug || !sectionId) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = getDB(locals);

    // Get project
    const project = await db.prepare('SELECT id FROM projects WHERE slug = ?')
      .bind(projectSlug)
      .first();

    if (!project) {
      return new Response(
        JSON.stringify({ error: 'Project not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get section with custom schema
    const section = await db.prepare(
      'SELECT section_slug, custom_schema FROM project_sections WHERE id = ? AND project_id = ?'
    )
      .bind(sectionId, project.id)
      .first() as { section_slug: string; custom_schema: string | null } | null;

    if (!section) {
      return new Response(
        JSON.stringify({ error: 'Section not found in project' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If custom schema exists, return it
    if (section.custom_schema) {
      const customSchema = JSON.parse(section.custom_schema);
      return new Response(
        JSON.stringify({
          success: true,
          schema: customSchema,
          isCustom: true,
          sectionSlug: section.section_slug,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Otherwise, return library schema
    // Load from content collection
    const { getCollection } = await import('astro:content');
    const sections = await getCollection('sections');
    const librarySection = sections.find(s => s.data.slug === section.section_slug);

    if (!librarySection) {
      return new Response(
        JSON.stringify({ error: 'Library section not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const librarySchema = {
      name: librarySection.data.name,
      settings: librarySection.data.settings,
      blocks: librarySection.data.blocks,
      max_blocks: librarySection.data.maxBlocks,
      presets: librarySection.data.presets || [],
    };

    return new Response(
      JSON.stringify({
        success: true,
        schema: librarySchema,
        isCustom: false,
        sectionSlug: section.section_slug,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get schema';
    console.error('Get schema error:', error);

    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
