import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setCompanyLogo, setCompanyName } from "../../store/settingsSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);

  const [companyName, setCompanyNameInput] = useState(settings.companyName);
  const [logo, setLogo] = useState(settings.companyLogo);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;
      setLogo(result);
      dispatch(setCompanyLogo(result));
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    dispatch(setCompanyName(companyName));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Ayarlar
      </Typography>

      <TextField
        label="Firma Adı"
        value={companyName}
        onChange={(e) => setCompanyNameInput(e.target.value)}
        sx={{ mb: 3, display: "block", width: 400 }}
      />

      <Button variant="contained" component="label" sx={{ mb: 3 }}>
        Logo Seç
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
        />
      </Button>

      {logo && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Seçili Logo:</Typography>
          <Box
            component="img"
            src={logo}
            alt="Firma logosu"
            sx={{ width: 140, mt: 1 }}
          />
        </Box>
      )}

      <Button variant="contained" onClick={handleSave}>
        Kaydet
      </Button>
    </Box>
  );
};

export default Settings;
