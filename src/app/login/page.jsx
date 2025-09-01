import Input from "@/components/ui/input/Input";
import "./login.scss"
import Image from "next/image";
export default function Login(){

    return(
       <main className="login" >
        <Image className=" login__image" src={"/images/splash-image.jpg"} fill="true" alt="splashScreen af en sportslig aktivitet"></Image>
        <div className="login__shadowDiv">
              </div>
          <div className="login__contentDiv">
             <h1 className="login__heading">Log ind</h1>
            <form className="login__form" action="">
                 
                <Input name={"bugernavn"} placeholder="brugernavn"></Input>
                <Input name={"adgangskode"} placeholder={"adgangskode"}></Input>
            </form>
            </div>
      

       </main>
    )

}