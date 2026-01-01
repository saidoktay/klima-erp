import {
  Autocomplete,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Adress } from "../components/Adress";

type AddTodoFormData = {
  jobType: string;
  customerName: string;
  phone: string;
  address: {
    city: string;
    district: string;
    quarter: string;
    detail: string;
  };
  process: string;
  price: string;
};

type AddTodoProps = {
  onClose: () => void;
  onSave: (data: AddTodoFormData) => void;
};

export const AddTodo = ({ onClose, onSave }: AddTodoProps) => {
  const oldValues = ["Montaj", "Arıza", "Bakım"];
  const [jobType, setJobType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState({
    city: "",
    district: "",
    quarter: "",
    detail: "",
  });

  const [process, setProcess] = useState("");
  const [price, setPrice] = useState("");

  const handleSave = () => {
    const formData = {
      jobType,
      customerName,
      phone,
      address,
      process,
      price,
    };
    onSave(formData);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "0px",
        left: "240px",
        right: "0px",
        bottom: "0px",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
      }}
    >
      <Paper
        sx={{
          width: "800px",
          padding: "20px",
          zIndex: "1100",
          borderRadius: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "5px",
          }}
        >
          <Typography variant="h4">{"İş Kayıt"}</Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "5px",
          }}
        >
          <Autocomplete
            freeSolo
            options={oldValues}
            value={jobType}
            onInputChange={(_, newInputValue) => {
              setJobType(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth label={"İş Türü:"} />
            )}
          />
          <TextField
            sx={{
              "& .MuiInputBase-inputMultiline": {
                lineHeight: "1.5",
              },
            }}
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            label={"Müşteri Adı:"}
            multiline
            fullWidth
            minRows={1}
          />
          <TextField
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label="Tel No:"
          />
        </Box>
        <Box sx={{ mt: 1, mb: 1 }}>
          <Typography variant="h5">Adres</Typography>
        </Box>

        <Box>
          <Adress
            onChange={(addr) => {
              setAddress(addr);
            }}
          />
        </Box>
        <Box sx={{ padding: "5px", display: "flex", justifyContent: "center" }}>
          <Typography variant="h5">{"İşlem/Fiyat"}</Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gap: "5px",
          }}
        >
          <TextField
            label={"Yapılacak İşlem"}
            value={process}
            onChange={(e) => setProcess(e.target.value)}
            multiline
            minRows={1}
            fullWidth
            placeholder={"Cihaz montajı yapılıp eski cihaz sökülecek"}
          />
          <TextField
            label={"Fiyat (₺)"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            fullWidth
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 3,
          }}
        >
          <Button variant="outlined" color="inherit" onClick={onClose}>
            {"iptal"}
          </Button>

          <Button variant="contained" onClick={handleSave}>
            Kaydet
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
