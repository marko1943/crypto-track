import React, { Component } from 'react';

import CoinMarketCapService from './../../services/CoinMarketCap';
import styles from './CryptoTable.scss';

class CryptoTable extends Component {
  state = {
    cryptoData: {},
    myAmount: undefined
  };

  getData = () => {
    new CoinMarketCapService().getTickerData().then(res => {
      let arr = Object.values(res);
      for (let i = 0; i < arr.length; i++) {
        arr[i].my_value = 0;
      }

      this.setState({ cryptoData: arr });
    }), err => console.log(err);
  };

  handleChange = e => {
    this.setState({ myAmount: e.target.value });
  };

  handleClick(i, event) {
    event.preventDefault();
    let arr = this.state.cryptoData;

    arr[i].my_value += Number(this.state.myAmount);
    this.setState({ cryptoData: arr });
    event.target.reset();
  }

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
              cryptoData.map((data, i) =>
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
                  <td className="input-row">
                    <form onSubmit={this.handleClick.bind(this, i)}>
                      <input
                        type="number"
                        value={this.state.myAmout}
                        onChange={this.handleChange}
                      />
                      <button type="submit" disabled={!this.state.myAmount}>
                        Submit
                      </button>
                    </form>
                  </td>
                  <td>
                    {data.my_value}
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
