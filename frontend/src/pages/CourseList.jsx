import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import { Container, Grid, Card, CardContent, Button, Typography, Pagination, Modal, Box } from "@mui/material";

import EditCourse from "./EditCourse";
import { addToCart } from "../features/CartSlice";
import { deleteCuorse, getAllCourses, numPagesFromServer } from "../api/courseService";
import Course from '../components/Course';
import SmallCart from "../components/SmallCart";


const CourseList = () => {
     let [arr, setArr] = useState([]);
     let [numPages, setNumPages] = useState(1);
     let [currentPage, setCurrentPage] = useState(1);
     let limit = 9;
     let currentUser = useSelector(state => state.user.currentUser);
     let disp = useDispatch();
     const [editingCourse, setEditingCourse] = useState(null);
     let [showCart, setShowCart] = useState(false);
     let location = useLocation();
     let { category } = useParams()

     useEffect(() => {
          numPagesFromServer(limit)
               .then(res => {
                    setNumPages(res.data);
               })
               .catch(err => {
                    console.log({ title: "cant get num pages", message: err });
               });
     }, []);

     useEffect(() => {
          let active = true;
          getAllCourses(currentPage, limit, category)
               .then(res => {
                    if (active) {
                         setArr(res.data);
                    }
               })
               .catch(err => {
                    console.log({ title: "cant get courses", message: err });
               });
          return () => {
               active = false;
          };
     }, [currentPage]);

     useEffect(() => {
          if (location.state?.newCourse) {
               setArr(prevArr => [location.state.newCourse, ...prevArr]);
               window.history.replaceState({}, "");
          }
     }, [location.state]);

     const deletecuorse = async (courseId) => {
          try {
               let res = await deleteCuorse(courseId, currentUser.token);
               setArr(prevArr => prevArr.filter(item => item._id !== res.data._id));
               let index = arr.findIndex(item => item._id !== res.data._id);
               if (index === -1) {
                    setNumPages(prev => prev - 1);
                    setCurrentPage(prev => Math.max(prev - 1, 1));
               }
          } catch (err) {
               console.log({ title: "cannot delete course", message: err.response?.data?.message });
          }
     };

     const handleEdit = (updatedCourse) => {
          setArr(prevArr => prevArr.map(course => course._id === updatedCourse._id ? updatedCourse : course));
     };

     return (
          <Container>
               <Modal
                    open={!!editingCourse}
                    onClose={() => setEditingCourse(null)}
                    aria-labelledby="edit-course-modal"
                    aria-describedby="edit-course-form"
               >
                    <Box sx={{
                         position: 'absolute',
                         top: '50%',
                         left: '50%',
                         transform: 'translate(-50%, -50%)',
                         width: '100%',
                         maxWidth: 600,
                         bgcolor: 'background.paper',
                         boxShadow: 24,
                         p: 4,
                         borderRadius: 2
                    }}>
                         <EditCourse
                              course={editingCourse}
                              onClose={() => setEditingCourse(null)}
                              onEdit={handleEdit}
                         />
                    </Box>
               </Modal>

               <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                    {`Our ${category} Courses`}
               </Typography>
               <Grid container spacing={4}>
                    {arr.map(item => (
                         <Grid item xs={12} sm={6} md={4} key={item._id}>
                              <Card>
                                   <Link to={`courseDetails/${item._id}`}>
                                        <Course course={item} />
                                   </Link>
                                   <CardContent>
                                        {(!currentUser || currentUser.role === "USER") ? (
                                             <Button
                                                  sx={{
                                                       background: "black",
                                                       '&:hover': {
                                                            backgroundColor: '#333333'
                                                       }
                                                  }}
                                                  fullWidth
                                                  variant="contained"
                                                  onClick={(e) => {
                                                       e.stopPropagation();
                                                       disp(addToCart(item));
                                                       setShowCart(true);
                                                       setTimeout(() => {
                                                            setShowCart(false);
                                                       }, 3000);
                                                  }}
                                             >
                                                  Add to Cart
                                             </Button>
                                        ) : (
                                             <div>
                                                  <Button
                                                       fullWidth
                                                       variant="contained"
                                                       sx={{
                                                            background: "black",
                                                            color: "white",
                                                            marginBottom: "10px",
                                                            '&:hover': {
                                                                 backgroundColor: '#333333'
                                                            }
                                                       }}
                                                       onClick={(e) => { e.stopPropagation(); setEditingCourse(item); }}
                                                  >
                                                       Edit
                                                  </Button>
                                                  <Button
                                                       fullWidth
                                                       variant="contained"
                                                       sx={{
                                                            background: "#DC143C", // Dark red for delete button
                                                            color: "white",
                                                            '&:hover': {
                                                                 backgroundColor: '#8B0000' // Darker red on hover
                                                            }
                                                       }}
                                                       onClick={(e) => { e.stopPropagation(); deletecuorse(item._id); }}
                                                  >
                                                       Delete
                                                  </Button>
                                             </div>
                                        )}
                                   </CardContent>
                              </Card>
                         </Grid>
                    ))}
               </Grid>

               <SmallCart open={showCart} onClose={() => setShowCart(false)} />

               <Pagination
                    count={numPages}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                    style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
               />
               <Outlet />
          </Container>
     );
};

export default CourseList;