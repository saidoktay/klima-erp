import {
  Box,
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Modal,
  Chip,
  InputAdornment,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PaymentsIcon from "@mui/icons-material/Payments";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { Customer } from "../../types/customer";

const Customers = () => {
  const customers = useSelector((state: RootState) => state.customers);
  const personnel = useSelector((state: RootState) => state.personnel);

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const totalJobs = customers.reduce(
    (sum, customer) => sum + customer.jobs.length,
    0,
  );

  const totalRevenue = customers.reduce(
    (sum, customer) =>
      sum +
      customer.jobs.reduce((jobSum, job) => jobSum + Number(job.price || 0), 0),
    0,
  );

  const filteredCustomers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return customers;

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(keyword) ||
        customer.phone.includes(keyword),
    );
  }, [customers, search]);

  return (
    <Container maxWidth={false} sx={{ width: "95%", py: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Müşteriler
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tamamlanan işlerden oluşan müşteri geçmişi
          </Typography>
        </Box>

        <TextField
          placeholder="İsim veya telefon ara"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 360 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
        <Chip
          icon={<PhoneIcon />}
          label={`${customers.length} müşteri`}
          sx={{ fontWeight: 600 }}
        />
        <Chip
          icon={<WorkOutlineIcon />}
          label={`${totalJobs} iş kaydı`}
          sx={{ fontWeight: 600 }}
        />
        <Chip
          icon={<PaymentsIcon />}
          label={`${totalRevenue} ₺ toplam`}
          color="primary"
          sx={{ fontWeight: 600 }}
        />
      </Stack>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: "0 10px 24px rgba(30, 111, 217, 0.12)",
          overflow: "hidden",
        }}
      >
        <Table>
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
              <TableCell>Müşteri</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Adres</TableCell>
              <TableCell align="right">İş Sayısı</TableCell>
              <TableCell align="right">Toplam Tutar</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredCustomers.map((customer) => {
              const totalPrice = customer.jobs.reduce(
                (sum, job) => sum + Number(job.price || 0),
                0,
              );

              return (
                <TableRow
                  key={customer.id}
                  hover
                  onClick={() => setSelectedCustomer(customer)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#F5F7FA" },
                    "& td": { py: 1.4 },
                  }}
                >
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.addressText}</TableCell>
                  <TableCell align="right">
                    <Chip
                      size="small"
                      label={`${customer.jobs.length} iş`}
                      sx={{
                        backgroundColor: "#E8F1FF",
                        color: "#1E3A5F",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight={700}>{totalPrice} ₺</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={selectedCustomer !== null}
        onClose={() => setSelectedCustomer(null)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 2,
            width: "min(1000px, 92vw)",
            maxHeight: "82vh",
            overflow: "auto",
            boxShadow: 24,
          }}
        >
          {selectedCustomer ? (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5" fontWeight={700}>
                  {selectedCustomer.name}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: 1, flexWrap: "wrap" }}
                >
                  <Chip size="small" label={selectedCustomer.phone} />
                  <Chip size="small" label={selectedCustomer.addressText} />
                  <Chip
                    size="small"
                    color="primary"
                    label={`${selectedCustomer.jobs.length} iş kaydı`}
                  />
                </Stack>
              </Box>

              <Table size="small">
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#F5F7FA",
                      "& th": {
                        fontWeight: 700,
                        color: "text.secondary",
                      },
                    }}
                  >
                    <TableCell>Tarih</TableCell>
                    <TableCell>İş Türü</TableCell>
                    <TableCell>İşlem</TableCell>
                    <TableCell>Personel</TableCell>
                    <TableCell>Kullanılan Ürün</TableCell>
                    <TableCell align="right">Ücret</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {selectedCustomer.jobs.map((job) => {
                    const assignedPersonnel = personnel.find(
                      (p) => p.id === job.assignedPersonnelId,
                    );

                    return (
                      <TableRow key={job.taskId}>
                        <TableCell>
                          {new Date(job.completedAt).toLocaleDateString(
                            "tr-TR",
                          )}
                        </TableCell>
                        <TableCell>{job.taskType}</TableCell>
                        <TableCell>{job.work}</TableCell>
                        <TableCell>
                          {assignedPersonnel?.name ?? "Atanmamış"}
                        </TableCell>
                        <TableCell>
                          {job.stockDrops.length > 0
                            ? job.stockDrops
                                .map(
                                  (s) =>
                                    `${s.type}/${s.mark}/${s.model} x${s.qty}`,
                                )
                                .join(", ")
                            : "-"}
                        </TableCell>
                        <TableCell align="right">{job.price} ₺</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </>
          ) : null}
        </Box>
      </Modal>
    </Container>
  );
};

export default Customers;
