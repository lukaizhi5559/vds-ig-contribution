/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { useState, useEffect, useCallback } from "react";

const FIGMA_API_URL = "https://api.figma.com/v1/files";
const FIGMA_API_TOKEN = (import.meta as ImportMetaWithEnv).env.VITE_FIGMA_API_TOKEN || "";

interface ImportMetaWithEnv extends ImportMeta {
  env: {
    VITE_FIGMA_API_TOKEN: string;
  };
}

type FigmaNode = {
  name?: string;
  type?: string;
  children?: FigmaNode[];
  componentPropertyDefinitions?: {
    use?: {
      type?: string;
    };
  };
};

type FigmaData = {
  name?: string;
  thumbnailUrl?: string;
  lastModified?: string;
  document?: FigmaNode;
};

type ProcessedData = {
  usageGuideFrame: FigmaNode | null;
  variantFrames: string[];
  childNames: string[];
  frameNodes: FigmaNode[];
  name?: string;
  thumbnailUrl?: string;
  lastModified?: string;
  status: "success" | "rejected" | "error";
  message: string;
};

type UseFigmaDataReturn = {
  fileData: FigmaData | null;
  processedData: ProcessedData | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};

const useFigmaData = (
  fileKeyOrUrl: string,
  shouldFigmaData = false
): UseFigmaDataReturn => {
  const [fileData, setFileData] = useState<FigmaData | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const extractFileKey = useCallback((fileKeyOrUrl: string): string => {
    if (!fileKeyOrUrl) return "";

    // Match for the format "design/<fileKey>/"
    const urlPattern = /design\/([a-zA-Z0-9]+)\//;
    const match = fileKeyOrUrl.match(urlPattern);

    return match ? match[1] : fileKeyOrUrl;
  }, []);

  const fetchFigmaData = useCallback(async (fileKey: string): Promise<void> => {
    if (!fileKey) return;

    try {
      setStatus("loading");
      const response = await fetch(`${FIGMA_API_URL}/${fileKey}`, {
        headers: {
          "X-FIGMA-TOKEN": FIGMA_API_TOKEN,
        },
      });

      if (response.ok) {
        const data: FigmaData = await response.json();
        setFileData(data);
        setStatus("success");
      } else {
        throw new Error("Failed to fetch Figma file data");
      }
    } catch (err: any) {
      setError(err.message);
      setStatus("error");
    }
  }, []);

  const processFigmaData = useCallback((data: FigmaData): ProcessedData | null => {
    if (!data || !data.document) return null;

    const traverse = (node: FigmaNode): ProcessedData => {
      let results: ProcessedData = {
        usageGuideFrame: null,
        variantFrames: [],
        childNames: [],
        frameNodes: [],
        status: "success",
        message: "",
      };

      // Check for Figma Usage Guide frame
      if (node.name && node.name.toLowerCase().includes("figma usage guide")) {
        results.usageGuideFrame = node;
      }

      // Check for frame type in componentPropertyDefinitions
      if (
        node.componentPropertyDefinitions &&
        node.componentPropertyDefinitions?.use?.type === "VARIANT"
      ) {
        results.frameNodes.push(node);
      }

      // Check for VARIANT type
      if (node.type === "FRAME" && node.children) {
        for (const child of node.children) {
          if (child.type === "VARIANT" && child.name) {
            results.variantFrames.push(child.name);
          }
        }
      }

      // Recursively traverse children
      if (node.children) {
        for (const child of node.children) {
          results.childNames.push(child.name || "");
          const childResults = traverse(child);
          results.usageGuideFrame = results.usageGuideFrame || childResults.usageGuideFrame;
          results.variantFrames = [...results.variantFrames, ...childResults.variantFrames];
          results.frameNodes = [...results.frameNodes, ...childResults.frameNodes];
        }
      }

      return results;
    };

    const rootResults = traverse(data.document);

    // Determine status and message
    if (rootResults.frameNodes.length === 0) {
      rootResults.status = "rejected";
      rootResults.message = "Variant could not be found.";
    } else if (!rootResults.usageGuideFrame) {
      rootResults.status = "rejected";
      rootResults.message = "Figma Usage Guide frame is missing.";
    } else {
      rootResults.status = "success";
      rootResults.message = "Figma data processed successfully.";
    }

    return {
      ...rootResults,
      name: data.name,
      thumbnailUrl: data.thumbnailUrl,
      lastModified: data.lastModified,
    };
  }, []);

  useEffect(() => {
    const fileKey = extractFileKey(fileKeyOrUrl);
    if (fileKey && shouldFigmaData) fetchFigmaData(fileKey);
  }, [fileKeyOrUrl, extractFileKey, fetchFigmaData, shouldFigmaData]);

  const processedData = fileData ? processFigmaData(fileData) : null;

  return { fileData, processedData, status, error };
};

export default useFigmaData;
