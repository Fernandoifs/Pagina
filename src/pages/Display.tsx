import { useLocation, Link } from 'react-router-dom'

function Display() {
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;

  if (!imageUrl) {
    return (
      <div className="container">
        <h1>Nenhuma imagem encontrada</h1>
        <Link to="/" className="back-link">Voltar para upload</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Imagem Carregada</h1>
      <div className="image-preview">
        <img src={imageUrl} alt="Uploaded" className="preview-image" />
      </div>
      <Link to="/" className="back-link">Fazer novo upload</Link>
    </div>
  )
}

export default Display