import "./submitButton.scss"
export default function SubmitButton({children}){
    return(
        <button className="submitButton" type="submit">{children}</button>
    )
}