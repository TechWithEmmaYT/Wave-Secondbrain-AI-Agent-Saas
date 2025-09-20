import { RiLoader5Fill } from "@remixicon/react";
import React from "react";

type Props = {
  show: boolean;
  text?: string;
};

const LoaderOverlay = ({ show, text = "Creating note..." }: Props) => {
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 bg-background/20 backdrop-blur-xs z-50
    flex items-center justify-center
  "
    >
      <div className="flex flex-col items-center gap-2">
        <RiLoader5Fill className="w-16 h-16 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
};

export default LoaderOverlay;
