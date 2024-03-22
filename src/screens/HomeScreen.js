import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import databaseService from '../database/DatabaseService'; // Adjust the import path as necessary

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    databaseService.initDB(); // Initialize DB and create table if not exists

    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await databaseService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.ButtonText}>New Task</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={fetchTasks}
      >
        <Text style={styles.ButtonText}>Refresh List</Text>
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  taskItem: {
    backgroundColor: '#f9c2ff',
    borderRadius: 5,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  Button: {
    backgroundColor: '#007bff',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 16,
   
  },
  ButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

