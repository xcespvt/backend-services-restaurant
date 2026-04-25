import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fileNoteController from "../../controllers/restaurant/fileNote.controller.ts";

async function fileNoteRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  // File upload endpoint
  fastify.post("/upload", fileNoteController.uploadFile);

  // File Note CRUD endpoints
  fastify.post("/", fileNoteController.createFileNote);
  fastify.get("/", fileNoteController.getAllFileNotes);
  fastify.get("/:id", fileNoteController.getFileNoteById);
  fastify.put("/:id", fileNoteController.updateFileNote);
  fastify.delete("/:id", fileNoteController.deleteFileNote);
}

export default fileNoteRoutes;

