import React, { useState, useEffect } from "react";
import "../radix-styles/Dialog.scss";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "sebikostudio-icons";
import {
  Flex,
  Heading,
  IconButton,
  Paragraph,
  ScrollArea,
  Button,
} from "blocksin-system";

// Dynamically import templates and images
const templateContext = require.context("../templates", true, /\.json$/);
const imageContext = require.context("../templates", true, /\.(png|svg)$/);

const formatTitle = (templateName) => {
  // Remove the last -number from the file name
  const nameWithoutNumber = templateName.replace(/-\d+$/, "");
  // Separate words that start with capital letters
  return nameWithoutNumber.replace(/([A-Z])/g, " $1").trim();
};

const loadTemplates = () => {
  const templates = [];
  const categories = new Set();

  templateContext.keys().forEach((templatePath) => {
    const template = templateContext(templatePath);
    const category = templatePath.split("/")[1];
    const templateName = templatePath.split("/").pop().split(".")[0];
    const templateTitle = formatTitle(templateName);
    categories.add(category);

    console.log(`Loading template: ${templateName} in category: ${category}`);

    const imagePath = imageContext.keys().find((imgPath) => {
      const imgCategory = imgPath.split("/")[1];
      const templateNumber = templateName.split("-").pop();
      return (
        imgCategory === category && imgPath.includes(`-${templateNumber}.`)
      );
    });

    if (imagePath) {
      const image = imageContext(imagePath);
      templates.push({
        id: templateName,
        category,
        data: template,
        image: image,
        title: templateTitle,
      });
      console.log(`Matched template: ${templateName} with image: ${imagePath}`);
    } else {
      console.warn(`No image found for template: ${templateName}`);
    }
  });

  console.log("Loaded Templates: ", templates);
  console.log("Categories: ", categories);

  return { templates, categories: Array.from(categories) };
};

const DialogTemplates = ({ open, onOpenChange, loadTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState("presentations");
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const { templates: loadedTemplates, categories: loadedCategories } =
      loadTemplates();
    setTemplates(loadedTemplates);
    setCategories(loadedCategories);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredTemplates = templates.filter(
    (template) => template.category === selectedCategory
  );

  console.log("Filtered Templates: ", filteredTemplates);

  return (
    <Dialog.Root
      className="DialogRoot"
      open={open}
      onOpenChange={onOpenChange}
      modal
    >
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent DialogContentTemplates">
          <Heading level={3} weight="bold">
            Choose Template
          </Heading>

          <Flex gap={300}>
            <Flex direction="column" customClass="TemplatesNav">
              {categories.map((category) => (
                <Button
                  key={category}
                  size="small"
                  variant="ghost"
                  fluid
                  aria-pressed={selectedCategory === category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </Flex>
            <Flex direction="column" fluid customClass="Templates" gap={200}>
              <ScrollArea style={{ maxHeight: "auto" }}>
                <Flex wrap="wrap" fluid gap={200}>
                  {filteredTemplates.map((template) => (
                    <Flex
                      direction="column"
                      customClass="tempCard"
                      gap={100}
                      key={template.id}
                    >
                      <div
                        // className="tempCard"
                        id={template.id}
                        onClick={() => loadTemplate(template.data)}
                        key={template.id}
                      >
                        <img src={template.image} alt={template.alt} />
                      </div>
                      <Paragraph size="large">{template.title}</Paragraph>
                    </Flex>
                  ))}
                </Flex>
              </ScrollArea>
            </Flex>
          </Flex>

          <Flex customClass="closeButton">
            <Dialog.Close asChild>
              <IconButton aria-label="Close" size="small" variant="ghost">
                <Cross2Icon />
              </IconButton>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogTemplates;
