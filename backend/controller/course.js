import { courseModel } from "../model/course.js"
import { courseSchema } from "../validations/courseValidation.js";

export const getAllCourses = async (req, res) => {
    let limit = req.query.limit || 20;
    let page = req.query.page || 1;
    let category = req.query.category;
    let filter = {};

    // אם יש קטגוריה בשאילתה, חפש קורסים שהקטגוריה שלהם נמצאת במערך categories
    if (category) {
        filter.categories = { $in: [category] };
    }

    try {
        let data = await courseModel.find(filter).skip((page - 1) * limit).limit(limit);
        res.json(data);
    } catch (err) {
        res.status(400).json({ title: "can't get all", message: err.message });
    }
}

export const getAllCategories = async (req,res) => {
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



