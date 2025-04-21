"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Sun from "/public/icons/sun.svg";
import Moon from "/public/icons/moon.svg";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}