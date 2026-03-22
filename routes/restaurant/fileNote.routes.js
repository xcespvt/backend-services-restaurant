import express from 'express';
import fileNoteController from '../controllers/fileNote.controller.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// File upload endpoint
router.post('/upload', upload.single('file'), fileNoteController.uploadFile);

// File Note CRUD endpoints
router.post('/', fileNoteController.createFileNote);
router.get('/', fileNoteController.getAllFileNotes);
router.get('/:id', fileNoteController.getFileNoteById);
router.put('/:id', fileNoteController.updateFileNote);
router.delete('/:id', fileNoteController.deleteFileNote);

export default router;
