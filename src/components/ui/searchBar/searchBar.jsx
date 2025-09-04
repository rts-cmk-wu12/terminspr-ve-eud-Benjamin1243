"use client"
import useFetch from "@/hooks/useFetch";
import "./searchBar.scss"
import { CiSearch } from "react-icons/ci";
import { check } from "zod";
import { useEffect } from "react";

export default function SearchBar({setState}){
  

    const data = useFetch("http://localhost:4000/api/v1/activities/")
    //jeg mangler at lav search færdig



  useEffect(()=>{
setState(data)
  }, [data])
    //først tager jeg alle aktiviteter ud 

    function searchFetch(e){
      let sortedData = data.flatMap((activity)=>{
       
        if(activity.name.substring(0,e.target.value.length).toLowerCase() == e.target.value.toLowerCase()){
        return activity


        }
        return []
      
      })
     
      setState(sortedData)
      
       
      
 

    }
    
    return(
        <div className="searchBar">

        <input className="searchBar__input" type="text" onInput={searchFetch}/>
        <button className="searchBar__button"><CiSearch className="searchBar__logo" />
        </button>


        </div>
    )
}