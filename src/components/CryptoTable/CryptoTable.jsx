import React, { Component } from 'react';

import CoinMarketCapService from './../../services/CoinMarketCap';
import styles from './CryptoTable.scss';

class CryptoTable extends Component {
  state = {
    cryptoData: {}
  };

  getData = () => {
    new CoinMarketCapService().getTickerData().then(res => {
      let arr = Object.values(res);
      this.setState({ cryptoData: arr });
    }), err => console.log(err);
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    let { cryptoData } = this.state;

    return (
      <div className={styles.container}>
        <table className="crypto-table">
          <tbody>
            <tr valign="middle">
              <th>Name</th>
              <th>Short name</th>
              <th>$ Value</th>
              <th>last 24h</th>
              <th>Amount you own</th>
              <th>$ value of your coin</th>
            </tr>
            {cryptoData.length > 0 &&
              cryptoData.map(data =>
                <tr key={data.name}>
                  <td>
                    {data.name}
                  </td>
                  <td>
                    {data.symbol}
                  </td>
                  <td>
                    {data.quotes.USD.price}
                  </td>
                  <td className={data.quotes.USD.percent_change_24h > 0 ? 'green' : 'red'}>
                    {data.quotes.USD.percent_change_24h}
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CryptoTable;
