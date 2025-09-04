"use server"
import z from "zod"
export default async function opretBrugerAction(currentState, formData){
  
   const fornavn = formData.get("fornavn")
    const efternavn = formData.get("efternavn")
    const alder  = Number(formData.get("alder"))
    const brugernavn = formData.get("brugernavn")
    const adgangskode = formData.get("adgangskode")
   console.log(fornavn)


   const opretBruger = z.object({
          fornavn: z.string("et fornanv skal være tekst").min(2, "et fornavn indeholder mindst 2 bogstaver"),
          efternavn: z.string("et efternavn skal være tekst").min(2, "et fornavn indeholder mindst 2 bogstaver"),
          alder: z.number("din alder skal være et tal").min(1, "Du skal udfylde alder"),

           brugernavn: z.string("et brugernavn kan ikke være et tal").min(4, "et brugernavn skal indeholder mindst 4 bogstaver"),
           adgangskode: z.string().min(4, "et kodeord kan ikke indeholder under fire tegn")
        }) 



           const validatedOpretBruger = opretBruger.safeParse({
            fornavn: fornavn,
            efternavn: efternavn,
            alder: alder,
        brugernavn: brugernavn,
        adgangskode:adgangskode
     });



     if(!validatedOpretBruger.success){
            
             return{
                 //vi returnere en custom prop
                 succes: validatedOpretBruger.success,
                 //og returner alle propsne fra validatedLogin.error i en treeifyed version så det bliver stillet flot op til os
                 ... z.treeifyError(validatedOpretBruger.error)
             }
          }
console.log(validatedOpretBruger)
//ifølge apiet skal man sende den som en formdata, og derefter pakke den ind som en url search params
const nyFormData =  new FormData();
nyFormData.append( "username", validatedOpretBruger.data.brugernavn)
nyFormData.append( "password", validatedOpretBruger.data.adgangskode)
nyFormData.append( "firstname", validatedOpretBruger.data.fornavn)
nyFormData.append("lastname", validatedOpretBruger.data.efternavn)
nyFormData.append( "age", validatedOpretBruger.data.alder)
nyFormData.append( "role", "default")
const UrlFormDAta = new URLSearchParams(nyFormData);
console.log(nyFormData)





          const response = await fetch("http://localhost:4000/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: UrlFormDAta
          })
        


          if(response.status !== 200){
        return{
            success: false,
            errors: ["noget på serven gik galt"]
        }


        
     }


     return{
        success : true,
        errors: [""]
     }
    
}