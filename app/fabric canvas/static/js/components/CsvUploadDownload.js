import React, { useState } from "react";
import {
  Button,
  IconButton,
  Input,
  Tabs,
  Flex,
  Tooltip,
} from "blocksin-system";
import { parse } from "papaparse";
import { TrashIcon, RepeatIcon, DownloadIcon } from "sebikostudio-icons";

const CsvUploadDownload = ({
  setTableData,
  setColumns,
  generateCanvases,
  handleDeleteRow,
  handleSubmit,
  handleSheetUrlChange,
  sheetUrl,
  handleExport,
  dataLoaded,
  //   handleDownload,
}) => {
  // eslint-disable-next-line
  const [file, setFile] = useState(null);

  const [activeTab, setActiveTab] = useState("tab1"); // Default tab

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    handleUpload(e.target.files[0]);
  };

  const handleUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        parse(text, {
          complete: (results) => {
            if (results.data && results.data.length > 0) {
              const dataWithIds = results.data.map((row, index) => ({
                id: index + 1,
                ...row,
              }));

              // Save data to local storage
              localStorage.setItem("tableData", JSON.stringify(dataWithIds));
              setTableData(dataWithIds);

              const headers = Object.keys(results.data[0]).map((key) => ({
                Header: key,
                accessor: key,
              }));

              const idColumn = { Header: "ID", accessor: "id" };
              const updatedHeaders = headers.some(
                (header) => header.accessor === "id"
              )
                ? headers
                : [idColumn, ...headers];

              setColumns([
                ...updatedHeaders,
                {
                  Header: "Actions",
                  accessor: "actions",
                  Cell: (value, row) => (
                    <IconButton
                      onClick={() => handleDeleteRow(row)}
                      ariaLabel="Delete Row"
                      size="small"
                      variant="ghost"
                    >
                      <TrashIcon />
                    </IconButton>
                  ),
                  maxWidth: "40px",
                },
              ]);

              generateCanvases(dataWithIds);
            } else {
              alert("No data found in the uploaded CSV file.");
            }
          },
          header: true,
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} fluid>
        <Tabs.List aria-label="Manage your account">
          <Tabs.Trigger value="tab1">Google</Tabs.Trigger>
          <Tabs.Trigger value="tab2">CSV</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <Flex
            direction="column"
            fluid
            gap={200}
            style={{
              marginTop: "var(--size-300)",
              padding: "0 var(--size-300)",
            }}
          >
            <Input
              type="text"
              value={sheetUrl}
              onChange={handleSheetUrlChange}
              placeholder="Enter your Google Sheet URL"
              label="Google Sheet URL"
            />
            <Button fluid onClick={handleSubmit} size="small" variant="solid">
              <RepeatIcon />
              Paint Banners
            </Button>
          </Flex>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <Flex
            direction="column"
            fluid
            gap={200}
            style={{
              marginTop: "var(--size-300)",
              padding: "0 var(--size-300)",
            }}
          >
            <input
              type="file"
              accept=".csv"
              style={{ display: "none" }}
              id="csvUpload"
              onChange={handleFileChange}
            />
            <Button
              variant="solid"
              size="small"
              fluid
              onClick={() => document.getElementById("csvUpload").click()}
            >
              Upload CSV
            </Button>
          </Flex>
        </Tabs.Content>
      </Tabs>
      <Flex
        direction="column"
        gap={100}
        fluid
        style={{ padding: "0 var(--size-300)" }}
      >
        {/* <Button variant="outline" size="small" fluid onClick={handleDownload}>
          Download CSV
        </Button> */}
        <Tooltip delayDuration={200}>
          <Tooltip.Trigger asChild>
            <Button
              fluid
              size="small"
              variant="ghost"
              onClick={handleExport}
              disabled={!dataLoaded}
            >
              <DownloadIcon />
              Export Banners
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content sideOffset={2}>
            Export all banners in PNG format
          </Tooltip.Content>
        </Tooltip>
      </Flex>
    </>
  );
};

export default CsvUploadDownload;
