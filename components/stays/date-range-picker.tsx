 "use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  value?: { from?: string; to?: string };
  onChange?: (range: { from?: string; to?: string }) => void;
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const selected: DateRange | undefined = React.useMemo(() => {
    if (!value?.from && !value?.to) return undefined;
    return {
      from: value.from
        ? (() => {
            const [year, month, day] = value.from.split("-").map(Number);
            return new Date(year, month - 1, day);
          })()
        : undefined,
      to: value.to
        ? (() => {
            const [year, month, day] = value.to.split("-").map(Number);
            return new Date(year, month - 1, day);
          })()
        : undefined,
    };
  }, [value]);

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) {
      onChange?.({});
      return;
    }

    // Use local dates (not UTC) to avoid off-by-one issues in timezones
    const from = range.from ? format(range.from, "yyyy-MM-dd") : undefined;
    const to = range.to ? format(range.to, "yyyy-MM-dd") : from;

    onChange?.({ from, to });
  };

  const label = React.useMemo(() => {
    if (selected?.from && selected.to) {
      return `${format(selected.from, "MMM dd, yyyy")} – ${format(
        selected.to,
        "MMM dd, yyyy"
      )}`;
    }
    if (selected?.from) {
      return format(selected.from, "MMM dd, yyyy");
    }
    return "Select dates";
  }, [selected]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            data-empty={!selected}
            className={cn(
              "w-full justify-start text-left text-sm font-normal",
              !selected && "text-neutral-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected?.from ? (
              selected.to ? (
                <>
                  {format(selected.from, "MMM dd, yyyy")} –{" "}
                  {format(selected.to, "MMM dd, yyyy")}
                </>
              ) : (
                format(selected.from, "MMM dd, yyyy")
              )
            ) : (
              <span>Select dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            numberOfMonths={2}
            selected={selected}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

