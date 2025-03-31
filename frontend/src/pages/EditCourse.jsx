import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Paper, Grid } from "@mui/material";
import { useSelector } from "react-redux";

import { updateCourse } from "../api/courseService";


const EditCourse = ({ course, onClose, onEdit }) => {
  let currentUser = useSelector(state => state.user.currentUser);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      dateOpen: course?.dateOpen ? new Date(course?.dateOpen).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      price: course?.price || 400,
      description: course?.description || "",
      teachersNames: course?.teachersNames?.join(", ") || "",
      categories: course?.categories?.join(", ") || "",
    },
  });

  const save = async (data) => {
    try {
      const updatedData = {
        _id: course._id,
        dateOpen: data.dateOpen || course.dateOpen,
        price: data.price || course.price,
        description: data.description !== "" ? data.description : course.description,
        teachersNames: data.teachersNames ? data.teachersNames.split(",").map(name => name.trim()) : course.teachersNames,
        categories: data.categories ? data.categories.split(",").map(category => category.trim()) : course.categories,
      };

      let res = await updateCourse(updatedData, currentUser.token);
      console.log(res.data);
      onEdit(res.data);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ color: "#333", fontWeight: "bold" }}>
          Edit Course: {course?.name}
        </Typography>
        <form onSubmit={handleSubmit(save)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date"
                {...register("dateOpen")}
                type="date"
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
                {...register("price", { required: "Price must be at least 400", min: { value: 400, message: "Price must be at least 400" } })}
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
                label="Course Description"
                multiline
                rows={4}
                {...register("description")}
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
                label="Teacher Names"
                {...register("teachersNames")}
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
                label="Categories"
                {...register("categories")}
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

            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ backgroundColor: "#DC143C", '&:hover': { backgroundColor: "#B22222" } }}>
                Save Changes
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button variant="outlined" color="secondary" fullWidth onClick={onClose} sx={{ color: "#DC143C", borderColor: "#DC143C", '&:hover': { borderColor: "#DC143C" } }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditCourse;