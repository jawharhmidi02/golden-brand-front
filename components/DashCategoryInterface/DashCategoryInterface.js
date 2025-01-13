"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DashCategoryInterface = ({
  values,
  changeCategoryOption,
  defaultValue = "",
  disabled = false,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    changeCategoryOption(value);
  }, [value]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Select value={value} onValueChange={setValue} disabled={disabled}>
      <SelectTrigger className="w-full border-none bg-[var(--dash-theme)] p-3 text-lg text-white focus:ring-[var(--dash-theme6)]">
        <SelectValue placeholder="Choose Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {values.map((value, index) => (
            <SelectItem key={index} value={value.id}>
              {value.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DashCategoryInterface;
