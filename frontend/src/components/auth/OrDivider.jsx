import {  Divider, Typography, Box } from "@mui/material";

const OrDivider = () => (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', my: 2 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary', fontWeight: 500 }}>
                OR
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
        </Box>
    );
 export default OrDivider   