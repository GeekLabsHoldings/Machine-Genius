"use client"; // Indicate that this component is intended for client-side rendering
import { useEffect, useState, useContext, useRef } from "react"; // Importing useEffect and useState hooks from React
import CustomBtn from "../_components/Button/CustomBtn"; // Custom button component
import styles from "./signin.module.css"; // Stylesheet for SignIn component
import logoTextImg from "@/public/assets/welcome logo.svg"; // Image asset for welcome logo text
import logo_image from "@/public/assets/logo.svg"; // Image asset for logo
import Image from "next/image"; // Image component from Next.js
import { useRouter } from "next/navigation"; // Importing useRouter hook from Next.js
import { useFormik } from "formik";
import { globalContext } from "@/app/_context/store";
import { JwtPayload, jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

// SignIn component
const SignIn = () => {
  const { authState, setAuthState } = useContext(globalContext);
  const [StartAnimation, setStartAnimation] = useState(false);
  const [ShowSignInForm, setShowSignInForm] = useState(false);
  const [ShowWelcomeMesage, setShowWelcomeMesage] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  let user = {
    email: "",
    password: "",
  };

  function setTokenAsync(json: any) {
    const decoded = jwtDecode<JwtPayload>(json.logged_in_token);
    setAuthState({
      token: json.logged_in_token,
      decodedToken: decoded,
    });
    console.log("01. setTokenAsync, 02. setDecodedTokenAsync");
  }

  // Function to handle login action
  function handleLogin() {
    console.log("04. handleLogin");
    let logInLogo: any = document.querySelector(".signin-wrapper img");
    if (logInLogo) {
      logInLogo.style.transform = "scale(150)";
    }
    setShowWelcomeMesage(true);
  }

  // useEffect hook to trigger animation
  useEffect(() => {
    setStartAnimation(true);
  }, []);

  useEffect(() => {
    if (authState.token) {
      const route = handleSetRouteToDirect();
      let timeout = setTimeout(() => {
        router.replace(route);
      }, 1);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    if (authState.token && typeof window !== "undefined") {
      localStorage.setItem("token", authState.token);
      console.log("03. Set Tokens in localStorage");
    }
    if (authState.decodedToken && typeof window !== "undefined") {
      localStorage.setItem(
        "decodedToken",
        JSON.stringify(authState.decodedToken)
      );
      console.log("03. Set Tokens in localStorage");
    }
  }, [authState.token, authState.decodedToken]);

  async function loginToAccount(values: any) {
    setLoader(true);
    try {
      const res = await fetch(`https://api.machinegenius.io/authentication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      // console.log(`json`, json.message);
      if (json.message === "invalid credentials") {
        toast.error("Invalid email or password");
      }
      if (json.message === "Logged in successfully") {
        setTokenAsync(json);
        setTimeout(() => {
          handleLogin();
        }, 1);
      }
    } catch (e) {
      toast.error("Something went wrong! Contact backend department");
      console.error("Error loginToAccount:", e);
    } finally {
      setLoader(false);
    }
  }

  const formikObj = useFormik({
    initialValues: user,
    onSubmit: loginToAccount,
    // validate: function (values) {
    //   setErrorMsg(null);
    //   const errors = {};
    //   if (
    //     values.email.includes("@") === false ||
    //     values.email.includes(".") === false
    //   ) {
    //     errors.email = "Email Invalid";
    //   }
    //   if (values.password.length < 6 || values.password.length > 15) {
    //     errors.password = "Password must between 6 and 15 characters";
    //   }
    //   return errors;
    // },
  });

  function handleSetRouteToDirect() {
    if (
      authState.decodedToken?.department.includes("ContentCreator") ||
      authState.decodedToken?.department.includes("CEO")
    ) {
      return "/content-creator/dashboard";
    } else if (authState.decodedToken?.department.includes("Video Editing")) {
      return "/video-editor/dashboard";
    } else if (authState.decodedToken?.department.includes("Social Media")) {
      return "/social-media/dashboard";
    } else if (authState.decodedToken?.department.includes("Administrative")) {
      return "/administrative/dashboard";
    } else if (
      authState.decodedToken?.department.includes("Customer Service")
    ) {
      return "/customer-service/dashboard";
    } else if (authState.decodedToken?.department.includes("Creative")) {
      return "/creative/dashboard";
    } else if (authState.decodedToken?.department.includes("HR")) {
      return "/hr/dashboard";
    } else if (authState.decodedToken?.department.includes("Accounting")) {
      return "/accounting/dashboard";
    } else if (authState.decodedToken?.department.includes("Newsletter")) {
      return "/newsletter/dashboard";
    } else if (authState.decodedToken?.department.includes("Out Reach")) {
      return "/outreach/dashboard";
    } else if (authState.decodedToken?.department.includes("SEO")) {
      return "/seo/dashboard";
    } else if (authState.decodedToken?.department.includes("OP")) {
      return "/op/dashboard";
    }
    return "/"; // Default return value
  }

  useEffect(() => {
    if (ShowWelcomeMesage) {
      const route = handleSetRouteToDirect();
      let timeout = setTimeout(() => {
        router.replace(route);
      }, 1550);
      return () => clearTimeout(timeout);
    }
  }, [ShowWelcomeMesage]);

  return (
    <div
      className="flex items-center justify-center w-[100vw] h-[100vh] fixed top-0 left-0 overflow-hidden"
      style={{ zIndex: 99999999999999, background: "var(--dark)" }}
    >
      {/* Welcome section */}
      <div
        className={`${styles.welcomePart} welcom-wrapper ${
          StartAnimation ? styles.startAnimation : ""
        } ${ShowSignInForm ? styles.hide : ""}`}
      >
        <h1>Welcome To </h1>
        <Image src={logoTextImg} height={100} alt="" />
        <CustomBtn
          word="Enter"
          btnColor="white"
          onClick={() => setShowSignInForm(true)}
        />
      </div>

      {/* Sign-in form */}
      <div
        className={`${styles.signin_wrapper} signin-wrapper  ${
          ShowSignInForm ? styles.show : ""
        } `}
      >
        <div className={styles.logo_title}>
          <Image src={logo_image} height={100} alt="logo" />
          <h3>Sign In</h3>
        </div>

        <form
          className="flex flex-col items-center"
          onSubmit={formikObj.handleSubmit}
        >
          <div className={styles.form_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onBlur={formikObj.handleBlur}
              onChange={formikObj.handleChange}
              value={formikObj.values.email}
              id="email"
            />
          </div>

          <div className={styles.form_group}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              onBlur={formikObj.handleBlur}
              onChange={formikObj.handleChange}
              value={formikObj.values.password}
            />
          </div>

          <CustomBtn
            type="submit"
            word={loader ? "Loading..." : "Sign In"}
            btnColor="black"
            disabled={formikObj.dirty === false || loader}
          />
        </form>
      </div>

      {/* Welcome message */}
      <div
        className={`${styles.hi_message} ${
          ShowWelcomeMesage ? styles.show : ""
        }`}
      >
        <h2>
          Hi {authState.decodedToken?.email.split("@")[0]}, <br />
          Let’s have a productive day!
        </h2>
      </div>
    </div>
  );
};

export default SignIn;
