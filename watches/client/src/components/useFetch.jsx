import React, { useEffect, useState } from "react";

// Custom useFetch hook fetches data from a remote API and returns an object with rowData, loading and error object.
const useFetch = (url, apiKey) => {
  //--------------------------------------------state values
  const [rowData, setRowData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //asyncronous function to fetch data
    const fetchData = async () => {
      console.log(url);
      setIsLoading(true);
      try {
        //request to the API including the API key and the items limit
        const res = await fetch(`${url}/api/watches?populate=*&pagination[limit]=100`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        const jsonData = await res.json();
        // console.log(jsonData);
        if (!res.ok) {
          throw new Error(jsonData.error.message);
        } else {
          setRowData(jsonData);
          setIsLoading(false);
        }
      } catch (error) {
        //if try fails, catch will report network error, if response is received it will report on server error if ocurred
        console.log(error);
      }
    };
    // Call the function to fetch the data
    fetchData();
  }, [url, apiKey]);

  return { rowData, isLoading };
};
export default useFetch;
