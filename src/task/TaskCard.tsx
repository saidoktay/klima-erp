import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import type { Task } from "../types/task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
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
    transition,
  };
  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "none" }}
    >
      <Paper elevation={1} sx={{ p: 1.5, mb: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography variant="body2">
            {"İş"}: {task.jobType}
          </Typography>
          <Typography variant="body2">
            {"Müşteri"}: {task.customerName}
          </Typography>
          <Typography variant="body2">Tel: {task.phone}</Typography>
          <Typography variant="body2">
            Adres: {task.address.city}/{task.address.district}{" "}
            {task.address.quarter} {task.address.detail}
          </Typography>
          <Typography variant="body2">
            {"İşlem"}: {task.process}{" "}
          </Typography>
          <Typography variant="body2">
            {"Ücret"}: {task.price} TL
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskCard;
