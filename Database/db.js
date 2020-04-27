import * as SQLite from 'expo-sqlite';

//connect to db or create if not exist
const db = SQLite.openDatabase('machines.db')


export const init = () => {
    const promise = new Promise((resolve, reject) => {
        //takes func as argument and garunets that the query is executed as a whole
        db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS places (id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, color TEXT NOT NULL);',
          [],
          //if succes 
          () => {
            resolve();
          },
          //if fail
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
  };
  //(title, imageUri, address, lat, lng)
  export const insertPlace = () => {
      const promise = new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
            //   `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
            // [title, imageUri, address, lat, lng]
                //prevents sql injection by using which might break database
              `REPLACE INTO places (id,title, imageUri, color) VALUES (?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?);`,
              ['1a','tractor','adgv','#F3BA36',
              '2a','bulldozer','adgv','#F3BA36',
              '3a','harvester','adgv','#F3BA36',
              '4a','hay-baler','adgv','#F3BA36',
              '5a','farm-slasher','adgv','#F3BA36',
              '6a','quad-bike','adgv','#F3BA36'],
              (_, res) => {
                console.log(res)
                resolve(res);
              },
              (_, err) => {
                console.log(err)
                reject(err);

              }
            );
          });
        });
        return promise;
  };
  
  export const fetchPlaces = () => {
      const promise = new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM places',
              [],
              (tx, result) => {
                var len = result.rows.length
                if(len >0){
                  for(let i =0 ; i< len; i++){
                    let row = result.rows.item(i)
                    console.log(row)
                 }
                 }
              },
              (_, err) => {
                reject(err);
              }
            );
          });
        });
        return promise;
  };

