import '../App.css';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Home() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const ContactRef = useRef(null);
    const ExhibitionsRef = useRef(null);
    const ArtistsRef = useRef(null);
    const HomeRef = useRef(null);

    const scrollToContact = () => { ContactRef.current.scrollIntoView() }
    const scrollToExhibitions = () => { ExhibitionsRef.current.scrollIntoView() }
    const scrollToArtists = () => { ArtistsRef.current.scrollIntoView() }
    const scrollToHome = () => { HomeRef.current.scrollIntoView() }

    const handleEmailChange = (event) => { setEmail(event.target.value); }
    const handleSubscribtion = () => {
        // Send the email to the server. The server will check if the email has a correct format.
        // Toast message will be shown based on the success of the subscribtion.
    }

    useEffect(() =>
    {
        HomeRef.current.scrollIntoView();
    }, [])

    return (
        <div className="App">
            <div className="TopArea">

                <div className="ContactBackground" ref={ContactRef}>
                    <div className='ContactArea'>
                        <div className='BackLinkArea MoveLeft' onClick={scrollToHome}>
                            <p className='LinkText'>Back</p>
                            <IoIosArrowForward className='LinkArrow'/>
                        </div>
                        
                        <h1 className='Header'>Contact</h1>

                        <div className='ContactInfoArea'>
                            <h2 className='LocationHeaderOne'>Iso Roobertinkatu 13, 00120, Helsinki, Finland</h2>
                            <h2 className='LocationHeaderOne'>info@yvesgallery.com</h2>
                            <h2 className='LocationHeaderOne'>+358 501 229 404</h2>
                        </div>

                        <div className='NewsLetterArea'>
                            <h3 className='NewsLetterLabel'>News Letter</h3>
                            <div className='NewsLetterInputArea'>
                                <input type={"email"} placeholder="Email" className='NewsLetterInput' value={email} onChange={handleEmailChange} />
                                <input type={"button"} value="Subscribe" className='NewsLetterButton' onClick={handleSubscribtion} />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="HomeBackground" ref={HomeRef}>
                
                    <h1 className='Header'>The Gallery By Yves</h1>
                    <h3 className='LocationHeaderOne'>Helsinki</h3>
                    <h3 className='LocationHeaderTwo'>Finland</h3>
                    <h2 className='NextOpeningHeader'>Next Opening Friday February 17</h2>
                    
                    <div className="BuyTicketButton" onClick={() => navigate("/tickets")} >
                        Buy Tickets
                    </div>

                    <div className="ContactLinkArea" onClick={scrollToContact}>
                        <IoIosArrowBack className='LinkArrow' />
                        <p className="LinkText">Contact</p>
                    </div>

                    <div className="ExhibitionsLinkArea" onClick={scrollToExhibitions}>
                        <p className="LinkText">Exhibitions</p>
                        <IoIosArrowDown className='LinkArrow' />
                    </div>

                    <div className="ArtistsLinkArea" onClick={scrollToArtists}>
                        <p className="LinkText">Artists</p>
                        <IoIosArrowForward className='LinkArrow' />
                    </div>

                </div>

                <div className="ArtistsBackground" ref={ArtistsRef} >

                    <div className='ArtistsArea'>
                        <div className='BackLinkArea MoveRight' onClick={scrollToHome}>
                            <IoIosArrowBack className='LinkArrow'/>
                            <p className='LinkText'>Back</p>
                        </div>

                        <h1 className='Header'>Artists</h1>

                        <div className='ArtistsInfoArea'>
                            <div className='ArtistsPhotoArea'>
                                <img src={require('../media/artist_one.jpg')} className="ProfileImage" />
                            </div>
                            <div className='ArtistsBioArea'>
                                Artists' bio will be here
                            </div>
                        </div>

                        <div className='ArtistsInfoArea'>
                            <div className='ArtistsPhotoArea'>
                                <img src={require('../media/artist_two.jpg')} className="ProfileImage" />
                            </div>
                            <div className='ArtistsBioArea'>
                                Artists' bio will be here
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <div className="BottomArea">

                <div className="ExhibitionsBackground" ref={ExhibitionsRef} >
                    <h1>Exhibitions</h1>
                </div>

            </div>
        </div>
    );
}

export default Home;
