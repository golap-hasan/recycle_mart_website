"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronRight } from "lucide-react";
import { bdLocations } from "@/constants/locations";
import { useSmartFilter } from "@/hooks/useSmartFilter";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export const LocationSelector = () => {
    const { getFilter, updateFilter } = useSmartFilter();
    const [hoveredDivision, setHoveredDivision] = useState(bdLocations[0]);
    const [isOpen, setIsOpen] = useState(false);
    const selectedLocation = getFilter("location");

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-10 rounded-full border-border/40 bg-background pl-4 pr-8 text-sm font-normal text-muted-foreground min-w-48 lg:w-56 justify-start relative group hover:border-primary/40 transition-all shadow-sm"
                >
                    <MapPin className="mr-2 h-4 w-4 text-primary shrink-0 transition-transform group-hover:scale-110" />
                    <span className="truncate flex-1 text-left text-foreground/80">
                      {selectedLocation || "Select Location"}
                    </span>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 group-hover:opacity-100 transition-opacity">
                       <ChevronRight className={cn("h-3 w-3 rotate-90 transition-transform duration-200", isOpen && "-rotate-90")} />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-[480px] p-0 overflow-hidden rounded-3xl shadow-2xl border-border/40 bg-background/95 backdrop-blur-sm" 
              align="start"
              sideOffset={8}
            >
                <div className="flex h-[380px]">
                    {/* Divisions List */}
                    <div className="w-[180px] border-r border-border/40 bg-muted/10 py-3">
                        <div className="px-5 py-2 mb-2">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Divisions</p>
                        </div>
                        <ScrollArea className="h-[calc(100%-40px)]">
                            <div className="px-2 space-y-0.5">
                                {bdLocations.map((loc) => (
                                    <button
                                        key={loc.division}
                                        onMouseEnter={() => setHoveredDivision(loc)}
                                        className={cn(
                                            "flex w-full items-center justify-between px-3 py-2.5 text-sm rounded-xl transition-all duration-200",
                                            hoveredDivision.division === loc.division 
                                              ? "bg-primary text-primary-foreground shadow-md translate-x-1" 
                                              : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                                        )}
                                    >
                                        <span className="font-medium">{loc.division}</span>
                                        <ChevronRight className={cn("h-3.5 w-3.5 opacity-60", hoveredDivision.division === loc.division && "opacity-100")} />
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Districts List */}
                    <div className="flex-1 py-3 bg-background/50">
                        <div className="px-6 py-2 mb-2 flex items-center justify-between">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Districts in {hoveredDivision.division}</p>
                           <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{hoveredDivision.districts.length}</span>
                        </div>
                        <ScrollArea className="h-[calc(100%-40px)]">
                            <div className="px-3 grid grid-cols-1 gap-0.5">
                                {hoveredDivision.districts.map((district) => (
                                    <button
                                        key={district}
                                        onClick={() => {
                                          updateFilter("location", district);
                                          setIsOpen(false);
                                        }}
                                        className={cn(
                                            "flex w-full items-center px-4 py-2.5 text-sm rounded-xl transition-all duration-200 text-left",
                                            selectedLocation === district 
                                              ? "bg-primary/10 text-primary font-bold shadow-inner" 
                                              : "text-foreground/70 hover:bg-primary/5 hover:text-primary hover:translate-x-1"
                                        )}
                                    >
                                        <div className={cn(
                                          "w-1.5 h-1.5 rounded-full mr-3 transition-all",
                                          selectedLocation === district ? "bg-primary scale-125" : "bg-muted-foreground/30"
                                        )} />
                                        {district}
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
                
                {/* Footer (Optional) */}
                <div className="p-3 bg-muted/20 border-t border-border/40 flex items-center justify-between px-6">
                    <p className="text-[11px] text-muted-foreground italic">
                      Tip: Select a district to find items near you.
                    </p>
                    {selectedLocation && (
                      <button 
                        onClick={() => { updateFilter("location", null); setIsOpen(false); }}
                        className="text-[11px] font-bold text-primary hover:underline"
                      >
                        Clear Selection
                      </button>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};
