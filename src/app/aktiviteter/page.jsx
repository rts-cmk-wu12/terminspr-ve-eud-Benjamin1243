"use client"
import MainLayout from "@/components/layouts/mainLayout/Mainlayout.jsx";
import TopHeading from "../../components/ui/topHeading/TopHeading.jsx";
import "./aktiviter.scss"
import useFetch from "@/hooks/useFetch.js";
import { useState } from "react";
import ListShow from "@/components/ui/listShow/ListShow.jsx";
import AktivitetElement from "@/components/ui/aktivitetElement/AktivitetElement.jsx";
export default function aktiviteter(){
  const activities = useFetch("http://localhost:4000/api/v1/activities")

   
    console.log(activities)
    return(
      <MainLayout>
       <TopHeading>Aktiviteter</TopHeading>
       <ListShow>
        {activities?.map((aktivitet, index)=>{
            return(
                <AktivitetElement key={index + aktivitet.id}  id={aktivitet.id} heading={aktivitet.name} background={aktivitet.asset.url} age={aktivitet.minAge + " - " + aktivitet.maxAge}></AktivitetElement>
            )
        })}
       </ListShow>
       
      </MainLayout>
      
    )
}