"use client"
import Image from "next/image";
import "./topImage.scss"
import SubmitButton from "../ui/submitButton/SubmitButton";
import tilmeldAktivitet from "@/actions/tilmeldAktivitet";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";

export default function TopImage({img, maxAge, minAge}){
        const [formState, formActionTilmeld, isPending] = useActionState(tilmeldAktivitet, {maxAge: maxAge, minAge: minAge})
        const [loginFail, setLoginFail] = useState(false)
        useEffect(()=>{
            console.log(formState)
            if(formState?.errorCode == 401){
                setLoginFail(true)

            }
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
                <SubmitButton className="">Tilmeld</SubmitButton>
            </form>
    
        </div>
    )

}