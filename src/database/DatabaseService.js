import * as SQLite from 'expo-sqlite';

class DatabaseService {
  db = SQLite.openDatabase("TaskManager.db");

  initDB() {
    this.db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT);",
        [],
        () => console.log("Table created successfully"),
        (_, error) => console.log("Error creating table:", error)
      );
    });
  }

  getAllTasks() {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM Tasks;",
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        );
      });
    });
  }

  addTask(title, description) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO Tasks (title, description) VALUES (?, ?);",
          [title, description],
          (_, result) => resolve(result),
          (_, error) => {
            console.log("Error adding task:", error);
            reject(error);
          }
        );
      });
    });
  }
  deleteTask(id) {
    return new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM Tasks WHERE id = ?;",
                [id],
                (_, result) => resolve(result),
                (_, error) => {
                    console.log("Error deleting task:", error);
                    reject(error);
                }
            );
        });
    });
  }
}

const databaseService = new DatabaseService();
export default databaseService;
