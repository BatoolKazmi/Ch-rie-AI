import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import Dropdown from "../Dropdown";
import { useLocation } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { TbFaceIdError } from "react-icons/tb";
import { motion } from "framer-motion";




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
    const [sortVal, setSortVal] = useState<string>("desc_match")
    const location = useLocation();
    const skinData = location.state?.skinData;
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handlePostRequest = async () => {
        setLoading(true);
        setError(null);
    
        const requestBody = {
            skintype: skinData["skintype"]["skinType"],
            cheekcolor: skinData["cheekcolor"],
            foreheadcolor: skinData["foreheadcolor"],
            undereyecolor: skinData["undereyecolor"]
        }

        try {
          const response = await fetch("https://yrzb5zqe13.execute-api.us-east-1.amazonaws.com/recommend", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
    
          const responseData = await response.json();
          setProducts(responseData.foundations);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
              } else {
                setError("An unexpected error occurred");
              }
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        handlePostRequest();
      }, [])

    // If sort val changes, change the returned sorted array values
    useEffect(() => {
        setProducts((products) => {
            let sortedProducts;
            if (sortVal === "asc_price") {
                sortedProducts = [...products].sort((a, b) => a.salesprice - b.salesprice); 
            } else if (sortVal === "desc_price") {
                sortedProducts = [...products].sort((a, b) => b.salesprice - a.salesprice);
            } else if (sortVal === "desc_match") {
                sortedProducts = [...products].sort((a, b) => a.color_distance - b.color_distance);
            } else {
                sortedProducts = [...products].sort((a, b) => b.color_distance - a.color_distance);
            }

            return sortedProducts
        })
    }, [sortVal])

    return ( 
    <>
      <section className="bg-slate-50/45 mx-8 min-h-[100vh]">
      {loading ? 
        <div className="flex flex-col items-center justify-center min-h-[100vh]">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, ease: "easeOut" }}
                style={{justifyContent: "Center", alignItems: "center", display: "flex", flexDirection: "column"}}
            >
                <GridLoader color="#6a6a6a" size={30} />
                <h2 className="text-4xl pt-5">Loading...</h2>
            </motion.div>
        </div>
       : error ? (
        <div className="error-display min-h-[100vh] text-center pt-10  flex flex-col justify-center items-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, ease: "easeOut" }}
                style={{justifyContent: "Center", alignItems: "center", display: "flex", flexDirection: "column"}}
            >
                <TbFaceIdError className="text-[8rem] pb-4" />
                <h2 className="text-4xl pb-4 px-4 ">Oops! Something went wrong.</h2>
                <h2 className="text-4xl pb-4 px-4"> Please Try Again Later.</h2>
                <p className="mb-10 px-4">{error}</p>
            </motion.div>
        </div>
        ) : (
        <>
        <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, ease: "easeOut" }}
        >
            <div className="products-bar px-2 pt-[4rem] pb-2">
            <ul className="flex flex-col sm:flex-row justify-center items-center">
                <li className="px-4 text-lg"><button className="border-b-2 p-2 border-white">FOUNDATIONS</button></li>
                <li className="px-4 text-lg pt-4 sm:pt-0 text-gray-800"><button>COMING SOON</button></li>
                <li className="px-4 text-lg pt-4 sm:pt-0 text-gray-800"><button>COMING SOON</button></li>
            </ul>
        </div>
        <div className="header-area pt-[3rem]">
            <h2 className="text-4xl sm:text-6xl text-center px-6">Say Hello to Makeup Made For You</h2>
            <div className="sort-results pt-[3rem] flex flex-col items-center sm:flex-row sm:justify-around">
                <div className="sort-by pb-4 sm: pb-0">
                    <Dropdown setSortVal={setSortVal}/>
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

        </motion.div>
        </>
      )}
      </section>
    </> );
}

export default Products;