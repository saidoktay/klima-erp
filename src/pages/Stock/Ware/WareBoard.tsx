import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import AddStock from "./AddStock/AddStock";
import EditStock from "./EditStock/EditStock";
import { useDispatch } from "react-redux";
import { addItem, updateItem, removeItem } from "../../../store/stockSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const WareBoard = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedStockId, setSelectedStockId] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const dispatch = useDispatch();
  const stocks = useSelector((state: RootState) => state.stock);
  const selectedStock =
    stocks.find((item) => item.id === selectedStockId) ?? null;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Stok Takip Sayfası
      </Typography>
      <Container maxWidth={false} disableGutters sx={{ width: "95%" }}>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", margin: "5px" }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              backgroundColor: "#1E6FD9",
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 6px 16px rgba(30, 111, 217, 0.25)",
              "&:hover": { backgroundColor: "#1558AD" },
            }}
            onClick={() => setOpen(true)}
          >
            Ürün Ekle
          </Button>
        </Box>
        <AddStock
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={(data) => {
            dispatch(addItem(data));
            setSnackbarMessage(
              `${data.mark} ${data.model} ürünü stoğa eklendi. Stok: ${data.stock}`,
            );
            setSnackbarOpen(true);
            setOpen(false);
          }}
        />
        <EditStock
          open={editOpen}
          onClose={() => {
            setEditOpen(false);
            setSelectedStockId(null);
          }}
          stock={selectedStock}
          onSubmit={(data) => {
            if (!selectedStock) return;

            const stockChanged = data.stock !== selectedStock.stock;
            const minStockChanged = data.minStock !== selectedStock.minStock;

            let message = "";

            if (stockChanged && minStockChanged) {
              message = `${data.mark} ${data.model} için stok ve minimum stok güncellendi. Yeni stok: ${data.stock}`;
            } else if (stockChanged) {
              message = `${data.mark} ${data.model} stoğu güncellendi. Yeni stok: ${data.stock}`;
            } else if (minStockChanged) {
              message = `${data.mark} ${data.model} minimum stok değeri güncellendi.`;
            }

            dispatch(updateItem(data));

            if (message) {
              setSnackbarMessage(message);
              setSnackbarOpen(true);
            }

            setEditOpen(false);
            setSelectedStockId(null);
          }}
        />

        <Box>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              boxShadow: "0 10px 24px rgba(30, 111, 217, 0.12)",
              overflow: "hidden",
              maxHeight: 520,
            }}
          >
            <Table
              sx={{
                "& td": { py: 1.5, fontSize: "0.95rem" },
                "& th": { py: 1.5 },
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#E8F1FF",
                    "& th": {
                      fontWeight: 700,
                      color: "#1E3A5F",
                      textTransform: "uppercase",
                      fontSize: "0.8rem",
                      letterSpacing: "0.04em",
                      borderBottom: "2px solid #1558AD",
                    },
                  }}
                >
                  <TableCell>Tür</TableCell>
                  <TableCell>Marka</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell align="right">Stok</TableCell>
                  <TableCell>Durum</TableCell>
                  <TableCell>İşlem</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {stocks.map((item) => (
                  <TableRow
                    key={item.id}
                    hover
                    onClick={() => {
                      setSelectedStockId(item.id);
                      setEditOpen(true);
                    }}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#F5F7FA" },
                    }}
                  >
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.mark}</TableCell>
                    <TableCell>{item.model}</TableCell>
                    <TableCell align="right">{item.stock}</TableCell>
                    <TableCell>
                      {item.stock <= item.minStock ? (
                        <Chip
                          label="Kritik"
                          size="small"
                          sx={{
                            backgroundColor: "#FDECEC",
                            color: "#B71C1C",
                            fontWeight: 600,
                          }}
                        />
                      ) : (
                        <Chip
                          label="Normal"
                          size="small"
                          sx={{
                            backgroundColor: "#E9F7EF",
                            color: "#1B5E20",
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();

                          if (window.confirm("Silmek istediğine emin misin?")) {
                            dispatch(removeItem(item.id));
                          }
                        }}
                      >
                        Sil
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default WareBoard;
