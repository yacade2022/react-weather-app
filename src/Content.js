import React from "react";
import moment from "moment";
import styled from "styled-components";
import { WiHumidity } from "react-icons/wi";
import { GiWindsock } from "react-icons/gi";

const Content = ({
  cloud,
  name,
  temp,
  humidity,
  wind_speed,
  icon,
  country,
}) => {
  const day = moment().format("MMMM Do YYYY, h:mm:ss a");

  return (
    <Wrapper>
      <div>
        <h4 className="day">{day}</h4>
        <div className="content-container">
          <div className="content-header">
            <div>
              <h2>
                {name},<span className="country">{country}</span>
              </h2>
              <h4>{cloud}</h4>
              <h1>{Math.round(temp)} °C</h1>
            </div>

            <img src={`icons/${icon}.png`} />
          </div>

          <div className="parameters">
            <div className="parameter">
              <span>
                <WiHumidity />
              </span>
              <span>{humidity} %</span>
            </div>

            <div className="parameter">
              <span>
                <GiWindsock />
              </span>
              <span>{Math.round(wind_speed)} Km/h</span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .content-container {
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 10px white;
    border-radius: 8px;
    color: hsl(200, 100%, 15%);
  }
  .day {
    padding: 20px 0;
  }
  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .country {
    font-size: 18px;
  }
  .parameters {
    text-align: center;
    margin-bottom: 5px;
  }
  .parameter {
    display: inline-block;
    margin-left: 15px;
    color: hsl(200, 100%, 15%);
  }

  @media (max-width: 300px) {
    img {
      width: 70px;
    }
  }
`;
export default Content;
