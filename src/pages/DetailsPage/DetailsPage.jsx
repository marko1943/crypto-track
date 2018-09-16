/*
 * @Author: Marko Stojiljković 
 * @Date: 2018-09-16 18:16:45 
 * @Last Modified by:   Marko Stojiljković 
 * @Last Modified time: 2018-09-16 18:16:45 
 */

import React, { Component } from 'react';
import CoinMarketCapService from './../../services/CoinMarketCap';
import { Link } from 'react-router-dom';
import Spinner from './../../components/Spinner/Spinner';
import moment from 'moment';

import styles from './DetailsPages.scss';

export default class DetailsPage extends Component {
  state = {
    data: {},
    loading: true
  };
  getData(id) {
    new CoinMarketCapService().getSingleTickerData(id).then(res => {
      this.setState({ data: res, loading: false });
    }), err => {
      console.log(err);
      this.setState({ loading: false });
    };
  }

  componentDidMount() {
    this.getData(this.props.match.params.id);
  }

  render() {
    let { data, loading } = this.state;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div className={styles.container}>
        {data &&
          <div className="wrappper">
            <h1>
              {data.name}
            </h1>
            <h3>
              Symbol: {data.symbol}
            </h3>
            <p>
              Circulating Supply: {data.circulating_supply}
            </p>
            <p>
              Max Supply: {data.max_supply}
            </p>
            <p>
              Total Supply: {data.total_supply}
            </p>
            {data.last_updated &&
              <p>
                Last updated: {moment.unix(data.last_updated).format('MMM DD YYYY')}
              </p>}
            {data.quotes &&
              <div>
                <p>
                  Price: {data.quotes.USD.price}
                </p>
                <p>
                  Volume last 24h: {data.quotes.USD.volume_24h}
                </p>
                <p>
                  Percent change last 24h: {data.quotes.USD.percent_change_24h}
                </p>
                <p>
                  Volume last hour: {data.quotes.USD.percent_change_1h}
                </p>
                <p>
                  Market cap: {data.quotes.USD.market_cap}{' '}
                </p>
              </div>}
          </div>}
        <div className="back">
          <Link to={'/'}>back to table</Link>
        </div>
      </div>
    );
  }
}
