import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { EditorToolbar } from './toolbar/EditorToolbar';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showHtmlSource, setShowHtmlSource] = useState(false);
  const [htmlSource, setHtmlSource] = useState("");

  const execCommand = (command: string, value: string | boolean = false) => {
    document.execCommand(command, false, value ? String(value) : "");
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleLinkAdd = () => {
    if (linkUrl) {
      const url = linkUrl.startsWith('http://') || linkUrl.startsWith('https://') 
        ? linkUrl 
        : `https://${linkUrl}`;
      
      if (editorRef.current) {
        editorRef.current.focus();
      }

      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        document.execCommand('createLink', false, url);
        const anchor = selection.anchorNode?.parentElement;
        if (anchor?.tagName === 'A') {
          anchor.setAttribute('target', '_blank');
        }
      } else {
        const link = `<a href="${url}" target="_blank">${url}</a>`;
        document.execCommand('insertHTML', false, link);
      }
      
      setLinkUrl("");
      setShowLinkInput(false);
      
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  const handleFontSizeChange = (size: string) => {
    const sizeIndex = Math.ceil(parseInt(size) / 8);
    execCommand("fontSize", String(sizeIndex));
    
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontSize = `${size}px`;
      range.surroundContents(span);
      onChange(editorRef.current?.innerHTML || '');
    }
  };

  const handleListOperation = (type: 'ordered' | 'unordered') => {
    if (editorRef.current) {
      editorRef.current.focus();
      
      if (type === 'ordered') {
        document.execCommand('insertOrderedList', false);
      } else {
        document.execCommand('insertUnorderedList', false);
      }
      
      const lists = editorRef.current.querySelectorAll<HTMLElement>('ul, ol');
      lists.forEach(list => {
        if (list instanceof HTMLUListElement) {
          list.style.listStyleType = 'disc';
          list.style.paddingLeft = '2em';
        } else if (list instanceof HTMLOListElement) {
          list.style.listStyleType = 'decimal';
          list.style.paddingLeft = '2em';
        }
      });
      
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleHeadingOperation = (tag: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('formatBlock', false, tag);
      
      const headings = editorRef.current.querySelectorAll<HTMLElement>('h1, h2');
      headings.forEach(heading => {
        if (heading.tagName === 'H1') {
          heading.style.fontSize = '2em';
          heading.style.fontWeight = 'bold';
          heading.style.marginBottom = '0.5em';
        } else if (heading.tagName === 'H2') {
          heading.style.fontSize = '1.5em';
          heading.style.fontWeight = 'bold';
          heading.style.marginBottom = '0.4em';
        }
      });
      
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = `<img src="${event.target?.result}" alt="Uploaded image" style="max-width: 100%; height: auto;" />`;
        if (editorRef.current) {
          const selection = window.getSelection();
          const range = selection?.getRangeAt(0);
          if (range) {
            range.deleteContents();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = img;
            range.insertNode(tempDiv.firstChild as Node);
            onChange(editorRef.current.innerHTML);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleHtmlSource = () => {
    if (showHtmlSource) {
      if (editorRef.current) {
        editorRef.current.innerHTML = htmlSource;
        onChange(htmlSource);
      }
    } else {
      setHtmlSource(editorRef.current?.innerHTML || "");
    }
    setShowHtmlSource(!showHtmlSource);
  };

  return (
    <div className="border rounded-md">
      <EditorToolbar
        onExecCommand={execCommand}
        onFontSizeChange={handleFontSizeChange}
        onFontFamilyChange={(family) => execCommand("fontName", family)}
        onColorChange={(color) => execCommand("foreColor", color)}
        onListOperation={handleListOperation}
        onShowLinkInput={() => setShowLinkInput(!showLinkInput)}
        onToggleHtmlSource={toggleHtmlSource}
        onImageUpload={handleImageUpload}
        onHeadingOperation={handleHeadingOperation}
      />
      
      {showLinkInput && (
        <div className="p-2 border-b flex gap-2">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button onClick={handleLinkAdd} size="sm">
            Añadir
          </Button>
        </div>
      )}

      {showHtmlSource ? (
        <textarea
          className="min-h-[200px] p-4 w-full font-mono text-sm focus:outline-none dark:bg-gray-800 dark:text-white bg-white text-black"
          value={htmlSource}
          onChange={(e) => setHtmlSource(e.target.value)}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[200px] max-h-[500px] overflow-y-auto p-4 focus:outline-none prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: value }}
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
        />
      )}
    </div>
  );
};