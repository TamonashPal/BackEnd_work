//const bodyParser=require('body-parser')
const exp=require('express')
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')

const mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/ca003db")
.then(()=>console.log("DB connected"))
.catch((error)=>console.log("Error is : ",error))


//Create Schema of the DB
let userSchema=new mongoose.Schema({
    username:{
        type: String,
        minLength: 3,
        maxLength: 6
    },
    password: String,
    email: String
})

//Create Model
let User=mongoose.model('user',userSchema)

//Create user
userApp.use(exp.json());

userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    //create user document
    let newUser= new User(req.body)
    //save to db
    await newUser.save()
    //send response
    res.send({message:"User Created"})
}))

//Get user
userApp.get('/users',expressAsyncHandler(async(req,res)=>{
    //read users
    let users= await User.find()
    res.send({message:"All Users",payload:users})
}))
//Get user by username
userApp.get('/user/:username',expressAsyncHandler(async(req,res)=>{
    //read users
    let user= await User.findOne({username:req.params.username})
    res.send({message:"All Users",payload:user})
}))


userApp.get('/user',expressAsyncHandler(async(request,response)=>{
    response.send("Working")
}))

module.exports=userApp