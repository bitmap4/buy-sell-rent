import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCallback } from "react";
import { debounce } from "lodash";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
    const debouncedOnChange = useCallback(
        debounce((value: string) => onChange(value), 300),
        [onChange]
    );

    return (
        <div className="flex w-full h-10 items-center rounded-md border border-input pl-3 
                        text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring 
                        focus-within:ring-offset-2 focus-within:border-none"
        >
            <Search className="w-6 h-6 text-gray-500" />
            <Input
                id="search"
                type="text"
                placeholder="Search..."
                className="w-full p-2 border-none placeholder:text-muted-foreground focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                    debouncedOnChange(e.target.value);
                }}
            />
        </div>
    )
}