import { cn } from "@/lib/utils";
import {
  RemixiconComponentType,
  RiAddLine,
  RiFileTextLine,
  RiLoader2Line,
} from "@remixicon/react";
import React, { FC } from "react";
import { Button } from "../ui/button";

type Props = {
  title: string;
  description?: string;
  icon?: RemixiconComponentType;
  iconClassName?: string;
  buttonText?: string;
  isLoading?: boolean;
  onButtonClick?: () => void;
};

const EmptyState: FC<Props> = ({
  title = "No record",
  description,
  icon: Icon = RiFileTextLine,
  buttonText = "Create",
  iconClassName,
  isLoading,
  onButtonClick,
}) => {
  return (
    <div className="text-center py-12">
      <Icon
        className={cn(
          "w-16 h-16 text-muted-foreground mx-auto mb-4",
          iconClassName
        )}
      />
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-6">{description}</p>
      )}
      {onButtonClick && (
        <Button
          onClick={onButtonClick}
          className="cursor-pointer"
          disabled={isLoading}
        >
          <RiAddLine className="w-5 h-5 mr-1" />
          {buttonText}
          {isLoading && <RiLoader2Line className="w-4 h-4 animate-spin" />}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
