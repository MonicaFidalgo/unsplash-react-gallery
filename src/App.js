import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("happy");
  const [page, setPage] = useState(1);

  const client_id = "4mB0CC1xdwTfTQGjF1v1uO9vS2Z8ubzBPd4X0B86IEU";
  const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}`;

  const fetchImages = () => {
    axios
      .get(fetchUrl, {
        headers: {},
      })
      .then((response) => {
        setData([...data, ...response.data.results]);
      })
      .catch((error) => {
        console.log(error);
      });
    setPage(page + 1);
  };

  const searchImages = (e) => {
    if (e.keyCode === 13) {
      console.log("herre");
      setQuery(e.target.value);
      setData([]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="App">
      <h1>Unsplash Gallery Search</h1>
      <div className="input__wrapper">
        {" "}
        <input
          type="text"
          onKeyDown={(e) => searchImages(e)}
          placeholder="Search For Images 🔎"
        />
      </div>

      <div className="masonry">
        {data.map((data, key) => (
          <div className="item" key={key}>
            <img
              src={data.urls.small}
              className="image"
              alt={data.alt_description}
            />
            <h4>Photo by {data.user.name} 📸</h4>
            <p className="like">👍 {data.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
