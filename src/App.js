import React, { useState, useEffect } from "react";
import Quote from "./components/Quote";
import { MdContentCopy } from "react-icons/md";
import { BsChatQuote } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

function App() {
  const [isPending, setisPending] = useState(true);
  const [search, setSearch] = useState("");

  const [quote, setQuote] = useState({
    anime: null,
    character: null,
    quote: null,
  });

  const [quote2, setQuote2] = useState(false);
  const [isEmpty, setisEmpty] = useState(false);

  const fetchQuote = async () => {
    return await fetch("https://animechan.vercel.app/api/random").then(
      (response) => response.json()
    );
  };

  const generate = async () => {
    const color = {
      r: getRgb(),
      g: getRgb(),
      b: getRgb(),
    };
    setisEmpty(false);
    setQuote(false);
    setisPending(true);
    setQuote2(false);
    setQuote(await fetchQuote());
    setisPending(false);
    setColor(rgbToHex(color.r, color.g, color.b));
  };

  const fetchQuoteByAnime = async (anime_search) => {
    console.log(anime_search);
    return await fetch(
      `https://animechan.vercel.app/api/quotes/character?name=${anime_search}`
    ).then((res) => res.json());
    // .then((res) => console.log(res))
    // .then((res) => res.json());
    // .then((response) => {
    //   response.status === 200 ? response.json() : console.log("asddddddd");
    // });
    // .then((quotes) => console.log(quotes))
    // .catch((error) => {
    // console.log(error);
    // setQuote2(false);
    // setisEmpty(true);
    // console.log("asddddddd");
    // });
  };

  const generateByAnime = async (e) => {
    e.preventDefault();
    console.log(search);
    if (search === "") return;

    const color = {
      r: getRgb(),
      g: getRgb(),
      b: getRgb(),
    };

    setisEmpty(false);
    setQuote(false);
    setQuote2(false);
    setisPending(true);
    setQuote2(await fetchQuoteByAnime(search));

    setisPending(false);
    setColor(rgbToHex(color.r, color.g, color.b));
  };

  useEffect(() => {
    async function fetchData() {
      setQuote(await fetchQuote());
      setQuote2(false);
      setisPending(false);
    }
    fetchData();
  }, []);

  const [color, setColor] = useState("#000");

  const getRgb = () => Math.floor(Math.random() * 256);

  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  return (
    <div className="App" style={{ backgroundColor: color }}>
      <div className="container">
        <h1 className="title">Random Quote From Anime</h1>

        <Quote
          quote={quote}
          quote2={quote2}
          isEmpty={isEmpty}
          isPending={isPending}
        />
        <div className="btn">
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                quote2
                  ? `"${quote2[0].quote}" - ${quote2[0].character} (${quote2[0].anime})`
                  : `"${quote.quote}" - ${quote.character} (${quote.anime})`
              )
            }
            className="btn-item"
          >
            <MdContentCopy
              size={25}
              style={{
                color: "#ffffff",
                marginRight: ".5rem",
              }}
            />
            Copy quote
          </button>

          <button className="btn-item" onClick={generate}>
            <BsChatQuote
              size={25}
              style={{
                color: "#ffffff",
                marginRight: ".5rem",
              }}
            />
            Show another quote
          </button>

          <form className="search-box">
            <input
              type="search"
              placeholder="Type anime character name"
              value={search ? search : ""}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn-item" onClick={generateByAnime}>
              <FaSearch
                size={25}
                style={{
                  color: "#ffffff",
                  marginRight: ".5rem",
                }}
              />
              Find Quote
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
