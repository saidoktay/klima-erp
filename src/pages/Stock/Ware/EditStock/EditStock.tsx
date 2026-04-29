import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
type PurchaseRecord = {
  id: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
};

type StockItem = {
  id: string;
  mark: string;
  model: string;
  type: string;
  stock: number;
  minStock: number;
  purchaseHistory: PurchaseRecord[];
};

type EditStockProps = {
  open: boolean;
  onClose: () => void;
  stock: StockItem | null;
  onSubmit: (data: StockItem) => void;
};

const EditStock = ({ open, onClose, stock, onSubmit }: EditStockProps) => {
  const [form, setForm] = useState<StockItem>({
    id: "",
    mark: "",
    model: "",
    type: "",
    stock: 0,
    minStock: 0,
    purchaseHistory: [],
  });
  const [isEditingMinStock, setIsEditingMinStock] = useState(false);
  const [minStockValue, setMinStockValue] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    if (stock) {
      setForm({
        ...stock,
        purchaseHistory: stock.purchaseHistory ?? [],
      });

      setIsEditingMinStock(false);
      setHistoryOpen(false);
      setMinStockValue(String(stock.minStock));
    }
  }, [stock]);

  const handleAddStock = () => {
    const amountText = window.prompt("Eklenecek stok miktarini giriniz:");

    if (!amountText) return;

    const amount = Number(amountText);

    if (amount <= 0) return;

    const purchasePriceText = window.prompt("Alis fiyatini TL olarak giriniz:");

    if (!purchasePriceText) return;

    const purchasePrice = Number(purchasePriceText);

    if (purchasePrice <= 0) return;

    const defaultDate = new Date().toISOString().slice(0, 10);
    const purchaseDate = window.prompt("Alis tarihini giriniz:", defaultDate);

    if (!purchaseDate) return;

    setForm((prev) => ({
      ...prev,
      stock: prev.stock + amount,
      purchaseHistory: [
        {
          id: `${Date.now()}`,
          quantity: amount,
          purchasePrice,
          purchaseDate,
        },
        ...prev.purchaseHistory,
      ],
    }));
  };

  const handleRemoveStock = () => {
    const amountText = window.prompt("Cikarilacak stok miktarini giriniz:");

    if (!amountText) return;

    const amount = Number(amountText);

    if (amount > 0) {
      setForm((prev) => ({
        ...prev,
        stock: Math.max(0, prev.stock - amount),
      }));
    }
  };
  const visiblePurchaseHistory = form.purchaseHistory.slice(0, 3);
  const hasMorePurchaseHistory = form.purchaseHistory.length > 3;

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          Urun Duzenle
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
            <Typography>
              <strong>Tür:</strong> {form.type}
            </Typography>

            <Typography>
              <strong>Marka:</strong> {form.mark}
            </Typography>

            <Typography>
              <strong>Model:</strong> {form.model}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>
                <strong>Mevcut Stok:</strong> {form.stock}
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={handleAddStock}
                >
                  Ekle
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={handleRemoveStock}
                >
                  Çıkar
                </Button>
              </Box>
            </Box>

            {isEditingMinStock ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <TextField
                  label="Minimum Stok"
                  type="number"
                  value={minStockValue}
                  onChange={(e) => {
                    const value = e.target.value;

                    setMinStockValue(value);

                    if (value !== "") {
                      setForm((prev) => ({ ...prev, minStock: Number(value) }));
                    }
                  }}
                  size="small"
                  sx={{ maxWidth: 160 }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>
                  <strong>Minimum Stok:</strong> {form.minStock}
                </Typography>
                <Button size="small" onClick={() => setIsEditingMinStock(true)}>
                  Düzenle
                </Button>
              </Box>
            )}
            {form.purchaseHistory.length > 0 && (
              <Box sx={{ display: "grid", gap: 1 }}>
                <Typography fontWeight={700}>Son Alis Kayitlari</Typography>

                {visiblePurchaseHistory.map((purchase) => (
                  <Typography key={purchase.id} variant="body2">
                    {purchase.purchaseDate} - {purchase.quantity} adet -{" "}
                    {purchase.purchasePrice} TL
                  </Typography>
                ))}

                {hasMorePurchaseHistory && (
                  <Button size="small" onClick={() => setHistoryOpen(true)}>
                    Tum alis kayitlarini gor
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onSubmit(form);
            }}
          >
            Kaydet
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              setIsEditingMinStock(false);
              setHistoryOpen(false);
              onClose();
            }}
          >
            İptal
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Alis Kayitlari</DialogTitle>

        <DialogContent>
          <Box sx={{ display: "grid", gap: 1 }}>
            {form.purchaseHistory.map((purchase) => (
              <Typography key={purchase.id} variant="body2">
                {purchase.purchaseDate} - {purchase.quantity} adet -{" "}
                {purchase.purchasePrice} TL
              </Typography>
            ))}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setHistoryOpen(false)}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditStock;
