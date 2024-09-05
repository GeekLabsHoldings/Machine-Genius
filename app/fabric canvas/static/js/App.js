import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles.scss";
// import Logo from "./assets/AppLogo2.svg";
// import LogoWhite from "./assets/AppLogo2-White.svg";
import { Helmet } from "react-helmet";
import TemplateCanvas from "./components/TemplateCanvas";
import DialogFeedback from "./dialogs/DialogFeedback";
import DialogShortcuts from "./dialogs/DialogShortcuts";
import DialogCookies from "./dialogs/DialogCookies";
import { Flex, Heading, Paragraph } from "blocksin-system";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import SpaceKey from "./assets/space-key.svg";
import HKey from "./assets/h-key.svg";
import Subscribe from "./Subscribe";

function App() {
  const location = useLocation();
  const showDev = new URLSearchParams(location.search).has("dev");
  const showSpot = new URLSearchParams(location.search).has(
    "earlybirbeatsworm"
  );

  const [darkmodeChecked, setDarkmodeChecked] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });
  const [pageColor, setPageColor] = useState(() => {
    return localStorage.getItem("page-color") || "page-color-1";
  });
  const [pagePattern, setPagePattern] = useState(() => {
    return JSON.parse(localStorage.getItem("PagePattern")) || true;
  });

  const [isTutorialVisible, setIsTutorialVisible] = useState(() => {
    const tutorialHiddenUntil = localStorage.getItem("tutorialHiddenUntil");
    if (tutorialHiddenUntil) {
      return new Date().getTime() > new Date(tutorialHiddenUntil).getTime();
    }
    return true;
  });

  useEffect(() => {
    // Store the dark mode setting in local storage
    localStorage.setItem("darkMode", JSON.stringify(darkmodeChecked));
  }, [darkmodeChecked]);

  useEffect(() => {
    // Store the dark mode setting in local storage
    localStorage.setItem("darkMode", JSON.stringify(darkmodeChecked));

    // Apply or remove the dark mode class on the HTML element
    if (darkmodeChecked) {
      document.documentElement.classList.add("darkmode");
    } else {
      document.documentElement.classList.remove("darkmode");
    }
  }, [darkmodeChecked]);

  useEffect(() => {
    // Function to manage body classes
    const updateBodyClasses = () => {
      // First, clear all body classes to reset
      document.body.classList.remove(...document.body.classList);

      // Apply the current page color
      document.body.classList.add(pageColor);

      // Conditionally apply the 'pattern' class
      if (pagePattern) {
        document.body.classList.add("pattern");
      }
    };

    // Call the function to update classes
    updateBodyClasses();

    // Save the current settings to localStorage
    localStorage.setItem("page-color", pageColor);
    localStorage.setItem("PagePattern", JSON.stringify(pagePattern));
  }, [pageColor, pagePattern]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFeedbackClick = () => {
    setIsDialogOpen(true);
  };

  //

  const [isDialogShortcutsOpen, setIsDialogShortcutsOpen] = useState(false);

  const handleDialogShortcutsClose = () => {
    setIsDialogShortcutsOpen(false);
  };

  const handleShortcutsClick = () => {
    setIsDialogShortcutsOpen(true);
  };

  const [isDialogCookiesOpen, setIsDialogCookiesOpen] = useState(false);
  const handleDialogCookiesClose = () => {
    setIsDialogCookiesOpen(false);
    Cookies.set("cookiesAccepted", "true", { expires: 30 });
  };

  useEffect(() => {
    const cookiesAccepted = Cookies.get("cookiesAccepted");
    if (!cookiesAccepted) {
      setIsDialogCookiesOpen(true);
    }
  }, []);

  //
  const [showDevModal, setShowDevModal] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "0") {
        setShowDevModal((prevState) => !prevState);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  // useEffect(() => {
  //   const handleRightClick = (event) => {
  //     event.preventDefault();
  //   };

  //   // Add event listener when the component mounts
  //   window.addEventListener("contextmenu", handleRightClick);

  //   // Remove event listener on cleanup
  //   return () => {
  //     window.removeEventListener("contextmenu", handleRightClick);
  //   };
  // }, []);

  useEffect(() => {
    let timer;
    const handleKeyDown = (event) => {
      if (event.key === " " || event.key.toLowerCase() === "h") {
        timer = setTimeout(() => {
          const tutorialElement = document.querySelector(".Tutorial");
          if (tutorialElement) {
            tutorialElement.classList.add("hide");
            setTimeout(() => {
              setIsTutorialVisible(false);
              const expirationDate = new Date();
              expirationDate.setDate(expirationDate.getDate() + 30);
              localStorage.setItem(
                "tutorialHiddenUntil",
                expirationDate.toISOString()
              );
            }, 300);
          }
        }, 1000);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === " " || event.key.toLowerCase() === "h") {
        clearTimeout(timer);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/subscribe" component={Subscribe} />
        <Route path="/">
          <Flex
            direction={"column"}
            // align={"center"}
            // justify={"center"}
            gap={200}
            customClass="App"
          >
            <Helmet>
              <title>
                Sebikostudio App - A New Design Tool - Generate Graphics in Bulk
              </title>
              <meta
                name="description"
                content="BlocksIn App is the ultimate tool for uniting designers, developers, and brand teams. Integrate resources like Figma, GitHub, and Slack into one intuitive platform."
              />
              <meta
                name="keywords"
                content="design, development, collaboration, Figma, GitHub, Slack, workflow, productivity"
              />
              <meta name="author" content="Sebikostudio.com" />
            </Helmet>

            {isDialogOpen && (
              <DialogFeedback
                open={isDialogOpen}
                onOpenChange={handleDialogClose}
              />
            )}

            {isDialogShortcutsOpen && (
              <DialogShortcuts
                open={isDialogShortcutsOpen}
                onOpenChange={handleDialogShortcutsClose}
              />
            )}

            {isDialogCookiesOpen && (
              <DialogCookies
                open={isDialogCookiesOpen}
                onOpenChange={handleDialogCookiesClose}
              />
            )}

            <Flex
              direction={"column"}
              align="start"
              justify={"start"}
              gap={400}
              customClass="TemplatesDesigner"
            >
              <Flex
                customClass="mobile"
                gap={200}
                direction="column"
                align="center"
                justify="center"
                fluid
                style={{
                  textAlign: "center",
                  lineHeight: "1",
                  marginTop: "50%",
                  padding: "0 var(--size-300)",
                }}
              >
                <Heading level={3} weight="bold">
                  Generate Graphics in&nbsp;Bulk
                </Heading>
                <Paragraph size="large">
                  This application is optimized for use on tablet and desktop
                  devices and may not function properly on mobile phones.
                </Paragraph>
              </Flex>

              {isTutorialVisible && (
                <Flex
                  customClass="Tutorial Card"
                  direction="column"
                  justify="center"
                  gap={200}
                  align="center"
                >
                  <Paragraph size="large" weight="bold">
                    Hold down to use Hand Tool
                  </Paragraph>
                  <Flex gap={200} align="center">
                    <img src={SpaceKey} alt="Space Key" />
                    <Paragraph size="large" weight="bold">
                      or
                    </Paragraph>
                    <img src={HKey} alt="H Key" />
                  </Flex>
                </Flex>
              )}

              <TemplateCanvas
                darkmodeChecked={darkmodeChecked}
                setDarkmodeChecked={setDarkmodeChecked}
                handleFeedbackClick={handleFeedbackClick}
                handleShortcutsClick={handleShortcutsClick}
                setPageColor={setPageColor}
                pageColor={pageColor}
                pagePattern={pagePattern}
                setPagePattern={setPagePattern}
                showDev={showDev}
                showSpot={showSpot}
                showDevModal={showDevModal}
              />
            </Flex>
          </Flex>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
