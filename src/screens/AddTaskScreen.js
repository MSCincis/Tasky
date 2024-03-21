import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    // Add task to the database
    navigation.goBack();
  };

  return (
    <View>
      <Text>Add New Task</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button
        title="Add Task"
        onPress={handleAddTask}
      />
    </View>
  );
};

export default AddTaskScreen;