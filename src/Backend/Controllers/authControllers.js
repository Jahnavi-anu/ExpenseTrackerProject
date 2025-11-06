
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const maxAge = 3*24*60*60;

const createToken = (id) =>{
      
  return jwt.sign({id},"janu",{
    expiresIn:maxAge,
  });

}
const handleErrors=(err)=>{
  let errors ={ email: "" , password: ""};
  if(err.message === "incorrect Email") 
    errors.email="That email is not registered";
   if(err.message === "incorrect password") 
    errors.password="That password is incorrect";
  if(err.code === 11000){
    errors.email="Email is already registered";
    return errors;
  }
  if(err.message.includes("User validation failed")){
    Object.values(err.errors).forEach(({properties})=>{
      errors[properties.path] = properties.message;
    })
  }
  return errors;
}


module.exports.register = async(req,res,next)=>{
try{
         const {fullname, email, password} = req.body;
         const user = await UserModel.create({fullname,email ,password});
         const token = createToken(user._id);
         res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly:false,
            maxAge:maxAge*1000,
         });
         console.log(res.cookie);
         console.log(res.body);
         res.status(201).json({user:user._id,created:true})
    }catch(err){
        console.log("login data is not ",err);
        const errors = handleErrors(err);
        res.json({ errors,created: false });
     }

}

module.exports.login = async(req,res,next)=>{
    try{
         const {email, password} = req.body;
         const user = await UserModel.login(email ,password);
         const token = createToken(user._id);
         res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly:false,
            maxAge:maxAge*1000,
         });
         console.log(res.body);
         res.status(201).json({user:user._id,created:true})
    }catch(err){
        console.log("login data is not ",err);
        const errors = handleErrors(err);
        res.json({ errors,created: false });
     }

}


