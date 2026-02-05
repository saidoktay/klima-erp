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
} from "@mui/material";
import { useState } from "react";
import AddStock from "./AddStock/AddStock";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../../store/stockSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const WareBoard = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const stocks = useSelector((state: RootState) => state.stock);
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
            Ürün Ekle / Çıkar
          </Button>
        </Box>
        <AddStock
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={(data) => {
            const payload =
              data.mode === "remove" ? { ...data, stock: -data.stock } : data;

            dispatch(addItem(payload));
            setOpen(false);
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
                    sx={{
    "& tr": { backgroundColor: "#FFFFFF" },
    "& tr:hover": { backgroundColor: "#F5F7FA" },
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
                        onClick={() => {
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
      </Container>
    </Box>
  );
};

export default WareBoard;
