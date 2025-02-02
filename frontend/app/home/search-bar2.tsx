import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// search bar with input box and search icon on the left

export function SearchBar() {
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
            />
        </div>
    )
}

// flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm 
// transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium 
// file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none 
// focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 
// md:text-sm w-full