import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Box, Typography, IconButton, Grid, Button, Chip, Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

import { getCourseById } from "../api/courseService";
import { addToCart } from "../features/CartSlice";
import SmallCart from "./SmallCart";
import ShowImage from "./ShowImage";


const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  let navigate = useNavigate();
  let currentUser = useSelector(state => state.user.currentUser);
  let disp = useDispatch();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await getCourseById(courseId);
        setCourse(res.data);
      } 
      catch (err) {
        setError("cant loading course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) return <Typography variant="h6">...Loading</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <>
      {showCart && (
        <div style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2000
        }}>
          <SmallCart
            open={true}
            onClose={() => setShowCart(false)}
          />
        </div>
      )}

      <Modal
        open={true}
        onClose={() => navigate(-1)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
      >
        <Box sx={modalStyle}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: 'black',
              zIndex: 10
            }}
          >
            <CloseIcon sx={{ color: 'black' }} />
          </IconButton>

          {course ? (
            <Grid container spacing={4}>
            
              <Grid item xs={12} md={5}>

                <ShowImage course={course} />
              </Grid>

         
              <Grid item xs={12} md={7}>
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: 2,
                    fontWeight: 'bold',
                    color: 'black'
                  }}
                >
                  {course.name}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    marginBottom: 3,
                    color: 'black'
                  }}
                >
                  {course.description}
                </Typography>

                <Divider sx={{ marginY: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'black' }}>
                      <LocalOfferIcon sx={{ color: 'black' }} />
                      Price: {course.price} $
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'black' }}>
                      <PersonIcon sx={{ color: 'black' }} />
                      Teachers: {course.teachersNames?.join(", ") || 'לא צוין'}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'black' }}>
                      <CalendarTodayIcon sx={{ color: 'black' }} />
                      Date of open: {course.dateOpen ? new Date(course.dateOpen).toLocaleDateString("he-IL") : 'לא צוין'}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ color: 'black' }}>
                      Categories:
                      {course.categories?.map((category, index) => (
                        <Chip
                          key={index}
                          label={category}
                          variant="outlined"
                          sx={{
                            margin: 0.5,
                            borderColor: 'black',
                            '& .MuiChip-label': {
                              color: 'black'
                            }
                          }}
                        />
                      ))}
                    </Typography>
                  </Grid>
                </Grid>

                {currentUser?.role !== "ADMIN" && (
                  <Button
                    variant="contained"
                    color="black"
                    fullWidth
                    sx={{
                      marginTop: 3,
                      padding: 1.5,
                      borderRadius: 2
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      disp(addToCart(course));
                      setShowCart(true);
                      setTimeout(() => {
                        setShowCart(false);
                      }, 3000);
                    }}
                  >
                    Add To Cart
                  </Button>
                )}
              </Grid>
            </Grid>
          ) : (
            <Typography variant="h6" color="error">course not found</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 1000,
  maxHeight: '90%',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

export default CourseDetails;