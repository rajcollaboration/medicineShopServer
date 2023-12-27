import express from 'express';
import { adminLogin, createAdmin, getAllStuffs, getSingleStuffs } from '../controllers/adminAuth.js';
import { updateAdmin } from '../controllers/adminAuth.js';
import { deleteAdmin } from '../controllers/adminAuth.js';


const router = express.Router();

// create admin

router.post('/create_admin', createAdmin);
router.post('/adminlogin',adminLogin);
router.put('/update_admin', updateAdmin);
router.delete('/delete_admin',deleteAdmin);
router.get('/getallstuff',getAllStuffs);
router.get('/getStuff',getSingleStuffs);



export default router;