import { useLocation } from "react-router-dom";
import "../../styles/App.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface SkinData {
  skintype: {
    skinType: string;
  };
  cheekcolor: [number, number, number];
  foreheadcolor: [number, number, number];
  undereyecolor: [number, number, number];
}

function Picture() {
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;
  const skinData = location.state?.skinData;
  const navigate = useNavigate();

  if (!imageUrl) {
    return <div>Error: No image data</div>;
  }

  const goToProductsPage = (skinData: SkinData) => {
    if (skinData) { 
      navigate('/products', { state: { skinData } }); 
    } else {
      // Handle the case where skinData is missing
      console.error("skinData is missing."); 
      // You might want to display an error message to the user here
    }
  }

  return (
    <>
      <div className="min-h-[100vh] flex flex-col items-center justify-center bg-slate-50/45 mx-8 px-4 py-2">
        <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold pb-[1rem] ">Your Picture</h1>
        <img
          src={imageUrl}
          alt="Captured"
          style={{
            transform: "scaleX(-1)",
          }}
          className="rounded-lg"
        />
        <Button variant="solid" className="mt-5 rounded bg-white px-4 py-6 font-semibold" onClick={() => goToProductsPage(skinData)}><h2>Find My Products</h2></Button>

        </motion.div>
      </div>
    </>
  );
}

export default Picture;
