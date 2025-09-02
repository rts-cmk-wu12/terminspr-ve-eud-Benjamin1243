import Link from "next/link";
import "./aktivitetElement.scss"

export default function AktivitetElement({background, heading, age, id}){

    return(
        <article className="aktivitetElement" style={{backgroundImage: "url(" + background+ ")"}}>
            <Link className="aktivitetElement__link" href={"aktivitet/"+ id}>
            <div className="aktivitetElement__textDiv" >
                <h2 className="aktivitetElement__heading">{heading}</h2>
                <p className="aktivitetElement__text">{age + " år"}</p>
            </div>
            </Link>
        </article>

    )
}