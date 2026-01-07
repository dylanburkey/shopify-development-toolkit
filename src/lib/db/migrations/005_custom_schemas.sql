-- Add custom_schema column to project_sections for storing per-project schema customizations
-- This allows users to modify the schema definition (add/remove fields, change types) for specific sections in their projects
ALTER TABLE project_sections ADD COLUMN custom_schema TEXT DEFAULT NULL;

-- Create index for faster lookups when checking for custom schemas
CREATE INDEX IF NOT EXISTS idx_project_sections_custom_schema ON project_sections(id, custom_schema);
