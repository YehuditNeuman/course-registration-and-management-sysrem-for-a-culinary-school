import Joi from "joi"

export const addStudentSchema=Joi.object({
    email:Joi.string().email().required().messages({
        "string.empty":"email is required",
        "any.required":"email is required",
        "string.email":"email must be a valid email"
    }),
    password:Joi.string().min(8).required().messages({
        "string.empty":"password is required",
        "any.required":"password is required",
        "string.min":"the password must be at least 8 charcters"
        
    }) ,
    userName:Joi.string().required().min(3).messages({
        "string.empty":"userName is required",
        "any.required":"userName is required",
        "string.min":"userName has to be at least 3 letters"
       
    }) 
})

export const loginStudentSchema=Joi.object({
    email:Joi.string().email().required().messages({
        "string.empty":"email is required",
        "any.required":"email is required",
        "string.email":"email must be a valid email"
    }),
    password:Joi.string().min(8).required().messages({
        "string.empty":"password is required",
        "any.required":"password is required",
        "string.min":"the password must be at least 8 charcters"
        
    }) 
    
})
export const updateStudentSchema = Joi.object({
  
  password: Joi.forbidden(), 
  userName: Joi.string().min(3).messages({
    "string.min": "userName has to be at least 3 letters",
  }),
  role: Joi.string().valid("USER", "ADMIN").messages({
    "any.only": "role must be either 'USER' or 'ADMIN'"
  })
});

export const updateStudentPasswordSchema = Joi.object({
  password: Joi.string().min(8).required().messages({
    "string.empty": "password is required",
    "any.required": "password is required",
    "string.min": "the password must be at least 8 characters"
  })
}).required().unknown(false); 
