function Pagination({ currentPage, totalPages, onPageChange }) {
  // Cria um array com os números das páginas [1, 2, 3...]
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  
  if (totalPages <= 1) return null;

  return (
    <nav className="d-flex justify-content-center mt-4 mb-5">
      <ul className="pagination flex-wrap justify-content-center">
        
       
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button 
            className="page-link" 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo; Anterior
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button 
            className="page-link" 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Seguinte &raquo;
          </button>
        </li>
        
      </ul>
    </nav>
  );
}

export default Pagination;