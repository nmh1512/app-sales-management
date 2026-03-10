import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  className?: string;
  onChange?: (range: string) => void;
}

export function DateRangePicker({ className, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState("Chọn nhanh");
  const [dateRange, setDateRange] = useState("09/03/2026 đến 15/03/2026");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const presets = [
    {
      group: "Theo ngày",
      items: ["Hôm nay", "Hôm qua"],
    },
    {
      group: "Theo tuần",
      items: ["Tuần này", "Tuần trước", "7 ngày qua"],
    },
    {
      group: "Theo tháng",
      items: ["Tháng này", "Tháng trước", "30 ngày qua"],
    },
    {
      group: "Theo quý",
      items: ["Quý này", "Quý trước"],
    },
    {
      group: "Theo năm",
      items: ["Năm nay", "Năm trước"],
    },
  ];

  const handleSelect = (item: string) => {
    setActivePreset(item);
    setIsOpen(false);
    setDateRange(`Từ ${item.toLowerCase()}`);
    if (onChange) onChange(item);
  };

  return (
    <div
      className={cn("relative flex items-center gap-2", className)}
      ref={containerRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 px-4 flex items-center justify-between border border-border rounded-lg bg-background text-sm min-w-[160px] font-medium hover:bg-muted/50 transition-colors"
      >
        {activePreset}
        <ChevronDown className="h-4 w-4 text-muted-foreground ml-2" />
      </button>

      <div className="flex items-center h-10 px-4 border border-border rounded-lg bg-background text-sm min-w-[240px]">
        <span className="flex-1 text-center font-medium text-muted-foreground">
          {dateRange}
        </span>
        <Calendar className="h-4 w-4 text-muted-foreground ml-2" />
      </div>

      {isOpen && (
        <div className="absolute top-12 left-0 z-50 bg-background border border-border rounded-xl shadow-lg p-5 w-[650px] grid grid-cols-5 gap-6 animate-in fade-in-0 zoom-in-95 duration-200">
          {presets.map((group) => (
            <div key={group.group} className="space-y-3">
              <div className="font-semibold text-sm">{group.group}</div>
              <div className="flex flex-col gap-2 items-start">
                {group.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSelect(item)}
                    className="text-sm py-1.5 px-4 rounded-full border border-border hover:border-primary hover:text-primary transition-all whitespace-nowrap bg-background"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
