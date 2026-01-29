import { Card, CardContent, Typography, Stack } from "@mui/material";
import type { Task } from "../../../types/task";
import { useSortable } from "@dnd-kit/sortable"; 
import { CSS } from "@dnd-kit/utilities"; 

const TaskCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform,transition, isDragging } = useSortable({
    id: task.id,
  });
  const style = {
  transform: CSS.Transform.toString(transform),
  transition: transition ?? "transform 200ms ease",
  opacity: isDragging ? 0 : 1,
  
};
  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      elevation={1}
      sx={{ borderRadius: 2, cursor: "pointer" }}
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
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
