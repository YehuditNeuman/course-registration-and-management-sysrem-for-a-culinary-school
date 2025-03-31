import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';



const ConfirmCheckOut = ({ openCheckoutDialog, setOpenCheckoutDialog }) => {

    const sumCourses = useSelector(state => state.cart.sumCourses);
    const finalPrice = useSelector(state => state.cart.finalPrice);
    let navig = useNavigate()

    const handleCloseCheckout = () => {
        setOpenCheckoutDialog(false);
    };

    const handleConfirmCheckout = () => {
        navig("/CheckOut")
    };

    return (
        <Dialog
            open={openCheckoutDialog}
            onClose={handleCloseCheckout}
            aria-labelledby="checkout-dialog-title"
        >
            <DialogTitle id="checkout-dialog-title">
                Confirm Registration
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    Are you sure you want to complete this Registration?
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Registration Summary:
                    <br />
                    Total amount of courses: {sumCourses}
                    <br />
                    Total Price: ${finalPrice}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseCheckout} color="primary"
                    sx={{ color: "#DC143C" }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirmCheckout}
                    color="primary"
                    variant="contained"
                    sx={{ color: "white", background: "#DC143C" }}
                >
                    Confirm Registration
                </Button>
            </DialogActions>
        </Dialog>);
}

export default ConfirmCheckOut;