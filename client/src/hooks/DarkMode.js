import React from "react";

export default function DarkMode(){
    React.useEffect(() => {
        const root = window.document.documentElement;

        root.classList.add('dark');
    }, []);
}