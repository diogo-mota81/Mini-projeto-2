import { useState, useEffect } from "react";
import Navbar from "./components/navbar"; 
import Cards from "./components/cards"; 
import MasterDetail from "./components/master_detail";
import CartSidebar from "./components/cart_sidebar";
import Footer from "./components/footer"; 
import Pagination from "./components/paginacao"; 

function App() {
  
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Configuração: Número de produtos por página
  const itemsPerPage = 8; 

  useEffect(() => {
   
    const url = "https://dummyjson.com/products?limit=194";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products); 
        setIsLoading(false);
      })
      .catch((error) => console.error("Erro na API:", error));
  }, []); 


  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      // Verifica se o produto já existe no carrinho
      const itemExists = prevItems.find((item) => item.id === product.id);
      
      if (itemExists) {
        // Se existe, aumenta a quantidade
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Se não existe, adiciona novo com quantidade 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setIsCartOpen(true); 
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, amount) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      });
    });
  };

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Filtragem Dupla: Categoria + Texto da Pesquisa
  const filteredProducts = allProducts.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    // O toLowerCase() faz com que a pesquisa ignore maiúsculas/minúsculas
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  
  // Calcular quantas páginas são precisas
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  
  const categories = ["all", ...new Set(allProducts.map(p => p.category))];

 
  const getBtnClass = (category) => selectedCategory === category ? "btn btn-dark" : "btn btn-outline-dark";

  return (
    <div className="d-flex flex-column min-vh-100">
      

      <Navbar 
        cartCount={totalItemsInCart} 
        onCartClick={() => setIsCartOpen(true)}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

     
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <main className="mt-5 flex-grow-1">
        {selectedProduct ? (
         
          <MasterDetail 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)} 
            onAdd={() => handleAddToCart(selectedProduct)} 
          />
        ) : (
         
          <div className="container">
         
            <div className="text-center mb-5">
              <h2 className="mb-4 fw-bold">O nosso Catálogo</h2>
              <div className="d-flex justify-content-center flex-wrap gap-2">
                {categories.map((category) => (
                  <button 
                    key={category}
                    type="button" 
                    className={getBtnClass(category)}
                    onClick={() => setSelectedCategory(category)}
                    style={{ textTransform: "capitalize" }}
                  >
                    {category === "all" ? "Ver Tudo" : category.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

           
            {isLoading ? (
              <div className="text-center py-5">
                 <div className="spinner-border text-dark" role="status"></div>
              </div>
            ) : (
              <>
                <Cards 
                  items={currentProducts} 
                  onAdd={handleAddToCart} 
                  onProductClick={(product) => {
                     setSelectedProduct(product);
                     window.scrollTo(0, 0); // Scroll para o topo ao abrir detalhe
                  }} 
                />

            
                {filteredProducts.length > 0 && (
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                )}
              </>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;