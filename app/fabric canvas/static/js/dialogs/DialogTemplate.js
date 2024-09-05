import React from "react";
import "../radix-styles/Dialog.scss";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, DownloadIcon } from "sebikostudio-icons";
import { Flex, Heading, IconButton, Button, Input } from "blocksin-system";
const DialogTemplate = ({
  open,
  onOpenChange,
  templateName,
  setTemplateName,
  downloadTemplate,
}) => {
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
          <Dialog.Content className="DialogContent DialogTemplate">
            <Heading level={4} weight="bold">
              Download Template
            </Heading>

            <Flex gap={200} direction="column" customClass="downloadTemplate">
              <Input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Enter Template Name"
                label="Template Name"
              />

              <Dialog.Close asChild>
                <Button
                  size="medium"
                  variant="solid"
                  onClick={() => downloadTemplate(false)}
                  fluid
                >
                  <DownloadIcon />
                  Download Template
                </Button>
              </Dialog.Close>
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

export default DialogTemplate;
