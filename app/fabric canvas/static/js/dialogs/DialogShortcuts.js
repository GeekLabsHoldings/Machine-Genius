import React from "react";
import "../radix-styles/Dialog.scss";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "sebikostudio-icons";
import {
  Flex,
  Heading,
  ScrollArea,
  IconButton,
  Paragraph,
} from "blocksin-system";
const DialogShortcuts = ({ open, onOpenChange }) => {
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
          <Dialog.Content className="DialogContent DialogShortcuts">
            <Heading
              level={4}
              weight="bold"
              style={{
                padding: "0 var(--size-50)",
                marginBottom: "var(--size-300)",
              }}
            >
              Shortcuts
            </Heading>

            <ScrollArea style={{ height: "50vh" }}>
              <Flex gap={100} direction="column" customClass="shortcuts">
                <Flex justify="between">
                  <Paragraph size="large" weight="bold">
                    Hold Space / H
                  </Paragraph>
                  <Paragraph size="large">Hand</Paragraph>
                </Flex>
                <Flex justify="between">
                  <Paragraph size="large" weight="bold">
                    CTRL / ⌘ + G
                  </Paragraph>
                  <Paragraph size="large">Group</Paragraph>
                </Flex>
                <Flex justify="between">
                  <Paragraph size="large" weight="bold">
                    CTRL / ⌘ + U
                  </Paragraph>
                  <Paragraph size="large">Ungroup</Paragraph>
                </Flex>
                <Flex justify="between">
                  <Paragraph size="large" weight="bold">
                    CTRL / ⌘ + ]
                  </Paragraph>
                  <Paragraph size="large">Bring to Front</Paragraph>
                </Flex>
                <Flex justify="between">
                  <Paragraph size="large" weight="bold">
                    CTRL / ⌘ + [
                  </Paragraph>
                  <Paragraph size="large">Send to Back</Paragraph>
                </Flex>
                <Flex justify="between">
                  <Paragraph size="large" weight="bold">
                    CTRL / ⌘ + C
                  </Paragraph>
                  <Paragraph size="large">Copy</Paragraph>
                </Flex>
                <Flex justify="between">
                  <Paragraph size="large" weight="bold">
                    CTRL / ⌘ + V
                  </Paragraph>
                  <Paragraph size="large">Paste</Paragraph>
                </Flex>
                <Flex justify="between">
                  <Paragraph size="large" weight="bold">
                    CTRL / ⌘ + A
                  </Paragraph>
                  <Paragraph size="large">Select All</Paragraph>
                </Flex>
                <Flex justify="between">
                  <Paragraph size="large" weight="bold">
                    D
                  </Paragraph>
                  <Paragraph size="large">Deselect All</Paragraph>
                </Flex>
                <Flex justify="between">
                  <Paragraph size="large" weight="bold">
                    CTRL / ⌘ + D
                  </Paragraph>
                  <Paragraph size="large">Duplicate</Paragraph>
                </Flex>
                <Flex justify="between">
                  <Paragraph size="large" weight="bold">
                    Backspace / Del
                  </Paragraph>
                  <Paragraph size="large">Delete</Paragraph>
                </Flex>
              </Flex>
            </ScrollArea>

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

export default DialogShortcuts;
