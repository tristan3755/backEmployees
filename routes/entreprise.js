const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const entrepriseSchema=require('../models/entreprise.js')
const auth=require('../middlewares/auth.js')
const path=require('path')


router.post('/inscription',(req,res)=>{
    bcrypt.hash(req.body.password,5)
    .then(hash=>{
        const newEntreprise=new entrepriseSchema({
        password:hash,
        entrepriseName:req.body.entrepriseName,
        cities:req.body.cities,
        SIRET:req.body.SIRET,
        })

        newEntreprise.save((err,data)=>{
            if(!err){
                  res.send(data)
              }else{
                  res.status(500).json({code:500,message:'problème',utilisateurAjoutéEchec:err})
              }
    })
})
.catch(err=>{
    res.send(err).status(500)
})
})

router.post('/connexion',(req,res)=>{
    entrepriseSchema.findOne({entrepriseName:req.body.entrepriseName })
    .then(entreprise=>{
        if(!entreprise){
            return res.status(401).json({code:401,message:"identifiants erronés"})
        }

        bcrypt.compare(req.body.password,entreprise.password)
        .then(passwordOk=>{
            if(!passwordOk){
           return res.status(401).json({code:401,message:"password incorrect"})    
            }
            res.status(200).json({code:200,entrepriseId:entreprise._id,token:jwt.sign({entrepriseId:entreprise._id},
                'ramdonSecretToken',
                {expiresIn:'24h'}
            )

            })
        })
    })
})

module.exports=router