const mongoose = require("mongoose")
var validator = require('validator');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    email:{
        type: String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email format")
            }
           }
     },  
    jobtype: {
        type:String,
        require:true
    },
    message: {
        type:String,
        require:true
    }
})


const Contactinfo = new mongoose.model("Contactinfo", contactSchema);

module.exports = Contactinfo;
