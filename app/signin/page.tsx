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
  const { token, setToken, decodedToken, setDecodedToken } =
    useContext(globalContext);
  // State to manage animation
  const [StartAnimation, setStartAnimation] = useState(false);
  // State to manage showing sign-in form
  const [ShowSignInForm, setShowSignInForm] = useState(false);
  // State to manage showing welcome message
  const [ShowWelcomeMesage, setShowWelcomeMesage] = useState(false);
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  let user = {
    email: "",
    password: "",
  };

  function setTokenAsync(json: any) {
    setToken(json.logged_in_token);
    console.log("01. setTokenAsync");
  }

  function setDecodedTokenAsync() {
    const decoded = jwtDecode<JwtPayload>(token);
    setDecodedToken(decoded);
    console.log("02. setDecodedTokenAsync");
  }

  function setTokenInLocalStorageAsync() {
    if (typeof window !== "undefined") {
      console.log("03. Set Tokens in localStorage");
      localStorage.setItem("token", token);
      localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
    }
  }

  // Function to handle login action
  function handleLogin() {
    console.log("04. handleLogin");
    let logInLogo: any = document.querySelector(".signin-wrapper img");
    if (logInLogo) {
      logInLogo.style.transform = "scale(150)";
    }
    setShowWelcomeMesage(true);
    // Redirect to dashboard after a delay
    // setTimeout(() => {
    //     router.push('')
    // }, 500); // 3000 milliseconds = 3 seconds
  }

  useEffect(() => {
    if (token) {
      handleNavToDashboard();
    }
  }, []);

  useEffect(() => {
    if (token) {
      setDecodedTokenAsync();
    }
  }, [token]);

  useEffect(() => {
    if (decodedToken) {
      setTokenInLocalStorageAsync();
    }
  }, [decodedToken]);

  async function loginToAccount(values: any) {
    setLoader(true);
    try {
      const res = await fetch(
        `https://machine-genius.onrender.com/authentication`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
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
    }
    setLoader(false);
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

  // useEffect hook to trigger animation
  useEffect(() => {
    setStartAnimation(true);
  }, []);

  function handleSetRouteToDirect() {
    if (
      decodedToken?.department.includes("ContentCreator") ||
      decodedToken?.department.includes("CEO")
    ) {
      return "/content-creator/dashboard";
    } else if (decodedToken?.department.includes("Video Editing")) {
      return "/video-editor/dashboard";
    } else if (decodedToken?.department.includes("Social Media")) {
      return "/social-media/dashboard";
    } else if (decodedToken?.department.includes("Administrative")) {
      return "/administrative/dashboard";
    } else if (decodedToken?.department.includes("Customer Service")) {
      return "/customer-service/dashboard";
    } else if (decodedToken?.department.includes("Creative")) {
      return "/creative/dashboard";
    } else if (decodedToken?.department.includes("HR")) {
      return "/hr/dashboard";
    } else if (decodedToken?.department.includes("Accounting")) {
      return "/accounting/dashboard";
    } else if (decodedToken?.department.includes("Newsletter")) {
      return "/newsletter/dashboard";
    } else if (decodedToken?.department.includes("Out Reach")) {
      return "/outreach/dashboard";
    } else if (decodedToken?.department.includes("SEO")) {
      return "/seo/dashboard";
    } else if (decodedToken?.department.includes("OP")) {
      return "/op/dashboard";
    }
    return "/"; // Default return value
  }

  function handleNavToDashboard() {
    const route = handleSetRouteToDirect();
    router.replace(route);
  }

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
            disabled={formikObj.dirty === false}
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
          Hi {decodedToken?.email.split("@")[0]}, <br />
          Let’s have a productive day!
        </h2>
        <CustomBtn
          btnColor="black"
          word="Dashboard"
          onClick={handleNavToDashboard}
        />
      </div>
    </div>
  );
};

export default SignIn;
