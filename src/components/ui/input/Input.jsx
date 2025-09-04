import "./input.scss"
export default function Input({name, placeholder, style,extraClass, type="text"}){
    return(
        <input className={"input " + extraClass} type={type} style={style} name={name} placeholder={placeholder}/>
    )
}