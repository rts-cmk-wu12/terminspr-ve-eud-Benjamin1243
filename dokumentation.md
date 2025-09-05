# Landrup Dans (Benjamin smith)
Benjamins opgave


## Valgfri opgave 
Jeg valgte valgfri opgave 2, som handlede om at oprtte bruger

## Sådan kommer du igang
```terminal
$ npm run i

$ npm run dev
```

## tech-stack
* **NEXT js:**
Er et react baserer framework, som lader dig arbejder med serverside gennem node.js enviromentet. I next kan du arbejde med componentet, ligesom i react. 

* **React:** 
React er et bibliotekt der laver dig lave funktioner, der returnere front end kode, som i react bliver kaldt komponenter. Det er meget brugt, og grundet komponent bygning, bliver ens kode meget genanvendlig.

* **Git:**
Git er et kontrol versions styrings software system. Der tracker versioner af kode. Det bruges ofte af programmører som vil dele sin kode, eller arbejder sammen med andre på det samme projekt.

* **React-icons:** 
Et icon bibliotek lavet til react, som lader dig sætte ikoner ind som react componenter. Bruger ikoner fra mange ikonudbyddere, blandt andet font-awesome.

* **SASS:**
sass er en udvidelse til css, som blandt andet lader dig laver funktioner, som i sass er kaldt mixins. Du kan også bruge "&" til at tilføje ekstra ting til din class istedet for at skrive den hele igen. Det er meget smart når man bruger BEM. SASS compiler koden til css, når du kører det.

* **Web-api Landrup api:**
Det api jeg brugte til min eksamen opgave. Det indeholder dataen fra landrup dans

* **Zod:**
er et typescript-first validerings bibliotek. Du definere et schema (et z object) som du så bagefter kan validere, ved at sende den gennem en parse, og udfylde dens props med values. Jeg brugte det til javascript i min kode

## Kode-eksempel
(we)
```javascript


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

```

### Kode-eksempel-forklaring
Jeg starter med skrive "use server" som sørger for at min kode kører på serveren, da dette er en server action til min form.
 <br>
 Efter det importere jeg z fra zod, z bliver så et objekt med alle zod funktioner på. Derefter exportere jeg min funktion så jeg kan bruge den i min opret bruger side (server funktioner skal være async i next).

<br> Da dette er en action state fra react, får jeg derfor også automatisk to parameter i min funktion. Den første er current state på min formstate. Den anden er et formdata objekt, som indeholder formdata, fra den form min formaction kører på
<br>

Derefter tager jeg alle mine input values ud, gennem en metode på formdata objektet som hedder .get(). Den tager en parameter. Det er navnet på min input. Den returnere value, som  jeg ligger ind i en const.

<br>
Nu skal jeg til at validere mine input values, gennem zod. Det gør jeg ved at oprette en ny schema, som jeg kalder "opretBruger". Der bruger jeg .object metoden fra zod. Den metode/funktion, tager imod et objekt, som skal indeholde de props som er de kommende input values, jeg gerne vil validere. 

<br>
Jeg tager den første som eksempel. Her laver jeg en propety, som jeg kalder fornavn. Dens value er lig med endnu en metode fra zod, som hedder string. den tjekker om værdien er en string, og den tager et argument som er den string der skal returneres, hvis min value ikke er en string. Bagefter sætter jeg endnu en metode på, som hedder .min, den tager 2 parameter, et tal som skal være minimum længden på stringen, og derefter den fejlbesked der skal vises, hvis det ikke passer

<br>
Nu skal jeg til at validere min opretBruger objekt. Der gør jeg ved at bruge metoden safeParse, den returnere et objekt, med props afhængigt af om min values passer, med min validation. Det objekt, har blandt andet en prop, som hedder success. 

<br> Efter det laver jeg en if state, hvor jeg tjekker om success er true, og hvis den ikke er true, returnere jeg, et objekt, men en prop der hedder succes, som success propetien. og en destructoring af z.treeifyError() metoden, hvor jeg sender min .errors propeties fra mit valideret objekt som argument. z.treeifyError() , som kovertere min error til en et nested objekt, som er objekter der indeholder objekter. Den bruger jeg ude på min side til at vise fejl beskeder i min input placeholdes

<br> 
grundet api'et skulle have dens data i formdata format, laver jeg nu en instanciering af Formdata classen ved at skrive new Formdata(). den returnere et Formdata objekt, som jeg gemmer i en const. nu appender jeg så alle mine values til mit Formdata objekt, ved hjælp af .append() metoden. som tager 2 parameter, navnet og valuen.

<br>
grundet apiet, også skulle have dataen som url encoded. laver jeg nu en ny instansiering af URLSearchParams() classsen. den skal have et parameter som i dette tilfælde er min FormData obejekt 

<br>
Nu sender jeg så min post request til apiet. i min fetch skriver jeg først apiets url. som anden parameter sender jeg et objekt, som har en method propety som er "POST". for at fortælle apiet, jeg sender en post request. Derefter sender jeg min Content-type, som fortæller hvilket format min body bliver sendt i. UPS! i dette tilfælde er det vigtigt at tjekke hvilket format apiet, siger du skal sende den, før at den godtager det. det vil typisk stå i apiets dokumentation. Til sidst sender jeg min body, som er min urlEncoded formData

<br> Efter min fetch, tjekker jeg om min reponse code fra min fetch er lig med 200, og hvis den ikke er det, returene jeg et objekt, med 2 props. en er min error, og den anden min succes.

<br>
Og hvis alt forløber som det skal returnere jeg succes true. Som inde på min side bliver tjekket, gennem min formstate, da det mann returnere i en server action, bliver formstaten. På min side har jeg så lavet en if, der tjekker om den er true, og hvis den er det. skifter jeg til aktivitets siden 

## Ændringer jeg har lavet

### Tilmeld knap vises selvom bruger ikke er logget ind
Jeg syntes personligt at det fjerne en del af hjemmesiden interaktivitet, at der ifølge opgavekravets beskrivelse, ikke skulle vises en Tilmeld knap, hvis brugeren ikke var logget ind. Så derfor valgte jeg at vise den, men hvis brugeren ikke er logget ind, kommer der en popup, som fortæller at man skal været logget ind for at udfører denne handling

