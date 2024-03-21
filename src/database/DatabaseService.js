import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "TaskManager.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

export default class DatabaseService {
  initDB() {
    let db;
    return new Promise((resolve) => {
      console.log("Plugin integrity check ...");
      SQLite.echoTest()
        .then(() => {
          console.log("Integrity check passed ...");
          console.log("Opening database ...");
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          )
            .then(DB => {
              db = DB;
              console.log("Database OPEN");
              db.executeSql('CREATE TABLE IF NOT EXISTS Tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT);')
                .then(() => {
                  console.log("Table created successfully");
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log("echoTest failed - plugin not functional");
        });
      resolve(db);
    });
  }

  // Additional methods for adding, retrieving, and deleting tasks will be implemented here.

  // Method to add a new task
  addTask(title, description) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO Tasks (title, description) VALUES (?, ?)',
          [title, description],
          (tx, results) => {
            resolve(results);
          },
          error => {
            reject(error);
          }
        );
      });
    });
  }

  // Method to retrieve all tasks
  getAllTasks() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Tasks',
          [],
          (tx, results) => {
            let tasks = [];
            for (let i = 0; i < results.rows.length; i++) {
              tasks.push(results.rows.item(i));
            }
            resolve(tasks);
          },
          error => {
            reject(error);
          }
        );
      });
    });
  }

  // Method to delete a task
  deleteTask(id) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM Tasks WHERE id = ?',
          [id],
          (tx, results) => {
            resolve(results);
          },
          error => {
            reject(error);
          }
        );
      });
    });
  }
}

// Make sure to export an instance of the DatabaseService so it can be imported and used in other files.
/* const databaseService = new DatabaseService();
export default DatabaseService;*/
