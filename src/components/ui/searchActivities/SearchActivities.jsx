"use client"
import MainLayout from "@/components/layouts/mainLayout/Mainlayout";
import AktivitetElement from "@/components/ui/aktivitetElement/AktivitetElement";
import ListShow from "@/components/ui/listShow/ListShow";
import SearchBar from "@/components/ui/searchBar/searchBar";
import TopHeading from "@/components/ui/topHeading/TopHeading";
import { useState } from "react";
import "./searchActivities.scss"
export default function SearchActivities(){
    const [searchedData, setSearchedData] = useState()
    return(
        <MainLayout heading="Søg">
           
            <SearchBar setState={setSearchedData}></SearchBar>
            <ListShow>
                { searchedData?.length >0 ?searchedData?.map((aktivitet, index)=>{
                    console.log(aktivitet)
                    return   <AktivitetElement key={index + aktivitet.id}  id={aktivitet.id} heading={aktivitet.name} background={aktivitet.asset.url} age={aktivitet.minAge + " - " + aktivitet.maxAge}></AktivitetElement>
                }): <p className="fejlbesked">Der var desværre ikke nogle aktiviteter der matchede din søgning</p>}
            </ListShow>
        </MainLayout>
    )
}