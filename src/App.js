import React from "react"
import {saveAs} from "file-saver"

export default function App() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
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
        
        setLoading(true);
        fetch(`https://pexelsdimasv1.p.rapidapi.com/v1/search?query=${query}&per_page=${amount}&page=${page}`, options)
            .then(response => response.json())
            .then(response => {
                setLoading(false);
                setData(response.photos);
                setLoading(false);
            });
    }, [query, amount, page])

    React.useEffect(() => {
        window.scrollTo(0,0);
    },[query, page])
    
    const elements = data && data.map(function(item) {
        return (
            <div className="component" key={item.id}>
                <a href={item.src.original}>
                    <img
                        className="image"
                        src={item.src.large2x}
                        alt={item.alt}
                    >
                    </img>
                </a>
                <div className="download--div" onClick={() => handleDownloadClick(item)}>
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
        setAmount(12);
        setPage(1);
    }
    function handleChange(event) {
        setSearch(event.target.value)
    }
    function handleKeyPress(event) {
        if(event.key === 'Enter' && search !== '') {
            setQuery(search)
            console.log(event)
            event.target.blur();
            setAmount(12);
            setPage(1);
        }
    } 

    function handleClickButton() {
        setAmount(oldAmount => {
            if(oldAmount === 80) {
                setPage(oldPage => oldPage+1);
                return 12;
            }
            else if(oldAmount+12 > 80) {
                return 80;
            }
            else {
                return oldAmount+12;
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
                        onKeyDown={handleKeyPress}
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
                {loading ? 
                    <div className="loading">Loading...</div> :
                    data ? elements :
                    <div className="api-error">Failed to Fetch...</div>
                }
            </div>
            <div className="footer">
                <button className="footer__button" onClick={handleClickButton}>
                    More
                </button>
            </div>
        </div>
    )
}