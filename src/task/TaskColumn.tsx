import { Box, Typography, Paper } from "@mui/material";
import TaskCard from "./TaskCard";
import type { Task, TaskStatus } from "../types/task";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";

type TaskColumnProps = {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onAddClick?: () => void;
};

const TaskColumn = ({ title, status, tasks, onAddClick }: TaskColumnProps) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <Paper
      elevation={5}
      sx={{
        width: 300,
        padding: 2,
        backgroundColor: "#f9f9f9",
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

      <Box>
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
    </Paper>
  );
};

export default TaskColumn;
