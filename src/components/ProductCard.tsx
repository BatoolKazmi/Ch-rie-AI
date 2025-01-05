import { Button, Card, Image, Text } from "@chakra-ui/react"

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
      <Card.Root maxW="sm" overflow="hidden" className="bg-slate-50 w-[22rem] h-[30rem]">
      <Image
        src={product.image}
        alt={`Image of ${product.productname}`}
        style={{ 
          width: '100%', 
          height: '100%' 
        }} 
      />
      <Card.Body gap="2" className="p-2">
        <Card.Title>Living room Sofa</Card.Title>
        <Card.Description>
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces.
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          $450
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid">Buy now</Button>
        <Button variant="ghost">Add to cart</Button>
      </Card.Footer>
    </Card.Root>
    );
  }

export default ProductCard ;