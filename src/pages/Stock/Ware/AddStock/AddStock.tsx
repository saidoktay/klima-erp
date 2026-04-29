import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Autocomplete,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";

type StockForm = {
  mark: string;
  model: string;
  type: string;
  stock: number;
  minStock?: number;
  purchasePrice: number;
  purchaseDate: string;
};

type AddStockProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: StockForm) => void;
};

const AddStock = ({ open, onClose, onSubmit }: AddStockProps) => {
  const stocks = useSelector((state: RootState) => state.stock);
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState<StockForm>({
    purchasePrice: 0,
    purchaseDate: today,
    mark: "",
    model: "",
    type: "",
    stock: 0,
    minStock: undefined,
  });

  useEffect(() => {
    if (open) {
      setForm({
        purchasePrice: 0,
        purchaseDate: today,
        mark: "",
        model: "",
        type: "",
        stock: 0,
        minStock: undefined,
      });
    }
  }, [open]);
  const typeOptions = Array.from(new Set(stocks.map((s) => s.type)));

  const markOptions = Array.from(
    new Set(stocks.filter((s) => s.type === form.type).map((s) => s.mark)),
  );

  const modelOptions = Array.from(
    new Set(
      stocks
        .filter((s) => s.type === form.type && s.mark === form.mark)
        .map((s) => s.model),
    ),
  );
  const duplicateStock = stocks.find(
    (item) =>
      item.type === form.type &&
      item.mark === form.mark &&
      item.model === form.model,
  );

  const handleChange =
    (field: keyof StockForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "stock" || field === "purchasePrice"
          ? Number(e.target.value)
          : e.target.value;

      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = () => {
    if (
      !form.mark ||
      !form.model ||
      !form.type ||
      form.stock <= 0 ||
      form.purchasePrice <= 0 ||
      !form.purchaseDate
    ) {
      return;
    }
    onSubmit(form);
  };

  const handleTypeChange = (_: any, value: string) => {
    setForm((p) => ({ ...p, type: value, mark: "", model: "" }));
  };

  const handleMarkChange = (_: any, value: string) => {
    setForm((p) => ({ ...p, mark: value, model: "" }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        Ürün Ekle
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
          <Autocomplete
            freeSolo
            options={typeOptions}
            value={form.type}
            onInputChange={handleTypeChange}
            renderInput={(params) => (
              <TextField {...params} label="Tür" fullWidth />
            )}
          />
          <Autocomplete
            freeSolo
            options={markOptions}
            value={form.mark}
            onInputChange={handleMarkChange}
            renderInput={(params) => (
              <TextField {...params} label="Marka" fullWidth />
            )}
            disabled={!form.type}
          />

          <Autocomplete
            freeSolo
            options={modelOptions}
            value={form.model}
            onInputChange={(_, value) =>
              setForm((p) => ({ ...p, model: value }))
            }
            renderInput={(params) => (
              <TextField {...params} label="Model" fullWidth />
            )}
            disabled={!form.type || !form.mark}
          />

          <TextField
            label="Adet"
            type="number"
            value={form.stock}
            onChange={handleChange("stock")}
            fullWidth
          />
          <TextField
            label="Alış Fiyatı (TL)"
            type="number"
            value={form.purchasePrice}
            onChange={handleChange("purchasePrice")}
            fullWidth
          />

          <TextField
            label="Alış Tarihi"
            type="date"
            value={form.purchaseDate}
            onChange={handleChange("purchaseDate")}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Minimum Adet"
            type="number"
            value={form.minStock ?? ""}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                minStock:
                  e.target.value === "" ? undefined : Number(e.target.value),
              }))
            }
            fullWidth
          />
          {duplicateStock && (
            <Alert severity="warning">
              Bu ürün zaten listede var. Kaydedersen ayrı bir kayıt olarak
              eklenecek.
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStock;
