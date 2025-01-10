
import { TbFaceIdError } from "react-icons/tb";
import { motion } from "framer-motion";

function ErrorPage() {
    return ( 
    <section className="bg-slate-50/45 mx-8 min-h-[100vh]">     
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
            </motion.div>
        </div>
    </section> );
}

export default ErrorPage;