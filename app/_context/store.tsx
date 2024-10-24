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
import debounce from "debounce";
import useSessionStorage from "../_hooks/useSessionStorage";
import { io, Socket } from "socket.io-client";

const publicPaths = [
  "/",
  "/modules",
  "/about-us",
  "/contact-us",
  "/blog",
  "/privacy-security",
  "/disclaimer",
  "/careers",
  "/interview-schedule",
];

const announcementIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    height="40px"
    width="40px"
    version="1.1"
    id="Layer_1"
    viewBox="0 0 239.563 239.563"
  >
    <g>
      <g>
        <g>
          <path d="M146.962,36.978h-1.953L85.568,69.611H42.605C19.113,69.611,0,88.723,0,112.216c0,21.012,15.301,38.474,35.334,41.943     L21.56,202.585h47.523l13.584-47.756h2.901l59.443,32.628h1.953c12.585,0,22.826-10.239,22.826-22.826V59.803     C169.787,47.219,159.546,36.978,146.962,36.978z M57.592,187.366H41.71l8.352-29.364h15.882L57.592,187.366z M109.459,150.581     l-19.988-10.972H42.605c-15.103,0-27.388-12.29-27.388-27.393c0-15.103,12.285-27.388,27.388-27.388h46.866l19.988-10.974     V150.581z M154.57,164.631c0,3.637-2.567,6.683-5.978,7.431l-23.916-13.127V65.502l23.916-13.13     c3.414,0.748,5.978,3.797,5.978,7.434V164.631z" />
          <path d="M198.989,79.377L188.106,90.26c5.623,7.789,8.976,17.32,8.976,27.637c0,10.32-3.353,19.851-8.976,27.637l10.883,10.883     c8.326-10.629,13.31-24,13.31-38.52C212.299,103.377,207.315,90.007,198.989,79.377z" />
          <path d="M218.358,60.009l-10.794,10.794c10.482,12.856,16.782,29.252,16.782,47.094c0,17.845-6.3,34.238-16.782,47.094     l10.794,10.794c13.216-15.648,21.205-35.849,21.205-57.888S231.574,75.657,218.358,60.009z" />
        </g>
      </g>
    </g>
  </svg>
);

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
      case "video-editing":
        return "/video-editor/dashboard";
      case "social-media":
        return "/social-media/dashboard";
      case "administrative":
        return "/administrative/dashboard";
      case "customer-service":
        return "/customer-service/dashboard";
      case "creative":
        return "/creative/dashboard";
      case "hr":
        return "/hr/dashboard";
      case "accounting":
        return "/accounting/dashboard";
      case "news-letter":
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
    const decodedToken = authState.decodedToken;
    if (!decodedToken) return;
    if (decodedToken?.department.includes("ceo")) {
      // console.log("CEO has access to all routes");
      return;
    }
    const departments = decodedToken?.department;

    // Get all allowed route paths for the user's departments
    const allowedRoutePaths = departments.map((role: string) => {
      const route = handleSetRouteToDirect(role);
      return route.split("/")[1]; // Extract the path segment
    });
    // console.log(`allowedRoutePaths:`, allowedRoutePaths);
    // console.log(`currentpath:`, path);
    // Check if the current path includes any of the allowed paths
    const isValidPath = allowedRoutePaths.some((routePath: string) =>
      path.includes(routePath)
    );
    if (!isValidPath) {
      if (departments.length > 0) {
        // Redirect to the first department's dashboard or implement a different logic as needed
        const redirectRoute = handleSetRouteToDirect(departments[0]);
        router.replace(redirectRoute);
        console.log(
          "~~~---***Invalid path***---~~~",
          path,
          "Redirecting to:",
          redirectRoute
        );
      } else {
        // Handle case where no departments are assigned
        router.replace("/");
        console.log(
          "~~~---***No department assigned***---~~~ Redirecting to home"
        );
      }
    } else {
      console.log("~~~---Valid path---~~~");
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
    const isPublicPath = publicPaths.some(
      (publicPath) => path === publicPath || path.startsWith(`${publicPath}/`)
    );
    if (authState.token && !isPublicPath) {
      console.log("=+==+==There is Token=+==+==");
      debouncedCheckAuth();
    } else {
      // console.log("=x==x==There is No Token==x==x=");
      console.log("=x==x==Token missing or path is public==x==x=");
      if (!isPublicPath && !authState.token) {
        // console.log("It's Not Public Path, Redirecting to signin...");
        console.log(
          "It's Not Public Path and No Token, Redirecting to signin..."
        );
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
  const [globalBrands, setGlobalBrands] = useState<
    { brandId: string; brandName: string }[]
  >([]);

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
    getBrands();
    const isPublicPath = publicPaths.some(
      (publicPath) => path === publicPath || path.startsWith(`${publicPath}/`)
    );
    if (typeof window !== "undefined" && !isPublicPath) {
      const brands = sessionStorage.getItem("MG-globalBrands");
      if (!brands || JSON.parse(brands).length === 0) {
        getBrands();
      }
    }
  }, [path]);

  async function getBrands() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/brand/get-all-brands?limit=9999`,
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
        // handleSignOut();
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
        sessionStorage.setItem("MG-globalBrands", JSON.stringify(brands));
      } else {
        // toast.error("Something went wrong!");
      }
    } catch (error) {
      // toast.error("Something went wrong!");
      console.error("Error getBrands:", error);
    }
  }

  async function getBrandsPlatform(
    platform: string
  ): Promise<string[] | undefined> {
    const params = new URLSearchParams({ platform: platform.toUpperCase() });
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/user/brand/get-brands-platform?${params.toString()}`,
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
      if (json && Array.isArray(json) && json.length > 0) {
        return json.map((e) => e.brand_name);
      } else {
        return [];
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

  // ===== 02. Start Socket =====
  const socketRef = useRef<Socket | null>(null);
  const processedAnnouncementIdsRef = useRef(new Set());

  // Function to retrieve the token
  function getToken() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      return token ? `Bearer ${token}` : null;
    } else {
      return `Bearer ${authState?.token}` || null;
    }
  }

  useEffect(() => {
    if (!authState.token) return; // Wait until the token is available

    if (socketRef.current) {
      // If the socket is already initialized, do nothing
      console.log("Socket already initialized");
      return;
    }

    // Establish a new socket connection
    // todo: change to .env
    const socket = io("wss://api-development.machinegenius.io", {
      // reconnectionAttempts: 5,
      auth: {
        token: getToken(),
      },
      transports: ["websocket"], // Use WebSocket transport
    });

    // Store the socket instance in the ref
    socketRef.current = socket;

    // Set up event listeners
    socket.on("connect", () => {
      console.log("Connected to socket server");
      toast.success("Connected to announcement socket server");
      // Clear the processedTweetIds set
      processedAnnouncementIdsRef.current.clear();
    });

    socket.on("BroadCastMessage", (data) => {
      console.log("Received BroadCastMessage data:", data);

      // Check if we've already processed this announcementId`
      if (processedAnnouncementIdsRef.current.has(data.message)) {
        console.log(
          `Announcement ${data.announcementId} already processed, skipping.`
        );
        return;
      }

      // Mark this tweetId as processed
      processedAnnouncementIdsRef.current.add(data.message);

      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } w-1/2 bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            {/* Icon Section */}
            <div className="flex-shrink-0 flex items-center px-4 py-4">
              {announcementIcon}
            </div>

            {/* Content Section */}
            <div
              className="flex-1 w-0 p-4 cursor-pointer"
              onClick={() => {
                toast.dismiss(t.id); // Dismiss the toast
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">
                  {data.messageType}
                </p>
                <span className="ml-2 text-xs text-gray-500">
                  {data.firstName} {data.lastName}
                </span>
              </div>
              <div className="mt-1">
                <p className="text-sm text-gray-600">{data.message}</p>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-500 hover:bg-gray-100 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        ),
        {
          duration: 7000,
          position: "top-right",
        }
      );
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from announcement socket server");
      toast.error("Disconnected from announcement socket server");
    });

    // Clean up the socket connection and event listeners on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off("connect");
        socketRef.current.off("BroadCastMessage");
        socketRef.current.off("disconnect");
        socketRef.current = null;
      }
    };
  }, []);

  // ===== 02. End Socket =====

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
