/*type Product = {
    // Properties of product
    id: number;
    productid: string;
    image: string;
    targeturl: string;
    shadename: string;
    rating: number;
    salesprice: number;
    productname: string;
    colordistance: bigint;
    skintypes: string[];
  };*/



  interface Product {
    id: number;
    productid: string;
    productname: string;
    image: string;
    targeturl: string;
    rgbvalue: number[];
    shadename: string;
    rating: number;
    salesprice: number;
    skintypes: string[];
    color_distance: number;
  }
  

  function ProductCard({ product }: { product: Product }) { 
    return ( 
      <div>
        <p>{product.shadename}</p> 
        
      </div>
    );
  }

export default ProductCard ;