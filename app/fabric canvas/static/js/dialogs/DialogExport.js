import React from "react";
import "../radix-styles/Dialog.scss";
import * as Dialog from "@radix-ui/react-dialog";
import { SymbolIcon } from "@radix-ui/react-icons";
import { Cross2Icon } from "sebikostudio-icons";
import { Flex, Heading, IconButton, Button, Input } from "blocksin-system";
const DialogExport = ({
  open,
  onOpenChange,
  handleSheetUrlChange,
  handleSubmit,
  sheetUrl,
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
          <Dialog.Content className="DialogContent">
            <Heading level={4} weight="bold">
              Generate Campaign
            </Heading>

            <Flex direction="column" customClass="Generate" gap={300}>
              <Flex
                gap={200}
                style={{ marginBottom: "var(--size-200)", width: "100%" }}
                // customClass="loadData"
                direction="column"
              >
                <Input
                  type="text"
                  value={sheetUrl}
                  onChange={handleSheetUrlChange}
                  placeholder="Enter your Google Sheet URL"
                  label="Google Sheet URL"
                  fluid
                />
                <Dialog.Close asChild>
                  <Button
                    fluid
                    onClick={handleSubmit}
                    size="medium"
                    variant="solid"
                  >
                    <SymbolIcon />
                    Paint Banners
                  </Button>
                </Dialog.Close>
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
    </>
  );
};

export default DialogExport;
