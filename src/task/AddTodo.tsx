import {
  Box,
  Button,
  Stack,
  TextField,
  Autocomplete,
  FormControl,
  FormHelperText,
  createFilterOptions,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Adress } from "../components/Adress";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";

const taskTypes = ["Bakım", "Montaj", "Servis"];
const customerNames = ["Erol Özdemir", "Bim", "Ahmet Çal"];
const customerNumbers = [
  "5325558979",
  "5337886868",
  "5538337373",
  "5557858585",
];
const works = [
  "Cihazların Bakımları yapılcak ve Gaz basılacak",
  "Dış ünite balkona koyulacak",
  "Sensör değiştirilecek",
];
const prices = ["15000", "5000", "8500", "25000", "150000"];
const filter = createFilterOptions<string>();

const AddTodo = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [taskType, setTaskType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [address, setAddress] = useState({
    city: "",
    district: "",
    quarter: "",
    detail: "",
  });
  const [work, setWork] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("İş Türü:", taskType, "Müşteri Adı:", customerName);
    if (
      errors.taskType ||
      errors.customerName ||
      errors.customerNumber ||
      errors.price
    ) {
      return;
    }

    dispatch(
      addTask({
        taskType,
        customerName,
        customerNumber,
        address,
        work,
        price,
        status: "todo",
      })
    );
    setTaskType("");
    setCustomerName("");
    setCustomerNumber("");
    setAddress({ city: "", district: "", quarter: "", detail: "" });
    setWork("");
    setPrice("");
    onSuccess?.();
  };

  const errors = {
    taskType: taskType.trim() === "",
    customerName: customerName.trim() === "",
    customerNumber: customerNumber.trim() === "",
    price: price.trim() === "",
  };
  const dispatch = useDispatch();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, width: "1000px" }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "5px",
          }}
        >
          <FormControl fullWidth error={errors.taskType}>
            <Autocomplete
              freeSolo
              options={taskTypes}
              filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                return filtered.slice(0, 3);
              }}
              value={taskType}
              onChange={(_, v) => setTaskType(v ?? "")}
              onInputChange={(_, v) => setTaskType(v)}
              renderInput={(params) => (
                <TextField {...params} label="İş Türü" />
              )}
            />
            {errors.taskType ? (
              <FormHelperText>Zorunlu alan</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl fullWidth error={errors.customerName}>
            <Autocomplete
              freeSolo
              options={customerNames}
              filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                return filtered.slice(0, 3);
              }}
              value={customerName}
              onChange={(_, v) => setCustomerName(v ?? "")}
              onInputChange={(_, v) => setCustomerName(v)}
              renderInput={(params) => (
                <TextField {...params} label="Müşteri Adı" />
              )}
            />
            {errors.customerName ? (
              <FormHelperText>Zorunlu alan</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl fullWidth error={errors.customerNumber}>
            <Autocomplete
              freeSolo
              options={customerNumbers}
              filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                return filtered.slice(0, 3);
              }}
              value={customerNumber}
              onChange={(_, v) => setCustomerNumber(v ?? "")}
              onInputChange={(_, v) => setCustomerNumber(v)}
              renderInput={(params) => (
                <TextField type="number" {...params} label="Tel No" />
              )}
            />
            {errors.customerNumber ? (
              <FormHelperText>Zorunlu alan</FormHelperText>
            ) : null}
          </FormControl>
        </Box>
        <Box sx={{ mt: 1, mb: 1 }}>
          <Typography variant="h5">Adres</Typography>
        </Box>
        <Box>
          <Adress address={address} onChange={setAddress} />
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
          <Autocomplete
            freeSolo
            options={works}
            filterOptions={(opts, params) => {
              const filtered = filter(opts, params);
              return filtered.slice(0, 2);
            }}
            value={work}
            onChange={(_, v) => setWork(v ?? "")}
            onInputChange={(_, v) => setWork(v)}
            renderInput={(params) => (
              <TextField {...params} label="İş Tanımı" />
            )}
          />
          <FormControl fullWidth error={errors.price}>
            <Autocomplete
              freeSolo
              options={prices}
              filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                return filtered.slice(0, 3);
              }}
              value={price}
              onChange={(_, v) => setPrice(v ?? "")}
              onInputChange={(_, v) => setPrice(v)}
              renderInput={(params) => (
                <TextField type="number" {...params} label="Fiyat (₺)" />
              )}
            />
            {errors.price ? (
              <FormHelperText>Zorunlu alan</FormHelperText>
            ) : null}
          </FormControl>
        </Box>
        <Button type="submit" variant="contained">
          Kaydet
        </Button>
      </Stack>
    </Box>
  );
};

export default AddTodo;
