import React from "react";
import "../radix-styles/Dialog.scss";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "sebikostudio-icons";
import { Flex, Heading, Paragraph, IconButton, Iframe } from "blocksin-system";
const DialogFeedback = ({ open, onOpenChange }) => {
  const googleFormUrl = "https://forms.gle/emWm5SLi92bCbNCo6";
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
          <Dialog.Content className="DialogContent DialogFeedback">
            <Heading level={4} weight="bold">
              Give feedback!
            </Heading>
            <Dialog.Description className="DialogDescription">
              <Paragraph size="large">It takes only fives seconds!</Paragraph>
            </Dialog.Description>
            <Iframe url={googleFormUrl} title={"Feedback form"} />
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

export default DialogFeedback;
