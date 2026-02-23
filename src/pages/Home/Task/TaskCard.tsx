import { Card, CardContent, Typography, Stack } from "@mui/material";
import type { Task } from "../../../types/task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../../store/tasksSlice";

const TaskCard = ({ task }: { task: Task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 200ms ease",
    opacity: isDragging ? 0 : 1,
  };

  const dispatch = useDispatch();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    const ok = window.confirm("Bu gorevi silmek istiyor musunuz?");
    if (!ok) return;

    dispatch(deleteTask(task.id));
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      elevation={1}
      sx={{ borderRadius: 2, cursor: "pointer", position: "relative" }}
    >
      <CardContent sx={{ pb: "16px !important" }}>
        <Stack spacing={0.5}>
          <Typography fontWeight={700}>{`İş: ${task.taskType}`}</Typography>

          <Typography variant="body2">
            {`Müşteri Adı: ${task.customerName}`}
          </Typography>
          <Typography variant="body2">
            {`Müşteri Tel No: ${task.customerNumber}`}
          </Typography>
          <Typography variant="body2">
            {`Adres: ${task.address.city}/${task.address.district} ${task.address.quarter} mah. ${task.address.detail}`}
          </Typography>
          <Typography variant="body2">
            {`Yapılacak İşlem: ${task.work}`}
          </Typography>
          <Typography variant="body2">
            {`Servis Ücreti: ${task.price} ₺`}
          </Typography>
          {task.stockDrops.length > 0 ? (
            <Typography variant="body2">
              {`Düşülen Stok: ${task.stockDrops
                .map((s) => `${s.type}/${s.mark}/${s.model} x${s.qty}`)
                .join(", ")}`}
            </Typography>
          ) : null}
          <IconButton
            size="small"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={handleDelete}
            sx={{
              position: "absolute",
              right: 8,
              bottom: 8,
              color: "error.main",
              p: 0.6,
              borderRadius: "50%",
              "&:hover": { bgcolor: "rgba(211, 47, 47, 0.12)" },
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
