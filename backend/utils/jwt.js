import jwt from 'jsonwebtoken';

const generateToken = (user) => {
   let token=jwt.sign({
    userId:user._id,
    userName:user.userName,
    role:user.role
   },process.env.SECRET_KEY,
   {expiresIn:'5h' }
)
   
    return ( token );
}
 
export default generateToken;