import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import colors from "../styles/_settings.scss";

const CoinChart = ({ coinId, coinName }) => {
  // Var duration regarding btn
  const [duration, setDuration] = useState(30);
  // Var coin from axios
  const [coinData, setCoinData] = useState();
  // Table data format
  const headerData = [
    [1, "1 jour"],
    [3, "3 jours"],
    [7, "7 jours"],
    [30, "1 mois"],
    [91, "3 mois"],
    [181, "6 mois"],
    [365, "1 an"],
    [3000, "Max"],
  ];

  useEffect(() => {
    let dataArray = [];
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${duration}${
          duration > 32 ? "&interval=daily" : ""
        }`
      )
      .then((res) => {
        for (let i = 0; i < res.data.prices.length; i++) {
          let price = res.data.prices[i][1];
          // Push date and price "50" if price < 50 not good format
          dataArray.push({
            date: new Date(res.data.prices[i][0]).toLocaleDateString(),
            price: price < "50" ? price : parseInt(price),
          });
        }
        setCoinData(dataArray);
      });
  }, [coinId, duration]);

  return (
    <div className="coin-chart">
      {/* Take crypto name from parent */}
      <p>{coinName}</p>
      <div className="btn-container">
        {/* Each button with different time + map each element */}
        {headerData.map((el) => {
          return (
            <div
              key={el[0]}
              htmlFor={"btn" + el[0]}
              // Take our data name "1 jour" from our table
              onClick={() => setDuration(el[0])}
              // el === duration ? active-btn : ""
              className={el[0] === duration ? "active-btn" : ""}
            >
              {el[1]}
            </div>
          );
        })}
      </div>
      <AreaChart
        //   Format AreaChart
        width={680}
        height={250}
        data={coinData}
        margin={{ top: 10, right: 0, left: 100, bottom: 0 }}
      >
        {/* Linear gradient  */}
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="7%" stopColor={colors.color1} stopOpacity={0.8} />
            <stop offset="93%" stopColor={colors.white1} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Config axe */}
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} />

        {/* Take config graphics */}
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />

        {/* Area visual config chart*/}
        <Area
          type="monotone"
          dataKey="price"
          stroke={colors.color1}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default CoinChart;
