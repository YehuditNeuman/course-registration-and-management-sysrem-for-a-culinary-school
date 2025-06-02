
import { Schema,model,Types } from "mongoose";

const smallCourse=Schema({
    courseId:{type: Types.ObjectId,required:true, ref: 'course' },
    dateOpen:{type:Date,default: new Date()},
    amount:{type:Number,default:1},

})

const registrationSchema=Schema({
    registrationDate:{type:Date,default:new Date()},
    studentId:{type: Types.ObjectId,required:true, ref: 'student' },
    courses:{type:[smallCourse],required:true},
    isSuccessfullyCompleted:{type:Boolean,default:false},
    finalPrice:Number,
    phone:{type:String,required:true},
    paymentDetails: {
        paymentMethod: { type: String, enum: ["CreditCard", "PayPal"], required: true },
        cardDetails: {
          cardName: String,
          cardNumberMasked: String
        },
        transactionId: String,
        status: String
      }


    

})
export const registrationeModel= model("registration",registrationSchema,"registrations");