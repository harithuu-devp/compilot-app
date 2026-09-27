const originalWarn = console.warn;

console.warn = (...args) => {
  const message = args
    .map((arg) => (typeof arg === "string" ? arg : ""))
    .join(" ");

  if (
    message.includes("If you do not provide a visible label") ||
    message.includes("aria-label or aria-labelledby")
  ) {
    return;
  }

  originalWarn(...args);
};
