import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import Dropdown from "../Dropdown";



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

function Products() {
    const [products, setProducts] =  useState<Product[]>([])

    useEffect(() => {
        setProducts([{
            "id": 8,
            "productid": "P308201",
            "productname": "Lancôme - Teint Idole Ultra 24H Long Wear Matte Foundation with Hyaluronic Acid & Vitamin E",
            "image": "https://www.sephora.com/productimages/sku/s2744597-main-zoom.jpg?imwidth=270",
            "targeturl": "https://www.sephora.com/product/teint-idole-ultra-24h-long-wear-foundation-P308201?skuId=2744597",
            "rgbvalue": [
                199,
                155,
                121
            ],
            "shadename": "240W For light to medium skin with warm/yellow undertones",
            "rating": 4.5077,
            "salesprice": 77.0,
            "skintypes": [
                "normal",
                "oily",
                "combination"
            ],
            "color_distance": 5.196152422706632
        },
        {
            "id": 9,
            "productid": "P310726",
            "productname": "CLINIQUE - Stay-Matte Oil-Free Makeup Foundation",
            "image": "https://www.sephora.com/productimages/sku/s1411172-main-zoom.jpg?imwidth=270",
            "targeturl": "https://www.sephora.com/product/stay-matte-oil-free-makeup-P310726?skuId=1411172",
            "rgbvalue": [
                196,
                149,
                124
            ],
            "shadename": "21 Cream Caramel",
            "rating": 4.0523,
            "salesprice": 53.0,
            "skintypes": [
                "normal",
                "dry",
                "sensitive"
            ],
            "color_distance": 441
        },
        {
            "id": 8,
            "productid": "P308201",
            "productname": "Lancôme - Teint Idole Ultra 24H Long Wear Matte Foundation with Hyaluronic Acid & Vitamin E",
            "image": "https://www.sephora.com/productimages/sku/s2744597-main-zoom.jpg?imwidth=270",
            "targeturl": "https://www.sephora.com/product/teint-idole-ultra-24h-long-wear-foundation-P308201?skuId=2744597",
            "rgbvalue": [
                202,
                153,
                115
            ],
            "shadename": "230W for light to medium olive skin with warm/peachy undertones",
            "rating": 4.5077,
            "salesprice": 77.0,
            "skintypes": [
                "normal",
                "oily",
                "combination"
            ],
            "color_distance": 200
        },
        {
            "id": 8,
            "productid": "P308201",
            "productname": "Lancôme - Teint Idole Ultra 24H Long Wear Matte Foundation with Hyaluronic Acid & Vitamin E",
            "image": "https://www.sephora.com/productimages/sku/s2744597-main-zoom.jpg?imwidth=270",
            "targeturl": "https://www.sephora.com/product/teint-idole-ultra-24h-long-wear-foundation-P308201?skuId=2744597",
            "rgbvalue": [
                193,
                150,
                117
            ],
            "shadename": "250W For light to medium skin with warm/peachy undertones",
            "rating": 4.7,
            "salesprice": 77.0,
            "skintypes": [
                "normal",
                "oily",
                "combination"
            ],
            "color_distance": 100
        },
        {
            "id": 4,
            "productid": "P234967",
            "productname": "CLINIQUE - Even Better™ Makeup Broad Spectrum SPF 15 Foundation",
            "image": "https://www.sephora.com/productimages/sku/s2083905-main-zoom.jpg?imwidth=270",
            "targeturl": "https://www.sephora.com/product/even-better-makeup-spf-15-P234967?skuId=2083905",
            "rgbvalue": [
                193,
                146,
                118
            ],
            "shadename": "Stay Spice",
            "rating": 4.5,
            "salesprice": 53.0,
            "skintypes": [
                "sensitive",
                "dry",
                "normal"
            ],
            "color_distance": 50
        },
        {
            "id": 7,
            "productid": "P297404",
            "productname": "DIOR - Forever Natural Velvet Matte Compact Foundation",
            "image": "https://www.sephora.com/productimages/sku/s2595072-main-zoom.jpg?imwidth=270",
            "targeturl": "https://www.sephora.com/product/diorskin-forever-perfect-matte-powder-foundation-P297404?skuId=2595072",
            "rgbvalue": [
                206,
                155,
                124
            ],
            "shadename": "5N medium",
            "rating": 4.55,
            "salesprice": 81.0,
            "skintypes": [
                "normal",
                "combination",
                "sensitive"
            ],
            "color_distance": 8.774964387392123
        }])
    }, [])

    return ( 
    <>
      <section className="bg-slate-50/45 mx-8 my-3 rounded-xl">
        <div className="products-bar px-2 pt-[4rem] pb-2">
            <ul className="flex flex-col sm:flex-row justify-center items-center">
                <li className="px-4 text-lg"><button className="border-b-2 border-gray-500">FOUNDATIONS</button></li>
                <li className="px-4 text-lg pt-4 sm:pt-0 text-gray-800"><button>COMING SOON</button></li>
                <li className="px-4 text-lg pt-4 sm:pt-0 text-gray-800"><button>COMING SOON</button></li>
            </ul>
        </div>
        <div className="header-area pt-[3rem]">
            <h2 className="text-4xl sm:text-6xl text-center px-6">Say Hello to Makeup Made For You</h2>
            <div className="sort-results pt-[3rem] flex flex-col items-center sm:flex-row sm:justify-around">
                <div className="sort-by pb-4 sm: pb-0">
                    <Dropdown />
                </div>
                <div className="results-title">
                    <h4>6 PRODUCT MATCHES</h4>
                </div>
            </div>
        </div>
        <div className="px-[5rem] py-[4rem] flex flex-wrap flex-row gap-6 justify-center">
            {products.map((product) => {
                return <ProductCard key={product.color_distance} product={product}></ProductCard>
            })}
        </div>
      </section>
    </> );
}

export default Products;