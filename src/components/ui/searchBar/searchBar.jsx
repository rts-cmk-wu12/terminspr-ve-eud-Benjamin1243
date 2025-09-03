"use client"
import useFetch from "@/hooks/useFetch";
import "./searchBar.scss"
import { CiSearch } from "react-icons/ci";

export default function SearchBar(){
    //først tager jeg alle aktiviteter ud 
    const data = useFetch("http://localhost:4000/api/v1/activities/")
    //jeg mangler at lav search færdig
console.log(data)
    function searchFetch(e){
      let sortedData = data.map((activity)=>{
        if(activity.name.includes(e.target.value)){
            return activity
        }
      })
      console.log(sortedData)
       
      
 

    }
    
    return(
        <div className="searchBar">

        <input className="searchBar__input" type="text" onInput={searchFetch}/>
        <button className="searchBar__button"><CiSearch className="searchBar__logo" />
        </button>


        </div>
    )
}