// components/common/Card.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.label}>{title}</Text>}
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#e6f5e6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#90ee90',
    shadowColor: '#006400',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#228B22',
  },
});

export default Card;
