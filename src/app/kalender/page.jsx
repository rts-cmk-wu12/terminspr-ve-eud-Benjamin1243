import MainLayout from "@/components/layouts/mainLayout/Mainlayout"
import KalenderAktivitetElement from "@/components/ui/kalenderAktivitetElement/KalenderAktivitetElement"
import ListShow from "@/components/ui/listShow/ListShow"
import TopHeading from "@/components/ui/topHeading/TopHeading"
import { cookies } from "next/headers"
import "./kalender.scss"


export const metadata = {
  title: "Kalender",
  description: 'Din personlige aktivitets kalender',
}
export default async function Kalender(){
  
    const cookieStore = await cookies()
    const response = await fetch("http://localhost:4000/api/v1/users/" + cookieStore.get("userId").value,{
        headers:{
            Authorization: "Bearer " + cookieStore.get("token").value
        }
    } )
    const user = await response.json()
    console.log(user)
  


    return(
        <MainLayout>
            <TopHeading>Kalender</TopHeading>
            <ListShow>
                {user.activities.length > 0 ? user.activities.map((activity, index)=>{
                   return(<KalenderAktivitetElement name={user.firstname} role={user.role} id={activity.id} key={activity.name + index} heading={activity.name} date={activity.weekday + " " + activity.time} ></KalenderAktivitetElement>)

                }):<h2 className="kalender__noActivitiesHeading" >Du burde tage dig samme og melde dig på et hold</h2>}
            </ListShow>



        </MainLayout>

    )

}