import "./input.scss"
export default function Input({name, placeholder, style,extraClass}){
    return(
        <input className={"input " + extraClass} type="text" style={style} name={name} placeholder={placeholder}/>
    )
}