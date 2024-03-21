import React from 'react';
import { FlatList, StyleSheet, View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Task List</Text>
      {/* List of tasks will be displayed here */}
      <Button
        title="Add Task"
        onPress={() => navigation.navigate('AddTask')}
      />
    </View>
  );
};

export default HomeScreen;
