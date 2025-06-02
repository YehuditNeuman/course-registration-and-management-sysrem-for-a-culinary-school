import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AuthTextField = ({ label, type = "text", register, name, rules, error, helperText, showToggle = false, show, setShow,variant="outlined" }) => (
  <TextField
    label={label}
    variant={variant}
    type={showToggle && !show ? "password" : type}
    fullWidth
    InputLabelProps={{ style: { color: '#333' } }}
    {...register(name, rules)}
    error={!!error}
    helperText={helperText}
    InputProps={{
      endAdornment: showToggle && (
        <InputAdornment position="end">
          <IconButton onClick={() => setShow(!show)} edge="end" sx={{ color: '#333' }}>
            {show ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      )
    }}
    sx={{
      backgroundColor: 'white',
      borderRadius: 1,
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: "#DC143C",
        },
      },
    }}
  />
);

export default AuthTextField;