import { Router } from "express";
import { getNotes, getNote, createNote, updateNote, deleteNote } from "../controllers/notes.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import {validateSchema} from '../middlewares/validator.middleware.js'
import { createNoteSchema } from "../schemas/note.schema.js";

const router = Router();

router.get("/getNotes", authRequired, getNotes);
router.get("/getNote/:id", authRequired, getNote);
router.post("/getNote", authRequired,validateSchema(createNoteSchema), createNote);
router.delete("/getNote/:id", authRequired, deleteNote);
router.put("/getNote/:id", authRequired, updateNote);

export default router;