"use client";

import { useTheme } from "next-themes";
import React from "react";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const colors = {
        bg: isDark ? "#1E1B18" : "#F5F0E1",
        text: isDark ? "#F2E9E1" : "#3B2F2F",
    };

    return (
        <div
            className="transition-colors duration-500"
            style={{
                background: colors.bg,
                color: colors.text,
                minHeight: "100%",
            }}
        >
            {children}
        </div>
    );
};

export default ThemeWrapper;
