"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const initialContextState = {
  // ===== 00. Start Authentication =====
  token: "" as any,
  setToken: (token: any) => {},
  decodedToken: null as any,
  setDecodedToken: (token: any) => {},
  // ===== 00. End Authentication =====
};

// 1- create context, export it
export const globalContext = createContext(initialContextState);

// 2- provide context, export it
export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const path = usePathname();

  // ===== 00. Start Authentication =====
  function handleSetRouteToDirect(role: string) {
    switch (role) {
      case "ContentCreator":
        return "/content-creator/dashboard";
      case "Video Editing":
        return "/video-editor/dashboard";
      case "Social Media":
        return "/social-media/dashboard";
      case "Administrative":
        return "/administrative/dashboard";
      case "Customer Service":
        return "/customer-service/dashboard";
      case "Creative":
        return "/creative/dashboard";
      case "HR":
        return "/hr/dashboard";
      case "Accounting":
        return "/accounting/dashboard";
      case "Newsletter":
        return "/newsletter/dashboard";
      case "Out Reach":
        return "/outreach/dashboard";
      case "SEO":
        return "/seo/dashboard";
      case "OP":
        return "/op/dashboard";
      default:
        return "/";
    }
  }

  function tokenInit() {
    if (typeof window !== "undefined") {
      const tokenInitValue = localStorage.getItem("token");
      return tokenInitValue ? tokenInitValue : "";
    } else {
      return "";
    }
  }

  function decodedTokenInit() {
    if (typeof window !== "undefined") {
      const decodedTokenInitValue = localStorage.getItem("decodedToken");
      return decodedTokenInitValue ? JSON.parse(decodedTokenInitValue) : null;
    } else {
      return null;
    }
  }

  const [token, setToken] = useState<any>(tokenInit);
  const [decodedToken, setDecodedToken] = useState<any>(decodedTokenInit);

  async function checkIfUserOnCorrespondingRoute() {
    // if (decodedToken) {
    const role = decodedToken?.department[0];
    const correspondingRoutePath = handleSetRouteToDirect(role).split("/")[1];
    console.log(`correspondingRoutePath:`, correspondingRoutePath);
    console.log(`currentpath:`, path);
    if (
      !path.includes(correspondingRoutePath) &&
      !decodedToken?.department.includes("CEO")
    ) {
      const correspondingRoute = handleSetRouteToDirect(role);
      router.replace(correspondingRoute);
      console.log("~~~---***INvalid path***---~~~", path);
    } else {
      console.log("~~~---valid path---~~~");
    }
    // }
  }

  function signOut() {
    // toast("signOut ...");
    // localStorage.removeItem("token");
    // localStorage.removeItem("decodedToken");
    // setToken("");
    // setDecodedToken(null);
    // localStorage.removeItem("token");
    // localStorage.removeItem("decodedToken");
  }

  async function checkAuth() {
    // // toast("Checking authentication...");
    // const storedToken = localStorage.getItem("token");
    // const authToken = token || storedToken;
    // if (!authToken) {
    //   toast.error("No token found, redirecting to signin...");
    //   router.replace("/");
    //   return;
    // }
    // try {
    //   const res = await fetch(
    //     "https://api.machinegenius.io/authentication/check-auth",
    //     {
    //       headers: {
    //         Authorization: `Bearer ${authToken}`,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   const data = await res.json();
    //   // console.log("checkAuth data:", data);
    //   if (data.result) {
    //     // setToken(data.result.token);
    //     // setDecodedToken(data.result);
    //     // toast.success("Token is valid");
    //   } else if (data.message && data.message.name === "TokenExpiredError") {
    //     toast.error("Session expired, redirecting to signin...");
    //     // console.log('Token expired, redirecting to signin...');
    //     signOut();
    //     router.replace("/");
    //   } else if (data.message === "USER_TOKEN_IS_INVALID") {
    //     toast.error("Session expired, redirecting to signin...");
    //     // console.log('Token is invalid, Contact Technical Support!');
    //     signOut();
    //     router.replace("/");
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong! Contact Technical Support!");
    //   // console.error('Error checking auth:', error);
    //   signOut();
    //   router.replace("/");
    // }
  }

  useEffect(() => {
    if (token) {
      console.log("=+==+==There is Token=+==+==");
      // checkAuth();
    } else {
      console.log("=x==x==There is No Token==x==x=");
      console.log("Redirecting to signin...");
      router.replace("/");
    }
  }, [token]);

  useEffect(() => {
    console.log("---currentPath:", path);
    checkIfUserOnCorrespondingRoute();
  }, [path]);

  // ===== 00. End Authentication =====

  // Create a context value object
  const contextValue = {
    // ===== 00. Start Authentication =====
    token,
    setToken,
    decodedToken,
    setDecodedToken,
    // ===== 00. End Authentication =====
  };

  return (
    // to provide what i created
    <globalContext.Provider value={contextValue}>
      {children}
    </globalContext.Provider>
  );
}
