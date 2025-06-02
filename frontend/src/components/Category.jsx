import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import {Typography,  Grid, Card, CardContent, CardMedia} from '@mui/material';

import { getImageFromServer } from "../api/courseService";
import ShowImage from "./ShowImage";

const Category = ({category}) => {
     const [image, setImage] = useState("");
      useEffect(() => {
        console.log("course.url:", category.image);
        const getImages = async () => {
          try {
            let res = await getImageFromServer(category.image);
            console.log("Image URL:", res.data);
    
            setImage(URL.createObjectURL(res.data));
          } catch (err) {
            console.log({ Title: "Can't get image", message: err.message });
          }
        };
        
        getImages();
      }, [category]);
     
    return ( 
        <Grid item xs={12} sm={6} md={4}>
        <Link 
          to={`/courseList/${category.name}`}
          style={{ 
            textDecoration: 'none', 
            display: 'block', 
            height: '100%' 
          }}
        >
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 6
              }
            }}
          >
            {/* <CardMedia
              component="img"
              height="200"
              image={image}
              alt={category.name}
            /> */}
            <ShowImage url={`${category.name}.png`}/>
            
          
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Typography variant="h5" component="h2">
                {category.name}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    

    );
}
 
export default Category;
