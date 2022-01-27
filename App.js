const express = require ('express')
const mongoose =require('mongoose');
const PORT = 8899;
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//dbconnection

const db ="mongodb://localhost:27017/mongocurd";
const connectDB = async() =>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("MongoDb created")
    }  catch(err){
        console.log(err.message)
    }
}
connectDB();
//end
const catModel=require('./connect_mongoose/db/categoryScheme')

//routes
app.get("/insertcategory",(req,res)=>{
    let cname="Neel";
    let path="Neel.jpg";

    let ins=new catModel({cname:cname,image:path});
    ins.save((err)=>{
        if(err){res.send("Already Added")}
        else{
        res.send("Category Added")}

    })
})

app.get("/getcategory",(req,res)=>{
    catModel.find({},(err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

app.get("/delcategory/:id",(req,res)=>{
    let id = req.params.id;
    catModel.deleteOne({_id:id},(err)=>{
        if(err) throw err
        res.send("category Deleted")
    }) 
})
// app.put("/update/:id",(req,res)=>{
//     let id=req.params.id;
//     let cname=req.body.cname;
//     let path=req.body.path;
//     catModel.updateOne({_id:id},{$set:{cname:cname,image:path}},(err)=>{
//         if(err) throw err;
//         else{
//             res.end("Category Updated")
//         }
//     })

// })
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`)
})

