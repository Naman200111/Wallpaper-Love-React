import React from "react"
import {saveAs} from "file-saver"

export default function App() {
    const [data, setData] = React.useState([]);
    const [query, setQuery] = React.useState("wallpaper");
    const [search, setSearch] = React.useState("");
    const [amount, setAmount] = React.useState(12);
    const [page, setPage] = React.useState(1);
 
    React.useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: '563492ad6f9170000100000163e6f5cf32aa4e97a7c980c38dd25faf',
                'X-RapidAPI-Key': '8537977f5emshc7003a883625c36p10ccb2jsn600cd7921797',
		        'X-RapidAPI-Host': 'PexelsdimasV1.p.rapidapi.com'
            }
        };
        
        fetch(`https://pexelsdimasv1.p.rapidapi.com/v1/search?query=${query}&per_page=${amount}&page=${page}`, options)
            .then(response => response.json())
            .then(response => setData(response.photos))
    }, [query, amount, page])
    
    console.log(data)
    const elements = data.map(function(item) {
        return (
            <div class="component">
                <a href={item.src.original} key={item.id}>
                    <img
                        className="image"
                        src={item.src.large2x}
                        alt={item.alt}
                    >
                    </img>
                </a>
                <div class="download--div" onClick={() => handleDownloadClick(item)}>
                    <img
                        className="download"
                        src="./images/download.png"
                        alt="download-icon"
                    />
                </div>
            </div>
        )
    })
    
    function handleDownloadClick(item) {
        saveAs(item.src.original, "image.png")
    }

    function handleClick() {
        if(search === "")return;
        setQuery(search)
    }
    function handleChange(event) {
        setSearch(event.target.value)
    }

    function handleClickButton() {
        setAmount(oldAmount => {
            if(oldAmount === 80) {
                setPage(oldPage => oldPage+1);
                return 12;
            }
            else if(oldAmount+18 > 80) {
                return 80;
            }
            else {
                return oldAmount+18;
            }
        });
    }

    return (
        <div className="hero">
            <div className="hero__navbar">
                <img className="navbar__logo" src="./images/logo.jpeg" alt="logo" />
                <h1 className="hero__heading">Wallpaper Love</h1>
                <div className="search_box">
                    <input
                        className="search"
                        placeholder="Search"
                        onChange={handleChange}
                    />
                </div>
                <img
                    alt="search-icon"
                    src="./images/search.png"
                    className="search__logo"
                    onClick={handleClick}
                />
            </div>
            <div className="images">
                {elements}
            </div>
            <div className="footer">
                <button className="footer__button" onClick={handleClickButton}>
                    More
                </button>
            </div>
        </div>
    )
}