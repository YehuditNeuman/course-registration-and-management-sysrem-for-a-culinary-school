import Joi from "joi"

export const courseSchema = Joi.object({
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
    categories: Joi.array()
    .items(Joi.string().min(1)) // כל איבר חייב להיות מחרוזת באורך לפחות 1
    .min(1) // המערך עצמו חייב להכיל לפחות פריט אחד
    .required() // אם אתה גם רוצה לחייב שזה יישלח בכלל (לא optional)
    .messages({
      "array.base": "Categories should be an array of strings.",
      "array.min": "At least one category is required.",
      "string.base": "Each category should be a string.",
      "string.min": "Category name cannot be empty."
    }),
    url: Joi.string().optional().uri().messages({
        "string.uri": "URL must be a valid URI."
    })
});