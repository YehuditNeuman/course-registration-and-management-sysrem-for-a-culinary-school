import { AppBar, Toolbar, Typography, Button, IconButton, Container, Box, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { userOut } from "../features/UserSlice.js";
import { emptyCart } from "../features/CartSlice.js";


const NavBar = () => {
  const disp = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const cartItemCount = useSelector((state) => state.cart.sumCourses);

  const logOut = () => {
    disp(userOut());
    disp(emptyCart());
  };

  const linkStyles = {
    color: "white",
    '&:hover': {
      color: "#DC143C",
      backgroundColor: "transparent"
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <AppBar position="fixed" sx={{ backgroundColor: "black", width: "100%", height: "64px" }}>
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          <Toolbar sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            position: "relative"
          }}>
            {/* Left Side - Checkout and Cart Icon */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {currentUser && currentUser.role == "USER" && (
                <Button color="inherit" component={Link} to="/checkOut" sx={linkStyles}>
                  Checkout
                </Button>
              )}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {(!currentUser || currentUser.role == "USER") && <IconButton color="inherit" component={Link} to="/cart" sx={linkStyles}>
                  <Badge
                    badgeContent={cartItemCount}
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#DC143C',
                        color: 'white'
                      }
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>}

                <Typography variant="body1" sx={{ color: "white", fontSize: "25px" }}>
                  {currentUser ? `Hello, ${currentUser.userName}` : "Hello, Guest"}
                </Typography>
              </Box>
            </Box>

            <Link to="/">
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: 'white',
                  fontWeight: 'bold',
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '3rem',
                  top: "0%",
                  margin: 0,
                  translateY: "-50%"
                }}
              >
                Kolinarum
              </Typography>
            </Link>

            <Box>
              <Button color="inherit" component={Link} to="/courseList" sx={linkStyles}>
                Our Courses
              </Button>
              {currentUser ? (
                <Button color="inherit" sx={linkStyles} onClick={logOut}>Log Out</Button>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/signup" sx={linkStyles}>
                    Sign Up
                  </Button>
                  <Button color="inherit" component={Link} to="/login" sx={linkStyles}>
                    Log In
                  </Button>
                </>
              )}
              {currentUser && currentUser.role === 'ADMIN' && (
                <Button color="inherit" component={Link} to="/addCourse" sx={linkStyles}>
                  Add Course
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
