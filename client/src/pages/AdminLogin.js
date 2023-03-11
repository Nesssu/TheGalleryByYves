import { useState } from 'react';
import '../App.css';

function Login(props)
{
    const [adminID, setAdminID] = useState("");
    const [password, setPassword] = useState("");

    const handleAdminIDChange = (event) => { setAdminID(event.target.value); }
    const handlePasswordChange = (event) => { setPassword(event.target.value); }
    const handleLogin = () =>
    {
        const body = {
            adminID,
            password
        };

        
    }

    return (
        <div className='LoginBackground'>
            
            <h1 className='LoginHeader'>LOGIN TO ADMIN DASHBOARD</h1>
            
            <input type="password" placeholder='Admin ID' value={adminID} onChange={handleAdminIDChange} className="Input" />
            <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange} className="Input" />
            <input type="submit" value="Login" className='Button' onClick={handleLogin} />

        </div>
    )
}

export default Login;