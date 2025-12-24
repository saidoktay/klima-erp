import { Box } from "@mui/material";
import TaskColumn from "./TaskColumn";
import { useState } from "react";
import type { Task } from "../types/task";
import { AddTodo } from "./AddTodo";

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Login sayfasını yap", status: "todo" },
    { id: 2, title: "Sidebar tasarla", status: "in-progress" },
    { id: 3, title: "Task board oluştur", status: "done" },
  ]);
  const [show, setShow] = useState(false);
  const onAddClick = () => {
    setShow(true);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <TaskColumn
          title="Todo"
          status="todo"
          tasks={tasks}
          onAddClick={onAddClick}
        />
        <TaskColumn title="In Progress" status="in-progress" tasks={tasks} />
        <TaskColumn title="Done" status="done" tasks={tasks} />
      </Box>
      {show && <AddTodo />}
    </Box>
  );
};

export default TaskBoard;
