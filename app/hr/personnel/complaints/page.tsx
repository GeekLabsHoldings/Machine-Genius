"use client";
import ComplaintsTable from '@/app/_components/HR/03Personnel/03Complaints/ComplaintsTable';
import React from 'react';

export default function page() {
  return (
    <>
      <p className='font-light my-6'>
      These are all the hiring requests and unfinished hiring processes, requested by team managers and approved by OP ( Operation Manager).<br />Make sure to go through every request in detail to find and hire the best candidate for the requested role!
      </p>
      <ComplaintsTable />
    </>
  )
}