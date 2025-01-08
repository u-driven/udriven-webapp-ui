import { openDB } from 'idb'

export class InitialIndexDb {
  constructor (dbName, tableName, dbKey) {
    this.dbName = dbName
    this.tableName = tableName
    this.dbKey = dbKey
  }

  async dbPromise() {
    return openDB(this.dbName, 1, {
      upgrade(db) {
        // Create a store of objects
        db.createObjectStore(this.tableName, {
          // The 'id' property of the object will be the key.
          keyPath: this.dbKey,
          // If it isn't explicitly set, create a value by auto incrementing.
          autoIncrement: true
        })
      }
    })
  }

  async storeDbData(data) {
    // 單純取資料可用 readonly
    const tx = this.dbPromise.transaction(this.tableName, 'readwrite')
    let tempArray = []
    const asyncList = () => {
      data.result.forEach((item) => {
        tempArray.push(tx.store.add(item))
      })
    }
    await asyncList()
    // 最後一步 call done method 來結束這次的 transaction
    await Promise.all([ ...tempArray, tx.done ])
  }


  async get(key) {
    return (await this.dbPromise).get(this.tableName, key)
  }
  async set(key, val) {
    return (await this.dbPromise).put(this.tableName, val, key)
  }
  async delete(key) {
    return (await this.dbPromise).delete(this.tableName, key)
  }
  async clear() {
    return (await this.dbPromise).clear(this.tableName)
  }
  async keys() {
    // return (await this.dbPromise).getAllKeys(this.tableName)
    return (await this.dbPromise).getAllKeys(this.tableName)
  }

}

