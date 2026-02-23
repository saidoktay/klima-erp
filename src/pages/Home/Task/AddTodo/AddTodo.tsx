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
import { Adress } from "./Adress/Adress";
import { useDispatch } from "react-redux";
import { addTask } from "../../../../store/tasksSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { addOption } from "../../../../store/taskOptionsSlice";
import StockDrop from "./StockDrop/StockDrop";
import type { StockDropItem } from "../../../../types/task";
import { addItem } from "../../../../store/stockSlice";

const filter = createFilterOptions<string>();

const AddTodo = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [form, setForm] = useState({
    taskType: "",
    customerName: "",
    customerNumber: "",
    address: {
      city: "",
      district: "",
      quarter: "",
      detail: "",
    },
    work: "",
    price: "",
    stockDrops: [] as StockDropItem[],
  });
  const [stockDialogOpen, setStockDialogOpen] = useState(false);

  const options = useSelector((state: RootState) => state.taskOptions);
  const stocks = useSelector((state: RootState) => state.stock);

  const updateField =
    (
      field: "taskType" | "customerName" | "customerNumber" | "work" | "price",
    ) =>
    (value: string) => {
      setForm((p) => ({ ...p, [field]: value }));
    };

  const updateAddress = (address: typeof form.address) => {
    setForm((p) => ({ ...p, address }));
  };
  const errors = {
    taskType: form.taskType.trim() === "",
    customerName: form.customerName.trim() === "",
    customerNumber: form.customerNumber.trim() === "",
    price: form.price.trim() === "",
  };
  const dispatch = useDispatch();
  const handleAddStockDrop = (item: StockDropItem) => {
    setForm((p) => ({ ...p, stockDrops: [...p.stockDrops, item] }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      errors.taskType ||
      errors.customerName ||
      errors.customerNumber ||
      errors.price
    ) {
      return;
    }
    dispatch(addOption({ key: "taskTypes", value: form.taskType }));
    dispatch(addOption({ key: "customerNames", value: form.customerName }));
    dispatch(addOption({ key: "customerNumbers", value: form.customerNumber }));
    dispatch(addOption({ key: "works", value: form.work }));
    dispatch(addOption({ key: "prices", value: form.price }));

    dispatch(
      addTask({
        taskType: form.taskType,
        customerName: form.customerName,
        customerNumber: form.customerNumber,
        address: form.address,
        work: form.work,
        price: form.price,
        status: "todo",
        stockDrops: form.stockDrops,
      }),
    );

    
    form.stockDrops.forEach((drop) => {
      const stock = stocks.find((s) => s.id === drop.stockId);
      if (!stock) return;

      dispatch(
        addItem({
          type: stock.type,
          mark: stock.mark,
          model: stock.model,
          stock: -drop.qty,
        }),
      );
    });

    setForm({
      taskType: "",
      customerName: "",
      customerNumber: "",
      address: { city: "", district: "", quarter: "", detail: "" },
      work: "",
      price: "",
      stockDrops: [],
    });
    onSuccess?.();
  };

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
              options={options.taskTypes}
              filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                return filtered.slice(0, 3);
              }}
              value={form.taskType}
              onChange={(_, v) => updateField("taskType")(v ?? "")}
              onInputChange={(_, v) => updateField("taskType")(v)}
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
              options={options.customerNames}
              filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                return filtered.slice(0, 3);
              }}
              value={form.customerName}
              onChange={(_, v) => updateField("customerName")(v ?? "")}
              onInputChange={(_, v) => updateField("customerName")(v)}
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
              options={options.customerNumbers}
              filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                return filtered.slice(0, 3);
              }}
              value={form.customerNumber}
              onChange={(_, v) => updateField("customerNumber")(v ?? "")}
              onInputChange={(_, v) => updateField("customerNumber")(v)}
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
          <Adress address={form.address} onChange={updateAddress} />
        </Box>
        <Box sx={{ padding: "5px", display: "flex", justifyContent: "center" }}>
          <Typography variant="h5">{"İşlem/Fiyat"}</Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr 1fr",
            gap: "5px",
          }}
        >
          <Autocomplete
            freeSolo
            options={options.works}
            filterOptions={(opts, params) => {
              const filtered = filter(opts, params);
              return filtered.slice(0, 2);
            }}
            value={form.work}
            onChange={(_, v) => updateField("work")(v ?? "")}
            onInputChange={(_, v) => updateField("work")(v)}
            renderInput={(params) => (
              <TextField {...params} label="İş Tanımı" />
            )}
          />
          <Button
            type="button"
            variant="outlined"
            fullWidth
            sx={{ height: 56 }}
            onClick={() => setStockDialogOpen(true)}
          >
            Stok Düş
          </Button>
          <FormControl fullWidth error={errors.price}>
            <Autocomplete
              freeSolo
              options={options.prices}
              filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                return filtered.slice(0, 3);
              }}
              value={form.price}
              onChange={(_, v) => updateField("price")(v ?? "")}
              onInputChange={(_, v) => updateField("price")(v)}
              renderInput={(params) => (
                <TextField type="number" {...params} label="Fiyat (₺)" />
              )}
            />
            {errors.price ? (
              <FormHelperText>Zorunlu alan</FormHelperText>
            ) : null}
          </FormControl>
        </Box>
        <StockDrop
          open={stockDialogOpen}
          onClose={() => setStockDialogOpen(false)}
          onStockDrop={handleAddStockDrop}
        />

        <Button type="submit" variant="contained">
          Kaydet
        </Button>
      </Stack>
    </Box>
  );
};

export default AddTodo;
