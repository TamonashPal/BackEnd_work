const exp=require('express');
const app=exp();


// //Creating Middlewares 
// function middleware2(request,response,next){
//     console.log("Middleware 2 executed")
//     next();
// }

// function middleware1(request,response,next){
//     console.log("Middleware 1 executed")
//     next();
// }


// //Executing middlewares
// app.use(middleware1)
// app.use(middleware2)


//Route with user-api
    //import userApp
    const userApp=require("./apis/userApis")
    //execute userApp using middleware
    app.use('/user-api',userApp)


// Route with product-api
    //import productApp
    const productApp=require("./apis/productApis")
    //execute productApp using middleware
    app.use('/product-api',productApp)



//Connect with MongoClient 
const mCLient=require('mongodb').MongoClient
//Connecting to the database
mCLient.connect('mongodb://127.0.0.1:27017/ca003db')
.then(client=>{
    const ca003db=client.db('ca003db');
    const usersCollection= ca003db.collection('users')

    //Set the value of user collection as KEY VALUED PAIR
    app.set('userCollection', usersCollection) 
    console.log('DB server connected ...')
})
.catch(error=>{
    console.log("Error is : ",error);
}) 



//Starting server
app.listen(2500,async()=>{
    console.log("Server listening on 2500 ...")
})