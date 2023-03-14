import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function DataTempalte(props)
{
    const [searchData, setSearchData] = useState(props.searchData ? props.searchData : {});
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [path, setPath] = useState(null);
    const fileInputRef = useRef(null);
    const handleClick = () => { fileInputRef.current.click() }

    const handleNameChange = (event) => { setSearchData({...searchData, name: event.target.value}) }
    const handleBioChange = (event) => { setSearchData({...searchData, bio: event.target.value}) }
    const handleTitleChange = (event) => { setSearchData({...searchData, title: event.target.value}) }
    const handleArtistChange = (event) => { setSearchData({...searchData, artist: event.target.value}) }
    const handleAboutChange = (event) => { setSearchData({...searchData, about: event.target.value}) }

    const handleArtisDelete = () =>
    {

    }
    const handleArtistSave = () =>
    {

    }
    const handleArtistAdd = () =>
    {

    }
    const handleExhibitionDelete = () =>
    {

    }
    const handleExhibitionSave = () =>
    {

    }
    const handleExhibitionAdd = () =>
    {

    }
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

    useEffect(() => 
    {  
        console.log(searchData.name);
    }, [props]);

    return (
        <div className='SearchResultArea'>
            <div className='SearchResultLeftSide'>
                <img src={path ? path : require("../media/no_image.jpg")} className="SearchImage" alt="" />
                <div className='ChangeImageContainer' onClick={handleClick} >
                    <label htmlFor='BrowseImages'>Change Image</label>
                    <input type="file" style={{display: "none"}} onChange={handlePathChange} id="BrowseImages" ref={fileInputRef} />
                </div>
                {props.type === "exhibition" && (
                    <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <input type={"date"} value={date} onChange={(e) => setDate(e.target.value)} className="TimeInput" style={{margin: "0 0 5px 0", width: "210px", textAlign: "center"}} />
                        <input type={"time"} value={time} onChange={(e) => setTime(e.target.value)} className="TimeInput" style={{margin: "5px 0 5px 0", width: "210px", textAlign: "center"}} />
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
                        <input type="text" className='Input' value={searchData.name} onChange={handleNameChange} placeholder="Name" />
                        <textarea className='Textarea' value={searchData.bio} onChange={handleBioChange} placeholder="Bio" />
                    </div>
                ) : (
                    <div className='SearchResultRightSide'>
                        <input type="text" className='Input' value={searchData.title} onChange={handleTitleChange} placeholder="Title" />
                        <input type="text" className='Input' value={searchData.artist} onChange={handleArtistChange} placeholder="Artist" style={{margin: "10px 10px 0 10px"}} />
                        <textarea className='Textarea' value={searchData.about} onChange={handleAboutChange} placeholder="About" />
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
                        <div key={index} className='FilterArea' onClick={() => props.search(email.email)} >
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

function AdminDashboard(props)
{
    const ArtistRef = useRef(null);
    const ExhibitionRef = useRef(null);
    const InformationRef = useRef(null);
    const SubscribtionRef = useRef(null);

    const navigate = useNavigate();
    const [adminIDOne, setAdminIDOne] = useState("");
    const [adminIDTwo, setAdminIDTwo] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [emails, setEmails] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [searchData, setSearchData] = useState({});
    const [protocol, setProtocol] = useState("");
    const [type, setType] = useState("");
    
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
        setSearchData({ ...searchData, name: value, bio: value + "s' bio will be here!" })
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
                <p className='NavbarLink' onClick={() => scrollToView(ArtistRef)}>ARTISTS</p>
                <p className='NavbarLink' onClick={() => scrollToView(ExhibitionRef)}>EXHIBITIONS</p>
                <p className='NavbarLink' onClick={() => scrollToView(SubscribtionRef)}>SUBSCRIBTIONS</p>
                <p className='NavbarLink' onClick={() => scrollToView(InformationRef)}>INFORMATION</p>
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
                    <DataTempalte type={type} protocol={protocol} searchData={searchData} />
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

            </div>

            <div className='InformationArea' ref={InformationRef}>

            </div>

            <ToastContainer />

        </div>
    )
}

export default AdminDashboard;