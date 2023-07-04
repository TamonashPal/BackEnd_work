const fs=require("fs");

// read file content
function getData(){
    fs.readFile("./data.txt",(error,fileContent)=>{
        if(error)
        {
            console.log("Error is : ",error)
        }
        else
        {
            console.log(fileContent.toString());
        }
    })
}

//write to file
function writeData(newContent){
    fs.writeFile("./data.txt",newContent,()=>{
        console.log("writing to file is complete ...");
    })
}

//Append to file
function appendData(newContent){
    fs.appendFile("./data.txt",newContent,()=>{
        console.log("appending to file is complete ...");
    })
}

appendData("I am doing fine !");
getData();

