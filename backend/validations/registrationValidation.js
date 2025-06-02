import Joi from "joi";
import mongoose from "mongoose";

const objectIdValidator = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
};

const smallCourseSchema = Joi.object({
    courseId: Joi.string()
        .custom(objectIdValidator)
        .required()
        .messages({
            "any.required": "Course ID is required",
            "any.invalid": "Invalid Course ID",
            "string.base": "Course ID must be a string"
        }),
    dateOpen: Joi.date()
        .optional()
        .messages({
            "date.base": "Opening date must be a valid date"
        }),
    amount: Joi.number()
        .integer()
        .min(1)
        .optional()
        .messages({
            "number.base": "Amount must be a number",
            "number.integer": "Amount must be an integer",
            "number.min": "Amount must be at least 1"
        })
});

export const registrationSchema = Joi.object({
    registrationDate: Joi.date()
        .optional()
        .messages({
            "date.base": "Registration date must be a valid date"
        }),
    studentId: Joi.string()
        .custom(objectIdValidator)
        .required()
        .messages({
            "any.required": "Student ID is required",
            "any.invalid": "Invalid Student ID",
            "string.base": "Student ID must be a string"
        }),
    courses: Joi.array()
        .items(smallCourseSchema)
        .min(1)
        .required()
        .messages({
            "array.base": "Courses must be an array",
            "array.min": "At least one course is required",
            "any.required": "Courses field is required"
        }),
    isSuccessfullyCompleted: Joi.boolean()
        .optional()
        .messages({
            "boolean.base": "Completion status must be a boolean (true/false)"
        }),
    finalPrice: Joi.number()
        .min(0)
        .optional()
        .messages({
            "number.base": "Final price must be a number",
            "number.min": "Final price cannot be negative"
        }), phone: Joi.string()
        .pattern(/^0[5-9]\d{8}$/)
        .required()
        .messages({
          "string.empty": "Phone number is required",
          "string.pattern.base": "Phone number must be a valid Israeli mobile format (e.g. 0501234567)",
          "any.required": "Phone number is required"
        }),paymentDetails: Joi.object({
            paymentMethod: Joi.string().valid("CreditCard", "PayPal").required(),
            cardDetails: Joi.object({
              cardName: Joi.string(),
              cardNumberMasked: Joi.string()
            }).optional(),
            transactionId: Joi.string().optional(),
            status: Joi.string().optional()
          }).required()

});
