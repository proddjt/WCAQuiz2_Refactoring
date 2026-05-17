import { fetchSearchBar } from "@/data/search";
import { useDebouncedCallback } from "@mantine/hooks";
import { useEffect, useState, useTransition } from "react";

export default function useSearch(mode: string){
    const [term, setTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isSearching, startTransition] = useTransition();

    const search = useDebouncedCallback((value: string) => {
        if (!value) {
            setResults([]);
            return;
        }
        startTransition(async() => {
            const data = await fetchSearchBar(value, mode);
            setResults(data);
        })
    }, 300);

    const resetResults = () => {
        setResults([])
        setTerm("");
    };

    useEffect(() => {
        search(term);
    }, [search, term]);
    
    return {results, isSearching, term, setTerm, resetResults}
}