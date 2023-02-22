import './SpotImages.css';

export default function SpotImages({images}) {
    if(!images){
        return null;
    }
    let array = [];
    const thumbnail = <img src={images[0].url} alt="preview" id='for-display'></img>
    for(let i = 1; i < images.length; i++){
        array.push(<img src={images[i].url} alt="pictures" className='not-for-display' key={i}></img>)
    }

    return (
        <section id='list'>
            <div className='preview'>{thumbnail}</div>
            <div className='not-previews'>{array}</div>
        </section>
    )
}
