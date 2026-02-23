import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import type { StockDropItem } from "../../../../../types/task";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../store/store";
import { useState } from "react";

type StockDropProps = {
  open: boolean;
  onClose: () => void;
  onStockDrop: (item: StockDropItem) => void;
};

const StockDrop = ({ open, onClose, onStockDrop }: StockDropProps) => {
  const stocks = useSelector((state: RootState) => state.stock);

  const [type, setType] = useState("");
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [qty, setQty] = useState(0);

  const typeOptions = Array.from(new Set(stocks.map((s) => s.type)));

  const markOptions = Array.from(
    new Set(stocks.filter((s) => s.type === type).map((s) => s.mark)),
  );

  const modelOptions = Array.from(
    new Set(
      stocks
        .filter((s) => s.type === type && s.mark === mark)
        .map((s) => s.model),
    ),
  );
  const onAddStockDrop = () => {
    if (!type || !mark || !model || qty <= 0) return;

    const stockItem = stocks.find(
      (s) => s.type === type && s.mark === mark && s.model === model,
    );
    if (!stockItem) return;

    onStockDrop({
      stockId: stockItem.id,
      type: stockItem.type,
      mark: stockItem.mark,
      model: stockItem.model,
      qty,
    });

    setType("");
    setMark("");
    setModel("");
    setQty(0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Stok Düşme</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
          <Autocomplete
            freeSolo
            options={typeOptions}
            value={type}
            onInputChange={(_, v) => {
              setType(v);
              setMark("");
              setModel("");
            }}
            renderInput={(params) => (
              <TextField {...params} label="Tur" fullWidth />
            )}
          />

          <Autocomplete
            freeSolo
            options={markOptions}
            value={mark}
            onInputChange={(_, v) => {
              setMark(v);
              setModel("");
            }}
            renderInput={(params) => (
              <TextField {...params} label="Marka" fullWidth />
            )}
            disabled={!type}
          />

          <Autocomplete
            freeSolo
            options={modelOptions}
            value={model}
            onInputChange={(_, v) => setModel(v)}
            renderInput={(params) => (
              <TextField {...params} label="Model" fullWidth />
            )}
            disabled={!type || !mark}
          />

          <TextField
            label="Adet"
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value || 0))}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button variant="contained" onClick={onAddStockDrop}>
          Düşür
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StockDrop;
