import React from 'react';
import { Button } from "@/components/ui/button";
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface AlignmentControlsProps {
  onExecCommand: (command: string, value?: string | boolean) => void;
}

export const AlignmentControls = ({ onExecCommand }: AlignmentControlsProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onExecCommand("justifyLeft")}
        title="Alinear a la izquierda"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onExecCommand("justifyCenter")}
        title="Centrar"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onExecCommand("justifyRight")}
        title="Alinear a la derecha"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </>
  );
};