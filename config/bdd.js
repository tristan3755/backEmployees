const mongooseConnect=require('mongoose')

const connectDB = async()=>{
try{
    const connect=await mongooseConnect.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
        /*useCreateIndex:true,
        useFindAndModify: false*/
    })

console.log('mongo connecté')    

}
catch(error){
console.log(error)
}
}

module.exports=connectDB