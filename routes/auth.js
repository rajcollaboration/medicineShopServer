import express from 'express';
import { adminLogin, createAdmin } from '../controllers/adminAuth.js';
import { updateAdmin } from '../controllers/adminAuth.js';
import { deleteAdmin } from '../controllers/adminAuth.js';


const router = express.Router();

// create admin

router.post('/create_admin', createAdmin);
router.post('/adminlogin',adminLogin);
router.put('/update_admin', updateAdmin);
router.delete('/delete_admin',deleteAdmin);



export default router;