import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

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
        <div id="text">{post}</div>
        <div id="author">{author}</div>
        <button id="new-quote" onClick={handleClick}>
          new-quote
        </button>
        <a id="tweet-quote" href="www.google.com">
          tweet
        </a>
      </div>
    </div>
  );
}

export default App;
