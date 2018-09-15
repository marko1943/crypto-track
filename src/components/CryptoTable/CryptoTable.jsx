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
    this.getCryptoData();
  }

  sortByKey(array, key) {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? 1 : x > y ? -1 : 0;
    });
  }

  getCryptoData = () => {
    let localData = this.getLocalStorage();
    let arr;

    // We still wanna make API call everytime we run the app
    // But we shoulnd't be updating local storage with it
    // All other values do get updates
    // But my_value, check if there are items in local storage first
    // Use them if there are
    // And set local storage values to default/0 if there are no
    new CoinMarketCapService().getTickerData().then(res => {
      arr = Object.values(res);
      if (localData && localData.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i];
          element.my_value = localData[i].my_value;
        }
        arr = this.sortByKey(arr, 'price');
        this.setState({ cryptoData: arr });
      } else {
        arr.map(element => {
          element.my_value = 0;
          element.allow_submit = false;
          // Sort works on arrays and quotes object isn't an array
          // so we push the price to array
          element.price = element.quotes.USD.price;
        });
        arr = this.sortByKey(arr, 'price');
        this.setState({ cryptoData: arr });
      }
    }), err => console.log(err);
    // timeout cause its fun
    setTimeout(() => {
      this.setState({ loading: false });
    }, 200);
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
    this.setLocalStorage(arr);
    event.target.reset();
    this.getLocalStorage();
  }

  setLocalStorage(arr) {
    localStorage.setItem('valueObject', JSON.stringify(arr));
  }

  getLocalStorage() {
    let object = JSON.parse(localStorage.getItem('valueObject'));
    return object;
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
                  <td className={data.quotes.USD.percent_change_24h >= 0 ? 'green' : 'red'}>
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
