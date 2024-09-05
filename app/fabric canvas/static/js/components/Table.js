import React, { useState, useMemo, useRef, useEffect } from "react";
// import "./Table.scss";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cross2Icon,
} from "sebikostudio-icons";
import {
  Paragraph,
  Input,
  Checkbox,
  Flex,
  IconButton,
  ScrollArea,
  Button,
  TextArea,
  Heading,
} from "blocksin-system";
import * as Dialog from "@radix-ui/react-dialog";

const Table = ({
  columns,
  data,
  pageSize,
  onRowClick,
  multiSelect,
  onMultiSelect,
  maxPagination = 3,
  fluid,
  search,
  fullBorder,
  sorting,
  cellAlign = "start",
  large,
  editable = false,
  onDataChange,
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
    sorted: false,
  });
  const [tableData, setTableData] = useState(data);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    rowIndex: null,
    columnAccessor: null,
    value: "",
  });
  const [hoveredCell, setHoveredCell] = useState(null);

  const tableRef = useRef(null);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const activeElement = document.activeElement;
      const { key } = event;

      if (!tableRef.current || !activeElement || dialogOpen) {
        return;
      }

      if (key === "Enter" || key === " ") {
        const clickableElement = activeElement.querySelector(
          'button, input[type="checkbox"]'
        );
        if (clickableElement) {
          clickableElement.click();
          event.preventDefault();
          return;
        }
      }

      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
        return;
      }

      const focusableElements = Array.from(
        tableRef.current.querySelectorAll("th, td")
      ).filter((el) => el.tabIndex >= 0);
      const currentIndex = focusableElements.indexOf(activeElement);

      let nextIndex;
      switch (key) {
        case "ArrowUp":
          nextIndex = currentIndex - columns.length;
          break;
        case "ArrowDown":
          nextIndex = currentIndex + columns.length;
          break;
        case "ArrowLeft":
          nextIndex = currentIndex - 1;
          break;
        case "ArrowRight":
          nextIndex = currentIndex + 1;
          break;
        default:
          return;
      }

      if (nextIndex >= 0 && nextIndex < focusableElements.length) {
        focusableElements[nextIndex].focus();
        event.preventDefault();
      }
    };

    const tableElement = tableRef.current;
    tableElement.addEventListener("keydown", handleKeyDown);
    return () => tableElement.removeEventListener("keydown", handleKeyDown);
  }, [columns.length, dialogOpen]);

  const handleSelectAll = (checked) => {
    const allRowIndices = sortedData.map(
      (_, index) => (currentPage - 1) * pageSize + index
    );
    const newSelectedRows = checked ? new Set(allRowIndices) : new Set();
    setSelectedRows(newSelectedRows);
    if (onMultiSelect) {
      onMultiSelect(checked ? sortedData : []);
    }
  };

  const handleSelectRow = (checked, globalRowIndex) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(globalRowIndex);
    } else {
      newSelectedRows.delete(globalRowIndex);
    }
    setSelectedRows(newSelectedRows);
    if (onMultiSelect) {
      const selectedData = Array.from(newSelectedRows).map(
        (index) => sortedData[index]
      );
      onMultiSelect(selectedData);
    }
  };

  const filteredData = tableData.filter((row) =>
    columns.some((column) => {
      const cellValue = row[column.accessor];
      return (
        typeof cellValue === "string" &&
        cellValue.toLowerCase().includes(filter.toLowerCase())
      );
    })
  );

  const isSortable = (accessor) => {
    return data.some(
      (row) =>
        typeof row[accessor] === "string" || typeof row[accessor] === "number"
    );
  };

  const handleSort = (accessor) => {
    if (!sorting || !isSortable(accessor) || editable) return;

    let direction = "ascending";
    let sorted = true;
    if (sortConfig && sortConfig.key === accessor) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else {
        sorted = false;
      }
    }
    setSortConfig({ key: accessor, direction, sorted });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleEditClick = (rowIndex, columnAccessor, value) => {
    setDialogContent({ rowIndex, columnAccessor, value });
    setDialogOpen(true);
  };

  const handleDialogSave = () => {
    const updatedData = [...tableData];
    const { rowIndex, columnAccessor, value } = dialogContent;
    updatedData[rowIndex][columnAccessor] = value;
    setTableData(updatedData);
    setDialogOpen(false);
    if (onDataChange) {
      onDataChange(updatedData);
    }
  };

  const totalNumberOfPages = Math.ceil(sortedData.length / pageSize);
  const paginationItems = Array.from(
    { length: totalNumberOfPages },
    (_, i) => i + 1
  );

  const renderPagination = () => {
    if (totalNumberOfPages === 1) {
      return null;
    }

    let visiblePages = paginationItems;

    if (totalNumberOfPages > maxPagination) {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxPagination / 2)
      );
      const endPage = Math.min(
        totalNumberOfPages,
        startPage + maxPagination - 1
      );
      visiblePages = paginationItems.slice(startPage - 1, endPage);

      if (startPage > 1) {
        visiblePages.unshift(1);
      }

      if (endPage < totalNumberOfPages) {
        visiblePages.push(totalNumberOfPages);
      }
    }

    return visiblePages.map((page) => {
      return (
        <IconButton
          key={page}
          size="small"
          variant="outline"
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? "active" : ""}
          aria-pressed={currentPage === page ? "true" : undefined}
        >
          {page}
        </IconButton>
      );
    });
  };

  return (
    <>
      {search && (
        <Flex
          fluid
          customClass={`TableSearch ${large ? "large" : ""}`}
          style={{
            marginBottom: "var(--size-00)",
            boxSizing: "border-box",
            paddingTop: "var(--size-300)",
          }}
          justify="between"
          align="center"
          gap={300}
        >
          <Input
            type="search"
            value={filter}
            label="Filter"
            onChange={handleFilterChange}
            placeholder="Filter..."
            validation={false}
            fluid
          />
          {children}
        </Flex>
      )}
      <div
        className={`TableComponent ${fluid ? "fluid" : ""}`}
        style={{ overflow: "hidden" }}
      >
        <ScrollArea style={{ maxHeight: "auto" }}>
          <table
            ref={tableRef}
            className={`TableComponent ${
              cellAlign === "start"
                ? "align-start"
                : cellAlign === "end"
                ? "align-end"
                : "align-center"
            } ${fullBorder ? "fullBorder" : ""} ${large ? "large" : ""} ${
              fluid ? "fluid" : ""
            } ${multiSelect ? "hoverable" : ""}`}
            tabIndex="0"
          >
            <thead>
              <tr>
                {multiSelect && (
                  <th tabIndex="0" style={{ width: "26px" }}>
                    <Checkbox
                      checked={
                        selectedRows.size === sortedData.length &&
                        sortedData.length > 0
                      }
                      onChange={(checked) => handleSelectAll(checked)}
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.accessor}
                    onClick={() => handleSort(column.accessor)}
                    className={`${
                      sorting && isSortable(column.accessor) ? "sortable" : ""
                    } ${sorting ? "hoverable" : ""}`}
                    tabIndex="0"
                    style={{ width: column.maxWidth }}
                  >
                    {column.Header}
                    {sorting && isSortable(column.accessor) && (
                      <span className="sort-indicator">
                        {sortConfig.key === column.accessor &&
                        sortConfig.sorted ? (
                          sortConfig.direction === "ascending" ? (
                            <ChevronUpIcon
                              style={{ marginLeft: "var(--size-100)" }}
                            />
                          ) : (
                            <ChevronDownIcon
                              style={{ marginLeft: "var(--size-100)" }}
                            />
                          )
                        ) : (
                          <ChevronUpIcon
                            style={{
                              marginLeft: "var(--size-100)",
                              visibility: "hidden",
                            }}
                          />
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => {
                const globalRowIndex = (currentPage - 1) * pageSize + rowIndex;
                return (
                  <tr
                    key={globalRowIndex}
                    tabIndex={0}
                    onClick={() => {
                      if (multiSelect) {
                        const checked = !selectedRows.has(globalRowIndex);
                        handleSelectRow(checked, globalRowIndex);
                      } else {
                        onRowClick && onRowClick(row);
                      }
                    }}
                  >
                    {multiSelect && (
                      <td tabIndex="0" style={{ width: "26px" }}>
                        <Checkbox
                          checked={selectedRows.has(globalRowIndex)}
                          onCheckedChange={(event) =>
                            handleSelectRow(
                              event.target.checked,
                              globalRowIndex
                            )
                          }
                        />
                      </td>
                    )}
                    {columns.map((column, columnIndex) => (
                      <td
                        tabIndex="0"
                        key={column.accessor}
                        style={{ width: column.maxWidth, position: "relative" }}
                        onMouseEnter={() =>
                          setHoveredCell({
                            rowIndex: globalRowIndex,
                            columnAccessor: column.accessor,
                          })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        {hoveredCell &&
                          hoveredCell.columnAccessor === column.accessor &&
                          hoveredCell.rowIndex === globalRowIndex &&
                          columnIndex !== 0 &&
                          columnIndex !== columns.length - 1 && (
                            <Flex
                              customClass="hoveredCell"
                              style={{
                                position: "absolute",
                                inset: "8px",
                                width: "auto",
                                height: "auto",
                                borderRadius: "var(--size-100)",
                                zIndex: 1,
                                background:
                                  "var(--background-neutral-container)",
                                padding: "var(--size-100)",
                              }}
                              direction="column"
                            >
                              <Button
                                variant="outline"
                                size="small"
                                onClick={() =>
                                  handleEditClick(
                                    globalRowIndex,
                                    column.accessor,
                                    row[column.accessor]
                                  )
                                }
                              >
                                Edit
                              </Button>
                            </Flex>
                          )}
                        {column.Cell
                          ? column.Cell(row[column.accessor], row)
                          : row[column.accessor]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollArea>
        <Flex justify="between" align="center" customClass="TableFooter">
          {multiSelect && (
            <Flex customClass="selected-rows-count">
              <Paragraph>{selectedRows.size} selected row(s).</Paragraph>
            </Flex>
          )}
          <Flex customClass="pagination" gap={100}>
            {currentPage > 1 && (
              <IconButton
                size="small"
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeftIcon />
              </IconButton>
            )}
            {renderPagination()}
            {currentPage < totalNumberOfPages && (
              <IconButton
                size="small"
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRightIcon />
              </IconButton>
            )}
          </Flex>
        </Flex>
      </div>

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent DialogContentUpdateCell">
            <Heading level={4} weight="bold">
              Edit Cell
            </Heading>
            <Flex
              direction="column"
              style={{ marginTop: "var(--size-400)" }}
              customClass="updateCell"
              gap={300}
            >
              <TextArea
                value={dialogContent.value}
                onChange={(e) =>
                  setDialogContent({
                    ...dialogContent,
                    value: e.target.value,
                  })
                }
                placeholder="Edit cell value..."
                fluid
                label="Update Cell"
              />
              <Button
                fluid
                onClick={handleDialogSave}
                size="medium"
                variant="solid"
              >
                Save
              </Button>
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

export default Table;
