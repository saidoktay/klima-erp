import { Box, Typography, Paper, IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import type { Task, TaskStatus } from "../types/task";
import TaskCard from "./TaskCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

type TaskColumnProps = {
  title: string;
  status: TaskStatus;
  taskIds: number[];
  tasksById: Record<number, Task>;
  onAddClick?: () => void;
};

const TaskColumn = ({
  title,
  status,
  taskIds,
  tasksById,
  onAddClick,
}: TaskColumnProps) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <Paper
      ref={setNodeRef}
      elevation={5}
      sx={{
        width: 300,
        padding: 2,
        backgroundColor: "#f9f9f9",
        minHeight: 300,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          width: "100%",
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {title}
        {status === "todo" && (
          <IconButton onClick={onAddClick}>
            <AddBoxIcon sx={{ color: "black" }} />
          </IconButton>
        )}
      </Typography>

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <Box sx={{ minHeight: 80 }}>
          {taskIds.map((id) => (
            <TaskCard key={id} task={tasksById[id]} />
          ))}
        </Box>
      </SortableContext>
    </Paper>
  );
};

export default TaskColumn;
