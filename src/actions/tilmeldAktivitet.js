"use server"
import { cookies } from "next/headers";
import { success } from "zod";

export default async function tilmeldAktivitet(currrentState,formData, age){
    console.log(currrentState)
    //her tager jeg fat i age, som jeg senere skal bruge til at validere om useren er gammmel nok
    const maxAge = formData.get("maxAge")
     const minAge = formData.get("minAge")
     console.log(minAge)
    const cookieStore = await cookies()
    //guard clause
    if(!cookieStore.get("userId") || !cookieStore.get("token")){
     return{
        success: false,
        errors: ["du er ikke loggget ind"],
        errorCode: 401
     }
    }
    
}