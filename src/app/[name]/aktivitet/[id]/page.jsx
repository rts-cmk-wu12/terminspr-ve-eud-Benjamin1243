import MainLayout from "@/components/layouts/mainLayout/Mainlayout"
import ListShow from "@/components/ui/listShow/ListShow"
import TopHeading from "@/components/ui/topHeading/TopHeading"
import "./instructorActivityPage.scss"

export default async function instructorActivityPage({params}){
    const {name, id} = await params
    console.log(name, id)
   const response = await fetch("http://localhost:4000/api/v1/activities/" + id)
   const data = await response.json();
    //nu skal vi fetche den aktivitet
    console.log(data)


    return (
        <MainLayout heading={data.name}>
           
            <ListShow>
                <section className="instructorDetailSection">
                <h2 className="instructorDetailSection__heading">Instruktører: </h2>
                {data.users.map((user, index)=>{
                    if(user.role == "instructor"){
                        return <p className="instructorDetailSection__text" key={user.firstnamename + index}> {user.firstname + " " +user.lastname}</p>
                    }
                })}
                </section>
                 <section className="instructorDetailSection">
                    {/*mappet til deltagere*/}
                <h2 className="instructorDetailSection__heading">Deltagere: </h2>
                {data.users.map((user, index)=>{
                    if(user.role == "default"){
                        return <p className="instructorDetailSection__text" key={user.firstname + index}> {user.firstname + " " +user.lastname}</p>
                    }
                })}
                </section>
            </ListShow>
        </MainLayout>


    )

}