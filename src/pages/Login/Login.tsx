import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (user === "nuri" && password === "12345") {
      navigate("/Home");
    } else {
      alert("Email veya Şifre yanlış!");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 350,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" textAlign="center">
          {"Giriş Yap"}
        </Typography>

        <TextField
          label={"E-mail"}
          variant="outlined"
          fullWidth
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <TextField
          label="Şifre"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" fullWidth onClick={handleLogin}>
          {"Giriş Yap"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
