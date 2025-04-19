import { useEffect, useState } from "react";

/**
 * @param {string} url 
 * @returns {data, error, loading}
 */
export const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      fetch(url)
      .then(res=>res.json())
      .then((res)=>{
        console.log(res);
        setData(res);
        setLoading(false);})
      .catch((error)=> setError(error))
      }
    ,[url])

    return {data,error,loading}
}