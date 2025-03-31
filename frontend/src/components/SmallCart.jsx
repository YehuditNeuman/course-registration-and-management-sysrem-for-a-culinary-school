
import React from "react";
import { useSelector } from "react-redux";
import { Drawer, List, ListItem, Typography, Box, Button, Paper, IconButton } from "@mui/material";
import { useState } from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CloseIcon from "@mui/icons-material/Close";

import ConfirmCheckOut from "./ConfirmCheckOut";
import CourseInCart from "./CourseInCart";


const SmallCart = ({ open, onClose }) => {
    const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
    const coursercart = useSelector((state) => state.cart.arr) || [];
    const sumCourses = useSelector((state) => state.cart.sumCourses);
    const finalPrice = useSelector((state) => state.cart.finalPrice);
    const handleOpenCheckout = () => {
        setOpenCheckoutDialog(true);
    };
    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 400,
                    backgroundColor: '#f5f5f5',
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                    boxShadow: '-4px 0 15px rgba(0,0,0,0.1)'
                }
            }}
        >
            <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: '#000000',
                    color: 'white'
                }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShoppingCartCheckoutIcon /> Shopping Cart
                    </Typography>
                    <IconButton onClick={onClose} sx={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <List sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    p: 2
                }}>
                    {coursercart.length === 0 ? (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            textAlign: 'center',
                            color: 'gray'
                        }}>
                            <Typography variant="h6" gutterBottom>
                                Your cart is empty
                            </Typography>
                            <Typography variant="body2">
                                Looks like you haven't added any courses yet
                            </Typography>
                        </Box>
                    ) : (
                        coursercart.map((item) => (
                            <ListItem
                                key={item._id}
                                disableGutters
                                sx={{
                                    mb: 2,
                                    borderRadius: 2,
                                    overflow: 'hidden'
                                }}
                            >
                                <Paper
                                    elevation={2}
                                    sx={{
                                        width: '100%',
                                        p: 2,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <CourseInCart course={item} />
                                </Paper>
                            </ListItem>
                        ))
                    )}
                </List>
                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                        p: 1,
                        backgroundColor: '#f0f0f0',
                        borderRadius: 2
                    }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Total Items
                        </Typography>
                        <Typography
                            variant="h6"
                            color="primary"
                            sx={{
                                fontWeight: 'bold',
                                backgroundColor: '#000000',
                                color: 'white',
                                px: 2,
                                py: 0.5,
                                borderRadius: 2
                            }}
                        >
                            {sumCourses}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1,
                        backgroundColor: '#e6e6e6',
                        borderRadius: 2
                    }}>
                        <Typography variant="h6" fontWeight="bold">
                            Total Price
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: '#000000',
                                backgroundColor: 'white',
                                px: 2,
                                py: 0.5,
                                borderRadius: 2,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            ${finalPrice}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        fullWidth
                        disabled={coursercart.length === 0}
                        onClick={handleOpenCheckout}
                        sx={{
                            borderRadius: 8,
                            py: 1.5,
                            mt: 2,
                            backgroundColor: '#000000',
                            '&:hover': {
                                backgroundColor: '#333333'
                            }
                        }}
                    >
                        Proceed to Checkout

                    </Button>
                    <ConfirmCheckOut openCheckoutDialog={openCheckoutDialog} setOpenCheckoutDialog={setOpenCheckoutDialog} />
                </Paper>
            </Box>
        </Drawer>
    );
};

export default SmallCart;
