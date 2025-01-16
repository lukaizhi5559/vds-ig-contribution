export type FigmaNode = {
    name?: string;
    type?: string;
    children?: FigmaNode[];
    componentPropertyDefinitions?: {
      use?: {
        type?: string;
      };
    };
  };
  
export type FigmaData = {
    name?: string;
    thumbnailUrl?: string;
    lastModified?: string;
    document?: FigmaNode;
  };
  
export type ProcessedData = {
    usageGuideFrame: FigmaNode | null;
    variantFrames: string[];
    childNames: string[];
    frameNodes: FigmaNode[];
    name?: string;
    thumbnailUrl?: string;
    lastModified?: string;
    status: "in progress" | "success" | "error" | "rejected";
    message: string;
  };
  
export type UseFigmaDataReturn = {
    fileData: FigmaData | null;
    processedData: ProcessedData | null;
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
};