import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [oneDayData, setOneDayData] = useState(null);
  const { currency } = useContext(CoinContext);

  useEffect(() => {
    const fetchCoinData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-33dphXfY97HLdwrANQ618bgb",
        },
      };

      try {
        const coinResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`,
          options
        );
        const coinData = await coinResponse.json();
        setCoinData(coinData);

        const oneDayResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=1`,
          options
        );
        const oneDayData = await oneDayResponse.json();
        setOneDayData(oneDayData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCoinData();
  }, [coinId, currency]);

  if (coinData && oneDayData) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt={`${coinData.name}`} />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart oneDayData={oneDayData} />
        </div>

        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>
              {currency.symbol} {coinData.market_cap_rank}
            </li>
          </ul>

          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>

          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>

          <ul>
            <li>24 Hour High</li>
            <li>
              {currency.symbol}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>

          <ul>
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}
              {coinData.market_data.low_24h[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>


        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin">
          {/* You can add a spinner animation or text here */}
          {/* Loading... */}
        </div>
      </div>
    );
  }
};

export default Coin;
