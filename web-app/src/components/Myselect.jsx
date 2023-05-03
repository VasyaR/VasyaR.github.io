import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Myselect = (props) => {
  return (
    <FormControl fullWidth sx={{ m: `5px`, minWidth: `85px` }}>
      <InputLabel color="secondary" sx={{ mt: `10px` }} id>
        {props.label}
      </InputLabel>
      <Select
        color="secondary"
        sx={{ mt: `10px` }}
        // labelId="demo-simple-select-label"
        // id="demo-simple-select"
        value={props.value}
        label="Age"
        onChange={props.onChange}
      >
        {props.items.map((item) => (
          <MenuItem sx={{ mt: `10px` }} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default Myselect;
