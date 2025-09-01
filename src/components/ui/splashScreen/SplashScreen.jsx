import Image from "next/image";
import Link from "next/link";
import "./splashScreen.scss"



export default function SplashScreen(){

    return(
        <div className="splashScreen">
       <Image className="splashScreen__img" src="/images/splash-image.jpg" alt="splashScreen" fill={true}></Image>
       <h1 className="splashScreen__heading"><span className="splashScreen__heading splashScreen__heading--little">landrup</span><br /> dans</h1>

       <Link className="splashScreen__link" href={"login"}>Kom i gang</Link>
       </div>
       

    )
}