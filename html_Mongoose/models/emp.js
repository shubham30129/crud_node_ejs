var mongoose=require("mongoose");

var Emp1=mongoose.model("Emp",{
    name:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    }

});

module.exports={Emp1};