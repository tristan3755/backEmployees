
const mongoose=require('mongoose')

const employeesSchema=mongoose.Schema({

name:{
    type:String,
    require:true
},
work:{
    type:String,
    require:true
},
salary:{
    type:String,
    require:true
},
mail:{
type:String,
require:true,
},
id_entreprise:{
    type:String,
    require:true,
}
},{timestamps:true})

module.exports=mongoose.model('employees',employeesSchema)