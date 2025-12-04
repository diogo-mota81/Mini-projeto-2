import { useEffect } from "react";

function CartSidebar({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity }) {
  // 1. Calcular Preço Total
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Se não estiver aberto, não mostramos nada (para evitar erros de sobreposição)
  if (!isOpen) return null;

  return (
    <>
      {/* --- FUNDO ESCURO (BACKDROP) --- */}
      <div 
        className="modal-backdrop fade show" 
        onClick={onClose}
        style={{ zIndex: 1040 }}
      ></div>

      {/* --- BARRA LATERAL (OFFCANVAS) --- */}
      {/* A classe 'show' e 'd-block' forçam a barra a aparecer */}
      <div 
        className="offcanvas offcanvas-end show d-block" 
        tabIndex="-1"
        style={{ zIndex: 1050 }}
      >
        <div className="offcanvas-header bg-dark text-white">
          <h5 className="offcanvas-title">Carrinho ({cartItems.length})</h5>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            onClick={onClose}
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column">
          
          {/* LISTA DE PRODUTOS */}
          <div className="flex-grow-1 overflow-auto">
            {cartItems.length === 0 ? (
              <div className="text-center mt-5 text-muted">
                <p>O carrinho está vazio.</p>
                <p>Vai adicionar produtos! 🛒</p>
              </div>
            ) : (
              <ul className="list-group list-group-flush">
                {cartItems.map((item) => (
                  <li key={item.id} className="list-group-item py-3">
                    <div className="d-flex gap-3 align-items-center">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px" }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1 text-truncate" style={{ maxWidth: "160px" }}>{item.title}</h6>
                        <small className="text-primary fw-bold">{item.price.toFixed(2)} €</small>
                      </div>
                      <button 
                        className="btn btn-sm text-danger border-0"
                        onClick={() => onRemove(item.id)}
                      >
                        🗑️
                      </button>
                    </div>

                    {/* CONTROLOS + e - */}
                    <div className="d-flex justify-content-between align-items-center mt-2 ps-2">
                       <span className="small text-muted">Quantidade:</span>
                       <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-dark" onClick={() => onUpdateQuantity(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                          <button className="btn btn-dark px-3" disabled>{item.quantity}</button>
                          <button className="btn btn-outline-dark" onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                       </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* TOTAL */}
          <div className="border-top pt-3 mt-3 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="h5 mb-0">Total:</span>
              <span className="h4 text-primary fw-bold mb-0">{total.toFixed(2)} €</span>
            </div>
            <button className="btn btn-success w-100 btn-lg">Finalizar Compra</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default CartSidebar;