//import http module
const http=require('http')
//create http server object 
const httpServer=http.createServer()
//assign port number to server object
httpServer.listen(4000,()=>{
    console.log("Server listening on port number 4000")
})