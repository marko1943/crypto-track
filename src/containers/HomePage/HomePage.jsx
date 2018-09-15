import React, { Component } from 'react';
import styles from './HomePage.scss';
import CryptoTable from '../../components/CryptoTable/CryptoTable';

class HomePage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <CryptoTable />
      </div>
    );
  }
}

export default HomePage;
