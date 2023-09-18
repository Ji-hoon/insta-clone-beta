
export function createIndexedDB(databaseName, version, objectStore, cb) {
    if (window.indexedDB) {
      const request = indexedDB.open(databaseName, version);
  
      request.onupgradeneeded = function () {
        request.result.createObjectStore(objectStore, { autoIncrement: true });
      };
  
      request.onsuccess = function () {
        cb();
      };
    }
  }
  
  export function insertIndexedDB(databaseName, version, objectStore, data, cb) {
    if (window.indexedDB) {
      const request = indexedDB.open(databaseName, version);
  
      request.onsuccess = function () {
        const store = request.result
          .transaction(objectStore, 'readwrite')
          .objectStore(objectStore);
        store.add(data).onsuccess = function () {
          cb();
        };
      };
    }
  }
  
  export function getAllIndexedDB(databaseName, version, objectStore, cb) {
    if (window.indexedDB) {
      const request = indexedDB.open(databaseName, version);
  
      request.onsuccess = function () {
        const store = request.result
          .transaction(objectStore, 'readwrite')
          .objectStore(objectStore);
        store.getAll().onsuccess = function (response) {
          cb(response.target.result);
        };
      };
    }
  }
  
  export function getIndexedDB(databaseName, version, objectStore, id, cb) {
    if (window.indexedDB) {
      const request = indexedDB.open(databaseName, version);
      const key = Number(id);
  
      request.onsuccess = function () {
        const store = request.result
          .transaction(objectStore, 'readwrite')
          .objectStore(objectStore);
        store.get(key).onsuccess = function (response) {
          cb(response.target.result);
        };
      };
    }
  }
  
  export function updateIndexedDB(
    databaseName,
    version,
    objectStore,
    id,
    data,
    cb
  ) {
    if (window.indexedDB) {
      const request = indexedDB.open(databaseName, version);
      const key = Number(id);
  
      request.onsuccess = function () {
        const store = request.result
          .transaction(objectStore, 'readwrite')
          .objectStore(objectStore);
        store.get(key).onsuccess = function (response) {
          const value = response.target.result;
          value.content = data;
          store.put(value, key).onsuccess = function () {
            cb();
          };
        };
      };
    }
  }
  
  export function deleteIndexedDB(databaseName, version, objectStore, id, cb) {
    // deleteIndexedDB 함수를 완성해주세요.
    if (window.indexedDB) {
      const request = indexedDB.open(databaseName, version);
      const key = Number(id);
  
      request.onsuccess = function () {
        const store = request.result
          .transaction(objectStore, 'readwrite')
          .objectStore(objectStore);
        
        store.delete(key).onsuccess = function () {
            cb();
        };
      };
    }
  }
  
  export function getAllKeysIndexedDB(databaseName, version, objectStore, cb) {
    // getAllKeysIndexedDB 함수를 완성해주세요.
    if (window.indexedDB) {
      const request = indexedDB.open(databaseName, version);
  
      request.onsuccess = function () {
        const store = request.result
          .transaction(objectStore, 'readwrite')
          .objectStore(objectStore);
        store.getAllKeys().onsuccess = function (response) {
          cb(response.target.result);
        };
      };
    }
  }
  