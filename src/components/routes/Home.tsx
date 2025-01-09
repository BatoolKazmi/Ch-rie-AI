import { Button } from "@chakra-ui/react"
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="">
      <div className="h-[100vh] flex flex-col items-center justify-center bg-circle">
        <div className="slogan mb-8 text-4xl">
          <h2>New Makeup, </h2>
          <h2>New You - </h2>
          <h2>Every time with Chérie AI</h2>
        </div>

        <Button size="xl" variant="solid" className="bg-white px-4 py-2 font-semibold text-xl border-0"><NavLink to="/test">Find Products</NavLink></Button>
      </div>
      <div className="welcome-section bg-black h-[40vh]">
        <p>Text</p>
      </div>
      <div className="about-section bg-[#FFE1EA] h-[40vh]">
        <p>Text</p>
      </div>
      <div className="team-section bg-white h-[80vh]">
        <p>Text</p>
      </div>
      <div className="features-section bg-black h-[40vh]">
        <p>Text</p>
      </div>
      <div className="feedback-section bg-white h-[30vh]">
        <p>Text</p>
      </div>
      <div className="mailinglist-section h-[30vh]">
        <p>Text</p>
      </div>
    </div>
  );
}

export default Home;
