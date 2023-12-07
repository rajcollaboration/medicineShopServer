import express from 'express';
import { addMedicine, deleteMedicine, updateMedicine } from '../controllers/medicine.js';

const router = express.Router();

router.post('/add_medicine', addMedicine);
router.put('/update_medicine', updateMedicine);
router.delete('/delete_medicine', deleteMedicine);

export default router;


