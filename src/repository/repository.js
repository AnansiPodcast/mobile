import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'
import uuid from 'react-native-uuid'

export default class Repository {

  constructor() {
    this.expiration = 1000 * 3600
    this.storage = new Storage({
      size: 2000,
      storageBackend: AsyncStorage,
      sync : this.sync,
      // enableCache: true,
    })
  }

  load(id) {
    return this.storage.load({ key: this.key, id: id })
  }

  save(data, id = false) {
    if(!id) id = uuid.v4()
    return this.storage.save({
      key: this.key,  // Note: Do not use underscore("_") in key!
      id: id,   // Note: Do not use underscore("_") in id!
      rawData: data,
      expires: this.expiration
    })
  }

  all() {
    return this.storage.getAllDataForKey(this.key)
  }

  delete(id) {
    this.storage.remove({ key: this.key, id: id })
  }

  deleteAll() {
    this.storage.remove({ key: this.key })
  }

  sync() {
    return false
  }

}
