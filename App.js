import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { uid: Math.random().toString(), value: goalTitle },
    ]);
    setShowModal(false);
  };

  const deleteGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.uid !== goalId);
    });
  };

  const modalHandler = () => {
    setShowModal(true);
  };

  const cancelGoalHandler = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={modalHandler} />
      <GoalInput
        onAddGoal={addGoalHandler}
        visible={showModal}
        onCancel={cancelGoalHandler}
      />
      <FlatList
        keyExtractor={(item, data) => item.uid}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.uid}
            onDelete={deleteGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
