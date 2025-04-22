// app/sales/details.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SalesDetails() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Here are the sales details.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center' },
  text: { fontSize: 16 },
});
