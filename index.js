const request = require('request');

module.exports = class BotCarrefour {
  /**
   * Constructor
   */
  constructor (coord) {
    this.longitude = coord.lon;
    this.latitude = coord.lat;
  }

  /**
   * Initialize
   * @return {string} body
   */
  init (callback) {
    const options = {'method': 'GET',
      'url': 'https://api.fr.carrefour.io/v1/openapi/stores',
      'qs':
   {'longitude': this.longitude,
     'latitude': this.latitude,
     'radius': '15000'
   },
      'headers':
   {'accept': 'application/json',
     'x-ibm-client-secret': 'your-client-secret',//change
     'x-ibm-client-id': 'your-client-id'//change
   }
    };

    request(options, (error, response, body)=> {
      if (error) {
        throw error;
      }
      callback(body);
      return body;
    });
  }
  /**
   * Run
   * @return {BotCarrefour} 
   */
  run () {
    let sync = true;

    this.init(result => {
      this.json = JSON.parse(result);
      sync = false;
    });
    while (sync) {
      require('deasync').sleep(100);
    }
  }

  /**
   * getJson
   * @return {string} this.json
   */
  getJson () {
    return this.json;
  }
  /**
   * getJson
   * @return {string} this.json
   */
  getJsonList () {
    return this.json.list;
  }

  /**
   * getAdresse
   * @return {String} address
   */
  getAdresse (pos) {
    return this.json.list[pos].address;
  }
  /**
   * getBanner
   * @return {String} banner
   */
  getBanner (pos) {
    return this.json.list[pos].banner;
  }
  /**
   * getCity
   * @return {String} city
   */
  getCity (pos) {
    return this.json.list[pos].city;
  }
  /**
   * getGasStation
   * @return {String} gas_station
   */
  getGasStation (pos) {
    return this.json.list[pos].gas_station;
  }
  /**
   * getDrive
   * @return {String} drive
   */
  getDrive (pos) {
    return this.json.list[pos].drive;
  }
  /**
   * getLatitude
   * @return {String} latitude
   */
  getLatitude (pos) {
    return this.json.list[pos].latitude;
  }
  /**
   * getLongitude
   * @return {String} longitude
   */
  getLongitude (pos) {
    return this.json.list[pos].longitude;
  }
};
