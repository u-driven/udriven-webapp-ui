import { openDB } from 'idb'

export default async function (dbName, tableName, dbKey) {
  const dbPromise = await openDB(dbName, 1, {
    upgrade(db) {
      // Create a store of objects
      db.createObjectStore(tableName, {
        // The 'id' property of the object will be the key.
        keyPath: dbKey,
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true
      })
      // Create an index on the 'county' property of the objects.
      // store.createIndex("county", "county");
    }
  })

  const idbGeo = {

    async get(key) {
      return (await dbPromise).get(tableName, key)
    },
    async set(key, val) {
      return (await dbPromise).put(tableName, val, key)
    },
    async delete(key) {
      return (await dbPromise).delete(tableName, key)
    },
    async clear() {
      return (await dbPromise).clear(tableName)
    },
    async keys() {
      return (await dbPromise).getAllKeys(tableName)
    },
  }

  const storeDbData = async (data) => {
    // 參數的部分單純取資料可用`readonly`
    const tx = dbPromise.transaction(tableName, 'readwrite')
    let tempArray = []
    const asyncList = () => {
      data.result.forEach((item) => {
        tempArray.push(tx.store.add(item))
      })
    }
    await asyncList()
    // 最後一步 call done method 來結束這次的transaction
    await Promise.all([ ...tempArray, tx.done ])
  }

  return { idbGeo, storeDbData }

}