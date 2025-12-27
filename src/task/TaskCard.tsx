import React from "react";
import type { Task } from "../types/task";

import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Box>
      <Paper elevation={1} sx={{ p: 1.5, mb: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography variant="body2">İş: {task.jobType}</Typography>
          <Typography variant="body2">Müşteri: {task.customerName}</Typography>
          <Typography variant="body2">Tel: {task.phone}</Typography>
          <Typography variant="body2">
            Adres: {task.address.city}/{task.address.district}{" "}
            {task.address.quarter} {task.address.detail}
          </Typography>
          <Typography variant="body2">
            İşlem: {task.process} — Ücret: {task.price} TL
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskCard;
