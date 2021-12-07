import React from "react";
import { FaFilm, FaUser } from "react-icons/fa";

function Quote({ quote, quote2, isEmpty, isPending }) {
  console.log(quote2.length);
  // const [Empty, setEmpty] = useState(false);
  if (quote2.length < 2) {
    // setEmpty(true);
  } else {
    console.log("no input");
  }
  return (
    <div className="quote">
      {/* <div className="anime" title={quote.anime}> */}
      <div
        className="anime"
        title={quote2.length > 1 ? quote2[0].anime : quote.anime}
      >
        <FaFilm
          size={25}
          style={{
            color: "#ffffff",
            marginRight: ".5rem",
          }}
        />
        {/* {quote.anime} */}
        {quote2.length > 1 ? quote2[0].anime : quote.anime}
      </div>

      {/* <blockquote>{quote.quote}</blockquote> */}
      {isPending && (
        <div className="quote_print loading">
          <h1 className="title"> Loading... </h1>
        </div>
      )}
      {isEmpty && (
        <div className="quote_print loading">
          <h1 className="title"> NO Quotes Exist... </h1>
        </div>
      )}
      {quote2.length > 1 ? (
        <blockquote className="quote_print">{quote2[0].quote}</blockquote>
      ) : (
        <blockquote className="quote_print">{quote.quote}</blockquote>
      )}

      {/* <div className="character" title={quote.character}> */}
      <div
        className="character"
        title={quote2.length > 1 ? quote2[0].character : quote.character}
      >
        <FaUser
          size={25}
          style={{
            color: "#ffffff",
            marginRight: ".5rem",
          }}
        />
        {/* {quote.character} */}
        {quote2.length > 1 ? quote2[0].character : quote.character}
      </div>
    </div>
  );
}

export default Quote;
