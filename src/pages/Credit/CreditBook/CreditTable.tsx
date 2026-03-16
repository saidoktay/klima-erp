import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { addCredit, removeCredit } from "../../../store/creditSlice";
import { useDispatch } from "react-redux";
import AddCredit from "./AddCredit/AddCredit";
import CreditDetail from "./CreditDetail/CreditDetail";

const CreditTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedCreditId, setSelectedCreditId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const credits = useSelector((state: RootState) => state.credit);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentOpen, setPaymentOpen] = useState(false);

  const selectedCredit =
    credits.find((item) => item.id === selectedCreditId) ?? null;
  // Toplam alacak fonksiyonu
  const totalReceivable = credits.reduce(
    (sum, item) => sum + item.totalDebt,
    0,
  );
  // Toplam tahsilat fonksiyonu
  const totalPaid = credits.reduce((sum, item) => sum + item.paid, 0);
  // Kalan toplam borç fonksiyonu
  const totalRemaining = totalReceivable - totalPaid;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ display: "flex", justifyContent: "center", mb: 2 }}
      >
        Veresiye Takip Sayfasi
      </Typography>

      <Container maxWidth={false} disableGutters sx={{ width: "95%" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              backgroundColor: "#1E6FD9",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Yeni Veresiye
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">Toplam Alacak</Typography>
                <Typography variant="h6" fontWeight={700}>
                  {totalReceivable.toLocaleString("tr-TR")} TL
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">Tahsil Edilen</Typography>
                <Typography variant="h6" fontWeight={700}>
                  {totalPaid.toLocaleString("tr-TR")} TL
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">Kalan Borç</Typography>
                <Typography variant="h6" fontWeight={700} color="error.main">
                  {totalRemaining.toLocaleString("tr-TR")} TL
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E8F1FF" }}>
                <TableCell>Müşteri</TableCell>
                <TableCell>Telefon</TableCell>
                <TableCell align="right">Toplam</TableCell>
                <TableCell align="right">Ödenen</TableCell>
                <TableCell align="right">Kalan</TableCell>
                <TableCell>Vade</TableCell>
                <TableCell>Durum</TableCell>
                <TableCell>Islem</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {credits.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    Henuz veresiye kaydi yok.
                  </TableCell>
                </TableRow>
              ) : (
                credits.map((item) => {
                  const remaining = item.totalDebt - item.paid;

                  return (
                    <TableRow
                      key={item.id}
                      hover
                      onClick={() => setSelectedCreditId(item.id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{item.customer}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell align="right">{item.totalDebt} TL</TableCell>
                      <TableCell align="right">{item.paid} TL</TableCell>
                      <TableCell align="right">{remaining} TL</TableCell>
                      <TableCell>{item.dueDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={remaining > 0 ? "Acik Hesap" : "Kapandi"}
                          size="small"
                          color={remaining > 0 ? "warning" : "success"}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();

                            if (
                              window.confirm("Bu veresiye kaydi silinsin mi?")
                            ) {
                              dispatch(removeCredit(item.id));
                            }
                          }}
                        >
                          Sil
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <AddCredit
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={(data) => {
            dispatch(addCredit(data));
            setOpen(false);
          }}
        />
        <CreditDetail
          open={selectedCredit !== null}
          onClose={() => setSelectedCreditId(null)}
          credit={selectedCredit}
          onPaymentSuccess={(amount) => {
            setPaymentMessage(`${amount} TL odeme alindi.`);
            setPaymentOpen(true);
          }}
          onDebtAdded={(amount) => {
            setPaymentMessage(`${amount} TL yeni borc eklendi.`);
            setPaymentOpen(true);
          }}
        />

        <Snackbar
          open={paymentOpen}
          autoHideDuration={3000}
          onClose={() => setPaymentOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setPaymentOpen(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {paymentMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default CreditTable;
