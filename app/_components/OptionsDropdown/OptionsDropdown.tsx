"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./OptionsDropdown.module.css";
import $ from "jquery";

/**
 * Props for the OptionsDropdown component.
 */
interface OptionsDropdownProps {
    icon: any;
    options: string[];
}

/**
 * A dropdown component that displays a list of options when clicked.
 * @param icon The icon to display in the dropdown button.
 * @param options The list of options to display in the dropdown menu.
 */
function OptionsDropdown({ icon, options }: OptionsDropdownProps) {
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (
                $(ref.current!).find(e.target as any).length === 0 &&
                !$(ref.current!).is(e.target as any)
            ) {
                setOpen(false);
            }
        });
    }, []);

    return (
        <div
            className={`flex items-center p-2 space-x-2 ${
                open ? "bg-gray-200" : ""
            } rounded hover:bg-gray-200 relative cursor-pointer`}
            ref={ref}
            onClick={() => setOpen(!open)}
        >
            <button className="flex items-center space-x-2">{icon}</button>

            <div
                className={`absolute -left-3 top-11 min-w-40 bg-white rounded-[10px] shadow-lg transform ${
                    open
                        ? "opacity-100 z-10 translate-y-0"
                        : "opacity-0 -z-10 invisible -translate-y-16"
                } overflow-clip ${styles.dropdown__items__container}`}
            >
                <ul>
                    {options.map((option, index) => (
                        <li key={index} className={`py-2 px-4 font-bold hover:bg-gray-200 ${styles.dropdown__item}`}>
                            {option}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default OptionsDropdown;
