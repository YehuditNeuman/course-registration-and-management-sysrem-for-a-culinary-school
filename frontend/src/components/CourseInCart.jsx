import React from "react";
import { Box, Typography, Divider } from "@mui/material";

import ShowImage from "./ShowImage";


const CourseInCart = ({ course }) => {
  return (
    <Box className="course-in-cart-container">
      <Box className="course-image">
        <ShowImage url={course.url} />
      </Box>
      <Box className="course-details">
        <Typography variant="h6" component="div" className="course-name">
          {course.name}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2" component="div" className="course-info">
          qty: {course.qty}
        </Typography>
        <Typography variant="body2" component="div" className="course-info">
          price: ${course.price * course.qty}
        </Typography>
      </Box>
    </Box>
  );
};

export default CourseInCart;
