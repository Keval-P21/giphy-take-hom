import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import GiphCard from './components/GiphCard';
const API_KEY = 'nrlgPKIVy4xuqNgomSjh0MGrt85sdctG';

function App() {
  const [giphyData, setGiphyData] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [searchGiphs, setSearchGiphs] = useState([]);
  const [isTrending, setIsTrending] = useState(true);

  useEffect(() => {
    if (isTrending) {
      const trendingData = async () => {
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&rating=g&offset=${page}`
        );
        setGiphyData((prev) => {
          return [...prev, ...response.data.data];
        });
      };
      trendingData();
    }
  }, [page, isTrending]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isTrending) {
      const searchData = async () => {
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=25&rating=g&q=${search}&offset=${page}`
        );
        setSearchGiphs((prev) => [...prev, ...response.data.data]);
      };
      searchData();
    }
  }, [page, isTrending]);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 25);
    }
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (search.length) {
      setIsTrending(false);
    }
  };

  const handleTrending = () => {
    setIsTrending(true);
    setSearch('');
  };

  return giphyData.length ? (
    <div className='App'>
      <h2>Giphy Api Trending & Search</h2>
      <div>
        <form onSubmit={handleOnSubmit}>
          <input
            type='text'
            onChange={handleOnChange}
            placeholder='Type here...'
          />
          <button type='submit'>Search</button>
        </form>
        <button onClick={handleTrending}>Trending!</button>
      </div>
      {isTrending ? (
        <div className='giph-list'>
          {giphyData.map((giph, i) => (
            <GiphCard giph={giph} key={i} />
          ))}
        </div>
      ) : (
        <div className='giph-list'>
          {searchGiphs.map((giph, i) => (
            <GiphCard giph={giph} key={i} />
          ))}
        </div>
      )}
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default App;
