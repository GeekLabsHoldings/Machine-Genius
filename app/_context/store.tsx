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
import useSessionStorage from "../_hooks/useSessionStorage";

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

// ===== 00. Start Authentication =====
// Define type for AuthState for better type safety
type AuthStateType = {
  token: string;
  decodedToken: any;
};
// ===== 00. End Authentication =====

interface ContextState {
  // ===== 00. Start Authentication =====
  authState: AuthStateType;
  setAuthState: (authState: AuthStateType) => void;
  handleSignOut: (message?: string) => void;
  // ===== 00. End Authentication =====
  // ===== 01. Start Global Brands =====
  globalBrands: GlobalBrands[];
  setGlobalBrands: (brands: GlobalBrands[]) => void;
  brandMap: { [key: string]: string };
  brandIdMap: { [key: string]: string };
  brandOptions: string[];
  selectedBrandId: string;
  setSelectedBrandId: (brandId: string) => void;
  getBrandsPlatform: (platform: string) => void;
  // ===== 01. End Global Brands =====
}

// ===== 01. Start Global Brands =====
// Define interface for Brand
interface IBrand {
  _id: string;
  brand_name: string;
  description: string;
  aquisition_date: string; // ISO date string
  niche: string;
  __v: number;
  type?: string;
  parentId?: string;
}

interface GlobalBrands {
  brandId: string;
  brandName: string;
}
// ===== 01. End Global Brands =====

const initialContextState: ContextState = {
  // ===== 00. Start Authentication =====
  authState: {
    token: "" as string,
    decodedToken: null as any,
  },
  setAuthState: (authState: AuthStateType) => {},
  handleSignOut: (message?: string) => {},
  // ===== 00. End Authentication =====
  // ===== 01. Start Global Brands =====
  globalBrands: [],
  setGlobalBrands: (brands: GlobalBrands[]) => {},
  brandMap: {},
  brandIdMap: {},
  brandOptions: [],
  selectedBrandId: "",
  setSelectedBrandId: (brandId: string) => {},
  getBrandsPlatform: (platform: string) => {},
  // ===== 01. End Global Brands =====
};

// 1- create context, export it
export const globalContext = createContext<ContextState>(initialContextState);

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
    if (authState.decodedToken?.department.includes("ceo")) {
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

  // ===== 01. Start Global Brands =====
  const [globalBrands, setGlobalBrands] = useSessionStorage<
    { brandId: string; brandName: string }[]
  >("MG-globalBrands", [
    { brandId: "66fcfb7157531aaf2dca2685", brandName: "Street Politics" },
    { brandId: "66fcfb8c57531aaf2dca2686", brandName: "Investorcracy" },
    { brandId: "66fcfbf557531aaf2dca2688", brandName: "Movie Myth" },
    {
      brandId: "66fcfc3057531aaf2dca2689",
      brandName: "Street Politics Canada",
    },
    { brandId: "66fcfc5c57531aaf2dca268a", brandName: "Street Politics UK" },
    {
      brandId: "66fcfc7957531aaf2dca268b",
      brandName: "Street Politics Africa",
    },
  ]);

  // Lookup for brandId by brandName
  const brandMap = useMemo(
    () =>
      globalBrands.reduce((map: { [key: string]: string }, brand) => {
        map[brand.brandName] = brand.brandId;
        return map;
      }, {}),
    [globalBrands]
  );

  // Lookup for brandName by brandId
  const brandIdMap = useMemo(
    () =>
      globalBrands.reduce((map: { [key: string]: string }, brand) => {
        map[brand.brandId] = brand.brandName;
        return map;
      }, {}),
    [globalBrands]
  );

  const brandOptions = useMemo(() => {
    return globalBrands.map((brand) => brand.brandName);
  }, [globalBrands]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const brands = sessionStorage.getItem("MG-globalBrands");
      if (!brands) {
        getBrands();
      }
    }
  }, []);

  async function getBrands() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/get-all-brands?limit=9999`,
        {
          headers: {
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json: IBrand[] = await res.json();
      if (json && json.length > 0) {
        const brands: GlobalBrands[] = json.map((ele) => {
          return {
            brandId: ele._id,
            brandName: ele.brand_name,
          };
        });
        setGlobalBrands(brands);
      } else {
        // toast.error("Something went wrong!");
      }
    } catch (error) {
      // toast.error("Something went wrong!");
      console.error("Error getBrands:", error);
    }
  }

  async function getBrandsPlatform(platform: string) {
    const urlencoded = new URLSearchParams();
    urlencoded.append("platform", platform.toUpperCase());
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/get-brands-platform`,
        {
          headers: {
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
          body: urlencoded,
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json: IBrand[] = await res.json();
      if (json && json.length > 0) {
        return json.map((e) => e.brand_name);
      } else {
        // toast.error("Something went wrong!");
      }
    } catch (error) {
      // toast.error("Something went wrong!");
      console.error("Error getBrandsPlatform:", error);
    }
  }

  const [selectedBrandId, setSelectedBrandId] = useSessionStorage<string>(
    "MG-selectedBrandId",
    "",
    { isSerializable: false }
  );
  // ===== 01. End Global Brands =====

  // Create a context value object
  const contextValue: ContextState = {
    // ===== 00. Start Authentication =====
    authState,
    setAuthState,
    handleSignOut,
    // ===== 00. End Authentication =====
    // ===== 01. Start Global Brands =====
    globalBrands,
    setGlobalBrands,
    brandMap,
    brandIdMap,
    brandOptions,
    selectedBrandId,
    setSelectedBrandId,
    getBrandsPlatform,
    // ===== 01. End Global Brands =====
  };

  return (
    // to provide what i created
    <globalContext.Provider value={contextValue}>
      {children}
    </globalContext.Provider>
  );
}
