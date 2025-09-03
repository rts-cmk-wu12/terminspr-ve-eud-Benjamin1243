"use server"
import { cookies } from "next/headers"
import z, { success } from "zod"
export default async function loginAction(currentState, formData){
    const brugernavn = formData.get("brugernavn")
     const adgangskode = formData.get("adgangskode")
     console.log("bugernavn", brugernavn)
     //tid til at valider koden, og de gør jeg med zod, som vi har lært
     const login = z.object({
        brugernavn: z.string("et brugernavn kan ikke være et tal").min(2, "et brugernavn indeholder mindst 2 bogstaver"),
        adgangskode: z.string().min(3, "et kodeord kan ikke indeholder under fire tegn")
     }) 

     const validatedLogin = login.safeParse({
        brugernavn: brugernavn,
        adgangskode:adgangskode
     });

    console.log(validatedLogin)
     //hvis validation fejler returne vi zod fejl meddelsen
     if(!validatedLogin.success){
       
        return{
            //vi returnere en custom prop
            succes: validatedLogin.success,
            //og returner alle propsne fra validatedLogin.error i en treeifyed version så det bliver stillet flot op til os
            ... z.treeifyError(validatedLogin.error)
        }
     }

     //hvis alt går godt skal vi nu logge brugeren ind
console.log("burgernavn",  validatedLogin.data.brugernavn)
     const response = await fetch("http://localhost:4000/auth/token", {
        method: "POST",
        headers: {
    "Content-Type": "application/json",
  },
       
    body: JSON.stringify({
            "username": validatedLogin.data.brugernavn,
            "password": validatedLogin.data.adgangskode
        })
        
     })
     //unauthorized
     if(response.status == 401){
        return{
            success: false,
            errors: ["Brugeren findes ikke"]
        }

     }
     //fejl på server
      if(response.status !== 200){
        return{
            success: false,
            errors: ["noget på serven gik galt"]
        }
     }
     const user = await response.json()
     console.log(user)
  


     //hvis alt går som det skal sætter vi nu cookien
     const cookieStore = await cookies()
     cookieStore.set("token",user.token,  {maxAge: user.validUntil})
     cookieStore.set("userId", user.userId, {maxAge: user.validUntil * 60*30})
     return{
        success : true,
        errors: [""]
     }

}