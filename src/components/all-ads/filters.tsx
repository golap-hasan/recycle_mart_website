"use client";

import { useEffect, useMemo, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterGroup = {
  id: string;
  title: string;
  options?: FilterOption[];
  type: "checkbox" | "slider";
  sliderRange?: [number, number];
  sliderStep?: number;
};

const defaultFilters: FilterGroup[] = [
  {
    id: "category",
    title: "Category",
    type: "checkbox",
    options: [
      { label: "Mobiles", value: "mobiles" },
      { label: "Vehicles", value: "vehicles" },
      { label: "Property", value: "property" },
      { label: "Electronics", value: "electronics" },
      { label: "Jobs", value: "jobs" },
      { label: "Services", value: "services" },
    ],
  },
  {
    id: "condition",
    title: "Condition",
    type: "checkbox",
    options: [
      { label: "New", value: "new" },
      { label: "Used", value: "used" },
    ],
  },
  {
    id: "price",
    title: "Price Range (BDT)",
    type: "slider",
    sliderRange: [0, 50000],
    sliderStep: 20,
  },
];

export type SelectedFilters = {
  [groupId: string]: string[] | number[];
};

type FiltersProps = {
  groups?: FilterGroup[];
  onChange?: (selected: SelectedFilters) => void;
};

const Filters = ({ groups = defaultFilters, onChange }: FiltersProps) => {
  const [selected, setSelected] = useState<SelectedFilters>({});

  const appliedCount = useMemo(
    () =>
      Object.values(selected).reduce((count, value) => {
        if (Array.isArray(value)) {
          return count + value.length;
        }
        return count;
      }, 0),
    [selected]
  );

  const selectedChips = useMemo(() => {
    const entries: { groupId: string; value: string }[] = [];
    Object.entries(selected).forEach(([groupId, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (typeof item === "string") {
            entries.push({ groupId, value: item });
          }
        });
      }
    });
    return entries;
  }, [selected]);

  const updateSelection = (groupId: string, value: string) => {
    setSelected((prev) => {
      const prevValues = (prev[groupId] as string[]) ?? [];
      const nextValues = prevValues.includes(value)
        ? prevValues.filter((item) => item !== value)
        : [...prevValues, value];
      return { ...prev, [groupId]: nextValues };
    });
  };

  const updateSlider = (groupId: string, value: number[]) => {
    setSelected((prev) => ({ ...prev, [groupId]: value }));
  };

  const clearFilters = () => {
    setSelected({});
  };

  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]);

  return (
    <aside className="space-y-6 rounded-3xl border border-border/40 bg-background/80 p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Refine Results</p>
          <p className="text-xs text-muted-foreground">{appliedCount} filter{appliedCount === 1 ? "" : "s"} applied</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-primary"
          onClick={clearFilters}
        >
          Reset
        </Button>
      </header>

      <Accordion type="multiple" defaultValue={groups.map((group) => group.id)} className="space-y-4">
        {groups.map((group) => (
          <AccordionItem key={group.id} value={group.id} className="rounded-2xl border border-border/40 bg-background">
            <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground">
              {group.title}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              {group.type === "checkbox" && group.options ? (
                <ul className="space-y-3">
                  {group.options.map((option) => {
                    const isChecked = (selected[group.id] as string[] | undefined)?.includes(option.value);
                    return (
                      <li key={option.value} className="flex items-center gap-3">
                        <Checkbox
                          id={`${group.id}-${option.value}`}
                          checked={isChecked}
                          onCheckedChange={() => updateSelection(group.id, option.value)}
                        />
                        <label
                          htmlFor={`${group.id}-${option.value}`}
                          className="text-sm text-muted-foreground"
                        >
                          {option.label}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              ) : null}

              {group.type === "slider" && group.sliderRange ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Select Range</span>
                      <span className="text-xs text-muted-foreground">
                        ৳ {(selected[group.id] as number[])?.[0]?.toLocaleString() ?? group.sliderRange[0].toLocaleString()} - 
                        ৳ {(selected[group.id] as number[])?.[1]?.toLocaleString() ?? group.sliderRange[1].toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      min={group.sliderRange[0]}
                      max={group.sliderRange[1]}
                      step={group.sliderStep ?? 1}
                      value={(selected[group.id] as number[]) ?? [group.sliderRange[0], group.sliderRange[1]]}
                      onValueChange={(value) => updateSlider(group.id, value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Min: ৳ {group.sliderRange[0].toLocaleString()}</span>
                    <span>Max: ৳ {group.sliderRange[1].toLocaleString()}</span>
                  </div>
                </div>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {selectedChips.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {selectedChips.map(({ groupId, value }) => (
            <button
              key={`${groupId}-${value}`}
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              onClick={() => updateSelection(groupId, value)}
            >
              {value}
              <X className="h-3 w-3" />
            </button>
          ))}
        </div>
      ) : null}
    </aside>
  );
};

export default Filters;
