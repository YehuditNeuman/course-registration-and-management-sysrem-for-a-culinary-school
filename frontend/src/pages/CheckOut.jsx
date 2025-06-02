import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Grid, Paper, Box, Snackbar, Alert, Tabs, Tab, TextField, CircularProgress } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaypalIcon from '@mui/icons-material/Payment';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { userOut } from "../features/UserSlice.js";
import { emptyCart } from "../features/CartSlice.js";
import { addRegistrationToServer } from "../api/registrationService";

const theme = createTheme({
    palette: {
        primary: {
            main: "#d32f2f", // Red
        },
        secondary: {
            main: "#ff5252", // Light red
        },
        error: {
            main: "#b71c1c", // Dark red
        },
        warning: {
            main: "#ff1744", // Bright red
        },
        info: {
            main: "#d50000", // Deep red
        },
        success: {
            main: "#e57373", // Soft red
        },
    },
});

const CheckOut = () => {
    const CoursesInCart = useSelector(state => state.cart.arr);
    const user = useSelector(state => state.user.currentUser);
    const finalPrice = useSelector(state => state.cart.finalPrice);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState(0);
    const [phone, setPhone] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [isLoading, setIsLoading] = useState(false);

    // Credit Card Payment States
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVV, setCardCVV] = useState("");

    // Validation states
    const [phoneError, setPhoneError] = useState(false);
    const [cardErrors, setCardErrors] = useState({
        name: false,
        number: false,
        expiry: false,
        cvv: false
    });

    useEffect(() => {

        if (CoursesInCart.length === 0)
            navigate("/");
    }, [user, CoursesInCart, navigate]);

    const handlePaymentMethodChange = (event, newValue) => {
        setPaymentMethod(newValue);
    };

    const validatePhone = (phoneNumber) => {
        const phoneRegex = /^0[5-9]\d{8}$/;
        return phoneRegex.test(phoneNumber);
    };

    const validateCreditCard = () => {
        const errors = {
            name: cardName.trim() === "",
            number: cardNumber.replace(/\s/g, '').length !== 16,
            expiry: !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry),
            cvv: cardCVV.length !== 3
        };

        setCardErrors(errors);
        return !Object.values(errors).some(error => error);
    };

    const processRegistration = async (paymentDetails = {}) => {
        // Validate phone number before processing
        if (!validatePhone(phone)) {
            setPhoneError(true);
            setSnackbarMessage("Please enter a valid phone number");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        // Validate credit card if credit card method
        if (paymentMethod === 0 && !validateCreditCard()) {
            setSnackbarMessage("Please fill in all credit card details correctly");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        setIsLoading(true);

        try {
            // Format courses for registration
            let formattedCourses = CoursesInCart.map(course => ({
                courseId: course._id,
                dateOpen: course.dateOpen,
                amount: course.qty
            }));

            // Send registration to server
            let res = await addRegistrationToServer({
                studentId: user._id,
                courses: formattedCourses,
                isSuccessfullyCompleted: true,
                finalPrice: finalPrice,
                phone: phone,
                paymentDetails: paymentDetails
            }, user.token);

            // Success handling
            setSnackbarMessage("Order saved successfully");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);

            // Clear cart and logout after 2 seconds
            setTimeout(() => {
                dispatch(userOut());
                dispatch(emptyCart());
                navigate("/CourseList");
            }, 2000);
        }
        catch (err) {
            // Error handling
            setSnackbarMessage(err.response?.data?.message || "Error saving the order");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            console.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreditCardPayment = () => {
        processRegistration({
            paymentMethod: 'CreditCard',
            cardDetails: {
                cardName,
                cardNumberMasked: cardNumber.slice(-4).padStart(cardNumber.length, '*')
            }
        });
    };

    const renderCreditCardPayment = () => (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Credit Card Payment
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Cardholder Name"
                        variant="outlined"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        error={cardErrors.name}
                        helperText={cardErrors.name ? "Please enter full name" : ""}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Card Number"
                        variant="outlined"
                        value={cardNumber}
                        onChange={(e) => {
                            // Allow only numbers
                            const value = e.target.value.replace(/\D/g, '');
                            setCardNumber(value);
                        }}
                        inputProps={{
                            maxLength: 16,
                            inputMode: 'numeric'
                        }}
                        error={cardErrors.number}
                        helperText={cardErrors.number ? "Credit card number must be 16 digits long" : ""}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Expiry (MM/YY)"
                        variant="outlined"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/25"
                        error={cardErrors.expiry}
                        helperText={cardErrors.expiry ? "Invalid expiry format" : ""}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="CVV"
                        variant="outlined"
                        type="password"
                        value={cardCVV}
                        onChange={(e) => {
                            // Allow only numbers
                            const value = e.target.value.replace(/\D/g, '');
                            setCardCVV(value);
                        }}
                        inputProps={{
                            maxLength: 3,
                            inputMode: 'numeric'
                        }}
                        error={cardErrors.cvv}
                        helperText={cardErrors.cvv ? "CVV must be 3 digits" : ""}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            setPhoneError(false);
                        }}
                        error={phoneError}
                        helperText={phoneError ? "Please enter a valid phone number" : ""}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleCreditCardPayment}
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} /> : null}
                    >
                        {isLoading ? "Processing payment..." : `Pay ₪${finalPrice}`}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );

    const renderPayPalPayment = () => (
        <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                PayPal Payment
            </Typography>

            <TextField
                fullWidth
                label="Phone Number"
                value={phone}
                onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError(false);
                }}
                error={phoneError}
                helperText={phoneError ? "Please enter a valid phone number" : ""}
                sx={{ mb: 2 }}
            />

            <Button
                variant="contained"
                color="primary"
                startIcon={<PaypalIcon />}
                fullWidth
                onClick={() => {
                    window.open('https://www.paypal.com/signin', '_blank');
                }}
                sx={{ mb: 2 }}
            >
                Log in to PayPal
            </Button>

            <PayPalScriptProvider
                options={{
                    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                    currency: "ILS"
                }}
            >
                <PayPalButtons
                    disabled={isLoading || phone === ""}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: finalPrice.toString()
                                }
                            }]
                        });
                    }}
                    onApprove={(data, actions) => {
                        setIsLoading(true);
                        return actions.order.capture().then((details) => {
                            // Process registration with PayPal payment details
                            processRegistration({
                                paymentMethod: 'PayPal',
                                transactionId: details.id,
                                status: details.status
                            });
                        });
                    }}
                    onError={(err) => {
                        console.error("PayPal Checkout Error", err);
                        setSnackbarMessage("PayPal payment error");
                        setSnackbarSeverity("error");
                        setOpenSnackbar(true);
                    }}
                />
            </PayPalScriptProvider>
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Checkout Screen
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Total to Pay: ₪{finalPrice}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Courses in Cart: {CoursesInCart.length}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Tabs
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                        centered
                        sx={{ mb: 2 }}
                    >
                        <Tab
                            icon={<CreditCardIcon />}
                            label="Credit Card"
                        />
                        <Tab
                            icon={<PaypalIcon />}
                            label="PayPal"
                        />
                    </Tabs>

                    {paymentMethod === 0 && renderCreditCardPayment()}
                    {paymentMethod === 1 && renderPayPalPayment()}
                </Paper>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={() => setOpenSnackbar(false)}
                        severity={snackbarSeverity}
                        sx={{ width: '100%' }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}

export default CheckOut;


