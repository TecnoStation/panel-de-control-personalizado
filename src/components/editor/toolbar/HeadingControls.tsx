import React from 'react';
import { Button } from "@/components/ui/button";
import { Heading1, Heading2 } from 'lucide-react';

interface HeadingControlsProps {
  onExecCommand: (command: string, value?: string | boolean) => void;
  onHeadingOperation?: (tag: string) => void;
}

export const HeadingControls = ({ onExecCommand, onHeadingOperation }: HeadingControlsProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onHeadingOperation?.("h1")}
        title="Encabezado 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onHeadingOperation?.("h2")}
        title="Encabezado 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
    </>
  );
};