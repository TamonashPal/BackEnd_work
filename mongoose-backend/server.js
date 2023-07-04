const exp=require('express');
const app=exp();
const userApp=require('./APIs/user-api');

app.use('/user-api',userApp)

app.use((err,req,res,next)=>{
    res.send({message:"Error Occured",error:err.message})
})

app.listen(2300,()=>console.log("Server listening on port 2300"))