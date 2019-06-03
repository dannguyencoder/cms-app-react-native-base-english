import React from 'react';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import SYNC from './sync';

let storage
const defaultExpires = 1000 * 3000 * 24 * 7 // 七天
const size = 1000

export default class AppStorage extends React.Component {
  /**
   * Initialize storage
   */
  static _getStorage() {
    if (storage == undefined) {
      storage = new Storage({
        size: size,
        storageBackend: AsyncStorage,
        defaultExpires: defaultExpires,
        enableCache: true
      })
    }

    return storage
  }

  static isInit() {
    if (storage == undefined) {
      throw Error('Please call the initialization function first.')
    }
  }

  /**
    * save method
    *
    * @static
    * @param {any} key saved key value
    * @param {any} object saved value
    * @param {any} expires Valid time, if null, never expires
    * @memberof AppStorage
    */
  static _save(key, object, expires = defaultExpires) {
    this.isInit()

    storage.save({
      key: key,
      data: object,
      expires: expires
    })
  }

  /**
   * Delete single data
   *
   * @static
   * @param {any} key
   * @memberof AppStorage
   */
  static _remove(key) {
    this.isInit()

    storage.remove({
      key: key
    })
  }

  /**
   * Remove all key-id data
   */
  static _clear() {
    this.isInit()

    storage.clearMap()
  }

  /**
   * Remove all data under a single key
   *
   * @static
   * @param {any} key
   * @memberof AppStorage
   */
  static _clearDataByKey(key) {
    this.isInit()

    storage.clearMapForKey(key)
  }

  // static async _load(key, callback) {
  //   this.isInit()

  //   storage.load({
  //     key: key
  //   }).then(ret => {
  //     callback(ret)
  //     return ret
  //   }).catch(err => {
  //     switch (err.name) {
  //       case 'NotFoundError':
  //         return {
  //           code: -1,
  //           message: '没有找到'
  //         }
  //       case 'ExpiredError':
  //         return {
  //           code: -2,
  //           message: '数据已过期'
  //         }
  //       default:
  //         return null
  //     }
  //   })
  // }

  /**
   Query data
  */
  static _load(key, callBack) {
    this._load3(key, null, null, callBack);
  }


  static _load3(key, params, someFlag, callBack) {

    this.isInit();
    storage.load({
      key: key,
      // autoSync (defaults to true) means that the corresponding sync method is automatically called when no data is found or the data expires.
      autoSync: true,
      // syncInBackground (default is true) means that if the data expires,
      // Returns the data that has expired while calling the sync method.
      // Set to false to always force the latest data provided by the sync method (of course it will take more wait time).
      syncInBackground: true,

      // You can also pass additional parameters to the sync method.
      syncParams: {
        params,
        someFlag: someFlag,
      },
    }).then(ret => {

      callBack(ret);
      return ret;
    }).catch(err => {
      //If no data is found and there is no sync method,
      //Or there are other exceptions, then return in catch
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    });
  }
}
