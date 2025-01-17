import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageText, setImageText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [classifiedText, setClassifiedText] = useState({
    enunciado: '',
    questoes: [] as string[],
    alternativas: [] as string[],
    gabarito: '',
  });

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setClassifiedText(data);  // Recebe o texto classificado
          navigate('/display', { state: { imageUrl: URL.createObjectURL(file), text: data } });
        } else {
          throw new Error('Erro ao processar a imagem');
        }
      } catch (error) {
        setError('Erro ao enviar a imagem');
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Upload de Imagem</h1>

      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
      </div>
    </div>
  );
}

export default Upload;