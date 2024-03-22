import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import databaseService from '../database/DatabaseService'; 

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    try {
      await databaseService.addTask(title, description);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity
        style={styles.Button}
        onPress={handleAddTask}
      >
        <Text style={styles.ButtonText}>Add Task</Text>
      </TouchableOpacity>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
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

export default AddTaskScreen;
