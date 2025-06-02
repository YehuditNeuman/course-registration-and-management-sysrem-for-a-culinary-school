import {
  Box, Typography, Avatar, Grid, Card, CardContent,Rating, Container
} from '@mui/material';
import { FormatQuote } from '@mui/icons-material';
import { useState, useEffect } from 'react';

import { getAllCategoriesFromServer } from '../api/courseService';
import Category from '../components/Category';


const reviews = [
  {
    name: "Emily Thompson",
    course: "Italian Culinary Masterclass",
    rating: 5,
    comment: "An incredible course that transformed me from an amateur cook to a true culinary artist! The techniques and secrets I learned completely elevated my kitchen skills.",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    name: "Jack Harrison",
    course: "Advanced Pastry and Dessert Workshop",
    rating: 4.5,
    comment: "It was an exciting journey to learn the secrets of cakes and desserts. The instructors were incredibly professional and passionate about their craft.",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    name: "Rachel Williams",
    course: "Exploring Middle Eastern Cuisine",
    rating: 5,
    comment: "Discovered an entire world of flavors and aromas. The course gave me practical tools and a deep understanding of Middle Eastern culinary traditions.",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg"
  }
];

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    let active = true;
    
    const fetchCategories = async () => {
      try {
        const res = await getAllCategoriesFromServer();
        if (active) {
          // In a real project, assuming the server returns an array of category names
          // We'll convert them to objects with name and image
          const formattedCategories = res.data.map(category => ({
            name: category,
            image: category
          }));
          
          setCategories(formattedCategories);
        }
      } catch (err) {
        console.log({ title: "Unable to load categories", message: err });
      }
    };
    
    fetchCategories();
    
    return () => {
      active = false;
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Categories Section */}
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold',
          mb: 4
        }}
      >
        Our Course Categories
      </Typography>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {categories.map((category, index) => (
         
           <Category key={index} category={category}/>
               
         
        ))}
      </Grid>

      {/* Reviews Section */}
      <Box sx={{ mt: 10, mb: 5 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 'bold',
            mb: 4
          }}
        >
          What Our Students Say
        </Typography>

        <Grid container spacing={4}>
          {reviews.map((review, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <Avatar
                      src={review.avatar}
                      sx={{ width: 56, height: 56, marginRight: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" component="div">
                        {review.name}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {review.course}
                      </Typography>
                    </Box>
                  </Box>

                  <Rating
                    value={review.rating}
                    precision={0.5}
                    readOnly
                    sx={{ marginBottom: 2 }}
                  />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontStyle: 'italic',
                      position: 'relative',
                      paddingLeft: 3
                    }}
                  >
                    <FormatQuote
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: -5,
                        color: 'primary.main'
                      }}
                    />
                    {review.comment}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;