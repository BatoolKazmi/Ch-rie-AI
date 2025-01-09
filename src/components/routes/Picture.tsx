import NavBar from "../NavBar";
import { useLocation } from "react-router-dom";
import "../../styles/App.css";

function Picture() {
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;

  if (!imageUrl) {
    return <div>Error: No image data</div>;
  }

  return (
    <>
      <NavBar />
      <div className="main flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold underline">Your Picture</h1>
        <img
          src={imageUrl}
          alt="Captured"
          style={{
            transform: "scaleX(-1)",
          }}
        />
      </div>
    </>
  );
}

export default Picture;
