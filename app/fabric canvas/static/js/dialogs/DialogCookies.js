import React from "react";
import "../radix-styles/Dialog.scss";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "sebikostudio-icons";
import { Flex, Heading, IconButton, Paragraph, Button } from "blocksin-system";

const DialogCookies = ({ open, onOpenChange }) => {
  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <>
      <Dialog.Root
        className="DialogRoot"
        open={open}
        onOpenChange={onOpenChange}
        modal
      >
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent DialogCookies">
            <Heading
              level={4}
              weight="bold"
              style={{
                padding: "0 var(--size-50)",
                marginBottom: "var(--size-300)",
              }}
            >
              Cookiiiiiees!
            </Heading>

            <Flex gap={100} direction="column" customClass="cookies">
              <Paragraph size="large">
                This application uses cookies to provide the services you
                request, including integration with Unsplash. By using this
                application, you agree to our use of cookies as described in our{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                . If you do not agree, please do not use the app and leave the
                site.
              </Paragraph>{" "}
            </Flex>
            <Flex
              style={{ marginTop: "var(--size-500)" }}
              gap={200}
              justify="end"
            >
              <Button onClick={handleReject} variant="ghost">
                Leave Site
              </Button>

              <Button onClick={onOpenChange}>Understand</Button>
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
    </>
  );
};

export default DialogCookies;
