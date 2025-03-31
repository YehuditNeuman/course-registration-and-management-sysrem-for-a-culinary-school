import { Box, Grid } from '@mui/material';


const BackgroundImage = () => {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet" />

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
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("http://localhost:8080/api/course/image/DALLÂ·E 2025-03-25 14.07.16 - A gourmet French cuisine spread featuring Coq au Vin, Beef Bourguignon, and a fresh baguette. The table is elegantly set with wine glasses, fine cutle.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
          }}
        />

     
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255,255,255,0.1)', // כיסוי בהיר יותר
            zIndex: 2,
          }}
        />

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

          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default BackgroundImage;

