import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

function SearchResult(props)
{
    const [name, setName] = useState(props.name);
    const [bio, setBio] = useState(props.bio);
    const [path, setPath] = useState(null);
    
    const handleNameChange = (event) => { setName(event.target.value); }
    const handleBioChange = (event) => { setBio(event.target.value); }
    const handlePathChange = (event) => { setPath(event.target.files[0]); }

    return (
            <div className='SearchResultArea'>
                <div className='ResultSide' >
                    <textarea type="text" className='Textarea' placeholder="Bio" rows={8} value={bio} onChange={handleBioChange} />
                </div> 
                <div className='ResultSide'>
                    <input type="text" className='Input' value={name} onChange={handleNameChange} placeholder="Artists' name" />
                    <label htmlFor='FileInput' className='FileInput' >
                        <input type="file" onChange={handlePathChange} style={{display: "none"}} id="FileInput" />
                        Choose new image
                    </label>
                    <div className='ResultButtonArea'>
                        <input type="button" className='Button' value="Delete" />
                        <input type="button" className='Button' value="Edit" />
                    </div>
                </div>
            </div>
    )
};

function ResultList(props)
{
    const emails = props.emails.filter(email => email.email.includes(props.searchTerm));
    const items = emails.slice(0, 5);
    return (
        <div className='SearchListBackground'>
            <ul style={{padding: "0", margin: "5px 0 5px 0"}}>
                {items.length !== 0 ? ( <div>
                    {items.map((email, index) => 
                    (
                        <li key={index} className="SearchResultItem">{email.email}</li>
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
                    <ResultList emails={emails} searchTerm={searchTerm} />
                }
            </div>

            <div className='SearchResultArea'>

            </div>

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