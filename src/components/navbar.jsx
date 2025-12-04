function Navbar({ cartCount, onCartClick, searchValue, onSearchChange }) {
  return (
   
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-3">
      <div className="container">
        
       
        <a className="navbar-brand fw-bold fs-3" href="App.jsx">
          One For All
        </a>

        {/* BOTÃO HAMBÚRGUER (Só aparece em mobile) */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CONTEÚDO QUE COLAPSA */}
        <div className="collapse navbar-collapse" id="navbarContent">
          
          

         
          
          <div className="d-flex align-items-center gap-3 ms-auto mt-3 mt-lg-0">
            
            {/* Formulário de Pesquisa */}
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Pesquisar..." 
                aria-label="Search"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </form>

            {/* Botão Carrinho */}
            <button 
              type="button" 
              className="btn btn-outline-light position-relative d-flex align-items-center justify-content-center"
              onClick={onCartClick}
              style={{ width: "42px", height: "42px" }} // Pequeno ajuste para manter quadrado
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.835 6.397 9.176-.461L13.54 4H3.102zM12 12a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-9 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              
              {/* Contador Vermelho (Badge) */}
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-dark">
                  {cartCount}
                  <span className="visually-hidden">itens no carrinho</span>
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;