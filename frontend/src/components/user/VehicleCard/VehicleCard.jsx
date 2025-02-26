import React, { useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Cookies from "js-cookie";
import "./VehicleCard.css";

export default function VehicleCard(props) {
  const { data } = props;
  const [liked, setLiked] = useState(false);
  const [add, setAdd] = useState("Add to cart");
  const [loading, setLoading] = useState(false);
  const [type,setType]=useState(localStorage.getItem("usertype"))
  const navigate = useNavigate();
  const userid=localStorage.getItem("userid");
  useEffect(() => {
    setType(localStorage.getItem("usertype"));
  })
   const handleLikeClick = async () => {
    setLiked((prevLiked) => !prevLiked);
    const response = await fetch(`${import.meta.env.VITE_SERVER}/client/wishlist/${userid}`, {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: data._id}),
     
    });
    const res=await response.json();
    if (res.success) {
      console.log(response.message);
    } else {
      setLiked((prevLiked) => !prevLiked);
    }
  };

  const handleAddBtn = async () => {
    setLoading(true);
    if (type!=="Client") {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/client/cart/${userid}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data._id, quantity: 1 }),
      });
      await res.json();
      setAdd("Added");
      setTimeout(() => setAdd("Add to cart"), 3000);
    } catch (error) {
      console.error("Error loading vehicle data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <Card
      sx={{
        maxWidth: "400px",
        minHeight: "400px",
        maxHeight: "500px",
        margin: ".5rem",
        borderRadius: "15px",
        boxShadow: "inset 0px 1px 6px 1px rgb(220 220 220)",
      }}
      className="relative z-10 group bg-neutral-200 border-2 border-neutral-300 cursor-pointer text-sm"
    >
      <div className="absolute flex justify-center z-30 top-2 right-0 ">
        <div
          onClick={handleLikeClick}
          className="p-2"
          aria-label="add to favorites"
        >
          <FavoriteIcon sx={{ color: liked ? red[600] : "white" }} />
        </div>
      </div>
      <Link to="/view"  state={ data._id } className="hover:text-black">
        <div className="overflow-hidden h-3/4 p-1">
          <CardMedia
            component="img"
            image={data.images[0]}
          
            sx={{width:"350px", borderRadius: "15px" }}
            className="h-full  group-hover:scale-95 transition-transform duration-1000 ease-in-out "
          />
        </div>
      </Link>
      <CardContent className="pt-1  cursor-pointer text-sm text-neutral-800" sx={{ borderRadius: "15px" }}>
      <Link to="/view"  state={ data._id } className="hover:text-black hover:no-underline">
        <div className="">
          <h1 className="font-bold text-md">{data.title}</h1>
          <p>{data.brand}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p>
            <b>Price:</b> {data.price} Rs
          </p>
          <p>
            <b>Mileage:</b> {data.mileage} KMPL
          </p>
        </div>
        <div className="flex justify-between">
          <p>
            <b>Speed:</b> {data.speed} KMPH
          </p>
          <p>
            <b>Type:</b> {data.type} 
          </p>
        </div>
        </Link>
        <div className="border-0 absolute w-full left-0 -bottom-8 duration-500 group-hover:-translate-y-12 text-center  cursor-pointer text-sm">
          <div
            className="border-0 boder-black absolute -z-10 w-full h-16 opacity-0 duration-500 group-hover:opacity-100  cursor-pointer text-sm group-hover:bg-black"
            style={{
              backgroundColor: add === "Added" ? " rgb(101 163 13)" : "black",
            }}
          ></div>
          <p
            onClick={handleAddBtn}
            className={`w-full hover:scale-105 duration-300 ease-in-out text-white font-bold pt-2  cursor-pointer ${loading ? "opacity-50" : ""}`}
            disabled={loading} 
          >
            {loading ? "Adding..." : add}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
