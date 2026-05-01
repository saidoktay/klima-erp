import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Autocomplete,
  Alert,
} from "@mui/material";
import type { StockDropItem } from "../../../../../types/task";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../store/store";
import { useEffect, useState } from "react";

type StockDropProps = {
  open: boolean;
  onClose: () => void;
  onStockDrop: (item: StockDropItem) => void;
  selectedDrop?: StockDropItem | null;
};

const StockDrop = ({
  open,
  onClose,
  onStockDrop,
  selectedDrop,
}: StockDropProps) => {
  const stocks = useSelector((state: RootState) => state.stock);

  const [type, setType] = useState("");
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [qty, setQty] = useState(0);
  const [stockError, setStockError] = useState("");

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
  const matchingStocks = stocks.filter(
    (s) => s.type === type && s.mark === mark && s.model === model,
  );
  const selectedStockItem = stocks.find(
    (s) => s.type === type && s.mark === mark && s.model === model,
  );
  const editingQty =
    selectedDrop && selectedDrop.stockId === selectedStockItem?.id
      ? selectedDrop.qty
      : 0;

  const availableStock = (selectedStockItem?.stock ?? 0) + editingQty;

  const hasDuplicateStock = matchingStocks.length > 1;
  const resetForm = () => {
    setType("");
    setMark("");
    setModel("");
    setQty(0);
    setStockError("");
  };

  const onAddStockDrop = () => {
    setStockError("");

    if (!type || !mark || !model || qty <= 0) return;

    if (!selectedStockItem) return;

    if (qty > availableStock) {
      setStockError(
        `Yetersiz stok. Kullanılabilir stok: ${availableStock}, istenen: ${qty}`,
      );
      return;
    }

    onStockDrop({
      stockId: selectedStockItem.id,
      type: selectedStockItem.type,
      mark: selectedStockItem.mark,
      model: selectedStockItem.model,
      qty,
    });

    resetForm();
    onClose();
  };

  useEffect(() => {
    if (!open) return;

    if (!selectedDrop) {
      resetForm();
      return;
    }

    setType(selectedDrop.type);
    setMark(selectedDrop.mark);
    setModel(selectedDrop.model);
    setQty(selectedDrop.qty);
  }, [open, selectedDrop]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        resetForm();
        onClose();
      }}
    >
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
            onChange={(e) => {
              setQty(Number(e.target.value || 0));
              setStockError("");
            }}
            error={Boolean(stockError)}
            helperText={stockError}
            fullWidth
          />

          {hasDuplicateStock && (
            <Alert severity="warning">
              Bu modelden birden fazla kayıt var. Stok düşme işlemi ilk bulunan
              kayıt üzerinden yapılacaktır.
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            resetForm();
            onClose();
          }}
        >
          İptal
        </Button>

        <Button variant="contained" onClick={onAddStockDrop}>
          Düşür
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StockDrop;
