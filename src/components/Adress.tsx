import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { cityValues, districtValues, quarterValues } from "../data/adressData";

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

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onChangeRef.current({
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
        onInputChange={(_, v) => setCity(v)}
        renderInput={(params) => <TextField {...params} label="İL" />}
      />
      <Autocomplete
        freeSolo
        options={districtValues}
        value={district}
        onInputChange={(_, v) => setDistrict(v)}
        renderInput={(params) => <TextField {...params} label="İLÇE" />}
      />
      <Autocomplete
        freeSolo
        options={quarterValues}
        value={quarter}
        onInputChange={(_, v) => setQuarter(v)}
        renderInput={(params) => <TextField {...params} label="Mahalle" />}
      />
      <TextField
        label={"Detaylı Adres"}
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        multiline
        minRows={1}
        placeholder="Sokak, apartman, no vb."
      />
    </Box>
  );
};
