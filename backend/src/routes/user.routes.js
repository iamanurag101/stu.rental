import { Router } from 'express';
import { register, login } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.post('/register', upload.single('profilePicture'), register);
router.post('/login', login);

export default router;
