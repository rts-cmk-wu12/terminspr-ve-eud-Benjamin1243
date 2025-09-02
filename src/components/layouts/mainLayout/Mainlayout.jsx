import "./mainLayout.scss"
export default function  MainLayout({children}){
    return(
        <main className="mainLayout">
        {children}
        </main>
    )
}