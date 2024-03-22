import * as SQLite from 'expo-sqlite';

class DatabaseService {
  constructor() {
    this.initDB();
  }

  initDB() {
    this.db = SQLite.openDatabase('TaskManager.db');
    this.db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT);',
        [],
        () => console.log('Database initialized'),
        (_, error) => console.log('Error initializing database:', error)
      );
    });
  }

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

const databaseService = new DatabaseService();
export default databaseService;
