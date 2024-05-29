"use client";
import React from 'react';
// import styles from "./Prospects.module.css";
import TaskFormTable from '@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/TaskFormTable';

export default function page() {
  return (
    <section>
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <span className="text-[32px] font-bold ">Task Form</span>
      </div>

      <TaskFormTable />
    </section>
  )
}
