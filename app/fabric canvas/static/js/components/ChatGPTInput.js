import React, { useState } from "react";
import {
  Input,
  Flex,
  Button,
  IconButton,
  ToggleGroup,
  Spinner,
  Paragraph,
} from "blocksin-system";
import {
  CardStackIcon,
  CardStackPlusIcon,
  Cross2Icon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  MagnifyingGlassIcon,
  Presentation1Icon,
  SparklesIcon,
} from "sebikostudio-icons";

const ChatGPTInput = ({
  onResponse,
  handleTemplateChange,
  template,
  closeSpot,
}) => {
  const [topic, setTopic] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(
    template || "slides"
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading spinner
  const [contentFields, setContentFields] = useState([{ value: "" }]);

  const handleInputChange = (e) => {
    setTopic(e.target.value);
  };

  const handleContentFieldChange = (index, event) => {
    const values = [...contentFields];
    values[index].value = event.target.value;
    setContentFields(values);
  };

  const handleAddContentField = () => {
    setContentFields([...contentFields, { value: "" }]);
  };

  const apiBaseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8888/api"
      : "/nf-functions";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (topic.trim().split(" ").length > 7) {
      alert("Please enter a topic with a maximum of 7 words.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/chatgpt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          template: selectedTemplate,
          contentFields,
        }),
      });
      const data = await response.json();
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        onResponse(data);
        // console.log(data)
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleChange = (value) => {
    if (value) {
      setSelectedTemplate(value);
      handleTemplateChange(value);
    }
  };

  return (
    <Flex
      direction="column"
      customClass={`Spotlight ${isSubmitted ? "submitted" : ""}`}
      gap={200}
      align="center"
    >
      <Flex
        style={{
          position: "absolute",
          right: "-20px",
          top: "-20px",
          backgroundColor: "var(--background-neutral-container)",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <IconButton variant="ghost" size="small" onClick={closeSpot}>
          <Cross2Icon />
        </IconButton>
      </Flex>

      <ToggleGroup
        onValueChange={handleToggleChange}
        value={selectedTemplate}
        type="single"
        aria-label="Select template"
      >
        <ToggleGroup.Item value="slides">
          <Presentation1Icon />
          <Paragraph weight="bold">Slides</Paragraph>
          <span>Design google slides effortlessly</span>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="linkedin">
          <LinkedInLogoIcon />
          <Paragraph weight="bold">LinkedIn Carousel</Paragraph>
          <span>Craft engaging LinkedIn carousels</span>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="instagram">
          <InstagramLogoIcon />
          <Paragraph weight="bold">Instagram Post</Paragraph>
          <span>Create content for Instagram</span>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="gamingcard">
          <CardStackIcon />
          <Paragraph weight="bold">Gaming Cards</Paragraph>
          <span>Create custom gaming cards</span>
        </ToggleGroup.Item>
      </ToggleGroup>
      <Flex
        direction="column"
        align="center"
        customClass={`formWrapper ${
          selectedTemplate === "gamingcard" && "collapsed"
        }`}
        fluid
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            width: "100%",
            direction: "row",
            gap: "var(--size-200)",
          }}
          className={`mainInput`}
        >
          <Input
            type="text"
            value={topic}
            onChange={handleInputChange}
            placeholder="Enter a topic (max 4 words)"
            label="Enter Topic"
            fluid
          />
          {loading ? (
            <Flex customClass="SpinnerWrapper">
              <Spinner size="small" />
            </Flex>
          ) : (
            <IconButton type="submit">
              <SparklesIcon />
            </IconButton>
          )}
          <MagnifyingGlassIcon />
        </form>
        {selectedTemplate === "gamingcard" && (
          <Flex
            direction="column"
            gap={300}
            style={{ marginTop: "var(--size-400)" }}
            fluid
          >
            <Paragraph size="large" style={{ width: "100%" }}>
              Add custom fields in your card, for example: attack,
              attack-points, or weakness.
            </Paragraph>
            <Flex fluid customClass="cardFields" gap={200}>
              <Flex wrap="wrap" fluid gap={100}>
                {contentFields.map((field, index) => (
                  <Input
                    key={index}
                    type="text"
                    value={field.value}
                    onChange={(event) => handleContentFieldChange(index, event)}
                    placeholder={`Card field ${index + 1}`}
                    label={`Card Field ${index + 1}`}
                    fluid
                  />
                ))}
              </Flex>
              <Button type="button" onClick={handleAddContentField}>
                <CardStackPlusIcon /> Add
              </Button>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ChatGPTInput;
