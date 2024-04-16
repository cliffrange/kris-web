import React, { useCallback, useState } from "react";
import { Box, Button, Text } from "grommet";
import { SelectFile } from "./styles";

import { useAuth0 } from "../../utils/auth0";
import { Link } from "react-router-dom";

function Dashboard({}) {
  const { getTokenSilently } = useAuth0();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(false);

  const onFileChange = useCallback((e) => {
    console.log("aha", e.target.files);
    setSelectedFile(e.target.files[0]);
  });

  const createDummyMatch = useCallback(() => {
    const formData = new FormData();
    formData.append("File", selectedFile);

    const callApi = async () => {
      setUploading(true);
      const token = await getTokenSilently();
      try {
        const response = await fetch("/api/bulk/players", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        console.log(result);
        setResult(result.message || "Successfully uploaded");
      } catch {
        setResult("Uploading failed. Please try again");
      } finally {
        setUploading(false);
        setSelectedFile(null);
      }
      console.log(result);
    };
    callApi();
  }, [selectedFile]);

  const getText = useCallback(() => {
    if (result) {
      return result;
    }

    if (uploading) {
      return "Uploading..";
    }

    if (selectedFile) {
      return `${selectedFile.name} (${(selectedFile.size / 1024).toFixed(
        2,
      )}KB)${
        selectedFile.size / 1024 > 10
          ? " - Too large! Maximum allowed size is 10KB"
          : ""
      }`;
    }

    return "No file selected";
  }, [selectedFile, uploading]);

  return (
    <Box justify="center">
      <Box direction="row" justify="center" gap="small">
        <Button to="/my-teams" as={Link} label="My Teams"></Button>
        <Button to="/my-matches" as={Link} label="My Matches"></Button>
      </Box>
      <hr style={{ width: "100%" }}></hr>

      <Box justify="center" gap="small">
        <Text>
          You can create your teams using data in a .csv file. Maximum size
          allowed is 10KB.
        </Text>
        <Box justify="center" gap="small" align="center">
          <Text>{getText()}</Text>
          <Box direction="row" gap="small">
            <SelectFile>
              <input
                type="file"
                onChange={onFileChange}
                style={{ display: "none" }}
              ></input>
              Select a .csv file
            </SelectFile>
            <Button
              onClick={createDummyMatch}
              label="Upload"
              disabled={
                !selectedFile || selectedFile.size > 10 * 1024 || uploading
              }
            ></Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
