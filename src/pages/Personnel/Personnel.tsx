import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  addPersonnel,
  setPersonnelActive,
  updatePersonnel,
} from "../../store/personnelSlice";
import type { Personnel as PersonnelType } from "../../types/personnel";

type PersonnelForm = {
  id: string | null;
  name: string;
  phone: string;
  role: string;
};

const emptyForm: PersonnelForm = {
  id: null,
  name: "",
  phone: "",
  role: "",
};

const Personnel = () => {
  const dispatch = useDispatch();
  const personnel = useSelector((state: RootState) => state.personnel);

  const [form, setForm] = useState<PersonnelForm>(emptyForm);

  const isEditing = form.id !== null;
  const nameError = form.name.trim() === "";
  const updateField =
    (field: keyof Omit<PersonnelForm, "id">) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((previous) => ({
        ...previous,
        [field]: event.target.value,
      }));
    };
  const resetForm = () => {
    setForm(emptyForm);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nameError) return;

    if (isEditing) {
      const currentPersonnel = personnel.find((p) => p.id === form.id);
      if (!currentPersonnel) return;

      dispatch(
        updatePersonnel({
          ...currentPersonnel,
          name: form.name.trim(),
          phone: form.phone.trim(),
          role: form.role.trim(),
        }),
      );
    } else {
      dispatch(
        addPersonnel({
          name: form.name.trim(),
          phone: form.phone.trim(),
          role: form.role.trim(),
        }),
      );
    }

    resetForm();
  };
  const handleEdit = (item: PersonnelType) => {
    setForm({
      id: item.id,
      name: item.name,
      phone: item.phone ?? "",
      role: item.role ?? "",
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ display: "flex", justifyContent: "center", mb: 3 }}
      >
        Personel Tanımları
      </Typography>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={1}
        sx={{ p: 2, mb: 3 }}
      >
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <TextField
            label="Personel Adı"
            value={form.name}
            onChange={updateField("name")}
            error={nameError}
            helperText={nameError ? "Zorunlu alan" : " "}
            sx={{ flex: 2 }}
          />

          <TextField
            label="Telefon"
            value={form.phone}
            onChange={updateField("phone")}
            sx={{ flex: 1 }}
          />

          <TextField
            label="Görev"
            value={form.role}
            onChange={updateField("role")}
            sx={{ flex: 1 }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ height: 56, minWidth: 120 }}
          >
            {isEditing ? "Güncelle" : "Ekle"}
          </Button>

          {isEditing ? (
            <Button
              type="button"
              variant="outlined"
              onClick={resetForm}
              sx={{ height: 56, minWidth: 100 }}
            >
              Vazgeç
            </Button>
          ) : null}
        </Stack>
      </Paper>
      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Personel</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Görev</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell align="right">İşlem</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {personnel.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phone || "-"}</TableCell>
                <TableCell>{item.role || "-"}</TableCell>

                <TableCell>
                  <Chip
                    label={item.active ? "Aktif" : "Pasif"}
                    color={item.active ? "success" : "default"}
                    size="small"
                  />
                </TableCell>

                <TableCell align="right">
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={item.active}
                          onChange={(_, checked) =>
                            dispatch(
                              setPersonnelActive({
                                id: item.id,
                                active: checked,
                              }),
                            )
                          }
                        />
                      }
                      label=""
                    />

                    <IconButton
                      aria-label="personel düzenle"
                      onClick={() => handleEdit(item)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Personnel;
