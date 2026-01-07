import type { APIRoute } from 'astro';
import { removeSectionFromProject } from '../../../lib/project/add-section';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { projectSlug, sectionSlug } = body;

    if (!projectSlug || !sectionSlug) {
      return new Response(
        JSON.stringify({ error: 'Missing projectSlug or sectionSlug' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await removeSectionFromProject(projectSlug, sectionSlug, locals);

    return new Response(
      JSON.stringify({ success: true, message: 'Section removed from project' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove section';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
