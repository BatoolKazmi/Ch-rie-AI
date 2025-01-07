import NavBar from "../NavBar";
import { useLocation } from "react-router-dom";

function Picture() {
  const location = useLocation();
  const image = location.state?.image;

  return (
    <>
      <NavBar />
      <h1 className="text-3xl font-bold underline">This is the picture</h1>
      {image ? (
        <img src={image} alt="Captured" className="captured-image" />
      ) : (
        <p>No image captured.</p>
      )}
    </>
  );
}

export default Picture;
