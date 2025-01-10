import { Button } from "@chakra-ui/react"
import { NavLink } from "react-router-dom";
import { FaMicrochip } from "react-icons/fa6";
import { FaDiagramProject } from "react-icons/fa6";
import { MdInsights } from "react-icons/md";
import SubscriptionForm from "../SubscriptionForm";
import { motion } from "framer-motion";

function Home() {

  return (
    <div className="">
      <div className="h-[100vh] flex flex-col items-center justify-center bg-circle">
      <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, ease: "easeOut" }}
                style={{justifyContent: "Center", alignItems: "center", display: "flex", flexDirection: "column"}}
      >
          <div className="slogan text-6xl lg:text-[4.5rem] xl:text-8xl font-semibold sm:max-w-[50vw] px-4 leading-[4rem] pb-12 text-center">
          <h2>New Makeup, </h2>
          <h2>New You - </h2>
          <h2>Every time with Chérie AI</h2>
        </div>
        <Button size="xl" variant="solid" className="bg-white  px-6 py-8 font-semibold text-xl border-0 rounded-lg hover:bg-black hover:text-white"><NavLink to="/test">Find Products</NavLink></Button>
      </motion.div>
      </div>
      <div className="welcome-section bg-black sm:h-[40vh] text-white flex flex-col justify-center sm:flex-row p-6 ">
          <div className=" h-[50%] pt-4 sm:h-[100%] text-center flex flex-col items-center justify-center text-4xl sm:text-6xl font-semibold px-2 ">
            <h3>Welcome to</h3>
            <h3>Chérie AI</h3>
          </div>
          <div className="flex flex-col sm:justify-center  text-center pb-8 sm:w-[60%] text-xl px-6">
            <p className="pt-4 leading-6">
            We help you find makeup that matches your skin perfectly. Snap a photo, and our recommendation system analyzes your skin tone and type to recommend the best products from top beauty stores—all within your budget. Discover makeup made for you, effortlessly.</p>
          </div>
      </div>
      <div className="about-section bg-[#FFE1EA] flex flex-col items-center pt-[3rem] sm:flex-none  sm:pb-4">
        <div className="w-[50%] h-full">
          <h3 className="text-6xl font-semibold pb-8">About Us</h3>
          <p className="text-lg pb-4">At Chérie AI, we’re revolutionizing the beauty shopping experience. Our mission is to make finding the perfect makeup easy, personal, and accessible. Using our ML-powered recommendation system and  skin analysis technology, we match you with products tailored to your unique skin tone, type, and budget.</p>
           <p className="text-lg pb-10">
        Whether you’re a beauty enthusiast or just starting your journey, Chérie helps you discover new favorites from Canada’s top online beauty stores. Say goodbye to guesswork and hello to makeup made for you.</p>
        </div>
      </div>
      <div className="features-section bg-black min-h-[50vh] text-white flex flex-col sm:flex-row justify-evenly items-center">
        <div className="feature  m-2 text-center p-6 flex flex-col items-center sm:max-w-[25%]">
          <FaMicrochip className="text-5xl" />
          <h4 className="text-2xl pb-4 pt-4">ML-Driven Skin Analysis</h4>
          <p className="leading-5">Using advanced face detection, we analyze your skin tone, type, and undertones to deliver the most accurate recommendations.</p>
        </div>
        <div className="feature m-2 text-center p-6 flex flex-col items-center sm:max-w-[25%]">
          <FaDiagramProject className="text-5xl" />
          <h4 className="text-2xl pb-4 pt-4">Personalized Product Matching</h4>
          <p className="leading-5">Our recommendation system sifts through hundreds of makeup products from top Canadian online beauty retailers to find the best matches for your unique features, preferences, and budget.</p>
        </div>
        <div className="feature m-2 text-center p-6 flex flex-col items-center sm:max-w-[25%]">
          <MdInsights className="text-5xl"/>
          <h4 className="text-2xl pb-4 pt-4">Real-Time insights</h4>
          <p className="leading-5">Snap a photo, and in seconds, our app provides tailored recommendations, eliminating guesswork and empowering confident purchases.</p>
        </div>
      </div>
      <div className="feedback-section  text-center flex flex-col items-center justify-center py-12 px-4">
        <h3 className="mb-4 text-5xl mt-10 font-semibold">Send us some Feedback</h3>
        <p className="text-lg ">Looking for a new feature? Encountered any errors? We'd love to hear from you!</p>
        <Button size="xl" variant="solid" className="mt-6 mb-10 bg-white px-4 py-6 font-semibold text-base border-0"><a href="https://forms.gle/NYGALwiWrNX3fDdP9" target="_blank">Send Feedback</a></Button>
      </div>
      <div className="mailinglist-section bg-white text-black text-center py-20">
        <h3 className="text-4xl font-medium">Join our Mailing List</h3>
        <SubscriptionForm />

      </div>
    </div>
  );
}

export default Home;
