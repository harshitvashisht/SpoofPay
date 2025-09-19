import { Router } from "express";
import { accountModel, UserModel } from "../db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userMiddleware } from "../middleware/userauth.js";


const userRouter = Router ();


userRouter.post('/signUp' , async function (req, res , next){
    
 try {
    const {FirstName , LastName , password , email} = req.body

    if(!FirstName || !LastName || !password || !email){
        
        return res.json("All Fields Are Required !")

    }
    const sameuser = await UserModel.findOne({email})
    
    
    if (sameuser){
        return res.status(400).json({
            message : "User Already Exists !"
        })
    }
    const hashedpassword = await bcrypt.hash(password , 10)

  const newuser = await UserModel.create({
       FirstName : FirstName, 
       LastName  : LastName, 
       password : hashedpassword, 
       email : email
   })
   const accountNumber = Math.floor(10000000 + Math.random()*900000000)

   await accountModel.create ({
    userId : newuser._id,
    accountNumber : accountNumber, 
    accountBalance : (1+ Math.random()*100000) .toFixed(2)
   })

    return res.json({
        message : "User Created !"
     })
 } catch (error) {
    return res.status(500).json({
        message : "Server Error !"
    })
 }

})

userRouter.post('/signin' , async function (req , res , next ) {
    try {
        const {email , password} = req.body

        if (!email || !password){
            return res.status(400).json({
                message : "All Fields Are Required !"
            })
        } 
     const user =   await UserModel.findOne({email})
        if(!user){
          return  res.json({
                message : "No User Found"
            })
            }
            const passwordMatch = await bcrypt.compare(password , user.password)
            if(!passwordMatch){
                return res.json ({
                    message : "Incorrect Password !"
                })
        } 
         const token = jwt.sign({
                id: user._id.toString()
            }, process.env.JWT_SECRET)
         
            return res.json({
                token: token, 
                message : "You Are Logged In !",
            })
            
    } catch (error) {
        return res.status(500).json({
            message : "Server Error !"
        })
    }
})
userRouter.get('/getinfo' , userMiddleware , async function (req,res,next){
     try {
        
    const userId = req.userId

   const user =  await UserModel.findOne({_id: userId })

   if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
    return res.json({
            FirstName: user.FirstName,
            LastName: user.LastName,
            email: user.email
        });
     } catch (error) {
        return res.status(500).json({
            message: "Server Error !"
        })
     }
})

userRouter.put('/updateinfo' , userMiddleware , async function (req, res, next){
   
    const id = req.userId
    const {FirstName , LastName , password , email} = req.body;
    
       const updateduser = await UserModel.updateOne({
               FirstName: FirstName, 
               LastName : LastName, 
               password : password,
               email : email
       })

       return res.json ({
        message : "updated information"
       })
})

userRouter.get('/search', userMiddleware, async function(req, res, next){
    try {
        const filter = req.query.filter || ""
        
        if (!filter.trim()) {
            return res.json({ users: [] })
        }

        const user = await UserModel.find({
            $or: [
                { FirstName: { $regex: filter, $options: 'i' } },
                { LastName: { $regex: filter, $options: 'i' } }
            ]
        })

        return res.json({
            users: user.map(users => ({
                _id: users._id,
                FirstName: users.FirstName,
                LastName: users.LastName,
                email: users.email
            }))
        })
    } catch (error) {
        next(error)
    }
})
    




userRouter.delete('/logout' , userMiddleware , (req , res , next)=>{
    if(req.session){
        req.session.destroy(err=>{
            if(err){
                return res.status(400).json({
                    message : "unable to logout"
                })
            }else 
                return res.json({
                    message : "Logout Successful"
                })
        })
    } else {
        return res.status(400).json({
            message : "No Active Session Found !"
        })
    }
})

userRouter.get('/users' , userMiddleware , async function(req , res , next) {   
    
    try {
        const users = await UserModel.find({})
       return res.json (users)
    } catch (error) {
        return res.status(500).json({
            message : "Server Error !"
        })
    }
    
})
export default userRouter