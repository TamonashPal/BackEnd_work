//Creating mini express application
const exp=require("express");
const userApp=exp.Router();
const bcryptjs=require('bcryptjs');


// CRUD Operations using Mongo Client

// Get operation
userApp.get('/users-findAll',async(request,response)=>{
    //Fetching userCollection from server 
    const userCollection= request.app.get('userCollection');
    //Get data using mongodb command on userCollection object 
    const users=await userCollection.find({status:true}).toArray();

    response.send({message:"All users are :",payload:users});


})
// Get operation using id 
userApp.get('/users-findOne/:username', async(request,response)=>{
    //Fetching userCollection from server 
    const userCollection= request.app.get('userCollection');
    const usernameOfUrl= request.params.username;
    //Get data using mongodb command on userCollection object 
    const user= await userCollection.findOne({username:usernameOfUrl,status:true});

    response.send({message:"Seacrhed user details :", payload:user});
})

//Before Post we need body parser middle-ware 
userApp.use(exp.json());
// Post operation
userApp.post('/users',async(request,response)=>{
    let userCollection= request.app.get('userCollection');
    let newUser=request.body;
    newUser.status=true;
    //Check for duplicacy 
    let user=await userCollection.findOne({username:newUser.username})
    if(user!==null){
        response.send({message:"Username already exsists"})
    }
    else{
        //hash the password
        let hashedPassword= await bcryptjs.hash(newUser.password,5);
        //store the hashed password
        newUser.password=hashedPassword;
        //store the password in db
        await userCollection.insertOne(newUser);
        //response
        response.send({message:"User is created"})
    }
})

// Login operations
userApp.put('/user-login',async(request,response)=>{
    const userCollection=request.app.get('userCollection');
    
    //reading login creds
    let loginCred=request.body;
    
    let user=await userCollection.findOne({username:loginCred.username,status:true})
    if(user==null){
        response.send("User doesnot exsist in the database")
    }
    else{
        //update the details using updateOne
        await userCollection.updateOne({username:usernameOfUrl},{$set:{...newDetails}})
        //send response back 
        response.send({message:"User is updated"})
    }

})



// Put operation using username
userApp.put('/users/:username',async(request,response)=>{
    const userCollection=request.app.get('userCollection');
    let usernameOfUrl=request.params.username;
    let newDetails=request.body;
    
    let user=await userCollection.findOne({username:usernameOfUrl,status:true})
    if(user==null){
        response.send("User doesnot exsist in the database")
    }
    else{
        //update the details using updateOne
        await userCollection.updateOne({username:usernameOfUrl},{$set:{...newDetails}})
        //send response back 
        response.send({message:"User is updated"})
    }

})



// Soft delete operation using status
userApp.delete('/user-delete/:username', async(request,response)=>{
    const userCollection= request.app.get('userCollection');

    let usernameOfUrl=request.params.username;
    
    let user=await userCollection.findOne({username:usernameOfUrl,status:true})
    if(user==null){
        response.send({message:"User doesnot exsist in the database"})
    }
    else{
        //update the details using updateOne
        await userCollection.updateOne({username:usernameOfUrl},{$set:{status:false}})
        //send response back 
        response.send({message:"User is deleted"})
    }
})


// Restore operation using status
userApp.delete('/user-restore/:username', async(request,response)=>{
    const userCollection= request.app.get('userCollection');

    let usernameOfUrl=request.params.username;
    
    let user=await userCollection.findOne({username:usernameOfUrl,status:false})
    if(user==null){
        response.send({message:"User doesnot exsist in the deleted list"})
    }
    else{
        //update the details using updateOne
        await userCollection.updateOne({username:usernameOfUrl},{$set:{status:true}})
        //send response back 
        response.send({message:"User is restored"})
    }
})



module.exports=userApp






// CRUD Operations using Local Variables

// userList=[];

// // Get operation
// userApp.get('/users',(request,response)=>{
//     response.send({message:'All Users',payload:userList})
// })
// // Get operation using id 
// userApp.get('/users/:id',(request,response)=>{
//     //Extracting 
//     let id= Number(request.params.id);
//     let user= userList.find(userObj=>userObj.id==id)
//     if(user==undefined){
//         response.send({message:"No user found"})
//     }
//     else{
//         response.send({message:"User Found",payload:user})
//     }

// })

// //Before Post we need body parser middle-ware 
// userApp.use(exp.json());
// // Post operation
// userApp.post('/users',(request,response)=>{
//     let newUser=request.body;
//     userList.push(newUser);
//     response.send({message:"User Created"})

// })
// // Put operation
// userApp.put('/users/:id',(request,response)=>{
//     let id = Number(request.params.id);
//     let updatedInfo=(request.body);
//     let userIndex=userList.findIndex(userObj=> userObj.id==id)
//     if(userIndex==-1){
//         response.send({message:"No user found"})
//     }
//     else{
//         userList.splice(userIndex,1,updatedInfo);
//         response.send({message:"User updated"})
//     }
// })



// // Delete operation
// userApp.delete('/users/:id',(request,response)=>{
//     let id = Number(request.params.id)
//     let userIndex= userList.findIndex(userObj=> userObj.id==id)
//     if(userIndex==-1){
//         response.send({message:"No user found"})
//     }
//     else{
//         userList.splice(userIndex,1);
//         response.send({message:"User Deleted Successfully"})
//     }
// })
