import '../App.css';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import { useRef, useEffect, useState } from 'react';
import Artist from './Artist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const ContactRef = useRef(null);
    const ExhibitionsRef = useRef(null);
    const ArtistsRef = useRef(null);
    const HomeRef = useRef(null);
    const CurrentRef = useRef(null);

    const [email, setEmail] = useState("");

    const scrollToRef = (ref) => { if (ref.current) { ref.current.scrollIntoView(); CurrentRef.current = ref.current; } }
    const handleEmailChange = (event) => { setEmail(event.target.value); }
    const handleSubscribtion = () => {
        // Send the email to the server. The server will check if the email has a correct format.
        // Toast message will be shown based on the success of the subscribtion.
    }
    const showToast = (message) =>
    {
        toast.info(message, {
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

    useEffect(() =>
    {
        const storedRef = localStorage.getItem("TheGalleryByYves_CurrentRef");

        if (storedRef) CurrentRef.current = JSON.parse(storedRef);

        if (CurrentRef) scrollToRef(CurrentRef);
        else scrollToRef(HomeRef);

        const handleResize = () =>
        {
            if (CurrentRef) CurrentRef.current.scrollIntoView();
            else HomeRef.current.scrollIntoView();
        }

        window.addEventListener("resize", handleResize);

        return () =>
        {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() =>
    {
        if (CurrentRef) localStorage.setItem("TheGalleryByYves_CurrentRef", JSON.stringify(CurrentRef.current));
    }, [CurrentRef]);

    return (
        <div className="App">
            <div className="TopArea">

                <div className="ContactBackground" ref={ContactRef}>
                    <div className='ContactArea'>
                        <div className='BackLinkArea MoveLeft' onClick={() => scrollToRef(HomeRef)}>
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
                    
                    <div className="BuyTicketButton" onClick={() => showToast("This button would take the user to the ticket resalers website. :)")} >
                        Buy Tickets
                    </div>

                    <div className="ContactLinkArea" onClick={() => scrollToRef(ContactRef)}>
                        <IoIosArrowBack className='LinkArrow' />
                        <p className="LinkText">Contact</p>
                    </div>

                    <div className="ExhibitionsLinkArea" onClick={() => scrollToRef(ExhibitionsRef)}>
                        <p className="LinkText">Exhibitions</p>
                        <IoIosArrowDown className='LinkArrow' />
                    </div>

                    <div className="ArtistsLinkArea" onClick={() => scrollToRef(ArtistsRef)}>
                        <p className="LinkText">Artists</p>
                        <IoIosArrowForward className='LinkArrow' />
                    </div>

                </div>

                <div className="ArtistsBackground" ref={ArtistsRef} >

                    <div className='ArtistsArea'>
                        <div className='BackLinkArea MoveRight' onClick={() => scrollToRef(HomeRef)}>
                            <IoIosArrowBack className='LinkArrow'/>
                            <p className='LinkText'>Back</p>
                        </div>

                        <h1 className='Header'>Artists</h1>

                        <Artist photo={"one"} bio={"Alexandre is a 29 year old French painter who has been passionate about art since he was a child. He studied Fine Arts at the University of Paris and specializes in oil painting. His work has been featured in numerous exhibitions throughout France, as well as galleries across Europe. He draws inspiration from traditional French landscapes and his own life experiences, creating captivating paintings that explore themes of love, loss, and beauty. When not painting, Alexandre likes to spend time exploring the countryside with his dog or enjoying good food with friends."} />
                        <Artist photo={"two"} bio={"Sara is a 35 year old painter from New York. She has been painting since she was a teenager, and her work is inspired by nature and the human experience. Her paintings are often vibrant and expressive, reflecting a unique perspective on life. Sara has exhibited her artwork in various galleries across the U.S., as well as internationally. In addition to painting, she also teaches art classes at local universities and colleges throughout the area."} />

                    </div>

                </div>

            </div>
            <div className="BottomArea">

                <div className="ExhibitionsBackground" ref={ExhibitionsRef} >
                    <h1>Exhibitions</h1>
                </div>

            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
