import express from 'express';
import { signupSupplier } from '../controllers/suplier.js';

const router = express.Router();

router.post('/signup', signupSupplier);

export default router;
