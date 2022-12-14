import React, { useState } from "react";
import CoinChart from "./CoinChart";
import PercentChange from "./PercentChange";
import StarIcon from "./StarIcon";

const TableLine = ({ coin, index }) => {
  const [showChart, setShowChart] = useState(false);

  // Price crypto format : if lenght number < 4 function
  const priceFormater = (num) => {
    if (Math.round(num).toString().length < 3) {
      return new Intl.NumberFormat("us-Us", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }).format(num);
    } else {
      return num;
    }
  };

  // MarketCap format price to Million
  const mktCapFormater = (num) => {
    let newNum = String(num).split("").slice(0, -6);
    return Number(newNum.join(""));
  };

  return (
    <div className="table-line">
      <div className="infos-container">
        <StarIcon coinId={coin.id} />
        <p>{index + 1}</p>
        <div className="img">
          <img src={coin.image} height="20" alt="logo" />
        </div>
        <div className="infos">
          <div
            className="chart-img"
            onMouseEnter={() => setShowChart(true)}
            onMouseLeave={() => setShowChart(false)}
          >
            <img src="./assets/chart-icon.svg" alt="chart-icon" />
            {/* If true show chart + props "coin.id + coin.name" in order to save data in CoinChart*/}
            <div className="chart-container" id={coin.name}>
              {showChart && <CoinChart coinId={coin.id} coinName={coin.name} />}
            </div>
          </div>
          <h4>{coin.name}</h4>
          <span>- {coin.symbol.toUpperCase()}</span>
          {/* Condition : name with space in crypto title */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={
              "https://www.coingecko.com/fr/pi%C3%A8ces/" +
              coin.name.toLowerCase().replaceAll(" ", "-")
              // .toLowerCase()
              // .replace(" ", "-")
              // .replace(" ", "-")
              // .replace(" ", "-")
            }
          >
            <img
              // className="info-img"
              src="./assets/info-icon.svg"
              alt="info-icon"
            />
          </a>
        </div>
      </div>
      <p>{priceFormater(coin.current_price).toLocaleString()} $</p>
      <p className="mktcap">
        {mktCapFormater(coin.market_cap).toLocaleString()} M$
      </p>
      {/* <p className="volume">{coin.total_volume.toLocaleString()}$</p> */}
      {/* <PercentChange percent={coin.price_change_percentage_1h_in_currency} /> */}
      {/* <PercentChange percent={coin.price_change_percentage_7d_in_currency} /> */}
      {/* <PercentChange percent={coin.price_change_percentage_200d_in_currency} /> */}
      <PercentChange percent={coin.market_cap_change_percentage_24h} />
      <PercentChange percent={coin.price_change_percentage_30d_in_currency} />
      <PercentChange percent={coin.price_change_percentage_1y_in_currency} />
    </div>
  );
};

export default TableLine;
