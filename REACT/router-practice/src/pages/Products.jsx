
import { ProductDescription, ProductContainer, ProductName, ProductPrice } from "../styled/productsStyles";

export default function ProductsList(){
  const products = [
    {
      name: 'Product 1',
      description: 'Description of product 1',
      price: '$10.99'
    },
    {
      name: 'Product 2',
      description: 'Description of product 2',
      price: '$24.99'
    },
    {
      name: 'Product 3',
      description: 'Description of product 3',
      price: '$15.49'
    },
  ];

  return (
    <div>
      {products.map((product, index) => (
        <ProductContainer key={index}>
          <ProductName>{product.name}</ProductName>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>{product.price}</ProductPrice>
        </ProductContainer>
      ))}
    </div>
  );
} 