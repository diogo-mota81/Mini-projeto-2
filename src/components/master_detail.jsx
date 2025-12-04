import { useState } from "react";

function MasterDetail({ product, onBack, onAdd }) {
  // Estado para controlar qual imagem está a ser vista (caso o produto tenha várias)
  const [mainImage, setMainImage] = useState(product.thumbnail);

  // Calcula o preço antigo fictício baseando-se no desconto (para ficar igual à imagem)
  const oldPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <div className="container py-5">
    
      <button onClick={onBack} className="btn btn-outline-secondary mb-4">
        &larr; Voltar à Loja
      </button>

      <div className="row">
      
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm p-3">
          
            <img 
              src={mainImage} 
              alt={product.title} 
              className="img-fluid mb-3" 
              style={{ height: "400px", objectFit: "contain", width: "100%" }}
            />
            
            
            <div className="d-flex gap-2 justify-content-center overflow-auto">
              {product.images && product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumb ${index}`}
                  onClick={() => setMainImage(img)}
                  style={{ 
                    width: "60px", 
                    height: "60px", 
                    objectFit: "cover", 
                    cursor: "pointer",
                    border: mainImage === img ? "2px solid #0d6efd" : "1px solid #ddd",
                    borderRadius: "4px"
                  }}
                />
              ))}
            </div>
          </div>
        </div>

       
        <div className="col-md-6">
          <div className="p-2">
            {/* Marca e Categoria */}
            <span className="badge bg-secondary me-2">{product.brand}</span>
            <span className="text-muted text-uppercase small">{product.category}</span>

            
            <h1 className="fw-bold mt-2 mb-3">{product.title}</h1>

            
            <div className="mb-3 text-warning">
              <span>★ {product.rating} / 5</span>
              <span className="text-muted ms-2 text-small">({product.stock} em stock)</span>
            </div>

           
            <div className="mb-4">
              <span className="text-decoration-line-through text-muted me-2">
                {oldPrice} €
              </span>
              <span className="display-5 fw-bold text-danger">
                {product.price.toFixed(2)} €
              </span>
              <span className="badge bg-danger ms-2">
                -{product.discountPercentage}%
              </span>
            </div>

          
            <p className="lead text-secondary" style={{ fontSize: "1rem" }}>
              {product.description}
            </p>

           
            <div className="d-grid gap-2 d-md-flex mt-5">
              <button 
                className="btn btn-primary btn-lg px-5"
                onClick={onAdd}
              >
                ADICIONAR AO CARRINHO 🛒
              </button>
            </div>
            
           
            <div className="mt-4 p-3 bg-light rounded small">
              <p className="mb-1">✅ <strong>Em Stock</strong> - Entrega prevista em 24h</p>
              <p className="mb-1">✅ <strong>Portes Grátis</strong> para Portugal Continental</p>
              <p className="mb-0">🛡️ <strong>Garantia:</strong> 3 Anos</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterDetail;