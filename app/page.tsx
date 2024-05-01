'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import ArticlePreview from "./_components/ArticlePreview/ArticlePreview";

export default function Home() {

  const router = useRouter()

  useEffect(()=>{
    router.push('signin')
  })

  return (
    <>
      <h1 className="text-white">hello machine genius</h1>
      <Link href="signin" className="text-white"> Sign In</Link>
    </>
  );
}