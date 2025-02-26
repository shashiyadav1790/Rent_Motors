import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import LoadingCard from '../../user/LoadingCard/LoadingCard';

const UpdateVehcile = () => {
  const [vehicles,setVehicles]=useState([]);
  const userid=localStorage.getItem("userid");
  const loadData = async () => {
    try {
           const res = await fetch(`${import.meta.env.VITE_SERVER}/renter/vehicle/${userid}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (res) {
        const response = await res.json();
        setVehicles(response.data)
      } else {
        setVehicles([]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

 
  useEffect(() => {
    loadData();
  }, []);

  const hello=async()=>{
     loadData();
  }
  return (
    <div className="h-full sm:overflow-auto ">
      <h2 className="text-xl font-bold text-center ">Vehicles List</h2>

     
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center">
        {vehicles.length > 0 ? (
          vehicles.map((data, index) => <ListingCard key={index} data={data} hello={hello}/>)
        ) : (
          Array.from({ length: 8 }).map((_, index) => <LoadingCard key={index} />)
        )}
      </div>

      
    </div>
  );
};

export default UpdateVehcile;
