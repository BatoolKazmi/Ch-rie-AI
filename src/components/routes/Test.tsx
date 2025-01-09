import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Test() {
  const [phase, setPhase] = useState(1);
  const [undertone, setUndertone] = useState("");
  const [skinType, setSkinType] = useState("");

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
    <>
      <div className="p-4">
        {phase === 1 && (
          <div>
            <h1 className="text-3xl font-bold underline mb-4">
              What undertone do you have?
            </h1>
            <form>
              <input
                type="radio"
                id="cool"
                name="undertone"
                value="Cool"
                onChange={(e) => setUndertone(e.target.value)}
              />
              <label htmlFor="cool" className="ml-2">
                Cool undertone
              </label>
              <br />
              <input
                type="radio"
                id="warm"
                name="undertone"
                value="Warm"
                onChange={(e) => setUndertone(e.target.value)}
              />
              <label htmlFor="warm" className="ml-2">
                Warm undertone
              </label>
              <br />
              <div className="mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleNextPhase}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {phase === 2 && (
          <div>
            <h1 className="text-3xl font-bold underline mb-4">
              What is your skin type?
            </h1>
            <form>
              <input
                type="radio"
                id="normal"
                name="skinType"
                value="normal"
                onChange={(e) => setSkinType(e.target.value)}
              />
              <label htmlFor="normal" className="ml-2">
                Normal Skin
              </label>
              <br />
              <input
                type="radio"
                id="oily"
                name="skinType"
                value="Oily"
                onChange={(e) => setSkinType(e.target.value)}
              />
              <label htmlFor="oily" className="ml-2">
                Oily skin
              </label>
              <br />
              <input
                type="radio"
                id="dry"
                name="skinType"
                value="Dry"
                onChange={(e) => setSkinType(e.target.value)}
              />
              <label htmlFor="dry" className="ml-2">
                Dry skin
              </label>
              <br />
              <input
                type="radio"
                id="sensitive"
                name="skinType"
                value="Sensitive"
                onChange={(e) => setSkinType(e.target.value)}
              />
              <label htmlFor="sensitive" className="ml-2">
                Sensitive Skin
              </label>
              <br />
              <input
                type="radio"
                id="combination"
                name="skinType"
                value="Combination"
                onChange={(e) => setSkinType(e.target.value)}
              />
              <label htmlFor="combination" className="ml-2">
                Combination skin
              </label>
              <br />
              <input
                type="radio"
                id="rosacea"
                name="skinType"
                value="Rosacea prone"
                onChange={(e) => setSkinType(e.target.value)}
              />
              <label htmlFor="rosacea" className="ml-2">
                Rosacea prone skin
              </label>
              <br />
              <div className="mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-black rounded mr-2"
                  onClick={handlePreviousPhase}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={handleComplete}
                >
                  Finish and Proceed
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Test;
