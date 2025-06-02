import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Paper, Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AddCourseToServer } from "../api/courseService";
import BackgroundImage from "../components/BackgroundImage";


const AddCourse = () => {
    let navigate = useNavigate();
    let currentUser = useSelector(state => state.user.currentUser);
    const [error, setError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();

    const save = async (data) => {
        const formattedData = new FormData();
        formattedData.append("name", data.name);
        formattedData.append("description", data.description);
        formattedData.append("dateOpen", data.dateOpen);
        formattedData.append("price", Number(data.price));
        formattedData.append("teachersNames", JSON.stringify(data.teachersNames.split(",").map((name) => name.trim())));
        formattedData.append("categories", JSON.stringify(data.categories.split(",").map((category) => category.trim())));

        if (data.url[0]) {
            formattedData.append("url", data.url[0]); // Send the file
        }

        try {
            let res = await AddCourseToServer(formattedData, currentUser?.token);
            console.log(res.data);
            navigate("/courseList", { state: { newCours: res.data } });
        } catch (err) {
            console.log({ title: "Cannot add course", message: err.message });
            setError(err.message);
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
            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                <Paper
                    elevation={3}
                    sx={{
                        padding: 3,
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    }}
                >
                    <Typography variant="h5" gutterBottom align="center" sx={{ color: "#333", fontWeight: "bold" }}>
                        Add Course
                    </Typography>
                    <form onSubmit={handleSubmit(save)}>
                        <Grid item xs={12}>
                            {error && <div style={{ color: "red" }}>{error}</div>}
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Course Name"
                                    {...register("name", {
                                        required: "Course name is required",
                                        minLength: { value: 3, message: "Name must be at least 3 letters" }
                                    })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#DC143C',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            '&.Mui-focused': {
                                                color: '#DC143C',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Course Description"
                                    {...register("description")}
                                    multiline
                                    rows={4}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#DC143C',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            '&.Mui-focused': {
                                                color: '#DC143C',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Start Date"
                                    type="date"
                                    {...register("dateOpen", { required: "Start date is required" })}
                                    defaultValue={new Date().toISOString().split("T")[0]}
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.dateOpen}
                                    helperText={errors.dateOpen?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#DC143C',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            '&.Mui-focused': {
                                                color: '#DC143C',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="URL"
                                    type="file"
                                    {...register("url", { required: "URL is required" })}
                                    error={!!errors.url}
                                    helperText={errors.url?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#DC143C',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            '&.Mui-focused': {
                                                color: '#DC143C',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    type="number"
                                    {...register("price", {
                                        required: "Price is required", min: { value: 400, message: "Price must be at least 400" }
                                    })}
                                    defaultValue={400}
                                    error={!!errors.price}
                                    helperText={errors.price?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#DC143C',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            '&.Mui-focused': {
                                                color: '#DC143C',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Teachers' Names (comma-separated)"
                                    {...register("teachersNames", { required: "Teachers' names are required" })}
                                    error={!!errors.teachersNames}
                                    helperText={errors.teachersNames?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#DC143C',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            '&.Mui-focused': {
                                                color: '#DC143C',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Categories (comma-separated)"
                                    {...register("categories", { required: "Categories are required" })}
                                    error={!!errors.categories}
                                    helperText={errors.categories?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#DC143C',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            '&.Mui-focused': {
                                                color: '#DC143C',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{
                                        backgroundColor: "#DC143C",
                                        '&:hover': { backgroundColor: "#B22222" }
                                    }}
                                >
                                    Add Course
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default AddCourse;