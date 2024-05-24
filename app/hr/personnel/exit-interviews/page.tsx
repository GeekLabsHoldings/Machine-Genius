"use client";
import TemplateBox from "@/app/_components/HR/03Personnel/00General/TemplateBox";
import React from "react";

export default function Page() {
  return (
    <>
      <div></div>
      <section className="grid lg:grid-cols-3 xl:grid-cols-4 gap-[2vw] items-start">
        <TemplateBox title="Fired Employee Template">
          <div>
            <p>1. What is your thinking process?</p>
            <p>2. What are your strengths?</p>
            <p>3. Describe your response to a certain situation.</p>
            <p>4. Are you a team player or a one-man show?</p>
            <p>5. What kind of work experiences do you have?</p>
            <p>6. Which editing software do you prefer?</p>
          </div>
        </TemplateBox>

        <TemplateBox title="Resigned Employee Template" />
      </section>
    </>
  );
}
