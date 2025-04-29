// app/stock/index.jsx

import React from "react";
import { StyleSheet, View } from "react-native";
import TemperatureTab from "../../env/TemperatureTab";

export default function StockScreen() {
  return (
    <View style={styles.container}>
      <TemperatureTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fff0",
  },
});
