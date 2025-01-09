import NavBar from "../NavBar";
import { useLocation } from "react-router-dom";

function Picture() {
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;

  if (!imageUrl) {
    return <div>Error: No image data</div>;
  }

  return (
    <div>
      <NavBar />
      <h1>Your Picture</h1>
      <img src={imageUrl} alt="Captured" />
    </div>
  );
}

export default Picture;
