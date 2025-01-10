import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/App.css";
import { Radio, RadioGroup } from "@/components/ui/radio"
import { motion } from "framer-motion";


function Test() {
  const [phase, setPhase] = useState(1);
  const [undertone, setUndertone] = useState("Cool");
  const [skinType, setSkinType] = useState("normal");

  const navigate = useNavigate();

  const handlePreviousPhase = () => setPhase((prev) => Math.max(prev - 1, 1));

  const handleNextPhase = () => {
    if (phase === 1 && !undertone) {
      alert("Please select an undertone before proceeding.");
      return;
    }
    setPhase((prev) => Math.min(prev + 1, 2));
  };

  const handleComplete = () => {
    if (phase === 2 && !skinType) {
      alert("Please select a skin type before proceeding.");
      return;
    }

    // Pass the skinType to the camera page
    navigate("/camera", { state: { skinType } });
  };

  return (
      <section className="flex bg-slate-50/45 mx-8 min-h-[100vh]">
        <div className="p-6 w-full max-w-lgn flex justify-start items-center">
          {phase === 1 && (
            <div className="flex flex-col justify-start  items-start mb-[20rem] ml-0 sm:ml-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, ease: "easeOut" }}>
                  <h1 className="text-3xl sm:text-6xl font-bold mb-4">
                Which undertone do you have?
              </h1>
              <form>
                <RadioGroup defaultValue="Cool" size="lg"  variant="subtle" colorPalette="gray" value={undertone} className="flex flex-col" onValueChange={(e) => setUndertone(e.value)}>
                    <Radio value="Cool" className="py-4 px-6 text-xl">Cool Undertone</Radio>
                    <Radio value="Warm" className="py-4 px-6 text-xl">Warm Undertone</Radio>
                </RadioGroup>
                <div className="mt-4 ml-5">
                  <button
                    type="button"
                    className="px-4 py-2 bg-black text-white rounded text-xl"
                    onClick={handleNextPhase}
                  >
                    Next
                  </button>
                </div>
              </form>
              </motion.div>
            </div>
          )}
          {phase === 2 && (
            <div className="flex flex-col justify-start  items-start mb-[10rem] ml-0 sm:ml-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, ease: "easeOut" }}>
                  <h1 className="text-3xl sm:text-6xl font-bold mb-4">
                What is your skin type?
              </h1>
              <form>
                <RadioGroup defaultValue="normal" size="lg"  variant="subtle" colorPalette="gray" value={skinType} className="flex flex-col" onValueChange={(e) => setSkinType(e.value)}>
                    <Radio value="normal" className="py-4 px-6 text-xl">Normal</Radio>
                    <Radio value="oily" className="py-4 px-6 text-xl">Oily</Radio>
                    <Radio value="dry" className="py-4 px-6 text-xl">Dry</Radio>
                    <Radio value="sensitive" className="py-4 px-6 text-xl">Sensitive</Radio>
                    <Radio value="combination" className="py-4 px-6 text-xl">Combination</Radio>
                </RadioGroup>
                <div className="mt-4 flex flex-col  sm:flex-row sm:justify-none">
                  <button
                    type="button"
                    className="px-4 py-2 bg-black text-white rounded text-xl mx-2 my-2"
                    onClick={handlePreviousPhase}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-green-400 text-white rounded text-xl mx-2 my-2"
                    onClick={handleComplete}
                  >
                    Finish and Proceed
                  </button>
                </div>
              </form>
              </motion.div>
            </div>
          )}
        </div>
      </section>
  );
}

export default Test;
