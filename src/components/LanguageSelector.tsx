import { FC } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import useMultilanguage from "hooks/useMultilanguage";

const LanguageSelector: FC = () => {
  const { language, translator, changeLanguage } = useMultilanguage();
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{translator("Header.Language")}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={language}
        label={translator("Header.Language")}
        // @ts-ignore
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <MenuItem value="en">{translator("Header.English")}</MenuItem>
        <MenuItem value="vi">{translator("Header.Vietnamese")}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
