const mongoose=require ("mongoose")

const TodoSchema=new mongoose.Schema({
    task:{type:String,required:true},
    userId:{type:mongoose.Schema.ObjectId,ref:"User"},
   complited:{type:Boolean,default:false}

},{timestamps:true})

const Todo=mongoose.model("todo",TodoSchema)

module.exports=Todo