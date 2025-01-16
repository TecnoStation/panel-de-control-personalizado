import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  Link2,
  Heading1,
  Heading2
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const execCommand = (command: string, value: string | boolean = false) => {
    document.execCommand(command, false, value ? String(value) : "");
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleLinkAdd = () => {
    if (linkUrl) {
      execCommand("createLink", linkUrl);
      setLinkUrl("");
      setShowLinkInput(false);
    }
  };

  return (
    <div className="border rounded-md">
      <div className="border-b p-2 flex flex-wrap gap-1 bg-muted/30">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("bold")}
          title="Negrita"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("italic")}
          title="Cursiva"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("underline")}
          title="Subrayado"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1 my-auto" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("justifyLeft")}
          title="Alinear a la izquierda"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("justifyCenter")}
          title="Centrar"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("justifyRight")}
          title="Alinear a la derecha"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1 my-auto" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("insertUnorderedList")}
          title="Lista con viñetas"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("insertOrderedList")}
          title="Lista numerada"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1 my-auto" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("formatBlock", "h1")}
          title="Encabezado 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("formatBlock", "h2")}
          title="Encabezado 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1 my-auto" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowLinkInput(!showLinkInput)}
          title="Insertar enlace"
        >
          <Link2 className="h-4 w-4" />
        </Button>
      </div>
      
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

      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] p-4 focus:outline-none"
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  );
};