import { Button, Card, Image } from "@chakra-ui/react"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger
} from "@/components/ui/dialog"

import { Theme } from "@chakra-ui/react"

import { Rating } from "@/components/ui/rating"

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

  const setMatchColor = (color_distance: number) => {
    let percentMatch = parseFloat(findPercentMatch(color_distance));

    if(percentMatch >= 90.00){
      return "bg-emerald-300";
    } else if(percentMatch >= 80.00) {
      return "bg-lime-300"
    } else if(percentMatch >= 70.00) {
      return "bg-yellow-300"
    } else if(percentMatch >= 60.00) {
      return "bg-amber-300"
    } else if(percentMatch >= 50.00) {
      return "bg-orange-300"
    } 
    
    return "bg-red-200"


  }

  const capitalizedSkinTypes = (arr: string[]) => { 
    return arr.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1); 
    })
  };

  const setRating = (rating: number) => {
    // To be able to display correct star ratings
    // Star ratings only accept values 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, and 4.5
    const roundedRating = Math.round(rating * 2) / 2; 
    return roundedRating;
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
        <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between ">
          <div className="sm:m-2">
            <p className="mb-2 tracking-widest text-sm font-light text-center sm:text-left">Your shade match</p>
            <h3 className="leading-5 tracking-wide text-lg font-medium text-center sm:text-left">{product.shadename}</h3>
          </div>
          <div className={`rounded percent-match  sm:mr-6 px-2 py-2 mt-2 mb-2 max-h-16 flex flex-col justify-center items-center ${setMatchColor(product.color_distance)}`}>
            <div className="text-lg font-semibold"><h4>{`${findPercentMatch(product.color_distance)}%`}</h4></div>
            <div><h4 className="text-sm font-thin">Match</h4></div>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="px-4 bg-slate-200">
      <DialogRoot size="lg" placement="center" motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="font-semibold w-[100%]">Learn More</Button>
      </DialogTrigger>
      <DialogContent>
      <Theme appearance="light">
        <DialogHeader>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody className="flex justify-center p-4 max-h-[90vh] overflow-y-auto sm:overflow-hidden">
          <div className="modal-card-container flex flex-col justify-evenly max-w-[80vw]  sm:flex-row">
            <div className="image-rating-col">
              <Image
                src={product.image}
                alt={`Image of ${product.productname}`}
                style={{ 
                  width: '100%', 
                  height: '70%' 
                }} 
              />
              <div className="rating-details flex flex-col items-center justify-center py-6 ">
                <Rating allowHalf readOnly count={5} defaultValue={setRating(product.rating)} size="lg" className="text-2xl" />
                <div className={`rounded percent-match px-2 py-2 mt-4 mb-2 max-h-16 flex flex-col justify-center items-center ${setMatchColor(product.color_distance)}`}>
                  <div className=""><h4 className="text-lg font-semibold">{`${findPercentMatch(product.color_distance)}%`}</h4></div>
                  <div className=""><h4 className="font-thin">Match</h4></div>
                </div>
              </div>
            </div>
            <div className="details-col pt-6 sm:max-w-[60%] px-4">
              <h3 className="font-semibold text-2xl sm:pt-4">{product.productname}</h3>
              <h5 className="pt-4"><span className="font-thin text-gray-800">Shade match: </span><span className="font-semibold">{product.shadename}</span></h5>
              <h5 className="pt-4"><span className="font-thin text-gray-800">Best for: </span><span className="font-semibold">{capitalizedSkinTypes(product.skintypes).join(", ")} skin types</span></h5>
              <h4 className="pt-4 pb-8"><span className="font-thin text-gray-800">Sales price: </span><span className="font-semibold text-xl">{`$${product.salesprice}`}</span></h4>
              <Button size="md" variant="surface" className="px-2 bg-gray-200"><a href={product.targeturl} target="_blank">Buy Now</a></Button>
            </div>
          </div>
        </DialogBody>
        </Theme>
      </DialogContent>
    </DialogRoot>
      </Card.Footer>
    </Card.Root>
    );
  }

export default ProductCard ;