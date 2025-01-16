import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NewPage = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar la página
    console.log({ title, slug, content });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    // Genera el slug automáticamente desde el título
    setSlug(newTitle.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Nueva Página</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Ingrese el título de la página"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug / URL</Label>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">https://mipequenina.mx/</span>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="nombre-de-pagina"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descripción</Label>
            <Editor
              apiKey="your-api-key-here" // Necesitarás una API key de TinyMCE
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
            />
          </div>

          <Button type="submit" className="w-full">
            Guardar Página
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default NewPage;