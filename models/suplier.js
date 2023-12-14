import mongoose from "mongoose";

const suplierScheema = mongoose.Schema({
    userName:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
    suplierName:{
        type: 'string',
        required: true 
    },
    address:{
        type: 'string',
        required: true
    },
    gst:{
        type: 'string',
        required: true
    },
    phone:{
        type: 'string',
        required: true
    },
    medicines:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine'
    }]
}, {timestamps: true});

export default mongoose.model("Suplier",suplierScheema);
