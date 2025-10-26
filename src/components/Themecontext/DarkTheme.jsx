import { createContext, useEffect, useState } from "react";

export const DarkTheme = createContext()

export const DarkModeProvider = ({ children }) => {
    // Load dark mode preference from localStorage (default: false)
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved ? JSON.parse(saved) : false;
    });
    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <DarkTheme.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkTheme.Provider>
    );
};