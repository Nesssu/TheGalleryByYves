import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BiImageAdd } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';

function DataTempalte(props)
{
    const [name, setName] = useState(props.name ? props.name : "");
    const [bio, setBio] = useState(props.bio ? props.bio : "");
    const [title, setTitle] = useState(props.title ? props.title : "");
    const [artist, setArtist] = useState(props.artist ? props.artist : "");
    const [about, setAbout] = useState(props.about ? props.about : "");
    const [date, setDate] = useState("");
    const [path, setPath] = useState(null);
    const [image, setImage] = useState(null);
    const [hover, setHover] = useState(false);
    const fileInputRef = useRef(null);

    const handleClick = () => { fileInputRef.current.click() }
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
    const handleArtisDelete = () =>
    {

    }
    const handleArtistSave = () =>
    {

    }
    const handleArtistAdd = () =>
    {
        if (name !== "" && bio !== "")
        {
            const body = {
                name,
                bio,
                image
            };

            console.log(body);

            fetch('/api/add/new/artist', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("TheGalleryByYves_AdminToken")
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(json => 
                {
                    if (json.success) showToast(json.message, "success");
                    else showToast(json.message, "warning");
                })
            setName("");
            setBio("");
        }
        else
        {
            showToast("Name or bio cannot be empty", "warning");
        }
    }
    const handleExhibitionDelete = () =>
    {

    }
    const handleExhibitionSave = () =>
    {

    }
    const handleExhibitionAdd = () =>
    {
        if (title !== "" && artist !== "" && about !== "" && date !== "")
        {
            const body = {
                title,
                artist,
                about,
                date,
                image
            };

            fetch('/api/add/new/exhibition', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("TheGalleryByYves_AdminToken")
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(json => 
                {
                    if (json.success) showToast(json.message, "success");
                    else showToast(json.message, "warning");
                })
            setTitle("");
            setArtist("");
            setAbout("");
            setDate("");
        }
        else
        {
            showToast("Title, artist, bio, date or time cannot be empty", "warning");
        }
    }
    const handlePathChange = (event) =>
    {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e)
        {
            setPath(`url(${e.target.result})`);
            setImage(reader.result.replace("data:", "").replace(/^.+,/, ""));
        }
        reader.readAsDataURL(file);
    }

    useEffect(() => 
    {  
    }, [props]);

    return (
        <div className='SearchResultArea'>
            <div className='SearchResultLeftSide'>
                <div className='ChangeImageContainer' onClick={handleClick} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} style={{backgroundImage: path && path}} >
                    <BiImageAdd className='ImageIcon' style={{opacity: hover ? "1" : "0" }} />
                    <input type="file" style={{display: "none"}} onChange={handlePathChange} id="BrowseImages" ref={fileInputRef} />
                </div>
                {props.type === "exhibition" && (
                    <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <input type={"date"} value={date} onChange={(e) => setDate(e.target.value)} className="TimeInput" style={{margin: "0 0 5px 0", width: "210px", textAlign: "center"}} />
                    </div>
                )}
                <div style={{display: "flex", alignItems: "center", width: "240px"}} >
                    {props.protocol !== "add" ? (
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}} >
                            <input type="button" className='Button' value="Delete" onClick={props.type === "exhibition" ? handleExhibitionDelete : handleArtisDelete} />
                            <input type="button" className='Button' value="Save" onClick={props.type === "exhibition" ? handleExhibitionSave : handleArtistSave} />
                        </div>
                    ) : (
                        <div>
                            <input type="button" className='Button' style={{width: "240px"}} value="Add" onClick={props.type === "exhibition" ? handleExhibitionAdd : handleArtistAdd} />
                        </div>
                    )}
                </div>
            </div>

            <div style={{width: "500px", padding: "5px"}} >
                {props.type === "artist" ? (
                    <div className='SearchResultRightSide'>
                        <input type="text" className='Input' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                        <textarea className='Textarea' value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
                    </div>
                ) : (
                    <div className='SearchResultRightSide'>
                        <input type="text" className='Input' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                        <input type="text" className='Input' value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" style={{margin: "10px 10px 0 10px"}} />
                        <textarea className='Textarea' value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About" />
                    </div>
                )}
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
                        <div key={index} className='FilterArea' onClick={() => props.search(email)} >
                            <li className="SearchResultItem">{email.email}</li>
                            <li className="SearchResultType">Email</li>
                        </div>
                    ))} </div> )
                    : 
                    ( <div key={"abc"}>
                        <p className='EmptySearchBar' >
                            No results
                        </p>
                    </div> )
                }
            </ul>
        </div>
    )
}

