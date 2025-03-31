import bcrypt from "bcryptjs";

import { studentModel } from "../model/student.js"
import generateToken from "../utils/jwt.js";


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
    if (!body.userName || !body.password || !body.email)
        return res.status(400).json({ title: "cant add student", message: "required details are missing" })
    if (body.userName.length < 3)
        return res.status(400).json({ title: "cant add Student", message: "your userName is too short" })
    if (body.password.length < 8)
        return res.status(400).json({ title: "cant add Student", message: "the password must be at least 8 charcters " })
    try {
        let exsistStudent = await studentModel.findOne({ userName: body.userName }).select('-password')
        if (exsistStudent)
            return res.status(409).json({ title: "cant add student", message: "userName already exist" })
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

export const updateStudentById = async (req, res) => {
    let { id } = req.params
    let { body } = req;
    if (body.userName && body.userName.length < 3)
        return res.status(400).json({ title: "cant update student", message: "your userName is too short" })
    if (body.password)
        return res.status(404).json({ title: "cant update student", message: "cant updatet password" })
    if (body.role && !['USER', 'ADMIN'].includes(body.role))
        return res.status(400).json({ title: "cant update student", message: "role must be either 'USER' or 'ADMIN'" });

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
    if (!body.password)
        return res.status(404).json({ title: "cant update student", message: " password is missing" })
    if (body.password.length < 8)
        return res.status(404).json({ title: "cant update student", message: " password is too short" })
    const allowedFields = ['password'];
    const bodyKeys = Object.keys(body);
    const invalidFields = bodyKeys.filter(field => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
        return res.status(400).json({
            title: "cant update student",
            message: `Invalid fields: ${invalidFields.join(', ')}`,
        });

    }
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

export const getStudetByUserNamePassword_Login = async (req, res) => {//מחזירה תלמיד על פי סיסמה ושם שהתקבלו בצורה מאובטחת-body	
    let { userName, password } = req.body;
    if (!userName || !password)
        return res.status(400).json({ title: "cant login student", message: "required details are missing" })
    try {

        let student = await studentModel.findOne({ userName: userName }).lean()
        if (!student)
            return res.status(404).json({ title: "cant login student", message: "No student found with the username  received" })
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