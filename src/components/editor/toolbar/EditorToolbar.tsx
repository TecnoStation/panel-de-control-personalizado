import React from 'react';
import { EditorControls } from './EditorControls';
import { FontControls } from './FontControls';
import { AlignmentControls } from './AlignmentControls';
import { ListControls } from './ListControls';
import { HeadingControls } from './HeadingControls';
import { InsertControls } from './InsertControls';

interface EditorToolbarProps {
  onExecCommand: (command: string, value?: string | boolean) => void;
  onFontSizeChange: (size: string) => void;
  onFontFamilyChange: (family: string) => void;
  onColorChange: (color: string) => void;
  onListOperation: (type: 'ordered' | 'unordered') => void;
  onShowLinkInput: () => void;
  onToggleHtmlSource: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditorToolbar = ({
  onExecCommand,
  onFontSizeChange,
  onFontFamilyChange,
  onColorChange,
  onListOperation,
  onShowLinkInput,
  onToggleHtmlSource,
  onImageUpload
}: EditorToolbarProps) => {
  return (
    <div className="border-b p-2 flex flex-wrap gap-1 bg-muted/30">
      <EditorControls onExecCommand={onExecCommand} />
      <div className="w-px h-6 bg-border mx-1 my-auto" />
      
      <FontControls
        onFontSizeChange={onFontSizeChange}
        onFontFamilyChange={onFontFamilyChange}
        onColorChange={onColorChange}
      />
      <div className="w-px h-6 bg-border mx-1 my-auto" />
      
      <AlignmentControls onExecCommand={onExecCommand} />
      <div className="w-px h-6 bg-border mx-1 my-auto" />
      
      <ListControls onListOperation={onListOperation} />
      <div className="w-px h-6 bg-border mx-1 my-auto" />
      
      <HeadingControls onExecCommand={onExecCommand} />
      <div className="w-px h-6 bg-border mx-1 my-auto" />
      
      <InsertControls
        onShowLinkInput={onShowLinkInput}
        onToggleHtmlSource={onToggleHtmlSource}
        onImageUpload={onImageUpload}
      />
    </div>
  );
};