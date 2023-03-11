import '../App.css';

function Artist(props)
{
    return (
        <div className='ArtistsInfoArea'>
            <div className='ArtistsPhotoArea'>
                <img alt="" src={require('../media/artist_' + props.photo + '.jpg')} className="ProfileImage" />
            </div>
            <div className='ArtistsBioArea'>
                <p className='BioText'>{props.bio}</p>
            </div>
        </div>
    )
}

export default Artist;