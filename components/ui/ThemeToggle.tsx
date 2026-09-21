"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        setDark(
            document.documentElement.dataset.theme === "dark"
        );
    }, []);

    function toggle() {
        const next = !dark;
        const theme = next ? "dark" : "light";

        document.documentElement.dataset.theme = theme;
        localStorage.setItem("compilot-theme", theme);

        setDark(next);
    }

    return (
        <button
            type="button"
            onClick={toggle}
            className="icon-button"
            aria-label="Toggle color theme"
        >
            {dark ? "☀" : "☾"}
        </button>
    );
}