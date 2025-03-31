import Joi from "joi"

import { courseModel } from "../model/course.js"

const courseSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        "string.min": "The course name must be at least 3 characters long.",
        "any.required": "Course name is required."
    }),
    description: Joi.string().optional().allow('').messages({
        "string.base": "Description must be a string.",
    }),
    price: Joi.number().min(400).required().messages({
        "number.min": "The price must be at least 400.",
        "any.required": "Price is required."
    }),
    dateOpen: Joi.date().optional(),
    teachersNames: Joi.array().items(Joi.string()).min(1).required().messages({
        "array.min": "At least one teacher is required.",
        "any.required": "Teachers' names are required."
    }),
    categories: Joi.array().items(Joi.string().allow('').min(1)).optional().messages({
        "array.base": "Categories should be an array of strings.",
        "string.base": "Each category should be a string.",
        "string.min": "Category name cannot be empty."
    }),
    url: Joi.string().optional().uri().messages({
        "string.uri": "URL must be a valid URI."
    })
});


export const getAllCourses = async (req, res) => {
    let limit = req.query.limit || 20
    let page = req.query.page || 1
    let category = req.query.category
    let filter = {};
    if (category) {
        filter.categories = category;
    }
    try {
        let data = await courseModel.find(filter).skip((page - 1) * limit).limit(limit);
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "cant get all", message: err.message })
    }
}

export const getAllCategories = async (res) => {
    try {
        let categories = await courseModel.distinct("categories");
        res.json(categories);
    } catch (err) {
        res.status(400).json({ title: "cant get categories", message: err.message });
    }
};

export const getCourseById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await courseModel.findById(id);
        if (!data)
            return res.status(404).json({ title: "cant get by id", message: "id not found" })
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "cant get by id", message: err.message })
    }
}

export const addCourse = async (req, res) => {

    let { body } = req;
    if (body.teachersNames) {
        body.teachersNames = JSON.parse(body.teachersNames);

    } if (body.categories) {
        body.categories = JSON.parse(body.categories);
    }
    let originalFileName = req.file?.originalname || null;
    const { error } = courseSchema.validate(body)
    if (error) {
        console.log(error.details);
        return res.status(400).json({ title: "cant add course", message: error.details[0].message })
    }
    try {

        let course = new courseModel({ ...body, url: originalFileName })
        let data = await course.save();
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "cant add course", message: err.message })
    }
}



export const deleteCourseById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await courseModel.findByIdAndDelete(id);
        if (!data)
            return res.status(404).json({ title: "cant delete by id", message: "id not found" })
        return res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "cant delete by id", message: err.message })
    }
}

export const updateCourseById = async (req, res) => {

    const { _id, ...updateData } = req.body
    const updatedCourseSchema = courseSchema.fork('name', (field) => field.optional());

    const { error } = updatedCourseSchema.validate(updateData)
    if (error) {
        return res.status(400).json({ title: "cant add course", message: error.details[0].message })
    }
    try {
        let data = await courseModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!data)
            return res.status(404).json({ title: "cant update course", message: "id not found " })
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "cant update course", message: err.message })
    }
}


export const numPages = async (req, res) => {
    let limit = req.query.limit || 20
    try {
        let numCourses = await courseModel.countDocuments();
        return res.json(Math.ceil(numCourses / limit))
    }

    catch (err) {
        res.status(400).json({ title: "cant get num pages", message: err.message })
    }
}


