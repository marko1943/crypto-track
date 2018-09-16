/*
 * @Author: Marko Stojiljković 
 * @Date: 2018-09-15 13:33:43 
 * @Last Modified by: Marko Stojiljković
 * @Last Modified time: 2018-09-16 15:45:26
 */

import axios from 'axios';
import { API_URL } from '../../constants/constants';

export default class CoinMarketCapService {
  // v2/ticker/?limit=10

  getTickerData() {
    let url = API_URL + 'v2/ticker/?limit=10';
    return axios
      .get(url)
      .then(response => {
        return response.data.data;
      })
      .catch(err => {
        throw err;
      });
  }

  getSingleTickerData(id) {
    let url = API_URL + 'v2/ticker/' + id;
    return axios
      .get(url)
      .then(response => {
        return response.data.data;
      })
      .catch(err => {
        throw err;
      });
  }
}
