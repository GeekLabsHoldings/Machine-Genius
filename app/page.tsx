
import Link from "next/link";
// import ArticlePreview from "./_components/ArticlePreview/ArticlePreview";

export default function Home() {
  return (
    <>
      <h1 className="text-white">hello machine genius</h1>
      <Link href="content-creator" className="text-white">content creator</Link>
    </>
  );
}