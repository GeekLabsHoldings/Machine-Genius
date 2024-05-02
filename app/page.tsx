'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignIn from "./signin/page";
// import ArticlePreview from "./_components/ArticlePreview/ArticlePreview";

export default function Home() {

  const router = useRouter()

  useEffect(()=>{
    router.push('signin')
  })

  return (
    <>
      <SignIn />
    </>
  );
}