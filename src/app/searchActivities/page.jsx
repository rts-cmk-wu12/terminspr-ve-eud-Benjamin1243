import MainLayout from "@/components/layouts/mainLayout/Mainlayout";
import SearchBar from "@/components/ui/searchBar/searchBar";
import TopHeading from "@/components/ui/topHeading/TopHeading";

export default function searchActivities(){
    return(
        <MainLayout>
            <TopHeading>Søg</TopHeading>
            <SearchBar></SearchBar>
        </MainLayout>
    )
}