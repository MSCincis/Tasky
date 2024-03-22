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

  getAllTasks() {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Tasks;',
          [],
          (_, { rows: { _array } }) => resolve(_array),
          (_, error) => {
            console.log('Failed to fetch tasks:', error);
            reject(error);
          }
        );
      });
    });
  }

  // Add other methods (addTask, deleteTask, etc.) here, following a similar pattern
}

const databaseService = new DatabaseService();
export default databaseService;
