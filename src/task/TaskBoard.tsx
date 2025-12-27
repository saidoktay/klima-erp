import { Box } from "@mui/material";
import TaskColumn from "./TaskColumn";
import { useState } from "react";
import type { Task } from "../types/task";
import { AddTodo } from "./AddTodo";

const TaskBoard = () => {
  const emptyAddress = {
    city: "",
    district: "",
    quarter: "",
    detail: "",
  };

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      status: "todo",
      jobType: "Montaj",
      customerName: "Ali",
      phone: "05000000000",
      address: emptyAddress,
      process: "Klima montajı",
      price: "1500",
    },
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
      {show && (
        <AddTodo
          onClose={() => setShow(false)}
          onSave={(data) => {
            const newTask: Task = {
              id: Date.now(),
              status: "todo",
              ...data,
            };

            setTasks((prev) => [...prev, newTask]);
            setShow(false);
          }}
        />
      )}
    </Box>
  );
};

export default TaskBoard;
