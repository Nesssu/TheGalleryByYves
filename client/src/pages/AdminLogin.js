import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Login(props)
{
    const [adminID, setAdminID] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleAdminIDChange = (event) => { setAdminID(event.target.value); }
    const handlePasswordChange = (event) => { setPassword(event.target.value); }
    const handleLogin = () =>
    {
        const body = {
            adminID,
            password
        };

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(json => {
            if (json.success)
            {
                localStorage.setItem("TheGalleryByYves_AdminToken", JSON.stringify(json.token));
                navigate("/admin/dashboard");
            }
            else
            {
                toast.warning(json.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    });
                
                setPassword("");
            }
        });

    }

    return (
        <div className='LoginBackground'>
            
            <h1 className='LoginHeader'>LOGIN TO ADMIN DASHBOARD</h1>
            
            <input type="text" placeholder='Admin ID' value={adminID} onChange={handleAdminIDChange} className="Input" />
            <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange} className="Input" />
            <input type="submit" value="Login" className='Button' onClick={handleLogin} />

            <ToastContainer />
        
        </div>
    )
}

export default Login;