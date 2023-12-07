import mongoose from 'mongoose';

const medicineScheema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    expDate: {
        type: String,
        default: 0,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    batchNumber: {
        type: String,
    },
    manufacturer: {
        type: String,
    },
    description: {
        type: String,
    },
    ingredients: {
        type: [String],
    },
    dosage: {
        type: String,
    },
    usageInstructions: {
        type: String,
    },
    sideEffects: {
        type: String,
    },
    category: {
        type: String,
    },
    adminId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true
    }
},{timestamps: true});

export default mongoose.model("Medicine", medicineScheema);
