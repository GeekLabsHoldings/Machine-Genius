import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, Heading, Flex, IconButton, Paragraph } from "blocksin-system";
import { Cross2Icon } from "sebikostudio-icons";

const RestoreDialog = ({ open, onOpenChange, onRestore }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Heading level={4} weight="bold">
            Restore Previous Version
          </Heading>
          <Flex
            gap={300}
            direction="column"
            customClass="restoreDialog"
            style={{ marginTop: "var(--size-100)" }}
          >
            <Paragraph>
              A previous version of the canvas was found. Do you want to restore
              it?
            </Paragraph>
            <Flex gap={200} fluid>
              <Dialog.Close asChild>
                <Button size="medium" variant="ghost" fluid>
                  Cancel
                </Button>
              </Dialog.Close>
              <Button size="medium" variant="solid" onClick={onRestore} fluid>
                Restore
              </Button>
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

export default RestoreDialog;
