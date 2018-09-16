/*
 * @Author: Marko Stojiljković 
 * @Date: 2018-09-16 18:17:06 
 * @Last Modified by:   Marko Stojiljković 
 * @Last Modified time: 2018-09-16 18:17:06 
 */


import React, { Component } from 'react';

import { Link } from 'react-router-dom';

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

  getCryptoData = () => {
    let localData = this.getLocalStorage();
    let arr;

    // We still wanna make API call everytime we run the app
    // But we shouldn't be updating local storage with it
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
      } else {
        arr.map(element => {
          element.my_value = 0;
          element.allow_submit = false;
        });
      }
      this.setLocalStorage(arr);
      this.setState({ cryptoData: arr });
    }), err => console.log(err);
    // timeout cause its fun
    setTimeout(() => {
      this.setState({ loading: false });
    }, 200);
  };

  handleChange = (index, event) => {
    this.setState({ myAmount: event.target.value });
    let arr = this.state.cryptoData;
    if (event.target.value.length > 0) {
      arr[index].allow_submit = true;
      // Make submiting false if user clears the input field after he entered value
    } else {
      arr[index].allow_submit = false;
    }
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
                  <td className="name">
                    <Link to={'/details/' + data.id}>
                      {data.name}
                    </Link>
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
                        step="0.01"
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
