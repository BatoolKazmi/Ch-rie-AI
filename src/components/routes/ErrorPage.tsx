import { Spinner, Text, VStack } from "@chakra-ui/react"
import { GridLoader } from "react-spinners";
import { TbFaceIdError } from "react-icons/tb";

function ErrorPage() {
    return ( 
    <section className="bg-slate-50/45 mx-8 min-h-[100vh]">
        <div className="error-display min-h-[100vh] text-center pt-10  flex flex-col justify-center items-center">
          <TbFaceIdError className="text-[8rem] pb-4" />
          <h2 className="text-4xl pb-4 px-4 ">Oops! Something went wrong.</h2>
          <h2 className="text-4xl pb-4 px-4"> Please Try Again Later.</h2>
        </div>
    </section> );
}

export default ErrorPage;