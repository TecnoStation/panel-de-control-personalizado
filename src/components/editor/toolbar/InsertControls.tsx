import React from 'react';
import { Button } from "@/components/ui/button";
import { Link2, Image as ImageIcon, Code } from 'lucide-react';

interface InsertControlsProps {
  onShowLinkInput: () => void;
  onToggleHtmlSource: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InsertControls = ({
  onShowLinkInput,
  onToggleHtmlSource,
  onImageUpload
}: InsertControlsProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={onShowLinkInput}
        title="Insertar enlace"
      >
        <Link2 className="h-4 w-4" />
      </Button>
      
      <label htmlFor="image-upload">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => document.getElementById('image-upload')?.click()}
          title="Insertar imagen"
          type="button"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        className="hidden"
        onChange={onImageUpload}
      />

      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleHtmlSource}
        title="Ver código fuente"
      >
        <Code className="h-4 w-4" />
      </Button>
    </>
  );
};