function Card({ title, price, image, description, onAdd, onProductClick, item }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 bg-white text-dark shadow-sm card-hover border-0">
        
        <div 
          className="text-center p-3 bg-white rounded-top" 
          onClick={() => onProductClick(item)} 
          style={{ cursor: "pointer" }}
        >
          <img
            src={image}
            className="card-img-top"
            alt={title}
            style={{ height: "180px", objectFit: "contain" }}
          />
        </div>
        
        <div className="card-body d-flex flex-column">
          <h5 
            className="card-title text-truncate" 
            title={title}
            onClick={() => onProductClick(item)} 
            style={{ cursor: "pointer" }}
          >
            {title}
          </h5>
          
          <p className="card-text small text-secondary">
            {description ? description.slice(0, 60) + "..." : "Sem descrição"}
          </p>

          <div className="mt-auto d-flex justify-content-between align-items-center">
            <span className="fw-bold fs-5 text-primary">
              {price.toFixed(2)} €
            </span>
            
            <button 
              className="btn btn-primary btn-sm px-3"
              onClick={(e) => {
                e.stopPropagation(); 
                onAdd(item); 
              }}
            >
              + Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;