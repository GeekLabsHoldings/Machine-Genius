import React, { useState } from "react";
import "./Subscribe.scss";
import {
  Flex,
  Button,
  Input,
  Heading,
  Paragraph,
  Slider,
  Separator,
} from "blocksin-system";
import Lottie from "lottie-react";
import animationData from "./assets/confetti.json";
import Img from "./assets/AI-powered-design-tool-generate-in-bulk-linkedin-carousels-2024.png";
import ImgMobile from "./assets/AI-powered-design-tool-generate-in-bulk-linkedin-carousels-2024-mobile.png";

function Subscribe() {
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [willingToPay, setWillingToPay] = useState(2); // Default value for the slider

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    const googleFormUrl =
      "https://docs.google.com/forms/u/0/d/1O1BzbtavZm0vsmuzrD0l-AY6TnImziHrMFIJwSJQli4/formResponse"; // Replace with your Google Form URL
    const emailField = "entry.301507512"; // Replace with your email field ID from Google Form
    const paymentField = "entry.1961021180"; // Replace with your payment field ID from Google Form

    fetch(
      `${googleFormUrl}?${emailField}=${encodeURIComponent(
        email
      )}&${paymentField}=${willingToPay}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "no-cors",
      }
    )
      .then(() => {
        setSubmit(true);
        setEmail("");
        setShowAnimation(true);
      })
      .catch(() => {
        alert("There was an error submitting the email.");
      });
  };

  const getPrice = (value) => {
    switch (value) {
      case 1:
        return "$0";
      case 2:
        return "$5";
      case 3:
        return "$10";
      case 4:
        return "$15";
      case 5:
        return "$25";
      default:
        return "$0";
    }
  };

  const getEmoji = (value) => {
    switch (value) {
      case 1:
        return "😢";
      case 2:
        return "🙂";
      case 3:
        return "😊";
      case 4:
        return "🤩";
      case 5:
        return "😍";
      default:
        return "";
    }
  };

  return (
    <Flex
      customClass="Subscribe"
      align="center"
      justify="center"
      direction="column"
      gap={200}
    >
      {showAnimation && (
        <Lottie
          className="lottie"
          animationData={animationData}
          autoplay={true}
          loop={false}
          onComplete={() => setShowAnimation(false)}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      )}
      <Flex
        direction="column"
        customClass="TextBox Hero"
        gap={100}
        fluid
        align="center"
      >
        <Heading weight="bold" level={1}>
          Design Pro LinkedIn Carousels, Slides & Banners with AI
        </Heading>
        <img
          src={Img}
          className="nonmobile"
          alt="AI-Powered Design Tool - Generate LinkedIn Carousels, Presentations and Banners in bulk!"
        />
        <img
          src={ImgMobile}
          className="mobile"
          alt="AI-Powered Design Tool - Generate LinkedIn Carousels, Presentations and Banners in bulk!"
        />
      </Flex>
      <Flex direction="column" customClass="TextBox" gap={100}>
        <Heading weight="bold" level={2}>
          Subscribe for Early Access
        </Heading>
        <Paragraph>
          We are working on AI-powered design integration for you! Stay tuned
          for updates if you want to be an early tester or user.
        </Paragraph>
        <Separator />
      </Flex>
      {submit ? (
        <Paragraph>Thanks, we will get back to you soon</Paragraph>
      ) : (
        <Flex direction="column" gap={300} fluid align="center">
          <Flex direction="column" gap={200}>
            <Paragraph>
              How much are you willing to pay in the future?
            </Paragraph>
            <Flex align="center" gap={200}>
              <Heading level={3}>{getPrice(willingToPay)}</Heading>
              <Slider
                value={[willingToPay]}
                onValueChange={(value) => setWillingToPay(value[0])}
                max={5}
                step={1}
                min={1}
                fluid
              />
              <Heading level={3}>{getEmoji(willingToPay)}</Heading>
            </Flex>
          </Flex>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="Enter your email"
              required
              fluid
              label="Email"
            />
            {emailError && <Paragraph>{emailError}</Paragraph>}
            <Button type="submit">Subscribe</Button>
          </form>
          <Flex direction="column" customClass="TextBox">
            <Paragraph size="small">
              By submitting, you agree to store your email and agree that we
              might contact you to give updates. You also agree that we might
              remove the email from our databases.
            </Paragraph>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default Subscribe;
