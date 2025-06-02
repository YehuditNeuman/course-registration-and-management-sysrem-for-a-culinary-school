import { Container, Typography, Box } from "@mui/material";

import BackgroundImage from "../BackgroundImage";
import OrDivider from "./OrDivider";

const AuthFormWrapper = ({ title, children, googleLoginComponent }) => (
  
  <Box
    sx={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
      
    <BackgroundImage
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
     
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: 'rgba(245, 245, 245, 0.9)',
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        position: 'relative',
        zIndex: 1
      }}
    >
      <Typography variant="h4" color="textPrimary" sx={{ marginBottom: 3, textAlign: 'center' }}>
        {title}
      </Typography>
      {children}


      {googleLoginComponent && (
        <>
          <OrDivider />
          
            {googleLoginComponent}
          
        </>
      )}
    </Container>
  </Box>
);

export default AuthFormWrapper;
