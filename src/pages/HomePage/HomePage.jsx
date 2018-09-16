/*
 * @Author: Marko Stojiljković 
 * @Date: 2018-09-16 18:16:56 
 * @Last Modified by:   Marko Stojiljković 
 * @Last Modified time: 2018-09-16 18:16:56 
 */


import React, { Component } from 'react';
import styles from './HomePage.scss';

import CryptoTable from '../../components/CryptoTable/CryptoTable';

class HomePage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>Crypto Track app</h1>
        <CryptoTable />
      </div>
    );
  }
}

export default HomePage;
