import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function SearchResultArtist(props)
{
    const [name, setName] = useState(props.name);
    const [bio, setBio] = useState(props.bio);
    const [path, setPath] = useState(null);

    const handlePathChange = (event) =>
    {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e)
        {
            setPath(e.target.result);
        }

        reader.readAsDataURL(file);
    }

    return (
        <div className='SearchResultArea'>
            <div className='SearchResultLeftSide'>
                <img src={path ? path : require("../media/art_one.jpg")} className="SearchImage" alt="" />
                <div className='ChangeImageContainer'>
                    <input type="file" onChange={handlePathChange} style={{display: "none"}} />
                </div>
            </div>

            <div className='SearchResultRightSide'>

            </div>
        </div>
    )
};

function ResultList(props)
{
    const emails = props.emails.filter(email => email.email.includes(props.searchTerm.toLowerCase()));
    const items = emails.slice(0, 5);
    return (
        <div className='SearchListBackground'>
            <ul style={{padding: "0", margin: "0", width: "100%"}}>
                {items.length !== 0 ? ( <div>
                    {items.map((email, index) => 
                    (
                        <div className='FilterArea' onClick={() => props.search(email.email)} >
                            <li key={index} className="SearchResultItem">{email.email}</li>
                            <li key={index + "" + index} className="SearchResultType">Email</li>
                        </div>
                    ))} </div> )
                    : 
                    ( <div>
                        <p className='EmptySearchBar' >
                            No results
                        </p>
                    </div> )
                }
            </ul>
        </div>
    )
}

function AdminDashboard(props)
{
    const ArtistRef = useRef(null);
    const ExhibitionRef = useRef(null);
    const InformationRef = useRef(null);

    const navigate = useNavigate();
    const [adminIDOne, setAdminIDOne] = useState("");
    const [adminIDTwo, setAdminIDTwo] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [emails, setEmails] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchSelect, setSearchSelect] = useState("");
    
    const showToast = (message, type) =>
    {
        if (type === "warning")
        {
            toast.warning(message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                }
            );
        }
        else if (type === "success")
        {
            toast.success(message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                }
            );
        }
    }
    const updateAdminID = () =>
    {
        if (adminIDOne === adminIDTwo)
        {
            fetch("/api/update/id", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer: " + localStorage.getItem("TheGalleryByYves_AdminToken")
                },
                body: JSON.stringify({adminID: adminIDOne})
            })
            .then(response => response.json())
            .then(json => 
                {
                    if (json.success)
                    {
                        showToast("ID updated succesfully", "success");
                        setAdminIDTwo("");
                        setAdminIDOne("");
                    }
                    else
                    {
                        showToast("Error while updating ID!", "warning");
                        setAdminIDTwo("");
                    }
                }
            )
        }
        else
        {
            showToast("The IDs are not the same!", "warning");
            setAdminIDTwo("");
        }
    }
    const updatePassword = () =>
    {
        if (passwordOne === passwordTwo)
        {
            fetch("/api/update/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer: " + localStorage.getItem("TheGalleryByYves_AdminToken")
                },
                body: JSON.stringify({password: passwordOne})
            })
            .then(response => response.json())
            .then(json => 
                {
                    if (json.success)
                    {
                        showToast("Password updated succesfully", "success");
                        setPasswordTwo("");
                        setPasswordOne("");
                    }
                    else
                    {
                        showToast("Error while updating ID!", "warning");
                        setPasswordTwo("");
                    }
                }
            )
        }
        else
        {
            showToast("The passwords are not the same!", "warning");
        }
    }
    const logout = () => 
    {
        localStorage.removeItem("TheGalleryByYves_AdminToken");
        navigate("/admin");
    }
    const scrollToView = (ref) => { ref.current.scrollIntoView(); }
    const search = (value) =>
    {
        setSearchTerm("");
    }

    useEffect(() =>
    {
        const token = localStorage.getItem("TheGalleryByYves_AdminToken");
        if (token)
        {
            const body = {
                token
            }
            fetch("/api/verify/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(json =>
                {
                    if (!json.success)
                    {
                        logout();
                    }
                    else
                    {
                        // Now the user is the admin so we can start to retrieve the data from the database
                        fetch('/api/get/subscribtions', {
                            method: "GET"
                        })
                        .then(response => response.json())
                        .then(json =>
                            {
                                setEmails(json.docs);
                            }
                        )
                    }
                }
            )
        }
        else
        {
            logout();
        }
    }, []);

    return (
        <div className='DashboardBackground'>

            <div className='Navbar'>
                <p className='NavbarLink'>ARTISTS</p>
                <p className='NavbarLink'>EXHIBITIONS</p>
                <p className='NavbarLink'>INFORMATION</p>
                <p className='NavbarLink' onClick={logout} >LOGOUT</p>
            </div>

            <div className='SearchBarArea'>
                <input  type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="Input" placeholder='Search artists or exhibitions' />
                {searchTerm !== "" &&
                    <ResultList emails={emails} searchTerm={searchTerm} search={search} />
                }
            </div>

            <SearchResultArtist />

            <div className='NewArtistsArea'>

            </div>

            <div className='NewExhibitionsArea'>

            </div>

            <div className='InformationArea'>

            </div>

            <ToastContainer />

        </div>
    )
}

export default AdminDashboard;