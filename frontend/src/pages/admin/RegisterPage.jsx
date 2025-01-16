import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomAlert from "../../components/CustomAlert.jsx";
import { validateCredentialsNotEmpty } from "../../util/validator.js";
import LockIcon from "@mui/icons-material/Lock";
import { useRandomColorGradient } from "../../hooks/auth/useRandomColorGradient.jsx";
import { useRegister } from "../../hooks/auth/useRegister.jsx";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [formError, setFormError] = useState({
    username: "",
    password: "",
    phoneNumber: "",
  });
  const { register, loading, error } = useRegister();
  const { color, direction } = useRandomColorGradient();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputErrors = validateCredentialsNotEmpty(username, password);
    setFormError(inputErrors);

    if (inputErrors.username || inputErrors.password) {
      return;
    }

    if (!isAdmin) {
      if (!/^\d+$/.test(phoneNumber)) {
        setFormError({
          ...formError,
          phoneNumber: "Phone number must be a number",
        });
        return;
      }
    }

    if (isAdmin) {
      await register(username, password, "admin");
    } else {
      await register(username, password, "user", phoneNumber);
    }
  };

  const handleChange = (setter) => {
    return (e) => {
      setFormError(false);
      setter(e.target.value);
    };
  };

  return (
    <>
      {error && <CustomAlert message={error} />}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                autoFocus
                required
                fullWidth
                margin="normal"
                name="username"
                label="Username"
                id="username"
                autoComplete="username"
                value={username}
                onChange={handleChange(setUsername)}
              />
              <Typography className="error-message" color="error">
                {formError.username}
              </Typography>
              <TextField
                required
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                id="password"
                type="password"
                autoComplete="password"
                value={password}
                onChange={handleChange(setPassword)}
              />
              <Typography className="error-message" color="error">
                {formError.password}
              </Typography>
              {!isAdmin && (
                <>
                  <TextField
                    required
                    fullWidth
                    margin="normal"
                    name="phoneNumber"
                    label="Phone Number"
                    id="phoneNumber"
                    type="text"
                    autoComplete="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange(setPhoneNumber)}
                  />
                  <Typography className="error-message" color="error">
                    {formError.phoneNumber}
                  </Typography>
                </>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    onChange={() => setIsAdmin(!isAdmin)}
                  />
                }
                label="Register new admin"
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                  <Typography variant="body2">
                    To sign in instead click the login button in the navbar
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `linear-gradient(${direction}, #103783, ${color})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </>
  );
};

export default Register;
