import * as React from "react"
import { Calendar as CalendarIcon, ChevronDown, Check } from "lucide-react"
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear } from "date-fns"
import { vi } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps {
  className?: string
  onChange?: (range: DateRange | undefined) => void
}

export function DateRangePicker({
  className,
  onChange,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  })

  const [activePreset, setActivePreset] = React.useState<string>("7 ngày qua")

  const presets = [
    {
      group: "Theo ngày",
      items: [
        { label: "Hôm nay", getValue: () => ({ from: new Date(), to: new Date() }) },
        { label: "Hôm qua", getValue: () => ({ from: subDays(new Date(), 1), to: subDays(new Date(), 1) }) },
      ],
    },
    {
      group: "Theo tuần",
      items: [
        { label: "Tuần này", getValue: () => ({ from: startOfWeek(new Date(), { weekStartsOn: 1 }), to: endOfWeek(new Date(), { weekStartsOn: 1 }) }) },
        { label: "Tuần trước", getValue: () => ({ from: startOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }), to: endOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }) }) },
        { label: "7 ngày qua", getValue: () => ({ from: subDays(new Date(), 6), to: new Date() }) },
      ],
    },
    {
      group: "Theo tháng",
      items: [
        { label: "Tháng này", getValue: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
        { label: "Tháng trước", getValue: () => ({ from: startOfMonth(subDays(new Date(), 30)), to: endOfMonth(subDays(new Date(), 30)) }) },
        { label: "30 ngày qua", getValue: () => ({ from: subDays(new Date(), 29), to: new Date() }) },
      ],
    },
    {
      group: "Theo quý",
      items: [
        { label: "Quý này", getValue: () => ({ from: startOfQuarter(new Date()), to: endOfQuarter(new Date()) }) },
        { label: "Quý trước", getValue: () => ({ from: startOfQuarter(subDays(new Date(), 90)), to: endOfQuarter(subDays(new Date(), 90)) }) },
      ],
    },
    {
      group: "Theo năm",
      items: [
        { label: "Năm nay", getValue: () => ({ from: startOfOfYear(new Date()), to: endOfYear(new Date()) }) },
        { label: "Năm trước", getValue: () => ({ from: startOfYear(subDays(new Date(), 365)), to: endOfYear(subDays(new Date(), 365)) }) },
      ],
    },
  ]

  // Helper for Year (startOfYear was missing in my quick thought but date-fns has it)
  function startOfOfYear(d: Date) { return startOfYear(d) }

  const handleSelectPreset = (label: string, range: DateRange) => {
    setActivePreset(label)
    setDate(range)
    if (onChange) onChange(range)
  }

  const handleCalendarChange = (newRange: DateRange | undefined) => {
    setDate(newRange)
    setActivePreset("Tùy chọn")
    if (onChange) onChange(newRange)
  }

  return (
    <div className={cn("flex flex-col sm:flex-row items-center gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-10 px-4 justify-between font-medium min-w-[160px]",
              !activePreset && "text-muted-foreground"
            )}
          >
            {activePreset || "Chọn nhanh"}
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[650px] p-5 grid grid-cols-5 gap-6" align="start">
          {presets.map((group) => (
            <div key={group.group} className="space-y-3">
              <div className="font-semibold text-sm">{group.group}</div>
              <div className="flex flex-col gap-1 items-start">
                {group.items.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSelectPreset(item.label, item.getValue())}
                    className={cn(
                      "text-sm py-1.5 px-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all whitespace-nowrap bg-background w-full text-left flex items-center justify-between",
                      activePreset === item.label && "border-primary text-primary bg-primary/5"
                    )}
                  >
                    {item.label}
                    {activePreset === item.label && <Check className="h-3 w-3" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </PopoverContent>
      </Popover>

      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "h-10 px-4 justify-start text-left font-normal min-w-[280px]",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd/MM/yyyy")} -{" "}
                    {format(date.to, "dd/MM/yyyy")}
                  </>
                ) : (
                  format(date.from, "dd/MM/yyyy")
                )
              ) : (
                <span>Chọn khoảng ngày</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleCalendarChange}
              numberOfMonths={2}
              locale={vi}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
