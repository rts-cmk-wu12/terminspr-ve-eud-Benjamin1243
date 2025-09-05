import Link from "next/link";
import "./kalenderAktivitetElement.scss"

export default function KalenderAktivitetElement({heading, date, id, role,name}){
    let link ="/aktivitet/" + id
    if(role == "instructor"){
        link = `/${name}/aktivitet/` + id

    }
    if(heading.length > 16){
         heading = heading.slice(0, 16) + "...."
    }
    return(
    <article  className="kalenderAktivitet">
        <Link className="kalenderAktivitet__link" href={link}>
        <h2 className="kalenderAktivitet__heading">{heading}</h2>
        <p className="kalenderAktivitet__text">{date}</p>
        </Link>


    </article>)


}