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

  const findPercentMatch = (color_distance: number) => {
    let match_val: number = 1 - (color_distance/441.67);
    let match_percent = match_val * 100;
    return match_percent.toFixed(2);
  }

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    console.log("clicked"); 
  };

  const setMatchColor = (color_distance: number) => {
    let percentMatch = parseFloat(findPercentMatch(color_distance));

    if(percentMatch >= 90.00){
      return "bg-emerald-500";
    } else if(percentMatch >= 80.00) {
      return "bg-lime-500"
    } else if(percentMatch >= 70.00) {
      return "bg-yellow-500"
    } else if(percentMatch >= 60.00) {
      return "bg-amber-500"
    } else if(percentMatch >= 50.00) {
      return "bg-orange-500"
    } 
    
    return "bg-red-400"


  }
  

  function ProductCard({ product }: { product: Product }) { 
    return ( 
      <Card.Root maxW="sm" overflow="hidden" className="bg-slate-50 w-[22rem]">
      <Image
        src={product.image}
        alt={`Image of ${product.productname}`}
        style={{ 
          width: '100%', 
          height: '70%' 
        }} 
      />
      <Card.Body gap="2" className="pt-4 px-2">
        <div className="flex flex-row justify-between">
          <div className="m-2">
            <p className="mb-2 tracking-widest text-sm font-light">Your shade match</p>
            <h3 className="leading-5 tracking-wide text-lg font-medium">{product.shadename}</h3>
          </div>
          <div className={`rounded percent-match bg-slate-200 mr-6 px-2 py-2 mt-2 mb-2 max-h-16 flex flex-col justify-center content-center ${setMatchColor(product.color_distance)}`}>
            <div className="text-lg font-semibold"><h4>{`${findPercentMatch(product.color_distance)}%`}</h4></div>
            <div><h4 className="text-sm font-thin">Match</h4></div>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="px-4 bg-slate-200">
        <Button variant="solid" onClick={openModal} className="font-semibold w-[100%]">Learn More</Button>
      </Card.Footer>
    </Card.Root>
    );
  }

export default ProductCard ;