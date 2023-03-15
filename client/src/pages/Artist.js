import '../App.css';
import { useState, useEffect } from 'react';

function Artist(props)
{
    const [src, setSrc] = useState("");

    useEffect(() =>
    {
        if (props.artist)
        {
            setSrc(`url(data:image/jpeg;base64,${props.artist.image})`);
        }
    }, [])

    return (
        <div className='ArtistsInfoArea'>
            <div className='ArtistsPhotoArea' style={{backgroundImage: src}}>
            </div>
            <div className='ArtistsBioArea'>
                <p className='BioName'>{props.artist.name}</p>
                <p className='BioText'>{props.artist.bio}</p>
            </div>
        </div>
    )
}

export default Artist;