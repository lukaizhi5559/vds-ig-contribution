/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { useState, useCallback } from "react";
import { ImportMetaWithEnv, UseFigmaDataReturn, FigmaData, FigmaNode, ProcessedData } from "@/types";
import { extractFileKey } from "@/lib/utils";

const FIGMA_API_URL = "https://api.figma.com/v1/files";
const FIGMA_API_TOKEN = (import.meta as ImportMetaWithEnv).env.VITE_FIGMA_API_TOKEN || "";

const useFigmaData = (): UseFigmaDataReturn => {
  const [fileData, setFileData] = useState<FigmaData | null>(null);
  const [status, setStatus] = useState<"idle" | "in progress" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchFigmaData = useCallback(async (file: string): Promise<void> => {
    if (!file) return;

    const fileKey = extractFileKey(file);

    try {
      setStatus("in progress");
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
        mainComponent: [],
        variantFrames: [],
        childNames: [],
        frameNodes: [],
        status: "in progress",
        message: [],
      };

      if (node.name && node.name.toLowerCase().includes("figma usage guide")) {
        results.usageGuideFrame = node;
      }

      if (
        node.componentPropertyDefinitions &&
        node.componentPropertyDefinitions?.use?.type === "VARIANT"
      ) {
        results.frameNodes.push(node);
      }

      if (node.type === "FRAME" && node.children) {
        for (const child of node.children) {
          if (child.type === "VARIANT" && child.name) {
            results.variantFrames.push(child.name);
          }
        }
      }

      if (node.type === "INSTANCE" && node.name?.includes('[main-component]')) {
        results.mainComponent.push(node);
      }

      if (node.children) {
        for (const child of node.children) {
          results.childNames.push(child.name || "");
          const childResults = traverse(child);
          results.usageGuideFrame = results.usageGuideFrame || childResults.usageGuideFrame;
          results.variantFrames = [...results.variantFrames, ...childResults.variantFrames];
          results.frameNodes = [...results.frameNodes, ...childResults.frameNodes];
          results.mainComponent = [...results.mainComponent, ...childResults.mainComponent];
        }
      }

      return results;
    };

    const rootResults = traverse(data.document);

    if (rootResults.frameNodes.length === 0) {
      rootResults.status = "rejected";
      rootResults.message.push("Variant could not be found.");
    }

    if (!rootResults.usageGuideFrame) {
      rootResults.status = "rejected";
      rootResults.message.push("Figma Usage Guide frame is missing.");
    }

    if (rootResults.mainComponent.length === 0) {
      rootResults.status = "rejected";
      rootResults.message.push("Main Component Instance is missing.");
    }

    if (rootResults.status === "in progress") {
      rootResults.status = "success";
      rootResults.message = ["Figma data processed successfully."];
    }

    return {
      ...rootResults,
      name: data.name,
      thumbnailUrl: data.thumbnailUrl,
      lastModified: data.lastModified,
    };
  }, []);

  const processedData = fileData ? processFigmaData(fileData) : null;

  return { fileData, processedData, status, error, fetchFigmaData };
};

export default useFigmaData;
