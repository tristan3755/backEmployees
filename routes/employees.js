const express=require('express')
const router=express.Router()
const employeesSchema=require('../models/employees.js')
const auth=require('../middlewares/auth.js')

router.post('/add',auth,(req,res)=>{
    const newEmployees=new employeesSchema({
        name:req.body.name,
        work:req.body.work,
        salary:req.body.salary,
        mail:req.body.mail,
        id_entreprise:req.body.id_entreprise,
    })
    newEmployees.save().then(newEmployees=>{
        if(!newEmployees){
res.status(401).json({code:401,message:'error'})

        }else{
res.send(newEmployees)
        }
    })
    .catch(error=>{
        res.send(error).status(500)
    })
})
router.get('/:name',auth,(req,res)=>{
    employeesSchema.findOne({
        name:req.params.name
    })
    .then(employees=>{
        if(!employees){
            res.status(401).json({code:'401',message:'introuvable'})
        }else{
            res.send(employees)
        }
    })
    .catch(error=>{
        res.send(error).status(500)
    })
})
router.put('/modif/:name',auth,(req,res)=>{
    let employees=({
        name:req.body.name,
        work:req.body.work,
        salary:req.body.salary,
        mail:req.body.mail,
    })
    employeesSchema.findOneAndUpdate({
        name:req.params.name
    }, {$set: employees}, {
        new: true
    })
    .then(employeesModif=>{
        if(!employeesModif){
            res.status(401).json({code:'401',message:'introuvable'})
        }else{
            res.send(employeesModif)
        }
    })
    .catch(error=>{
        res.send(error).status(500)
    })
})
router.delete('/supp/:name',auth,(req,res)=>{
    employeesSchema.findOneAndDelete({
        name:req.params.name
    })
    .then(employeesSupp=>{
        if(!employeesSupp){
            res.status(401).json({code:'401',message:'introuvable'})
        }else{
            res.send(employeesSupp)
        }
    })
    .catch(error=>{
        res.send(error).status(500)
    })
})
module.exports = router