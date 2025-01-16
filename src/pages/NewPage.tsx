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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Alta de Páginas</h1>
        <div className="text-sm breadcrumbs">
          <span className="text-gray-500">Home / Alta de Páginas</span>
        </div>
      </div>
      
      <Card className="bg-[#4C8C40] text-white p-4 mb-6">
        <h2 className="text-lg">Nueva Página</h2>
      </Card>
      
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
              <span className="text-gray-500">https://imperquimia.mx/</span>
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
              apiKey="your-api-key-here"
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

          <Button type="submit" className="w-full bg-[#4C8C40] hover:bg-[#3d7033]">
            Guardar Página
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default NewPage;