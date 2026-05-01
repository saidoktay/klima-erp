import {
  Box,
  Button,
  Stack,
  TextField,
  Autocomplete,
  FormControl,
  FormHelperText,
  createFilterOptions,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Adress } from "./Adress/Adress";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../../../store/tasksSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { addOption } from "../../../../store/taskOptionsSlice";
import StockDrop from "./StockDrop/StockDrop";
import type { Task, StockDropItem } from "../../../../types/task";
import { addStock, dropStock } from "../../../../store/stockSlice";
import { recordCompletedTask } from "../../../../store/customersSlice";

const filter = createFilterOptions<string>();
type AddTodoProps = {
  onSuccess?: () => void;
  task?: Task | null;
};

const AddTodo = ({ onSuccess, task }: AddTodoProps) => {
  const [form, setForm] = useState({
    taskType: task?.taskType ?? "",
    customerName: task?.customerName ?? "",
    customerNumber: task?.customerNumber ?? "",
    address: task?.address ?? {
      city: "",
      district: "",
      quarter: "",
      detail: "",
    },
    work: task?.work ?? "",
    price: task?.price ?? "",
    assignedPersonnelId: task?.assignedPersonnelId ?? "",
    stockDrops: task?.stockDrops ?? ([] as StockDropItem[]),
  });

  const [stockDialogOpen, setStockDialogOpen] = useState(false);
  const [editingStockDrop, setEditingStockDrop] =
    useState<StockDropItem | null>(null);

  useEffect(() => {
    if (!task) return;

    setForm({
      taskType: task.taskType,
      customerName: task.customerName,
      customerNumber: task.customerNumber,
      address: task.address,
      work: task.work,
      price: task.price,
      assignedPersonnelId: task.assignedPersonnelId,
      stockDrops: task.stockDrops,
    });
  }, [task]);

  const options = useSelector((state: RootState) => state.taskOptions);
  const personnel = useSelector((state: RootState) => state.personnel);
  const activePersonnel = personnel.filter((p) => p.active);

  const updateField =
    (
      field:
        | "taskType"
        | "customerName"
        | "customerNumber"
        | "work"
        | "price"
        | "assignedPersonnelId",
    ) =>
    (value: string) => {
      setForm((p) => ({ ...p, [field]: value }));
    };

  const updateAddress = (address: typeof form.address) => {
    setForm((p) => ({ ...p, address }));
  };
  const errors = {
    taskType: form.taskType.trim() === "",
    customerName: form.customerName.trim() === "",
    customerNumber: form.customerNumber.trim() === "",
    price: form.price.trim() === "",
    assignedPersonnelId: form.assignedPersonnelId.trim() === "",
  };
  const dispatch = useDispatch();
  const handleAddStockDrop = (item: StockDropItem) => {
    setForm((p) => {
      const exists = p.stockDrops.some((drop) => drop.stockId === item.stockId);

      if (!exists) {
        return { ...p, stockDrops: [...p.stockDrops, item] };
      }

      return {
        ...p,
        stockDrops: p.stockDrops.map((drop) =>
          drop.stockId === item.stockId ? { ...drop, qty: item.qty } : drop,
        ),
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      errors.taskType ||
      errors.customerName ||
      errors.customerNumber ||
      errors.price ||
      errors.assignedPersonnelId
    ) {
      return;
    }
    dispatch(addOption({ key: "taskTypes", value: form.taskType }));
    dispatch(addOption({ key: "customerNames", value: form.customerName }));
    dispatch(addOption({ key: "customerNumbers", value: form.customerNumber }));
    dispatch(addOption({ key: "works", value: form.work }));
    dispatch(addOption({ key: "prices", value: form.price }));

    if (task) {
      task.stockDrops.forEach((drop) => {
        dispatch(
          addStock({
            id: drop.stockId,
            amount: drop.qty,
          }),
        );
      });

      form.stockDrops.forEach((drop) => {
        dispatch(
          dropStock({
            id: drop.stockId,
            amount: drop.qty,
          }),
        );
      });

      const updatedTask = {
        ...task,
        taskType: form.taskType,
        customerName: form.customerName,
        customerNumber: form.customerNumber,
        address: form.address,
        work: form.work,
        price: form.price,
        assignedPersonnelId: form.assignedPersonnelId,
        stockDrops: form.stockDrops,
      };

      dispatch(updateTask(updatedTask));

      if (updatedTask.status === "done") {
        dispatch(recordCompletedTask(updatedTask));
      }
    } else {
      dispatch(
        addTask({
          taskType: form.taskType,
          customerName: form.customerName,
          customerNumber: form.customerNumber,
          address: form.address,
          work: form.work,
          price: form.price,
          assignedPersonnelId: form.assignedPersonnelId,
          status: "todo",
          stockDrops: form.stockDrops,
        }),
      );

      form.stockDrops.forEach((drop) => {
        dispatch(
          dropStock({
            id: drop.stockId,
            amount: drop.qty,
          }),
        );
      });
    }

    setForm({
      taskType: "",
      customerName: "",
      customerNumber: "",
      address: { city: "", district: "", quarter: "", detail: "" },
      work: "",
      price: "",
      assignedPersonnelId: "",
      stockDrops: [],
    });
    onSuccess?.();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, width: "1000px" }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "5px",
          }}
        >
          <FormControl fullWidth error={errors.taskType}>
            <Autocomplete
              freeSolo
              options={options.taskTypes}
              filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                return filtered.slice(0, 3);
              }}
              value={form.taskType}
              onChange={(_, v) => updateField("taskType")(v ?? "")}
              onInputChange={(_, v) => updateField("taskType")(v)}
              renderInput={(params) => (
                <TextField {...params} label="İş Türü" />
              )}
            />
            {errors.taskType ? (
              <FormHelperText>Zorunlu alan</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl fullWidth error={errors.customerName}>
            <Autocomplete
              freeSolo
              options={options.customerNames}
              filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                return filtered.slice(0, 3);
              }}
              value={form.customerName}
              onChange={(_, v) => updateField("customerName")(v ?? "")}
              onInputChange={(_, v) => updateField("customerName")(v)}
              renderInput={(params) => (
                <TextField {...params} label="Müşteri Adı" />
              )}
            />
            {errors.customerName ? (
              <FormHelperText>Zorunlu alan</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl fullWidth error={errors.customerNumber}>
            <Autocomplete
              freeSolo
              options={options.customerNumbers}
              filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                return filtered.slice(0, 3);
              }}
              value={form.customerNumber}
              onChange={(_, v) => updateField("customerNumber")(v ?? "")}
              onInputChange={(_, v) => updateField("customerNumber")(v)}
              renderInput={(params) => (
                <TextField type="number" {...params} label="Tel No" />
              )}
            />
            {errors.customerNumber ? (
              <FormHelperText>Zorunlu alan</FormHelperText>
            ) : null}
          </FormControl>
        </Box>
        <Box sx={{ mt: 1, mb: 1 }}>
          <Typography variant="h5">Adres</Typography>
        </Box>
        <Box>
          <Adress address={form.address} onChange={updateAddress} />
        </Box>
        <Box sx={{ padding: "5px", display: "flex", justifyContent: "center" }}>
          <Typography variant="h5">{"İşlem/Fiyat"}</Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              task && form.stockDrops.length > 0
                ? "3fr 1fr 1fr"
                : "3fr 1fr 1.5fr 1fr",
            gap: "5px",
          }}
        >
          <Autocomplete
            freeSolo
            options={options.works}
            filterOptions={(opts, params) => {
              const filtered = filter(opts, params);
              return filtered.slice(0, 2);
            }}
            value={form.work}
            onChange={(_, v) => updateField("work")(v ?? "")}
            onInputChange={(_, v) => updateField("work")(v)}
            renderInput={(params) => (
              <TextField {...params} label="İş Tanımı" />
            )}
          />
          <FormControl fullWidth error={errors.assignedPersonnelId}>
            <Autocomplete
              options={activePersonnel}
              getOptionLabel={(option) => option.name}
              value={
                activePersonnel.find(
                  (p) => p.id === form.assignedPersonnelId,
                ) ?? null
              }
              onChange={(_, value) =>
                updateField("assignedPersonnelId")(value?.id ?? "")
              }
              renderInput={(params) => (
                <TextField {...params} label="Personel" />
              )}
            />
            {errors.assignedPersonnelId ? (
              <FormHelperText>Zorunlu alan</FormHelperText>
            ) : null}
          </FormControl>

          {!task || form.stockDrops.length === 0 ? (
            <Button
              type="button"
              variant="outlined"
              fullWidth
              sx={{ height: 56 }}
              onClick={() => {
                setEditingStockDrop(null);
                setStockDialogOpen(true);
              }}
            >
              Stok Düş
            </Button>
          ) : null}

          <FormControl fullWidth error={errors.price}>
            <Autocomplete
              freeSolo
              options={options.prices}
              filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                return filtered.slice(0, 3);
              }}
              value={form.price}
              onChange={(_, v) => updateField("price")(v ?? "")}
              onInputChange={(_, v) => updateField("price")(v)}
              renderInput={(params) => (
                <TextField type="number" {...params} label="Fiyat (₺)" />
              )}
            />
            {errors.price ? (
              <FormHelperText>Zorunlu alan</FormHelperText>
            ) : null}
          </FormControl>
        </Box>
        {form.stockDrops.length > 0 ? (
          <Box sx={{ display: "grid", gap: 1 }}>
            <Typography fontWeight={700}>Düşülen Stoklar</Typography>

            {form.stockDrops.map((drop) => (
              <Box
                key={drop.stockId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  px: 1.5,
                  py: 1,
                }}
              >
                <Typography variant="body2">
                  {`${drop.type} / ${drop.mark} / ${drop.model} x${drop.qty}`}
                </Typography>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setEditingStockDrop(drop);
                    setStockDialogOpen(true);
                  }}
                >
                  Düzenle
                </Button>
              </Box>
            ))}
          </Box>
        ) : null}

        <StockDrop
          open={stockDialogOpen}
          onClose={() => {
            setStockDialogOpen(false);
            setEditingStockDrop(null);
          }}
          onStockDrop={handleAddStockDrop}
          selectedDrop={editingStockDrop}
        />

        <Button type="submit" variant="contained">
          {task ? "Güncelle" : "Kaydet"}
        </Button>
      </Stack>
    </Box>
  );
};

export default AddTodo;
