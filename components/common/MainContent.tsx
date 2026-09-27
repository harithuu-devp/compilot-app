"use client";

import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_EXPANDED_WIDTH } from "./Sidebar";

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** True when the viewport is desktop sized. Hydration safe. */
export function useIsDesktop() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export type MainContentProps = {
  collapsed: boolean;
  children: React.ReactNode;
};

export function MainContent({ collapsed, children }: MainContentProps) {
  const isDesktop = useIsDesktop();

  return (
    <motion.main
      animate={{ marginLeft: isDesktop ? (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH) : 0 }}
      initial={false}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative mt-[88px] min-h-[calc(100vh-88px)] px-5 pb-30 md:px-6 md:pb-16 lg:px-8 lg:pb-12"
    >
      {children}
    </motion.main>
  );
}
