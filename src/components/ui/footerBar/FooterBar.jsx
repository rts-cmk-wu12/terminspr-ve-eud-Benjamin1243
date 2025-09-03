import Link from "next/link";
import { LuHouse } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import "./footerBar.scss"



export default  function FooterBar(){
    return(

        <footer className="footer">
            <nav className="footer__nav"><ul className="footer__list">
                <li className="footer__listItem"><Link className="footer__link" href={"/aktiviteter"}><LuHouse className="footer__logo" />
</Link></li>
                <li className="footer__listItem"><Link className="footer__link" href={"/searchActivities"}><CiSearch className="footer__logo" /></Link></li>
                <li className="footer__listItem"><Link className="footer__link" href={"/kalender"}><CiCalendar className="footer__logo" /></Link></li>
                
                
                
                </ul></nav>
        </footer>
    )
}