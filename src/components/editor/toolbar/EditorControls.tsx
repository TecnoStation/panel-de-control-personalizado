import React from 'react';
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline } from 'lucide-react';

interface EditorControlsProps {
  onExecCommand: (command: string, value?: string | boolean) => void;
}

export const EditorControls = ({ onExecCommand }: EditorControlsProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onExecCommand("bold")}
        title="Negrita"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onExecCommand("italic")}
        title="Cursiva"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onExecCommand("underline")}
        title="Subrayado"
      >
        <Underline className="h-4 w-4" />
      </Button>
    </>
  );
};