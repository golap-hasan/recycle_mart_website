"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { X, SlidersHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "@/types/category.type";
import { useSmartFilter } from "@/hooks/useSmartFilter";

export const sortOptions = [
  { value: "newest", label: "Date: Newest first" },
  { value: "oldest", label: "Date: Oldest first" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export const locationOptions = [
  { value: "dhaka", label: "Dhaka" },
  { value: "chattogram", label: "Chattogram" },
  { value: "sylhet", label: "Sylhet" },
  { value: "rajshahi", label: "Rajshahi" },
];

export type FiltersProps = {
  categories: Category[];
  showAsSheet?: boolean;
};

const FiltersContent = ({ categories }: { categories: Category[] }) => {
  const { toggleFilter, updateBatch, clearAll, getArrayFilter, isSelected, getFilter } = useSmartFilter();

  const selectedCategories = getArrayFilter("category");
  const selectedConditions = getArrayFilter("condition");
  
  const min = getFilter("min") ? Number(getFilter("min")) : 0;
  const max = getFilter("max") ? Number(getFilter("max")) : 100000;
  
  // Local state for smooth slider interaction
  const [localPrice, setLocalPrice] = useState<[number, number]>([min, max]);

  const hasPriceFilter = getFilter("min") || getFilter("max");
  const appliedCount = selectedCategories.length + selectedConditions.length + (hasPriceFilter ? 1 : 0);

  return (
    <>
      <header className="flex items-center justify-between space-y-6">
        <div>
          <p className="text-sm font-semibold text-foreground">Refine Results</p>
          <p className="text-xs text-muted-foreground">{appliedCount} filter{appliedCount === 1 ? "" : "s"} applied</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-primary"
          onClick={() => clearAll(["page", "limit", "sort", "location"])}
        >
          Reset
        </Button>
      </header>

      <Accordion type="multiple" defaultValue={["category", "condition", "price"]} className="space-y-4">
        {/* Category Filter */}
        <AccordionItem value="category" className="rounded-2xl border border-border/40 bg-background">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground">
            Category
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat._id} className="flex items-center gap-3">
                  <Checkbox
                    id={`cat-${cat.slug}`}
                    checked={isSelected("category", cat.slug)}
                    onCheckedChange={() => toggleFilter("category", cat.slug)}
                  />
                  <label htmlFor={`cat-${cat.slug}`} className="text-sm text-muted-foreground cursor-pointer">
                    {cat.name}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Condition Filter */}
        <AccordionItem value="condition" className="rounded-2xl border border-border/40 bg-background">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground">
            Condition
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <ul className="space-y-3">
              {["new", "used"].map((cond) => (
                <li key={cond} className="flex items-center gap-3">
                  <Checkbox
                    id={`cond-${cond}`}
                    checked={isSelected("condition", cond)}
                    onCheckedChange={() => toggleFilter("condition", cond)}
                  />
                  <label htmlFor={`cond-${cond}`} className="text-sm text-muted-foreground capitalize cursor-pointer">
                    {cond}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Filter */}
        <AccordionItem value="price" className="rounded-2xl border border-border/40 bg-background">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground">
            Price Range (BDT)
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Select Range</span>
                  <span className="text-xs text-muted-foreground">
                    ৳ {localPrice[0].toLocaleString()} - ৳ {localPrice[1].toLocaleString()}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={100000}
                  step={100}
                  value={localPrice}
                  onValueChange={(val) => setLocalPrice(val as [number, number])}
                  onValueCommit={(val) => updateBatch({ 
                    min: val[0] === 0 ? null : val[0], 
                    max: val[1] === 100000 ? null : val[1] 
                  })}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Min: ৳ 0</span>
                <span>Max: ৳ 100k+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Applied Chips */}
      {(selectedCategories.length > 0 || selectedConditions.length > 0) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedCategories.map((slug) => (
            <button
              key={slug}
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              onClick={() => toggleFilter("category", slug)}
            >
              {categories.find(c => c.slug === slug)?.name || slug}
              <X className="h-3 w-3" />
            </button>
          ))}
          {selectedConditions.map((cond) => (
            <button
              key={cond}
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              onClick={() => toggleFilter("condition", cond)}
            >
              {cond}
              <X className="h-3 w-3" />
            </button>
          ))}
        </div>
      )}
    </>
  );
};

const Filters = ({ categories = [], showAsSheet = false }: FiltersProps) => {
  if (showAsSheet) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="lg:hidden">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85%] sm:max-w-[85%]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Refine your search results.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-120px)] px-2 mt-4">
            <FiltersContent categories={categories} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="rounded-3xl border border-border/40 bg-background/80 p-6 shadow-sm sticky top-24">
      <FiltersContent categories={categories} />
    </aside>
  );
};

export default Filters;
