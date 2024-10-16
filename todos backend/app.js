require("dotenv").config()
const express=require("express");
const connectdb = require("./connectdb");
const User = require("./modulles/User");
const bcrypt=require("bcrypt")
const mela7=bcrypt.genSaltSync(10)
const jwt = require("jsonwebtoken");
const Todo = require("./modulles/Todo");
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())


app.post("/signup",async (req,res)=>{
    const {username,email,password}=req.body 

    const hashpass=bcrypt.hashSync(password,mela7)

    try {  
        const user=await User.findOne({email})
        if(user){
            return res.status(302).json({message:"raw mawjoud email"})
        } 
        const newUser=new User({ 
            username,
            email,
            password:hashpass, 
        })
        if(newUser){
            newUser.save() 
             res.json("saccuss")
            }
    } catch (error) {
        console.log(error);
    }
})
 
app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user = await User.findOne({email})
        if(!user){
          res.json({message:"user not found"})
          return
        }
        const passok=bcrypt.compareSync(password,user?.password||"")
        if(!passok){
            return res.status(404).json({message:"user not found"})
        }
        jwt.sign({id:user._id},process.env.JWT,{},(err,token)=>{
            if (err) throw err
            res.json(token)
        })
    } catch (error) {
        console.log(error);
    }
})

app.post("/todo/add",async function  (req,res,next){
  try {
    const token=req.headers.authorization  || req.headers.Authorization
if(!token){
    res.status(403).json({message:"error authoriathion aaaaa"})
    return
}


const decode =jwt.verify(token,process.env.jwt)
req.user=decode.id
next()

} catch (error) {
res.json(error)}
},async(req,res)=>{
    try {
        const userId=req.user
        const task=req.body.task
        const newTask= await Todo.create({task,userId})
        res.json(newTask)
    } catch (error) {
     res.json(error)
    }
})

app.get("/todos",async function  (req,res,next){
    try {
        const token=req.headers.authorization  || req.headers.Authorization
    if(!token){
        res.status(403).json({message:"error authoriathion a"})
        return
    }


    const decode =jwt.verify(token,process.env.jwt)
    req.user=decode.id
    next()
    
    } catch (error) {
    res.json(error)}
    }, async function (req,res ){
        const todos=await Todo.find({
            userId:req.user 
        })
        res.json(todos)
    })

    
    app.put("/todos/update/:id", async function(req, res, next) {
      try {
        const token = req.headers.authorization || req.headers.Authorization;
    
        if (!token) {
          return res.status(403).json({ message: "Error: Authorization token missing" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT);
        req.user = decoded.id;
        next(); 
      } catch (e) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
    }, 
    
    async (req, res) => {
      try {
        const { task } = req.body;
        const userId=req.user
     
        const todoId = req.params.id;
    const todoToUpdate=await Todo.findById(todoId)
        if (!task) {
          return res.status(400).json({ message: "Task is required" });
        }
       if(userId!=todoToUpdate.userId){
        res.json('unautorized')
        return
       }
        const update = await Todo.findByIdAndUpdate(
          todoId, 
          { task }, 
          { new: true }
        );
    
        if (!update) {
          return res.status(404).json({ message: "Todo item not found" });
        }
    
        res.json(update);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating the todo item" });
      }
    });
    


const port=8000
app.listen(port,()=>{
    console.log("jawek fisfess")
    connectdb()
})