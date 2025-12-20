import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");  
    const [status, setStatus] = useState('typing');
    let navigate = useNavigate();


    async function login() {
            const result = await fetch("http://localhost:3000/login", {
                method: "POST",
                credentials: "include",
                headers: {
                'Content-Type': 'application/json'
             },
            body: JSON.stringify({ username, password })
        });
        result.status === 200 ? setStatus("success") : setStatus("failed");
    }

    if (status === "success") {
        navigate("/notes")
    }
    

    return (
        <>
            <div className="h-[400px] w-[500px] border-1 rounded-[10px] font-light italic flex flex-col items-center justify-around">
                <h1 className="mt-[15px] text-[22px] text-center underline decoration-dotted underline-offset-4">Welcome!</h1>
                <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="border-1 border-solid border-[#292f36] ml-[7px] w-[80%] h-[40px] pl-[6px] rounded-[10px]"/>
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border-1 border-solid border-[#292f36] ml-[7px] w-[80%] h-[40px] pl-[6px] rounded-[10px]"/>
                <button onClick={login} className="border-1 rounded-[5px] w-[60px] h-[30px] cursor-pointer hover:bg-[#eff5d0] transition duration-300">Login</button>
                <p className="cursor-pointer hover:text-[#8a8c7b]"><Link to="/signup">Don't have an account yet? Click here to sign up!</Link></p>
            </div>
        </>
    )
}