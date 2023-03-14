import '../App.css';
import { useState, useEffect } from 'react';

function Artist(props)
{
    const [src, setSrc] = useState("");

    useEffect(() =>
    {
        if (props.artist)
        {
            setSrc(`data:image/jpeg;base64,${props.artist.image.data}`);
        }
    }, [])

    useEffect(() =>
    {
        console.log(src);
    }, [src])

    return (
        <div className='ArtistsInfoArea'>
            <div className='ArtistsPhotoArea' style={{backgroundImage: src && src}}>
            </div>
            <div className='ArtistsBioArea'>
                <p className='BioText'>{props.artist.bio}</p>
            </div>
        </div>
    )
}

export default Artist;