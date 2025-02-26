import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { red } from "@mui/material/colors";
import Alert from "@mui/material/Alert";

const ViewCard = (props) => {
  const vehicleData = props.data;
  const [add, setAdd] = useState("Add to cart");
  const [liked, setLiked] = useState(false);

  // Get user ID from localStorage and validate it
  const userid = localStorage.getItem("userid");

  if (!userid) {
    console.error("User ID not found in localStorage.");
  }

  const handleLikeClick = async () => {
    if (!userid || !vehicleData?._id) return;

    setLiked((prevLiked) => !prevLiked);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/client/wishlist/${userid}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: vehicleData._id }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Wishlist Error: ${response.status} - ${errorText}`);
      }

      const res = await response.json();
      if (res?.success) {
        console.log(res.message);
      } else {
        setLiked((prevLiked) => !prevLiked);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error.message);
      setLiked((prevLiked) => !prevLiked);
    }
  };

  const handleAddBtn = async () => {
    if (!userid || !vehicleData?._id) return;

    try {
      console.log("API Endpoint:", `${import.meta.env.VITE_SERVER}/client/cart/${userid}`);

      const res = await fetch(`${import.meta.env.VITE_SERVER}/client/cart/${userid}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: vehicleData._id, quantity: 1 }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Cart Error: ${res.status} - ${errorText}`);
      }

      const response = await res.json();
      console.log("API Response:", response);

      setAdd("Added");
      setTimeout(() => setAdd("Add to cart"), 3000);
    } catch (error) {
      console.error("Error adding vehicle to cart:", error.message);
      setAdd("Failed");
      setTimeout(() => setAdd("Add to cart"), 3000);
    }
  };

  return (
    <div className="mt-12">
      {add === "Added" && (
        <div className="flex justify-center">
          <Alert variant="filled" severity="success" className="mt-6 sm:w-1/2 w-2/3">
            Vehicle added to your cart successfully!
          </Alert>
        </div>
      )}
      {add === "Failed" && (
        <div className="flex justify-center">
          <Alert variant="filled" severity="error" className="mt-6 sm:w-1/2 w-2/3">
            Failed to add Vehicle to your cart!
          </Alert>
        </div>
      )}
      <div className="p-3 flex md:flex-row flex-col">
        <div
          id="carouselExampleIndicators"
          className="carousel slide md:w-2/3 w-full my-1"
          data-ride="carousel"
          style={{ maxHeight: "800px" }}
        >
          <div className="carousel-inner rounded-md" style={{ maxHeight: "700px" }}>
            {vehicleData.images?.map((image, index) => (
              <div key={index} className={`carousel-item ${index === 1 ? "active" : ""}`}>
                <img src={image} className="d-block w-100 h-full" alt={`Vehicle ${index}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/3 my-1 w-full rounded-md bg-black ml-2 p-4 text-white relative flex flex-col justify-between">
          <p className="text-lg md:text-2xl font-bold mb-4">{vehicleData.title}</p>
          <div className="text-justify text-md">
            <p>
              <ArrowRightAltIcon /> {vehicleData.description}
            </p>
            <p>
              <ArrowRightAltIcon /> Product category: {vehicleData.brand}
            </p>
            <p>
              <ArrowRightAltIcon /> <b>Price:</b> {vehicleData.price}
            </p>
            <p>
              <ArrowRightAltIcon /> <b>Mileage: </b> {vehicleData.mileage}
            </p>
            <p>
              <ArrowRightAltIcon /> <b>Fuel: </b> {vehicleData.fuel}
            </p>
            <p>
              <ArrowRightAltIcon /> <b>Vehicle type:</b> {vehicleData.type}
            </p>
            <p>
              <ArrowRightAltIcon /> <b>Seater: </b> {vehicleData.seater}
            </p>
            <p>
              <ArrowRightAltIcon /> <b>Speed: </b> {vehicleData.speed}
            </p>
          </div>

          <div>
            <button
              className="w-full rounded-full bg-lime-600 py-2 mt-4 hover:font-bold hover:bg-lime-500 font-semibold"
              onClick={handleAddBtn}
              style={{
                backgroundColor: add === "Added" ? "rgb(101 163 13)" : "",
              }}
            >
              <AddShoppingCartIcon /> {add}
            </button>
          </div>
          <div className="absolute flex justify-center z-30 top-2 right-4">
            <div onClick={handleLikeClick}>
              <FavoriteIcon sx={{ fontSize: "2rem", color: liked ? red[600] : "white" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
