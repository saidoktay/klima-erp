import { Autocomplete, Box, TextField } from "@mui/material";

import { cityValues, districtValues, quarterValues } from "../data/adressData";

type Address = {
  city: string;
  district: string;
  quarter: string;
  detail: string;
};

type AdressProps = {
  address: Address;
  onChange: (next: Address) => void;
};

export const Adress = ({ address, onChange }: AdressProps) => {
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
        value={address.city}
        onInputChange={(_, v) => onChange({ ...address, city: v })}
        renderInput={(params) => <TextField {...params} label="İL" />}
      />
      <Autocomplete
        freeSolo
        options={districtValues}
        value={address.district}
        onInputChange={(_, v) => onChange({ ...address, district: v })}
        renderInput={(params) => <TextField {...params} label="İLÇE" />}
      />
      <Autocomplete
        freeSolo
        options={quarterValues}
        value={address.quarter}
        onInputChange={(_, v) => onChange({ ...address, quarter: v })}
        renderInput={(params) => <TextField {...params} label="Mahalle" />}
      />
      <TextField
        label={"Detaylı Adres"}
        value={address.detail}
        onChange={(e) => onChange({ ...address, detail: e.target.value })}
        multiline
        minRows={1}
        placeholder="Sokak, apartman, no vb."
      />
    </Box>
  );
};
