import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Register(props)
{
    const [adminID, setAdminID] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = () =>
    {
        if (adminID !== "" && password !== "" & confirmedPassword !== "")
        {
            if (password === confirmedPassword)
            {
                const body = {
                    adminID,
                    password
                }

                fetch('/api/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
                .then(response => response.json())
                .then(json =>
                    {
                        if (json.success)
                        {
                            navigate("/admin");
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
                        }
                    })
            }
            else
            {
                toast.warning("Passwords don't match", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    });
            }
        }
        else
        {
            toast.warning("Admin ID or password can't be empty", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                });
        }
    }

    return (
        <div className='LoginBackground'>
            
            <h1 className='LoginHeader'>REGISTER NEW ADMIN ACCOUNT</h1>

            <input type="text" value={adminID} onChange={(e) => setAdminID(e.target.value)} className="Input" placeholder='Admin ID' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="Input" placeholder='Password' />
            <input type="password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} className="Input" placeholder='Confirm Password' />
            <input type="button" value="Register" onClick={handleRegister} className="Button" />

            <ToastContainer />
        
        </div>
    )
}

export default Register;