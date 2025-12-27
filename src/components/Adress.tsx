import { Box, Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { cityValues, districtValues, quarterValues } from "../data/adressData";
import { useEffect } from "react";

type AdressProps = {
  onChange: (address: {
    city: string;
    district: string;
    quarter: string;
    detail: string;
  }) => void;
};

export const Adress = ({ onChange }: AdressProps) => {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [quarter, setQuarter] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    onChange({
      city,
      district,
      quarter,
      detail,
    });
  }, [city, district, quarter, detail]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "5px",
      }}
    >
      <Autocomplete
        freeSolo
        options={cityValues}
        value={city}
        onInputChange={(e, v) => setCity(v)}
        renderInput={(params) => <TextField {...params} label="İL" />}
      />
      <Autocomplete
        freeSolo
        options={districtValues}
        value={district}
        onInputChange={(e, v) => setDistrict(v)}
        renderInput={(params) => <TextField {...params} label="İLÇE" />}
      />
      <Autocomplete
        freeSolo
        options={quarterValues}
        value={quarter}
        onInputChange={(e, v) => setQuarter(v)}
        renderInput={(params) => <TextField {...params} label="MAHALLE" />}
      />
      <TextField
        label="Detaylı Adres"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        multiline
        minRows={1}
        placeholder="Sokak, apartman, no vb."
      />
    </Box>
  );
};
