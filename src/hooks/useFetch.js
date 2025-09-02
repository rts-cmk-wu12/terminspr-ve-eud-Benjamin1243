"use client"

import { useEffect, useState } from "react"

export default function useFetch(url){
    const [data, setData] = useState(null);

    useEffect(()=>{
        async function fetcher(){
            const response = await fetch(url)
              const data = await response.json();
              setData(data)
        }
     fetcher()
    
      
    }, [url])

    return(data)



}