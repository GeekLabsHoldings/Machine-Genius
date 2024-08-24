import dynamic from "next/dynamic";

export default function Home() {
  const SignIn = dynamic(() => import("./signin/SignIn"), {
    ssr: false,
  });

  return <SignIn />;
}
