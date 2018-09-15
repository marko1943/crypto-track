import React, { Component } from 'react';

import CoinMarketCapService from './../../services/CoinMarketCap';
import styles from './CryptoTable.scss';
import Spinner from '../Spinner/Spinner';

class CryptoTable extends Component {
  state = {
    loading: true,
    cryptoData: {},
    myAmount: undefined
  };

  componentDidMount() {
    this.getData();
  }

  sortByKey(array, key) {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? 1 : x > y ? -1 : 0;
    });
  }

  getData = () => {
    new CoinMarketCapService().getTickerData().then(res => {
      let arr = Object.values(res);
      for (let i = 0; i < arr.length; i++) {
        arr[i].my_value = 0;
        arr[i].allow_submit = false;
        // Sort works on arrays and quotes object isn't an array
        // so we push the price to array
        // Thoughts - is lodash _sortBy safer solution?>
        arr[i].price = arr[i].quotes.USD.price;
      }

      // And then sort it
      arr = this.sortByKey(arr, 'price');

      this.setState({ cryptoData: arr });
      // just cause its fun
      setTimeout(() => {
        this.setState({ loading: false });
      }, 200);
    }), err => console.log(err);
  };

  handleChange = (index, event) => {
    this.setState({ myAmount: event.target.value });
    let arr = this.state.cryptoData;
    arr[index].allow_submit = true;
    this.setState({ cryptoData: arr });
  };

  handleClick(index, event) {
    event.preventDefault();
    let arr = this.state.cryptoData;
    arr[index].my_value += Number(this.state.myAmount);
    arr[index].allow_submit = false;
    this.setState({ cryptoData: arr });
    event.target.reset();
  }

  render() {
    let { cryptoData, loading } = this.state;

    if (loading) return <Spinner />;

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
                        onChange={this.handleChange.bind(this, i)}
                      />
                      <button type="submit" disabled={!data.allow_submit}>
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
