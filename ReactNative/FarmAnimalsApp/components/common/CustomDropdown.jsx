import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CustomDropdown({ items = [], selectedValue, onValueChange }) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    items.find((item) => item.cateCode === selectedValue)?.cateName || "📂 카테고리를 선택하세요";

  const handleSelect = (value) => {
    onValueChange(value);
    setOpen(false);
  };

  return (
    <View style={{ marginBottom: 12 }}>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.selectText}>🥩 {selectedLabel}</Text>
        <AntDesign name="down" size={20} color="#10B981" style={styles.icon} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <View style={styles.modalBox}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.cateCode.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.cateCode)}
                >
                  <Text style={styles.optionText}>🍖 {item.cateName}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  selectBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#10B981",
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F0FDF4",
  },
  selectText: {
    fontWeight: "bold",
    color: "#065F46",
  },
  icon: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 10,
    maxHeight: 300,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
});
