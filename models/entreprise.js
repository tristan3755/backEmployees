const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')
const entrepriseSchema=mongoose.Schema({

entrepriseName:{
    type:String,
    require:true,
    unique:true,
},
cities:{
    type:String,
    require:true
},
SIRET:{
    type:String,
    require:true,
    unique:true,
},
password:{
    type:String,
    require:true
}
},{timestamps:true})
entrepriseSchema.plugin(uniqueValidator)
module.exports=mongoose.model('entreprises',entrepriseSchema)