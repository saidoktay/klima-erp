import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

type CreditForm = {
  customer: string;
  phone: string;
  totalDebt: number;
  paid: number;
  dueDate: string;
  note: string;
};

type AddCreditProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreditForm) => void;
};

const AddCredit = ({ open, onClose, onSubmit }: AddCreditProps) => {
  const [form, setForm] = useState<CreditForm>({
    customer: "",
    phone: "",
    totalDebt: 0,
    paid: 0,
    dueDate: "",
    note: "",
  });

  useEffect(() => {
    if (open) {
      setForm({
        customer: "",
        phone: "",
        totalDebt: 0,
        paid: 0,
        dueDate: "",
        note: "",
      });
    }
  }, [open]);

  const handleChange =
    (field: keyof CreditForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "totalDebt" || field === "paid"
          ? Number(e.target.value)
          : e.target.value;

      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = () => {
    if (!form.customer || !form.phone || form.totalDebt <= 0 || !form.dueDate) {
      return;
    }

    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        Yeni Veresiye Ekle
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
          <TextField
            label="Musteri Adi"
            value={form.customer}
            onChange={handleChange("customer")}
            fullWidth
          />

          <TextField
            label="Telefon"
            value={form.phone}
            onChange={handleChange("phone")}
            fullWidth
          />

          <TextField
            label="Toplam Borc"
            type="number"
            value={form.totalDebt}
            onChange={handleChange("totalDebt")}
            fullWidth
          />

          <TextField
            label="Ilk Odeme"
            type="number"
            value={form.paid}
            onChange={handleChange("paid")}
            fullWidth
          />

          <TextField
            label="Vade Tarihi"
            type="date"
            value={form.dueDate}
            onChange={handleChange("dueDate")}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="Not"
            value={form.note}
            onChange={handleChange("note")}
            multiline
            rows={3}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Iptal</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCredit;
