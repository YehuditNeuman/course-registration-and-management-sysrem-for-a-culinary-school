import bcrypt from "bcryptjs";

import { addStudentSchema, updateStudentPasswordSchema, updateStudentSchema } from "../validations/studentValidation.js";
import { loginStudentSchema } from "../validations/studentValidation.js";


import { studentModel } from "../model/student.js"
import generateToken from "../utils/jwt.js";
import { verifyGoogleToken } from "../utils/googleAuth.js";


export const getAllStudents = async (req, res) => {

    try {
        let data = await studentModel.find().select('-password');
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "cant get all", message: err.message })
    }
}

export const getStudentById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await studentModel.findById(id).select('-password');
        if (!data)
            return res.status(404).json({ title: "can't get by id", message: "id not found" })
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "cant get by id", message: err.message })
    }
}

export const addStudent_signUp = async (req, res) => {
    let { body } = req;
    const { error } = addStudentSchema.validate(body)
    if (error) {
        return res.status(400).json({
            title: "cant add student",
            message: error.details[0].message,
        });
    }
    try {
        let exsistStudent = await studentModel.findOne({ email: body.email }).select('-password')
        if (exsistStudent)
            return res.status(409).json({ title: "cant add student", message: "email already exist" })
        let hash = await bcrypt.hash(body.password, 10)
        body.password = hash
        let student = new studentModel(body)
        student.token = generateToken(student)
        let data = await student.save();
        let { password: removedPassword, ...studentWithoutPassword } = data.toObject();
        res.json(studentWithoutPassword);
    }
    catch (err) {
        res.status(400).json({ title: "cant add Student", message: err.message })
    }

}

export const signUpWithGoogle = async (req, res) => {

    try {
        const { credential } = req.body;
        const payload = await verifyGoogleToken(credential);
        const email = payload.email;
        const userName = payload.name || email.split('@')[0];
        let existStudent = await studentModel.findOne({ email });
        if (existStudent) {
            return res.status(409).json({ title: "cant add student", message: "email already exist" })
        }
        let newUser = new studentModel({ email, userName, isGoogleUser: true });
        newUser.token = generateToken(newUser);
        let data = await newUser.save()
        res.status(201).json({
            _id: data._id,
            userName: data.userName,
            role: data.role,
            email: data.email,
            token: data.token
        });
    }
    catch (err) {
        res.status(500).json({ title: "google sign-up error", message: err.message });
    }

}


export const getStudetByEmailPassword_Login = async (req, res) => {//מחזירה תלמיד על פי סיסמה ושם שהתקבלו בצורה מאובטחת-body	
    let { email, password } = req.body;
    const { error } = loginStudentSchema.validate({ email, password })
    if (error)
        return res.status(400).json({ title: "cant login student", message: error.details[0].message })

    try {
        let student = await studentModel.findOne({ email }).lean()
        if (!student)
            return res.status(404).json({ title: "cant login student", message: "No student found with the email received" })
        let isMatch = await bcrypt.compare(password, student.password)
        if (!isMatch)
            return res.status(401).json({ title: "cant login student", message: "wrong password " })


        const { password: removedPassword, ...studentWithoutPassword } = student;
        studentWithoutPassword.token = generateToken(studentWithoutPassword)
        res.json(studentWithoutPassword);
    }
    catch (err) {
        res.status(400).json({ title: "cant login Student", message: err.message })
    }
}

export const loginWithGoogle = async (req, res) => {

    try {
        const { credential } = req.body;
        const payload = await verifyGoogleToken(credential);
        const email = payload.email;
        let user = await studentModel.findOne({ email }).lean();;
        if (!user)
            return res.status(409).send({ title: "cant login student", message: "No student found with the email received" })
        const { password: removedPassword, ...userWithoutPassword } = user;
        userWithoutPassword.token = generateToken(userWithoutPassword);

        res.status(200).json(userWithoutPassword);
    }
    catch (err) {
        res.status(500).json({ title: "google login error", message: err.message });
    }

}




export const updateStudentById = async (req, res) => {
    let { id } = req.params
    let { body } = req;
    const { error } = updateStudentSchema.validate(body)
    if (error)
        return res.status(400).json({ title: "cant update student", message: error.details[0].message })

    try {
        let data = await studentModel.findByIdAndUpdate(id, body, { new: true }).select('-password');
        if (!data)
            return res.status(404).json({ title: "cant update student", message: "id not found " })
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "cant update student", message: err.message })
    }
}

export const updateStudentPasswordById = async (req, res) => {
    let { id } = req.params
    let { body } = req;
    const { error } = updateStudentPasswordSchema.validate(body)
    if (error)
        return res.status(400).json({ title: "cant update student", message: error.details[0].message })
    try {
        let data = await studentModel.findByIdAndUpdate(id, body, { new: true }).select('-password');
        if (!data)
            return res.status(404).json({ title: "cant update student password", message: "id not found " })
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "cant update student", message: err.message })
    }
}

