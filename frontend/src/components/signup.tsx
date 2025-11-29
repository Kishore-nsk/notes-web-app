import { useState } from "react";
import Login from "./login";
import { Link } from "react-router";

export default function Signup() {
    return (
        <>
            <div className="h-[400px] w-[500px] border-1 rounded-[10px] font-light italic flex flex-col items-center justify-around">
                <h1 className="mt-[15px] text-[22px] text-center underline decoration-dotted underline-offset-4">Welcome!</h1>
                <input type="text" placeholder="Username" className="border-1 border-solid border-[#292f36] ml-[7px] w-[80%] h-[40px] pl-[6px] rounded-[10px]"/>
                <input type="password" placeholder="Password" className="border-1 border-solid border-[#292f36] ml-[7px] w-[80%] h-[40px] pl-[6px] rounded-[10px]"/>
                <input type="password" placeholder="Confim Password" className="border-1 border-solid border-[#292f36] ml-[7px] w-[80%] h-[40px] pl-[6px] rounded-[10px]"/>
                <button className="border-1 rounder-[5px] w-[60px] h-[30px] cursor-pointer hover:bg-[#eff5d0] transition duration-300">Sign-up</button>
                <p className="cursor-pointer hover:text-[#8a8c7b]"><Link to="/login">Already have an account? Click here to log in!</Link></p>
            </div>
        </>
    )
}