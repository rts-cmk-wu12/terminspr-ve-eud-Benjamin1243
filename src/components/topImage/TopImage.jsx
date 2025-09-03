"use client"
import Image from "next/image";
import "./topImage.scss"
import SubmitButton from "../ui/submitButton/SubmitButton";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import tilmeldOgAfmeldAktivitet from "@/actions/tilmeldOgAfmeldAktivitet";

export default function TopImage({img, maxAge, minAge, aktivitetsId, isRegistered}){
        const [formState, formActionTilmeld, isPending] = useActionState(tilmeldOgAfmeldAktivitet, {maxAge: maxAge, minAge: minAge})
        const [loginFail, setLoginFail] = useState(false)
        const [message, setMessage] = useState("")
        useEffect(()=>{
            console.log(formState)
            if(formState?.statusCode == 401){
                setLoginFail(true)

            }
            
                setMessage(formState.message)

            
            setTimeout(()=>{
                setMessage( null)
            }, 4000)
        }, [formState])

    return(
        <div className="topImage" style={{backgroundImage: "url(" + img + ")"}}>
            {/*denne js skrivelse nedenunder, er vores fejl popUp som bliver vist hvis brugerne ikke er logget ind*/ }
             {loginFail &&<div className="topImage__overlay"><p className="topImage__text">du er ikke logget ind. <br/> for at tilmelde dig en aktivitet skal du være logget ind</p>
           <div className="topImage__selectDiv"><Link className="topImage__link" href="/login"> Log in her</Link> <button className="topImage__button" onClick={()=>{
                setLoginFail(false)
            }}>Jeg kigger bare </button></div>
            
            </div>}
            
            <form action={formActionTilmeld}>
                <input type="hidden" name="maxAge" value={maxAge} />
                <input type="hidden" name="minAge" value={minAge} />
                 <input type="hidden" name="id" value={aktivitetsId} />
                 <input type="hidden" name="registered" value={isRegistered} /> 
                <SubmitButton className="">{isRegistered ? "Afmeld":"Tilmeld"}</SubmitButton>
            </form>
          { message && <div  className={formState.message &&"topImage__messageBox"}>
            <p className="topImage__message">{formState.message}</p>
            </div>}
    
        </div>
    )

}