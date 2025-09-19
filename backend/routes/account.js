import { Router } from "express";
import { userMiddleware } from "../middleware/userauth.js"; 
import { accountModel, UserModel } from "../db.js";
import mongoose from "mongoose";
import randomstring from "randomstring";
import { TransactionModel } from "../db.js";
import transaction from "transaction";


const accountRouter = Router()

accountRouter.get ('/balanceEnquiry' , userMiddleware , async function (req, res , next) {

  try {
     const userId = req.userId ; 
  const user =   await accountModel.findOne({
        userId
     })
     return res.json ({
        accountBalance : user.accountBalance
     })
  } catch (error) {
    return res.status(500).json({
        message : "Server Error !"
    })
  }
    
})


accountRouter.post('/transfer' , userMiddleware , async function (req , res , next ) {
  
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        
        const {amount , reciever} = req.body 
     const transfer =   await accountModel.findOne({userId : req.userId})
     
     if (!transfer || transfer.accountBalance < amount){
        session.abortTransaction()
        return res.status(400).json({
            message : "Insufficient Balance"
        })
     }

    const sendingto =  await accountModel.findOne({userId: reciever})

    if (!sendingto){
        session.abortTransaction()
        return res.status(400).json({
            message : "Invalid Reciever"
        })
    }
    await accountModel.updateOne({userId : req.userId},{
        $inc : {accountBalance : -amount}
    }).session(session)

    await accountModel.updateOne({userId: reciever},{
        $inc: {accountBalance: amount}
    }).session(session)
 
  await session.commitTransaction()

  const transactionID =  randomstring.generate({
            length : 8,
            charset: "alphanumeric",
            capitalization: "uppercase"
        })


  await TransactionModel.create({
        userId : req.userId,
        transactionID,
        sendto : sendingto.userId,
        sentAmount :amount,
        date: new Date()
  })

    session.endSession()

    return res.json("Sent Money !")
    

    } catch (error) {
      return  res.status(500).json({
            message : 'Server Error!'
        })
    }


})

accountRouter.get('/transactionhistory' , userMiddleware , async function(req,res,next){
    const userId = req.userId;

    try {
        const sent  = await TransactionModel.find({
        userId
    })
        const recieved = await TransactionModel.find({sendto : req.userId})
    return res.json({
        sent,
        recieved
    })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error !"
        })
    }
   
})


export default accountRouter



