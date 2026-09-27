"use client";

import {
    Autocomplete,
    Label,
    ListBox,
    SearchField,
    useFilter,
} from "@heroui/react";
import { cn } from "cn";

export type GlassAutocompleteOption = {
    value: string;
    label: string;
};

type Props = {
    label?: string;
    placeholder?: string;
    options: readonly GlassAutocompleteOption[];
    value?: string | null;
    onChange?: (value: string | null) => void;
    className?: string;
};

export function GlassSelectAutocomplete({
    label,
    placeholder = "Search...",
    options,
    value,
    onChange,
    className,
}: Props) {
    const { contains } = useFilter({ sensitivity: "base" });

    return (
        <Autocomplete
            className={cn("w-full", className)}
            value={value}
            onChange={(key) => onChange?.(key == null ? null : String(key))}
            placeholder={placeholder}
        >
            {label && <Label>{label}</Label>}

            <Autocomplete.Trigger
                className="glass-input flex h-11 items-center rounded-2xl px-4"
            >
                <Autocomplete.Value className="flex items-center text-sm leading-none" />
                <Autocomplete.ClearButton />
                <Autocomplete.Indicator />
            </Autocomplete.Trigger>

            <Autocomplete.Popover className="glass-panel rounded-2xl p-2">
                <Autocomplete.Filter filter={contains}>
                    <SearchField>
                        <SearchField.Group className="glass-input mb-2 rounded-xl px-3">
                            <SearchField.SearchIcon />
                            <SearchField.Input placeholder="Type to search..." />
                        </SearchField.Group>
                    </SearchField>

                    <ListBox className="glass-scrollbar max-h-72 overflow-y-auto">
                        {options.map((option) => (
                            <ListBox.Item
                                key={option.value}
                                id={option.value}
                                textValue={option.label}
                            >
                                <Label>{option.label}</Label>
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        ))}
                    </ListBox>
                </Autocomplete.Filter>
            </Autocomplete.Popover>
        </Autocomplete>
    );
}