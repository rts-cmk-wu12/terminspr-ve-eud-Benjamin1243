"use client"

import opretBrugerAction from "@/actions/opretBrugerAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import Input from "../input/Input";
import SubmitButton from "../submitButton/SubmitButton";
import "./opretBrugerComponent.scss"

export default function OpretBrugerComponent(){


      const [errorMesseage, setErrorMesseage] = useState("")
        const router = useRouter()
      
        const [formOpretBrugerState,opretBruger, isPending] = useActionState(opretBrugerAction, null)
    
        useEffect(()=>{
            console.log(formOpretBrugerState)
            console.log(formOpretBrugerState?.properties?.adgangskode?.errors)
            //guard clorse
            if(!formOpretBrugerState?.success){
                setErrorMesseage(formOpretBrugerState?.errors[0])
                return
                
            }
            if(formOpretBrugerState?.success == true){
    
                
                router.push("/login")}
            
            
        },[formOpretBrugerState])
    

    return(
         <main className="opretBruger" >
        <Image className=" opretBruger__image" src={"/images/splash-image.jpg"} fill="true" alt="splashScreen af en sportslig aktivitet"></Image>
       <Image className="opretBruger__shadowDiv" src={"/images/shadowDiv.png"} fill alt="shadowDiv"></Image>
          <div className="opretBruger__contentDiv">
             <h1 className="opretBruger__heading">Opret bruger</h1>
             <p className="opretBruger__error">{errorMesseage}</p>
            
            <form className="opretBruger__form" action={opretBruger}>
                 {/*Gennem min zod validering sender jeg nogle errors også det der blover tilføjet i blandt andet className*/}
                <Input name={"fornavn"} extraClass={formOpretBrugerState?.properties?.fornavn?.errors && "input--fail"} placeholder={ formOpretBrugerState?.properties?.fornavn?.errors ? formOpretBrugerState?.properties?.fornavn?.errors[0]:"fornavn"}></Input>
                <Input name={"efternavn"}  extraClass={formOpretBrugerState?.properties?.efternavn?.errors && "input--fail"} placeholder={formOpretBrugerState?.properties?.efternavn?.errors ? formOpretBrugerState?.properties?.efternavn?.errors[0]: "efternavn"}></Input>
                <Input name={"alder"} type="number"  extraClass={formOpretBrugerState?.properties?.alder?.errors && "input--fail"} placeholder={formOpretBrugerState?.properties?.alder?.errors ? formOpretBrugerState?.properties?.alder?.errors[0]: "alder"}></Input>
                 <Input name={"brugernavn"} extraClass={formOpretBrugerState?.properties?.brugernavn?.errors && "input--fail"} placeholder={ formOpretBrugerState?.properties?.brugernavn?.errors ? formOpretBrugerState?.properties?.brugernavn?.errors[0]:"brugernavn"}></Input>
                                <Input name={"adgangskode"}  extraClass={formOpretBrugerState?.properties?.adgangskode?.errors && "input--fail"} placeholder={formOpretBrugerState?.properties?.adgangskode?.errors ? formOpretBrugerState?.properties?.adgangskode?.errors[0]: "adgangskode"}></Input>
              



                <SubmitButton>{isPending? "Loggger ind..." :"Log ind"   }</SubmitButton>
               

            </form>
         
            </div>
      

       </main>
    )
}