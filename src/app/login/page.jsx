"use client"
import Input from "@/components/ui/input/Input";
import "./login.scss"
import Image from "next/image";
import SubmitButton from "@/components/ui/submitButton/SubmitButton";
import { useActionState, useEffect, useState } from "react";
import loginAction from "@/actions/loginAction";
import { useRouter } from "next/navigation";
export default function Login(){
    const [errorMesseage, setErrorMesseage] = useState("")
    const router = useRouter()
  
    const [formLoginState,login, isPending] = useActionState(loginAction, null)

    useEffect(()=>{
        console.log(formLoginState)
        console.log(formLoginState?.properties?.adgangskode?.errors)
        //guard clorse
        if(!formLoginState?.success){
            setErrorMesseage(formLoginState?.errors[0])
            return
            
        }
        if(formLoginState?.success == true)

            
            router.push("/aktiviteter")
        
        
    },[formLoginState])

    return(
       <main className="login" >
        <Image className=" login__image" src={"/images/splash-image.jpg"} fill="true" alt="splashScreen af en sportslig aktivitet"></Image>
       <Image className="login__shadowDiv" src={"/images/shadowDiv.png"} fill alt="shadowDiv"></Image>
          <div className="login__contentDiv">
             <h1 className="login__heading">Log ind</h1>
             <p className="login__error">{errorMesseage}</p>
            <form className="login__form" action={login}>
                 
                <Input name={"brugernavn"} extraClass={formLoginState?.properties?.brugernavn?.errors && "input--fail"} placeholder={ formLoginState?.properties?.brugernavn?.errors ? formLoginState?.properties?.brugernavn?.errors[0]:"brugernavn"}></Input>
                <Input name={"adgangskode"}  extraClass={formLoginState?.properties?.adgangskode?.errors && "input--fail"} placeholder={formLoginState?.properties?.adgangskode?.errors ? formLoginState?.properties?.adgangskode?.errors[0]: "adgangskode"}></Input>
                <SubmitButton>{isPending? "Loggger ind..." :"Log ind"   }</SubmitButton>

            </form>
            </div>
      

       </main>
    )

}