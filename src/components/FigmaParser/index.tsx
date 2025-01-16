import React, { useState, memo, useEffect } from "react";
import JsonViewer from "@andypf/json-viewer/dist/esm/react/JsonViewer"

const FIGMA_API_URL = "https://api.figma.com/v1/files";

const FigmaParser = ({ fileKey }: { fileKey: string }) => {
  const [fileData, setFileData] = useState<any>(null);

  const fetchFigmaData = async (fileKey: string) => {
    try {
      const response = await fetch(`${FIGMA_API_URL}/${fileKey}`, {
        headers: {
          'X-FIGMA-TOKEN': 'YOUR_FIGMA',
        },
      });

      if (response.ok) {
        const data = await response.json();

        console.log('FILE DATA:', data);

        setFileData(data);
      } else {
        console.error("Failed to fetch Figma file data");
      }
    } catch (error) {
      console.error("Error fetching Figma file:", error);
    }
  };

  useEffect(() => {
    if (fileKey) fetchFigmaData(fileKey);

  },[fileKey]);

  return (
    <div>
      <h3>Figma File Metadata:</h3>
      <JsonViewer data={fileData} />
    </div>
  );
};

export default memo(FigmaParser);
