const mongoose =  require('mongoose')

const db = process.env.DATABASE
mongoose.connect(db,{
    useNewUrlParser : true
})
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err)
})