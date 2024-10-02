"use client";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import debounce from "debounce";

const publicPaths = [
  "/",
  "/modules",
  "/about-us",
  "/contact-us",
  "/blog",
  "/privacy-security",
  "/disclaimer",
  "/careers",
];

// Define type for AuthState for better type safety
type AuthStateType = {
  token: string;
  decodedToken: any;
};

const initialContextState = {
  // ===== 00. Start Authentication =====
  authState: {
    token: "" as string,
    decodedToken: null as any,
  },
  setAuthState: (authState: AuthStateType) => {},
  handleSignOut: (message?: string) => {},
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
  const handleSetRouteToDirect = useCallback((role: string) => {
    switch (role) {
      case "content-creation":
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
      case "hr":
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
  }, []);

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

  const [authState, setAuthState] = useState<AuthStateType>(() => ({
    token: tokenInit(),
    decodedToken: decodedTokenInit(),
  }));

  const checkIfUserOnCorrespondingRoute = useCallback(() => {
    // if (!decodedToken) return;
    if (authState.decodedToken?.department.includes("CEO")) {
      // console.log("CEO has access to all routes");
      return;
    }
    const role = authState.decodedToken?.department[0];
    const route = handleSetRouteToDirect(role);
    const correspondingRoutePath = route.split("/")[1];
    // console.log(`correspondingRoutePath:`, correspondingRoutePath);
    // console.log(`currentpath:`, path);
    if (!path.includes(correspondingRoutePath)) {
      router.replace(route);
      console.log("~~~---***INvalid path***---~~~", path);
    } else {
      console.log("~~~---valid path---~~~");
    }
  }, [path, authState.decodedToken, router]);

  async function checkAuth() {
    toast("Checking authentication...");
    const authToken = authState.token || localStorage.getItem("token");
    if (!authToken) {
      handleSignOut("No token found, redirecting to signin...");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/check-auth`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const data = await res.json();
      if (data.result) {
        toast.success("Session is valid");
      } else if (data.message && data.message.name === "TokenExpiredError") {
        handleSignOut();
      } else if (data.message === "USER_TOKEN_IS_INVALID") {
        handleSignOut();
      }
    } catch (error) {
      console.error("Error checking auth:", error);
    }
  }

  const debouncedCheckAuth = useMemo(
    () => debounce(checkAuth, 1000),
    [checkAuth]
  );

  useEffect(() => {
    if (authState.token) {
      console.log("=+==+==There is Token=+==+==");
      debouncedCheckAuth();
    } else {
      console.log("=x==x==There is No Token==x==x=");
      const isPublicPath = publicPaths.some(
        (publicPath) => path === publicPath || path.startsWith(`${publicPath}/`)
      );
      if (!isPublicPath) {
        console.log("It's Not Public Path, Redirecting to signin...");
        router.replace("/");
      }
    }
    return () => {
      debouncedCheckAuth.clear(); // Clear any pending auth checks on unmount
    };
  }, [authState.token]);

  useEffect(() => {
    console.log("---currentPath:", path);
    checkIfUserOnCorrespondingRoute();
  }, [path, checkIfUserOnCorrespondingRoute]);

  const handleSignOut = useCallback(
    (message = "Session expired, redirecting to signin...") => {
      debouncedCheckAuth.clear(); // Clear any pending auth checks
      setAuthState({
        token: "",
        decodedToken: null,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("decodedToken");
      if (message !== "") {
        toast.error(message);
      }
      router.replace("/");
    },
    [router]
  );

  // ===== 00. End Authentication =====

  // Create a context value object
  const contextValue = useMemo(
    () => ({
      // ===== 00. Start Authentication =====
      authState,
      setAuthState,
      handleSignOut,
      // ===== 00. End Authentication =====
    }),
    [authState, handleSignOut]
  );

  return (
    // to provide what i created
    <globalContext.Provider value={contextValue}>
      {children}
    </globalContext.Provider>
  );
}
