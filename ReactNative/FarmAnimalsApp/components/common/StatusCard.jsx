// app/stock/StatusCard.jsx

import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function StatusCard({
  title,
  value,
  statusMessage,
  tooltipMessage,
  borderColor = 'green',
  borderThickness = 2,
}) {
  const [open, setOpen] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.card, { borderColor, borderWidth: borderThickness }]}
      onPress={() => setOpen(o => !o)}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={[styles.status, borderColor === 'green' && { color: '#198754' }]}>
        {statusMessage}
      </Text>
      {open && tooltipMessage ? (
        <Text style={styles.tooltip}>{tooltipMessage}</Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title:   { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  value:   { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  status:  { fontSize: 14, marginBottom: 4 },
  tooltip: { marginTop: 8, fontSize: 13, backgroundColor: '#f0f0f0', padding: 8, borderRadius: 6 },
});
