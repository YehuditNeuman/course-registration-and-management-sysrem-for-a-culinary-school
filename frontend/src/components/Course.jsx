import React from "react";
import { Box, Typography, Divider } from "@mui/material";

import ShowImage from "./ShowImage";

const Course = ({ course }) => {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "black" }}>
        {course.name}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2" component="div" sx={{ color: "text.secondary", fontWeight: "bold", fontSize: "20px" }}>
        $ {course.price}
      </Typography>

      <Typography variant="body2" component="div" sx={{ color: "text.secondary" }}>
        <ShowImage course={course} />
      </Typography>


    </Box>
  );
};

export default Course;
