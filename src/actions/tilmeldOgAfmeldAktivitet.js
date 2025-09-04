"use server"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { success } from "zod";

export default async function tilmeldOgAfmeldAktivitet(currrentState,formData, age){
    
    
    //her tager jeg fat i age, som jeg senere skal bruge til at validere om useren er gammmel nok
    const maxAge = formData.get("maxAge")
     const minAge = formData.get("minAge")
     //id er idet på aktiviteten
     const id = formData.get("id")
     //min registered værdi er en bool der fotæller om man skal afmeldes eller tilmeldes
     const registered = formData.get("registered")
     console.log("registred ",registered)
     
    const cookieStore = await cookies()
//her kører jeg min første guard clause som logger brugerren ud
//grunden til at den er i starten er at det er unødvendigt at kører alt tjekket, når man skal afmelde sig
if(registered == "true"){
     const response = await fetch(`http://localhost:4000/api/v1/users/${cookieStore.get("userId").value}/activities/${id}`, {
        headers: {
            Authorization: "Bearer " + cookieStore.get("token").value
        },
        method: "DELETE"
     })
      
       // her revalideter jeg path så min fetch bliver opdateret

    revalidatePath('/aktivitet/')
    return{
        success: true,
        statusCode: 202,
        message : ["Du er nu afmeldt aktiviteten"]
    
    }
  

}


    //guard clause


    if(!cookieStore.get("userId") || !cookieStore.get("token")){
     return{
        success: false,
        message: ["du er ikke loggget ind"],
        statusCode: 401
     }
    }

    console.log( "user-id", cookieStore.get("userId").value)
    //nu er det tid til at fetche useren og tjekke om useren er gammel nok
   const response = await fetch("http://localhost:4000/api/v1/users/" + cookieStore.get("userId").value,{
        headers:{
            Authorization: `Bearer ${cookieStore.get("token").value}`
        }
    } )


    
    const user = await response.json()
    console.log("rollie", user.role)
  
    //her tjekker vi alder
    if(user.role !== "instructor"){
    if(user.age < minAge || user.age > maxAge && user.role !== "instructor"){
        return {
            success: false,
            message: ["din alder er desværre ikke tilstræklig for denne aktivitet"],
             statusCode: 403
        }
    }}
    //hvis alt går som det skal skal vi nu tilføje brugren
    const postReponse = await fetch(`http://localhost:4000/api/v1/users/${cookieStore.get("userId").value}/activities/${id}`,{
        headers:{
            Authorization: "Bearer " + cookieStore.get("token").value
        },
        method: "POST"
    })
    console.log(postReponse)
    console.log("bruger tilføjet")
    // her revalideter jeg path så min fetch bliver opdateret

    revalidatePath('/aktivitet/')
    

    return{
        success: true,
        message : ["du er nu tilmeldt aktiviteten"]
    }


    
}