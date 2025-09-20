
import dotenv from "dotenv";
dotenv.config();
import mongoose, { set } from "mongoose";
import { string } from "zod";



mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  password: { type: String, required: true },
  email : {type: String, required : true }
});

const UserModel = mongoose.model("users", userSchema);

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    accountNumber : {type: Number , required : true , unique : true} ,
    accountBalance : {type : Number , required : true }
    
  })

const accountModel = mongoose.model ('account' ,accountSchema)

const TransactionSchema = new mongoose.Schema({
    userId : {
      type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    transactionID : {type : String },
    sendto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',  
    required: true
  },
    amount : {type : Number},
    sentAmount : {type : Number , required : true},
    date: {type: Date , default: Date.now}
}) 
const TransactionModel = mongoose.model('Transactions' , TransactionSchema)

export { UserModel , accountModel , TransactionModel };
