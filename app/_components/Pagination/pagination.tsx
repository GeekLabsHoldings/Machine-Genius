'use client';
import React from "react";
import styles from './pagination.module.css';
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
// customized arrows component to handle pagination
export const SimplePagination =()=> {
  const [active, setActive] = React.useState(1);
 
  const next = () => {
    if (active === 2) return;
 
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
  };
 
  return (
    <div className="flex items-center gap-[1vw]">

      <IconButton
              className={styles.iconButton}
              size="sm"
              variant="text"
              onClick={prev}
              disabled={active === 1} 
              placeholder={undefined} 
              onPointerEnterCapture={undefined} 
              onPointerLeaveCapture={undefined}      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>

      <IconButton
              className={styles.iconButton}
              size="sm"
              variant="text"
              onClick={next}
              disabled={active === 2} 
              placeholder={undefined} 
              onPointerEnterCapture={undefined} 
              onPointerLeaveCapture={undefined}      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}