function SubscribtionList(props)
{
    const [emails, setEmails] = useState([]);
    const [update, setUpdate] = useState(true);

    const ListItem = (props) =>
    {
        const [show, setShow] = useState(false);

        const onDelete = (email) =>
        {
            const body = {
                email
            };
    
            fetch('/api/delete/subscribtion', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'authorization': localStorage.getItem("TheGalleryByYves_AdminToken")
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(json =>
                {
                    if (json.success)
                    {
                        props.setUpdate(!props.update);
                        setShow(false);
                    }
                })
        }

        return (
            <div className='ListItem' onClick={() => setShow(!show)}>
                <li key={props._id} >{props.email}</li>
                {show === true &&
                    <div>
                        <p onClick={() => onDelete(props.email)} className='DeleteButton'>DELETE</p>
                    </div>
                }
            </div>
        )
    }

    useEffect(() => 
    {
        fetch('/api/get/subscribtions', {
            method: "GET"
        })
        .then(response => response.json())
        .then(json =>
            {
                setEmails(json.docs);
            }
        )
    }, [update]);

    return (
        <div className='SubscribtionListArea'>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <p className='DashboardHeaderSmall' style={{color: "#41553A"}} >SUBSCRIBED EMAILS</p>
                <p className='DashboardHeaderSmall' style={{color: "#41553A"}}>TOTAL: {emails.length}</p>
            </div>
            <div className='HorizontalSeparator' />
            {emails.length !== 0 ? (
                <div className='EmailList'>
                    <ul style={{padding: 0}}>
                        {emails.map((email) =>
                        (
                            <ListItem _id={email._id} email={email.email} setUpdate={setUpdate} update={update} />
                        ))}
                    </ul>
                </div>
            )
            :
            (
                <div>
                    <p className='EmptySearchBar'>No subscribtions yet</p>
                </div>
            )}
        </div>
    )
}

function UpdateInformation(props)
{
    const [adminIDOne, setAdminIDOne] = useState("");
    const [adminIDTwo, setAdminIDTwo] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const updateAdminID = () =>
    {
        if (adminIDOne === "" && adminIDTwo === "")
        {
            showToast("The ID can't be empty", "warning");
        }
        else if (adminIDOne === adminIDTwo)
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
        if (passwordOne === "" && passwordTwo === "")
        {
            showToast("The password can't be empty", "warning");
        }
        else if (passwordOne === passwordTwo)
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

    return (
        <div className='UpdateInformationArea'>
            <p className='DashboardHeaderSmall'>ADMIN ID</p>
            <input type="text" className="Input" value={adminIDOne} onChange={(e) => { setAdminIDOne(e.target.value) }} placeholder="New ID" />
            <input type="text" className="Input" value={adminIDTwo} onChange={(e) => { setAdminIDTwo(e.target.value) }} placeholder="Confirm ID" />
            <input type="button" value="Update" className='Button' onClick={updateAdminID} />

            <p className='DashboardHeaderSmall'>PASSWORD</p>
            <input type="password" className="Input" value={passwordOne} onChange={(e) => { setPasswordOne(e.target.value) }} placeholder="New Password" />
            <input type="password" className="Input" value={passwordTwo} onChange={(e) => { setPasswordTwo(e.target.value) }} placeholder="Confirm Password" />
            <input type="button" value="Update" className='Button' onClick={updatePassword} />
        </div>
    )
}

function AdminDashboard(props)
{
    const ArtistRef = useRef(null);
    const ExhibitionRef = useRef(null);
    const InformationRef = useRef(null);
    const SubscribtionRef = useRef(null);

    const navigate = useNavigate();
    const [emails, setEmails] = useState([]);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [about, setAbout] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [searchData, setSearchData] = useState({});
    const [protocol, setProtocol] = useState("");
    const [type, setType] = useState("");

    const logout = () => 
    {
        localStorage.removeItem("TheGalleryByYves_AdminToken");
        navigate("/admin");
    }
    const scrollToView = (ref) => { ref.current.scrollIntoView(); }
    const search = (object) =>
    {
        setName(object.email);
        setBio(object.email + "s' bio will be here");
        setType("artist");
        setProtocol("edit")
        setShowSearch(true);
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
    }, [searchData]);

    return (
        <div className='DashboardBackground'>

            <div className='Navbar'>
                <h1 className='NavbarHeader'>ADMIN DASHBOARD</h1>
                <p className='NavbarLink' onClick={logout} >LOGOUT</p>
            </div>

            <div className='SearchBarArea'>
                <input  type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="Input" placeholder='Search artists or exhibitions' />
                {searchTerm !== "" &&
                    <ResultList emails={emails} searchTerm={searchTerm} search={search} />
                }
            </div>

            {showSearch && (
                <div style={{textAlign: "center"}}>
                    <h1 className='DashboardHeader'>SEARCH RESULT</h1>
                    <DataTempalte type={type} protocol={protocol} name={name} bio={bio} title={title} artist={artist} about={about} />
                </div>
            )}

            <div className='NewArtistArea' ref={ArtistRef}>
                <h1 className='DashboardHeader'>ADD NEW ARTIST</h1>
                <DataTempalte type={"artist"} protocol={"add"} />
            </div>

            <div className='NewExhibitionArea' ref={ExhibitionRef}>
                <h1 className='DashboardHeader'>ADD NEW EXHIBITION</h1>
                <DataTempalte type={"exhibition"} protocol={"add"} />
            </div>

            <div className='SubscribtionArea' ref={SubscribtionRef}>
                <h1 className='DashboardHeader'>NEWS LETTER SUBSCRIBTIONS</h1>
                <SubscribtionList />
            </div>

            <div className='InformationArea' ref={InformationRef}>
                <h1 className='DashboardHeader'>UPDATE ADMIN INFORMATION</h1>
                <UpdateInformation />
            </div>

            <ToastContainer />

        </div>
    )
}

export default AdminDashboard;