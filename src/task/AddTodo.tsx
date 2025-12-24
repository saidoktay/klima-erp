import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { TextField } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { useState } from "react";

export const AddTodo = () => {
  const [jobType, setJobType] = useState("");
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0px",
        left: "240px",
        right: "0px",
        bottom: "0px",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
      }}
    >
      <Paper
        sx={{
          width: "600px",
          height: "400px",
          padding: "20px",
          zIndex: "1100",
        }}
      >
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Select
            autoWidth
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            label="İş Türü"
          >
            <MenuItem value="temizlik">Temizlik</MenuItem>
            <MenuItem value="tamir">Tamir</MenuItem>
            <MenuItem value="bakim">Bakım</MenuItem>
          </Select>
          <TextField label="Müşteri Adı:" multiline minRows={1} />
          <TextField label="Tel No:" multiline minRows={1} />
        </Box>
      </Paper>
    </Box>
  );
};
