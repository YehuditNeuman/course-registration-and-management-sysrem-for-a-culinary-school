import {
  Box, Typography, Avatar, Grid, Card, CardContent, Rating, Container, Button, Pagination,
  Modal
} from '@mui/material';
import { FormatQuote } from '@mui/icons-material';
import { useState, useEffect } from 'react';


import { getAllCategoriesFromServer } from '../api/courseService';


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
  let [arr, setArr] = useState([]);
  useEffect(() => {
    let active = true;
    const inner = async () => {

      try {
        let res = await getAllCategoriesFromServer()
        console.log(res.data)
        if (active) {
          setArr(res.data);
        }
      }
      catch (err) {
        console.log({ title: "cant get all categories", message: err });
      }
    }
    inner()
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Course List
        </Typography>
        <Grid container spacing={4}>
          {arr.map((item, index) => (

            <Grid item xs={12} sm={6} md={4} key={index}>

              <Card>
                <CardContent>
                  <Typography variant="h6">{item}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '64px'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            height: '60%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            p: 2,
          }}
        >

        </Box>

        <Box
          sx={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            height: '60%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            color: 'white',
            p: 2,
            overflowY: 'auto',
          }}
        >
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{
              maxWidth: '1200px',
              width: '100%',
            }}
          >
            {reviews.map((review, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    borderRadius: 2,
                    boxShadow: 3
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
      </Box>
    </>
  );
};

export default HomePage;