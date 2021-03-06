const jwt=require('jsonwebtoken')


module.exports=(req,res,next)=>{
    try{
        const token= req.headers.authorization.split(' ')[1];
        const tokenDecode=jwt.verify(token,'ramdonSecretToken')
        const entrepriseId=tokenDecode.entrepriseId
        if(req.body.entrepriseId && req.body.entrepriseId!==entrepriseId){
        throw 'utilisateur inconnu'
        }else{
            next()
        }
        }catch {
            res.status(401).json({
              error: new Error('requete invalide!')
            });
          }
}