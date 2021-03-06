import React from "react";
import { useNavigate } from "react-router-dom";
export default function LoginButtons() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col   ">
        <div className="flex  justify-center  ">
          <button
            className="login-button mx-8 my-3 px-8 py-8 text-xl min-w-fit"
            onClick={() => {
              console.log(window.localStorage.getItem("firstName_user"));
              if (window.localStorage.getItem("firstName_user")) {
                window.localStorage.removeItem("firstName_provider");
                window.localStorage.removeItem("email_provider");
                window.localStorage.removeItem("token_provider");
                navigate("/user");
              } else navigate("/login/user");
            }}
          >
            Login as a User
          </button>
        </div>

        <div className="">
          <button
            className="login-button  mx-8 my-3 px-8 py-8 text-xl min-w-fit"
            onClick={() => {
              console.log(window.localStorage.getItem("firstName_provider"));
              if (window.localStorage.getItem("firstName_provider")) {
                window.localStorage.removeItem("firstName_user");
                window.localStorage.removeItem("email_user");
                window.localStorage.removeItem("token_user");
                window.localStorage.removeItem("plan_user");
                navigate("/provider");
              } else navigate("/login/provider");
            }}
          >
            Login as a Provider
          </button>
        </div>
      </div>
    </div>
  );
}
