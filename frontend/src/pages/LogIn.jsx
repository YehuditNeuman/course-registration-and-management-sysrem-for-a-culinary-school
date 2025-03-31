
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField, Button, IconButton, InputAdornment, Container, Typography, Box } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


import BackgroundImage from "../components/BackgroundImage";
import { userIn } from "../features/UserSlice";
import { loginUser } from '../api/userService';

const LogIn = () => {
    let { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    let disp = useDispatch();
    let navigate = useNavigate();

    const save = async (data) => {
        try {
            let res = await loginUser(data);
            disp(userIn(res.data));
            console.log(res.data);
            navigate("/courseList");
        } catch (err) {
            setError(err.response?.data?.message);
            console.log(err.response?.data?.message);
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <BackgroundImage
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1
                }}
            />
            <Container
                maxWidth="xs"
                sx={{
                    backgroundColor: 'rgba(245, 245, 245, 0.9)',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <Typography variant="h4" color="textPrimary" sx={{ marginBottom: 3, textAlign: 'center' }}>
                    Log In
                </Typography>
                <form
                    noValidate
                    onSubmit={handleSubmit(save)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ style: { color: '#333' } }}
                        {...register("userName", {
                            required: { value: true, message: "Username is required" },
                            minLength: { value: 3, message: "Username must be at least 3 characters" }
                        })}
                        error={!!errors.userName}
                        helperText={errors.userName?.message}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: "#DC143C",
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        InputLabelProps={{ style: { color: '#333' } }}
                        {...register("password", {
                            required: { value: true, message: "Password is required" },
                            minLength: { value: 8, message: "Password must be at least 8 characters" }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        sx={{ color: '#333' }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: "#DC143C",
                                },
                            },
                        }}
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
                </form>
            </Container>
        </Box>
    );
};

export default LogIn;

