import FooterBar from "@/components/ui/footerBar/FooterBar"
import "./mainLayout.scss"
import TopHeading from "@/components/ui/topHeading/TopHeading"
export default function  MainLayout({children, heading = "Ingen header gevet"}){
    return(
        <div className="mainLayoutWrapper">
        <header className="mainLayoutWrapper__header">
            <TopHeading>{heading}</TopHeading>
        </header>
        <main  className="mainLayoutWrapper__main">

        {children}
        </main>
        <FooterBar></FooterBar>
        </div>
    )
}