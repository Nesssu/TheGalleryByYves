import '../App.css';

function Exhibition(props)
{
    return (
        <div className='Exhibition'>
            <div className='ExhibitionPhotoArea'>
                <img alt="" src={require("../media/art_" + props.photo + ".jpg")} className="ExhibitionPhoto" />
            </div>
            <div className='ExhibitionInfoArea'>
                <h1 className='ExhibitionHeader'>{props.name}</h1>
                <h2 className='ExhibitionSmallHeader'>{props.date}</h2>
                <h2 className='ExhibitionSmallHeader'>{props.artist}</h2>
                <p className='ExhibitionText'>{props.about}</p>
            </div>
        </div>
    )
}

export default Exhibition;