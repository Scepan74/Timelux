import React, { useEffect, useState } from "react";
// import axios from "axios";

export const useFetch = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data1, setData1] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      //---------using axios
      // const res = await axios(url);
      // setData(res.data.data);
      // ----------using fetch()
      const res = await fetch(url);
      const data = await res.json();
      setIsLoading(false);
      setData1(data);
    } catch (error) {
      console.error("Error object:", error);
      // alert(error.response.status);
      // doesn't work in fetch().
    }
    //res is response object containing status,headers... and actual data we need
  };
  useEffect(() => {
    fetchData();
    console.log(data1);
  }, []);

  return {
    isLoading,
    data1,
  };
};
