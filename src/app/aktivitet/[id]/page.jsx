import TopImage from "@/components/topImage/TopImage";
import "./aktivitet.scss"
import { cookies } from "next/headers";
import FooterBar from "@/components/ui/footerBar/FooterBar";


export default async function Aktivitet({params}){
    let registred = false;
    const cookieStore = await cookies()
    const {id} =  await params
    const response = await fetch("http://localhost:4000/api/v1/activities/" +id)
    const data = await response.json();
     console.log(data.users)
    data?.users?.forEach((user)=>{
        console.log(user.id)
        if(user.id == cookieStore?.get("userId")?.value){
            registred = true
        }
    })
   
 
   

    console.log(data.users)
    return(
        <>
<main className="aktivitet">
    <TopImage minAge={data.minAge} aktivitetsId={id} isRegistered={registred} maxAge={data.maxAge} img={data.asset.url}></TopImage>
    <div className="aktivitet__textInfoDiv">
        <h1 className="aktivitet__heading">{data.name}</h1>
        <p className="aktivitet__text">{data.minAge + " - " + data.maxAge + " år"}</p>
        <p className="aktivitet__text">{data.weekday}</p>
        <p className="aktivitet__text">{data.description}</p>
    </div>
</main>
<FooterBar></FooterBar>
</>
    )
}