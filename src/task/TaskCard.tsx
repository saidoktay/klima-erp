import React from "react";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

type TaskCardProps = {
  title: string;
};

const TaskCard = ({ title }: TaskCardProps) => {
  return (
    <Box>
      <Paper elevation={1} sx={{ padding: 1.5, mb: 1, cursor: "pointer" }}>
        <Typography variant="body1">{title}</Typography>
      </Paper>
    </Box>
  );
};

export default TaskCard;
