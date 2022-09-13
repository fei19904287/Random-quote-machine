import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { SocialIcon } from "react-social-icons";

function App() {
  const friendsUrl = "https://friends-quotes-api.herokuapp.com/quotes/random";

  const [post, setPost] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    axios
      .get(friendsUrl)
      .then((response) => {
        setPost(response.data.quote);
        setAuthor(response.data.character);
      })
      .catch((error) => {
        setError(error);
      });
  };

  function handleClick() {
    getQuote();
  }
  if (error) return `Error: ${error.message}`;

  if (!post) return null;
  return (
    <div className="App">
      <div id="quote-box">
        <div id="text" style={{ margin: 10 }}>
          <h3>{post}</h3>
        </div>
        <div
          id="author"
          style={{ marginLeft: 300, marginRight: 10, color: "yellow" }}
        >
          <h4>--- {author}</h4>
        </div>

        <div id="newQuoteandIcon">
          <button
            id="new-quote"
            style={{ marginLeft: 300, marginRight: 10 }}
            onClick={handleClick}
          >
            New-quote
          </button>
          <a
            id="tweet-quote"
            target="_top"
            href={`https://twitter.com/intent/tweet?text="+${post}+"+ --- +${author}
        `}
          >
            <SocialIcon
              id="tticon"
              network="twitter"
              fgColor="lightblue"
              style={{ width: 20, height: 20 }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
