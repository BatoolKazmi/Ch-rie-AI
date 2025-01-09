import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

function Footer () {
    return ( 
    <div className=" flex flex-col sm:flex-row">
        <div className="sm:w-[25%] border border-[1px] border-solid border-black p-8 sm:p-12">
            <p>+1 249 688 2127</p>
            <p>+1 705 312 1256</p>
            <p>cherie.team@outlook.com</p>
        </div>
        <div className="sm:w-[25%] border border-[1px] border-solid border-black p-8 sm:p-12">
            <p>1600 W Bank Dr,</p>
            <p>Peterborough, ON K9L 0G2</p>
        </div>
        <div className="sm:w-[50%] border border-[1px] border-solid border-black p-8 sm:p-12">
            <ul className="flex flex-row">
                <li className="text-4xl"><a href="https://www.instagram.com/cherie.ai.startup/" target="_blank"><FaInstagramSquare /></a></li>
                <li className="text-4xl"><a href="https://www.linkedin.com/company/cheriestartup/" target="_blank"><FaLinkedin /></a></li>
                <li className="text-4xl"><a href="http://facebook.com/cherieaistartup" target="_blank"><FaFacebookSquare /></a></li>
                <li className="text-4xl"><a href="https://www.tiktok.com/@cherie_ai?lang=en" target="_blank"><AiFillTikTok /></a></li>
            </ul>
        </div>
    </div> );
}

export default Footer ;