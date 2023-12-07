import mongoose from 'mongoose';

const createStaffScheema = mongoose.Schema({
    name:{
        type: 'string',
        required: true,
    },
    email:{
        type: 'string',
        required: true,
        unique: true,
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType:{
        type: String,
        default: 'staff',
        required: true
    },
    permissions:{
        type: Array,
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Admin'
    },
    medicines:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine'}],



},{timestamps: true});

export default mongoose.model("Stuff", createStaffScheema );