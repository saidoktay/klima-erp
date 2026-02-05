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
} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";

type StockForm = {
  mode: "add" | "remove";
  mark: string;
  model: string;
  type: string;
  stock: number;
  minStock?: number;
};

type AddStockProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: StockForm) => void;
};

const AddStock = ({ open, onClose, onSubmit }: AddStockProps) => {
  const stocks = useSelector((state: RootState) => state.stock);

  const [form, setForm] = useState<StockForm>({
    mode: "add",
    mark: "",
    model: "",
    type: "",
    stock: 0,
    minStock: undefined,
  });

  useEffect(() => {
    if (open) {
      setForm({
        mode: "add",
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

  const handleChange =
    (field: keyof StockForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "stock" || field === "minStock"
          ? Number(e.target.value)
          : e.target.value;

      setForm((prev) => ({ ...prev, [field]: value }));
    };
  const handleSubmit = () => {
    if (!form.mark || !form.model || !form.type || form.stock <= 0) {
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
      <DialogTitle sx={{display:"flex",justifyContent:"center"}}>Ürün Ekle / Çıkar</DialogTitle>
      <TextField
          select
          label="İşlem"
          value={form.mode}
          onChange={(e) =>
            setForm((p) => ({ ...p, mode: e.target.value as "add" | "remove" }))
          }
          fullWidth
          SelectProps={{ native: true }}
          sx={{padding:"2px"}}
        >
          <option value="add">Ekle</option>
          <option value="remove">Çıkar</option>
        </TextField>
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
