// app/stock.jsx
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default function StockScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Stock</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18 },
});
