
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { GoogleLogin } from '@react-oauth/google';

import AuthTextField from "../components/auth/AuthTextField";
import { userIn } from "../features/UserSlice";
import { loginUser, sendGoogleTokenToServerLogin } from '../api/userService';
import AuthFormWrapper from "../components/auth/AuthFormWrapper";

const LogIn = () => {
    let { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    let disp = useDispatch();
    let navigate = useNavigate();

    const save = async (data) => {
        try {
            console.log("DATA TO SEND:", data);
            let res = await loginUser(data);
            disp(userIn(res.data));
            console.log(res.data);
            navigate("/")

        } catch (err) {
            setError(err.response?.data?.message);
            console.log(err.response?.data?.message);
        }
    };
    const handleGoogleSuccess=async (credentialResponse) => {

        try {
            let res = await sendGoogleTokenToServerLogin(credentialResponse)
            const data = res.data;
            disp(userIn(data));
            navigate('/');
        }
        catch (err) {
            setError(err.response?.data?.message);
            console.log(err.response?.data?.message);
        }

    }
    const handleGoogleError=() => {
        setError("Google login failed");
    }


    return (
       
        <AuthFormWrapper title="Log In" googleLoginComponent={
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                scope="email profile"
              
            />
        }>
     
                <form
                    noValidate
                    onSubmit={handleSubmit(save)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    <AuthTextField
                        label="Email"
                        name="email"
                        register={register}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: "Invalid email format"
                            }
                        }}
                        error={errors.email}
                        helperText={errors.email?.message}
                    />
                    <AuthTextField
                        label="Password"
                        name="password"
                        register={register}
                        rules={{
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters" }
                        }}
                        error={errors.password}
                        helperText={errors.password?.message}
                        showToggle
                        show={showPassword}
                        setShow={setShowPassword}
                    />
                    {error && <Box sx={{ color: 'red', textAlign: 'center', marginTop: 2 }}>{error}</Box>}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            marginTop: 2,
                            padding: '10px 20px',
                            backgroundColor: 'black',
                            color: 'white',
                            ':hover': { backgroundColor: '#333' }
                        }}
                    >
                        Log In
                    </Button>
                    <Typography align="center" sx={{ mt: 2 }}>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                    </Typography>
                </form>
                
              
                </AuthFormWrapper>
              
       
    );
};

export default LogIn;

