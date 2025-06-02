import { Schema, model } from "mongoose";

const studentSchema = Schema({
    email: {
        type: String,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: function () {
            // הסיסמה דרושה רק אם המשתמש לא מגוגל
            return !this.isGoogleUser;
        }
    },
    token: {
        type: String
    },
    role: {
        type: String,
        default: "USER",
        enum: ['USER', 'ADMIN']
    },
    registrationDate: {
        type: Date,
        default: new Date()
    },
    isGoogleUser: {
        type: Boolean,
        default: false  // אם הוא משתמש מגוגל, הסיסמה לא תהיה דרושה
    }
});

export const studentModel = model("student", studentSchema, "students");
