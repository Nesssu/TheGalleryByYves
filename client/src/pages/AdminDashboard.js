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

function AdminDashboard(props)
{
    const ArtistRef = useRef(null);
    const ExhibitionRef = useRef(null);

    const navigate = useNavigate();
    const [adminIDOne, setAdminIDOne] = useState("");
    const [adminIDTwo, setAdminIDTwo] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [emails, setEmails] = useState([]);
    
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
    const handleIDOneChange = (event) => { setAdminIDOne(event.target.value); }
    const handleIDTwoChange = (event) => { setAdminIDTwo(event.target.value); }
    const handlePasswordOneChange = (event) => { setPasswordOne(event.target.value); }
    const handlePasswordTwoChange = (event) => { setPasswordTwo(event.target.value); }
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

            <div className='DashboardTop'>
                <h1 className='DashboardHeader' style={{fontSize: "xx-large"}} >ADMIN DASHBOARD</h1>
            </div>

            <div className='HorizontalSeparator' />

            <div className='DashboardMiddle'>

                <div className='DashboardMiddleSide'>

                    <div className='EmailList'>
                        <div style={{flexDirection: "row", display: "flex", justifyContent: "space-between"}}>
                            <h3 className='DashboardHeader'>SUBSCRIBTION EMAIL LIST</h3>
                            <h3 className='DashboardHeader'>TOTAL : {emails.length}</h3>
                        </div>
                        <div className='HorizontalSeparator' />
                        {emails.length === 0 ? (
                            <div>
                                <p className='Email' style={{fontStyle: "italic", fontWeight: "200"}} >No subscribtions yet</p>
                            </div> )
                        :
                        ( <div>
                                {emails.map((object, index) => (
                                    <p key={index} className="Email">{object.email}</p>
                                ))}
                            </div> )}
                    </div>
                </div>

                <div className='DashboardArtExhContainer'>
                    
                    <div className='DashboardExhibitionsBackground' ref={ExhibitionRef}>
                        
                        <div className='DashboardExhibitionsArea'>
                            
                        </div>

                        <div style={{width: "100%", flex: 1, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                            <h1 className='DashboardLink' style={{margin: "0"}} onClick={() => scrollToView(ArtistRef)}>
                                ARTISTS
                            </h1>
                            <IoIosArrowDown className='LinkArrow' />
                        </div>

                    </div>

                    <div className='DashboardArtistsBackground' ref={ArtistRef}>

                        <div style={{width: "100%", flex: 1, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                            <IoIosArrowUp className='LinkArrow' />
                            <h1 className='DashboardLink' style={{margin: "0 0 10px 0"}} onClick={() => scrollToView(ExhibitionRef)}>
                                EXHIBITIONS
                            </h1>
                        </div>
    
                        <div className='DashboardArtistsArea'>
                            <h1 className='DashboardHeader'>SEARCH ARTIST</h1>
                            <div className='SearchBarArea'>
                                <input type="text" placeholder='Search' className='Input' style={{width: "100%"}} />
                                <input type="button" value="Search" className='Button' />
                            </div>

                            <div className='HorizontalSeparator' style={{width: "80%"}} />
                            
                            <SearchResult />
                            <div className='HorizontalSeparator' style={{width: "80%"}} />

                            <div className='NewArtistArea'>
                                    <h1 className='DashboardHeader'>ADD NEW ARTIST</h1>
                                <div className='ResultInputGroup' >
                                    <input type="text" className='Input' placeholder="Artists' name" />
                                    <textarea type="text" className='Textarea' placeholder="Bio" rows={4} />
                                    <input type="text" className='Input' placeholder="Path to the image" />
                                </div> 
                                <div>
                                    <input type="button" className='Button' value="Add" />
                                </div>
                            </div>
                        </div>
                
                    </div>

                </div>

                <div className='DashboardMiddleSide'>
                    <h3 className='DashboardHeader'>UPDATE LOGIN INFORMATION</h3>

                    <input type="text" placeholder='New ID' value={adminIDOne} onChange={handleIDOneChange} className="Input" />
                    <input type="text" placeholder='Confirm ID' value={adminIDTwo} onChange={handleIDTwoChange} className="Input" />
                    <input type="button" value="Update" className='Button' onClick={updateAdminID} />

                    <input type="password" placeholder='New Password' value={passwordOne} onChange={handlePasswordOneChange} className="Input" />
                    <input type="password" placeholder='Confirm Password' value={passwordTwo} onChange={handlePasswordTwoChange} className="Input" />
                    <input type="button" value="Update" className='Button' onClick={updatePassword} />
                </div>
            </div>

            <div className='HorizontalSeparator' />

            <div className='DashboardBottom'>
                <p className='DashboardLink' onClick={logout}>LOGOUT</p>
            </div>

            <ToastContainer />

        </div>
    )
}

export default AdminDashboard;