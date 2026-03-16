import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { payCredit, addDebt } from "../../../../store/creditSlice";

type CreditItem = {
  id: string;
  customer: string;
  phone: string;
  totalDebt: number;
  paid: number;
  dueDate: string;
  note: string;
};

type CreditDetailProps = {
  open: boolean;
  onClose: () => void;
  credit: CreditItem | null;
  onPaymentSuccess: (amount: number) => void;
  onDebtAdded: (amount: number) => void;
};

const CreditDetail = ({
  open,
  onClose,
  credit,
  onPaymentSuccess,
  onDebtAdded,
}: CreditDetailProps) => {
  if (!credit) return null;
  const dispatch = useDispatch();

  const remaining = credit.totalDebt - credit.paid;
  const handlePay = () => {
    const amountText = window.prompt("Tahsil edilecek tutari giriniz:");

    if (!amountText) return;

    const amount = Number(amountText);

    if (amount > 0) {
      dispatch(payCredit({ id: credit.id, amount }));
      onPaymentSuccess(amount);
      onClose();
    }
  };
  const handleAddDebt = () => {
    const amountText = window.prompt("Eklenecek borc tutarini giriniz:");

    if (!amountText) return;

    const amount = Number(amountText);

    if (amount > 0) {
      dispatch(addDebt({ id: credit.id, amount }));
      onDebtAdded(amount);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center" }}>Veresiye Detayı</DialogTitle>

      <DialogContent>
        <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
          <Typography>
            <strong>Musteri:</strong> {credit.customer}
          </Typography>

          <Typography>
            <strong>Telefon:</strong> {credit.phone}
          </Typography>

          <Typography>
            <strong>Toplam Borc:</strong> {credit.totalDebt} TL
          </Typography>

          <Typography>
            <strong>Odenen:</strong> {credit.paid} TL
          </Typography>

          <Typography>
            <strong>Kalan:</strong> {remaining} TL
          </Typography>

          <Typography>
            <strong>Vade:</strong> {credit.dueDate}
          </Typography>

          <Typography>
            <strong>Not:</strong> {credit.note || "-"}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleAddDebt}>
          Borc Ekle
        </Button>
        <Button variant="contained" color="success" onClick={handlePay}>
          Odeme Al
        </Button>
        <Button onClick={onClose}>Kapat</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreditDetail;
