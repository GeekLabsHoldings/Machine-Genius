import dynamic from "next/dynamic";

export default function Home() {
  const SignIn = dynamic(() => import("./signin/page"), {
    ssr: false,
  });

  return <SignIn />;
}
