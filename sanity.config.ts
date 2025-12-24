import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure"; // Thêm dòng này
import { visionTool } from "@sanity/vision";       // Thêm dòng này
import { schema } from "@/sanity/schemaTypes";     // Lưu ý: file index.ts của bạn export 'schema' chứ không phải 'schemaTypes'

export default defineConfig({
  name: "default",
  title: "S17 Marketplace",
  projectId: "lelg4sjl",
  dataset: "production",
  basePath: "/studio", 

  plugins: [structureTool(), visionTool()],

  schema: schema, // Sử dụng đối tượng schema từ file index.ts
});