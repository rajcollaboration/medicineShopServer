import mongoose from 'mongoose';

const createAdminScheema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    shopName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    logo:{
        type: String,
    },
    address:{
        type: String,
        required: true
    },
    fromGoogle: {
        type: Boolean,
        default: false
    },
    phone:{
        type: Number,
        required: true
    },
    userType:{
        type: String,
        required: true,
        default: 'admin',
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    },
    permissions:{
        type: [String]
    },
    employes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stuff' }],
    medicines:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine'}],
    supplyers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Suplier'}]
}, {timestamps: true});

export default mongoose.model("Admin",createAdminScheema);