import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import Content from "./Content";

const base_url = "https://api.openweathermap.org/data/2.5/weather";
const api_key = process.env.REACT_APP_API_KEY;

const SearchForm = () => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: "",
    longitude: "",
  });
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("Algiers");
  const url_city_name = `${base_url}?q=${query}&appid=${api_key}&units=metric`;
  const url = `${base_url}?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&appid=${api_key}&units=metric`;

  const location = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coordinate = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setCurrentPosition({
          latitude: coordinate.lat,
          longitude: coordinate.lon,
        });
      });
    }
  };

  const fetchData = async (alpha) => {
    try {
      const response = await fetch(alpha);
      const result = await response.json();
      const { main: cloud, icon } = result.weather[0];
      const { country } = result.sys;
      const { name } = result;
      setQuery(name);
      const { temp, humidity } = result.main;
      const { speed: wind_speed } = result.wind;
      const newData = {
        cloud,
        name,
        temp,
        humidity,
        wind_speed,
        country,
        icon,
      };
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const selectCountry = (e) => {
    if (e.target.classList.contains("state")) {
      const p = e.target.dataset.index;
      fetchData(`${base_url}?q=${p}&appid=${api_key}&units=metric`);
    }
  };

  useEffect(() => {
    location();
    fetchData(url_city_name);
  }, []);

  return (
    <Wrapper>
      <div className="container">
        <div className="header">
          <div>
            <ul onClick={selectCountry}>
              <li className="state" data-index="Algiers">
                Algiers
              </li>
              <li className="state" data-index="Toronto">
                Toronto
              </li>
              <li className="state" data-index="London">
                London
              </li>
              <li className="state" data-index="Paris">
                Paris
              </li>
            </ul>
          </div>
          <div className="form-container">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="search for city"
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
            <div>
              <span onClick={() => fetchData(url_city_name)}>
                <FaSearch />
              </span>
              <span onClick={() => fetchData(url)}>
                <GiPositionMarker />
              </span>
            </div>
          </div>
          <Content {...data} />
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .container {
    display: flex;
    justify-content: center;
  }

  .header {
    margin-top: 30px;
    width: 90vw;
  }
  ul {
    list-style: none;
    display: flex;
  }
  ul li {
    font-weight: 400;
    font-size: 22px;
    margin-right: 20px;
    cursor: pointer;
    user-select: none;
  }
  .form-container {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }
  .input {
    width: 70vw;
    border: none;
    outline: none;
    border-radius: 4px;
    margin-right: 10px;
  }
  .form-container span {
    font-size: 20px;
    margin-right: 5px;
    cursor: pointer;
  }
  @media (max-width: 300px) {
    ul li {
      margin-right: 5px;
    }
    .input {
      margin-right: 0;
    }
  }
  @media (max-width: 767px) {
    .form-container {
      justify-content: space-between;
    }
    ul li {
      font-size: 20px;
    }
    .input {
      font-size: 20px;
    }
  }
  @media (min-width: 768px) {
    .input {
      font-size: 30px;
    }
  }
`;
export default SearchForm;
