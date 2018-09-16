import React, { Component } from 'react';
import CoinMarketCapService from './../../services/CoinMarketCap';
import styles from './DetailsPages.scss';

export default class DetailsPage extends Component {
  state = {
    data: {}
  };
  getData(id) {
    new CoinMarketCapService().getSingleTickerData(id).then(res => {
      console.log(res);
      this.setState({ data: res });
    }), err => console.log(err);
  }

  componentDidMount() {
    this.getData(this.props.match.params.id);
  }

  render() {
    let { data } = this.state;
    let date = new Date(data.last_updated * 1000).toString();

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
            {data.last_updated &&
              <p>
                Last updated: {date}
              </p>}
            {data.quotes &&
              <p>
                Price: {data.quotes.USD.price}
              </p>}
          </div>}
      </div>
    );
  }
}
