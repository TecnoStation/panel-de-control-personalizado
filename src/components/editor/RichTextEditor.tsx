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
  Heading2,
  Image as ImageIcon,
  Code
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const fontSizes = ['8', '10', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48'];
const fontFamilies = [
  'Arial',
  'Times New Roman',
  'Helvetica',
  'Courier New',
  'Georgia',
  'Verdana'
];
const colors = [
  '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#808080', '#800000', '#808000', '#008000', '#800080', '#008080', '#000080'
];

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
      // Aseguramos que el enlace tenga el protocolo
      const url = linkUrl.startsWith('http://') || linkUrl.startsWith('https://') 
        ? linkUrl 
        : `https://${linkUrl}`;
      
      // Aseguramos que el editor tenga el foco
      if (editorRef.current) {
        editorRef.current.focus();
      }

      // Verificamos si hay texto seleccionado
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        document.execCommand('createLink', false, url);
        // Agregamos target="_blank" al enlace creado
        const anchor = selection.anchorNode?.parentElement;
        if (anchor?.tagName === 'A') {
          anchor.setAttribute('target', '_blank');
        }
      } else {
        // Si no hay texto seleccionado, insertamos el enlace con la URL como texto
        const link = `<a href="${url}" target="_blank">${url}</a>`;
        document.execCommand('insertHTML', false, link);
      }
      
      setLinkUrl("");
      setShowLinkInput(false);
      
      // Actualizamos el contenido
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  const handleFontSizeChange = (size: string) => {
    // Convertimos el tamaño a un índice que document.execCommand pueda entender
    const sizeIndex = Math.ceil(parseInt(size) / 8);
    execCommand("fontSize", String(sizeIndex));
    
    // Aplicamos el tamaño exacto usando CSS
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontSize = `${size}px`;
      range.surroundContents(span);
      onChange(editorRef.current?.innerHTML || '');
    }
  };

  const handleFontFamilyChange = (family: string) => {
    execCommand("fontName", family);
  };

  const handleColorChange = (color: string) => {
    execCommand("foreColor", color);
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

  const handleListOperation = (type: 'ordered' | 'unordered') => {
    // Aseguramos que estamos en el editor antes de ejecutar el comando
    if (editorRef.current) {
      editorRef.current.focus();
      
      // Guardamos la selección actual
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      
      // Ejecutamos el comando correspondiente
      if (type === 'ordered') {
        document.execCommand('insertOrderedList', false);
      } else {
        document.execCommand('insertUnorderedList', false);
      }
      
      // Restauramos la selección
      if (selection && range) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      
      // Actualizamos el contenido
      onChange(editorRef.current.innerHTML);
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
        
        <Select onValueChange={handleFontSizeChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Tamaño" />
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}px
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleFontFamilyChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Fuente" />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((family) => (
              <SelectItem key={family} value={family}>
                {family}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleColorChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Color" />
          </SelectTrigger>
          <SelectContent>
            {colors.map((color) => (
              <SelectItem key={color} value={color}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                  {color}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
          onClick={() => handleListOperation('unordered')}
          title="Lista con viñetas"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleListOperation('ordered')}
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
          onChange={handleImageUpload}
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleHtmlSource}
          title="Ver código fuente"
        >
          <Code className="h-4 w-4" />
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

      {showHtmlSource ? (
        <textarea
          className="min-h-[200px] p-4 w-full font-mono text-sm focus:outline-none bg-background text-foreground"
          value={htmlSource}
          onChange={(e) => setHtmlSource(e.target.value)}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[200px] max-h-[500px] overflow-y-auto p-4 focus:outline-none"
          dangerouslySetInnerHTML={{ __html: value }}
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
        />
      )}
    </div>
  );
};