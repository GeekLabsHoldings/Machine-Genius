import React from "react";
import { Flex, IconButton, ScrollArea } from "blocksin-system";

import {
  TextIcon,
  BoxIcon,
  CircleIcon,
  TriangleIcon,
  LayersIcon,
  Pencil1Icon,
  LockOpen1Icon,
  LockClosedIcon,
  ImageIcon,
  StarIcon,
  HeartIcon,
  EyeOpenIcon,
  BorderSolidIcon,
  EyeClosedIcon,
} from "sebikostudio-icons";

const LayerPanel = ({
  imageObjects,
  activeLayerId,
  highlightObjectInCanvas,
  editingId,
  editInput,
  setEditInput,
  saveEdits,
  startEditing,
  deselectAllObjects,
  setImageObjects,
  canvasInstance,
}) => {
  return (
    <ScrollArea>
      <Flex customClass="layerList" fluid>
        {imageObjects.map((obj, index) => (
          <span
            className={`layerItem ${activeLayerId === obj.id ? "active" : ""} ${
              !obj.visible ? "disabled" : ""
            }`}
            key={index}
            onClick={() => highlightObjectInCanvas(obj.id)}
            style={{ paddingLeft: `${obj.depth * 24}px` }}
          >
            <Flex align="center" justify="center" customClass="iconContainer">
              {obj.type === "image" && <ImageIcon />}
              {obj.type === "line" && <BorderSolidIcon />}
              {obj.type === "text" && <TextIcon />}
              {obj.type === "textbox" && <TextIcon />}
              {obj.type === "rect" && <BoxIcon />}
              {obj.type === "circle" && <CircleIcon />}
              {obj.type === "group" && <LayersIcon />}
              {obj.type === "triangle" && <TriangleIcon />}
              {obj.type === "path" && obj.id && obj.id.startsWith("star-") && (
                <StarIcon />
              )}
              {obj.type === "path" && obj.id && obj.id.startsWith("icon-") && (
                <HeartIcon />
              )}
            </Flex>

            {editingId === obj.id ? (
              <input
                type="text"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                onBlur={() => saveEdits(obj.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveEdits(obj.id);
                  }
                }}
                autoFocus
              />
            ) : (
              <>
                <span>{obj.label}</span>

                {activeLayerId === obj.id && (
                  <Flex
                    style={{
                      marginLeft: "var(--size-200)",
                    }}
                    customClass="btnGroup"
                  >
                    <IconButton
                      size="mini"
                      variant="ghost"
                      onClick={() => startEditing(obj.id, obj.label)}
                    >
                      <Pencil1Icon />
                    </IconButton>

                    <IconButton
                      size="mini"
                      variant="ghost"
                      onClick={() => {
                        deselectAllObjects();
                        const updatedObjects = imageObjects.map((innerObj) => {
                          if (innerObj.id === obj.id) {
                            const newState = !innerObj.selectable;
                            const canvasObj = canvasInstance.current
                              .getObjects()
                              .find((o) => o.id === innerObj.id);
                            if (canvasObj) {
                              canvasObj.selectable = newState;
                              canvasInstance.current.renderAll();
                            }
                            return {
                              ...innerObj,
                              selectable: newState,
                            };
                          }
                          return innerObj;
                        });
                        setImageObjects(updatedObjects);
                      }}
                    >
                      {obj.selectable ? <LockOpen1Icon /> : <LockClosedIcon />}
                    </IconButton>
                    <IconButton
                      size="mini"
                      variant="ghost"
                      onClick={() => {
                        deselectAllObjects();
                        const updatedObjects = imageObjects.map((innerObj) => {
                          if (innerObj.id === obj.id) {
                            const newState = !innerObj.visible;
                            const canvasObj = canvasInstance.current
                              .getObjects()
                              .find((o) => o.id === innerObj.id);
                            if (canvasObj) {
                              canvasObj.visible = newState;
                              canvasInstance.current.renderAll();
                            }
                            return {
                              ...innerObj,
                              visible: newState,
                            };
                          }
                          return innerObj;
                        });
                        setImageObjects(updatedObjects);
                      }}
                    >
                      {obj.visible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </IconButton>
                  </Flex>
                )}
              </>
            )}
          </span>
        ))}
      </Flex>
    </ScrollArea>
  );
};

export default LayerPanel;
