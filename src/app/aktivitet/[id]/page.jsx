import TopImage from "@/components/topImage/TopImage";
import "./aktivitet.scss"


export default async function Aktivitet({params}){

    const {id} =  await params
    const response = await fetch("http://localhost:4000/api/v1/activities/" +id)
    const data = await response.json();
    console.log(data)
    return(
<main className="aktivitet">
    <TopImage minAge={data.minAge} maxAge={data.maxAge} img={data.asset.url}></TopImage>
    <div className="aktivitet__textInfoDiv">
        <h1 className="aktivitet__heading">{data.name}</h1>
        <p className="aktivitet__text">{data.minAge + " - " + data.maxAge + " år"}</p>
        <p className="aktivitet__text">{data.description}</p>
    </div>
</main>
    )
}