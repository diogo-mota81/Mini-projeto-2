import Card from "./card";

function Cards({ items, onAdd, onProductClick }) {
  return (
    <div className="container pb-5">      
      <div className="row">
        {items.map((item) => (
          <Card
            key={item.id}
            
            // 1. OBRIGATÓRIO: Passar o produto completo 'item' para o filho
            // Sem isto, o botão "Adicionar" não sabe o que enviar para o carrinho!
            item={item} 
            
            // 2. Dados visuais
            title={item.title}
            price={item.price}
            image={item.thumbnail} // Na DummyJSON a imagem principal é 'thumbnail'
            description={item.description}
            
            // 3. Funções (Adicionar ao Carrinho e Abrir Detalhe)
            onAdd={onAdd}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Cards;