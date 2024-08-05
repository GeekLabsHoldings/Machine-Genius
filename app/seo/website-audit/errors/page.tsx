"use client"; // Directive to indicate that this file is a client component in a Next.js application.

import React from "react"; // Importing React and useState hook.

import ErrorsTable from "@/app/_components/SEO/05WebsiteAudit/ErrorsTable";

export default function Page() {
  return (
    <div className="pageHeader">
      <div className={`flex flex-col gap-[0.7vw] w-full pageHeader my-[25px]`}>
        <h3 className="text-[32px] font-bold">Errors</h3>
      </div>

      {/* Component to display the Errors Table */}
      <ErrorsTable />
    </div>
  );
}
