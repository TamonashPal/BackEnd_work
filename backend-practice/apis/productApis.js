//Create mini express operation 
const exp=require("express")
const productApp=exp.Router()

productApp.get("/products",(request,response)=>{
    response.send({message: "All Products are :  ..."})
})

module.exports=productApp;