import * as React from "react";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { SearchRounded } from "@mui/icons-material";

export function ProductFilters(): React.JSX.Element {
  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search Product"
        startAdornment={
          <InputAdornment position="start">
            <SearchRounded />
          </InputAdornment>
        }
        sx={{ maxWidth: "500px" }}
      />
    </Card>
  );
}
