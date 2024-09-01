"use client";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

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
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ===== 00. Start Authentication =====
  const handleSetRouteToDirect = useCallback((role: string) => {
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

  const handleSignOut = useCallback(
    (message = "Session expired, redirecting to signin...") => {
      setAuthState({
        token: "",
        decodedToken: null,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("decodedToken");
      toast.error(message);
      router.replace("/");
    },
    [router]
  );

  const debouncedCheckAuth = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(async () => {
      toast("Checking authentication...");
      const authToken = authState.token || localStorage.getItem("token");
      if (!authToken) {
        handleSignOut("No token found, redirecting to signin...");
        return;
      }
      try {
        const res = await fetch(
          "https://api.machinegenius.io/authentication/check-auth",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
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
    }, 300); // Debounce delay in milliseconds
  }, [authState.token, handleSignOut]);

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (authState.token) {
      console.log("=+==+==There is Token=+==+==");
      debouncedCheckAuth();
    } else {
      console.log("=x==x==There is No Token==x==x=");
      console.log("Redirecting to signin...");
      router.replace("/");
    }
  }, [authState.token, debouncedCheckAuth, router]);

  useEffect(() => {
    console.log("---currentPath:", path);
    checkIfUserOnCorrespondingRoute();
  }, [path, checkIfUserOnCorrespondingRoute]);

  // ===== 00. End Authentication =====

  // Create a context value object
  const contextValue = useMemo(
    () => ({
      // ===== 00. Start Authentication =====
      authState,
      setAuthState,
      // ===== 00. End Authentication =====
    }),
    [authState]
  );

  return (
    // to provide what i created
    <globalContext.Provider value={contextValue}>
      {children}
    </globalContext.Provider>
  );
}
