import * as React from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export interface NumberInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  value?: number;
  onValueChange?: (value: number) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onValueChange, onChange, className, ...props }, ref) => {
    const formatNumber = (num: number | string | undefined): string => {
      if (num === undefined || num === null || num === "") return "";
      const n =
        typeof num === "string" ? parseFloat(num.replace(/,/g, "")) : num;
      if (isNaN(n)) return "";
      return n.toLocaleString("en-US");
    };

    const [displayValue, setDisplayValue] = React.useState(formatNumber(value));

    React.useEffect(() => {
      setDisplayValue(formatNumber(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/,/g, "");

      // Allow only numbers and a single decimal point
      if (rawValue === "" || /^\d*\.?\d*$/.test(rawValue)) {
        const numValue = rawValue === "" ? 0 : parseFloat(rawValue);

        // Update local display with formatting
        // If it ends with a dot, keep the dot for typing UX
        if (e.target.value.endsWith(".") || e.target.value.endsWith(",")) {
          setDisplayValue(e.target.value);
        } else {
          setDisplayValue(formatNumber(rawValue));
        }

        if (onValueChange) {
          onValueChange(numValue);
        }

        if (onChange) {
          onChange(e);
        }
      }
    };

    const handleBlur = () => {
      setDisplayValue(formatNumber(value));
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cn("text-right font-mono", className)}
      />
    );
  },
);

NumberInput.displayName = "NumberInput";
