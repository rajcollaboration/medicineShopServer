import express from 'express';
import { addStuff, deleteStuff, updateStuff } from '../controllers/staffAuth.js';




const router = express.Router();

// create admin

router.post('/add_stuff', addStuff);
router.put('/update_stuff', updateStuff);
router.delete('/delete_stuff', deleteStuff);




export default router;