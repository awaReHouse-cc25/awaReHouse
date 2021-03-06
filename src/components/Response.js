import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
export default function Response({ message, isSuccess, setMessage }) {
  const navigate = useNavigate();
  const email = window.localStorage.getItem("email_user");
  const heart = document.getElementById("heart");
  isSuccess &&
    heart &&
    setTimeout(() => {
      heart.classList.remove("heart-before");
    }, 3500);
  function signOut() {
    setMessage("");
    window.localStorage.removeItem("firstName_user");
    window.localStorage.removeItem("email_user");
    window.localStorage.removeItem("token_user");
    window.localStorage.removeItem("plan_user");
    window.localStorage.removeItem("boxes_user");
    navigate("/");
  }
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="bg-white w-96 rounded-lg mx-3 my-3 px-3 py-3 text-center ">
          {message}
        </div>
      </div>
      {isSuccess ? (
        <div className="flex justify-center items-center mx-3 my-3 px-3 py-3 ">
          <img
            id="heart"
            className="heart-before   opacity-80  rounded-3xl  px-3 py-3 mx-3 my-3 "
            src={require("../pictures/heart.png")}
            alt=""
          />
        </div>
      ) : (
        <div className="flex justify-center items-center mx-3 my-3 px-3 py-3 ">
          <img
            className="border-8 bg-blue-300 opacity-80  rounded-3xl  px-3 py-3 mx-3 my-3 "
            src={require("../pictures/announcement.jpeg")}
            alt=""
          />
        </div>
      )}
      <div className="flex justify-center items-center">
        {/* <Button onClick={() => navigate("/user")}>Go back to user page</Button> */}
        <Button onClick={signOut}>Go back to home page</Button>
      </div>
    </div>
  );
}
