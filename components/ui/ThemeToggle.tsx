"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setDark(document.documentElement.dataset.theme === "dark"));
    return () => cancelAnimationFrame(frame);
  }, []);
  function toggle() {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("compilot-theme", next ? "dark" : "light");
    setDark(next);
  }
  return <button type="button" onClick={toggle} className="icon-button" aria-label="Toggle color theme">{dark ? "☀" : "☾"}</button>;
}
