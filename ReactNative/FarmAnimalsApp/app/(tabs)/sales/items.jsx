import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  SectionList,
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { GET, POST } from "@/apis/CRUD";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { GET_API, POST_API } from "../../../apis/testcrud";

const baseUrl = "http://10.0.2.2:8080";

export default function ItemManageScreen() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catModal, setCatModal] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [itemModal, setItemModal] = useState(false);
  const resetItemForm = () => {
    setInfo({
      cateCode: "",
      itemName: "",
      price: "",
      stock: "",
      seller: "",
      description: "",
    });
    setImage(null);
    setItemModal(false);
  };

  const [info, setInfo] = useState({
    cateCode: "",
    itemName: "",
    price: "",
    stock: "",
    seller: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [cRes, iRes] = await Promise.all([
        GET_API(`/admin/categories`),
        GET_API(`/admin/items`),
      ]);
      setCategories(cRes);
      setItems(iRes);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const addCategory = async () => {
    try {
      await POST_API(`/admin/categories`, { cateName: newCat });
      setCatModal(false);
      fetchAll();
    } catch (e) {
      Alert.alert("오류", "카테고리 등록 실패");
    }
  };

  const removeCategory = async (code) => {
    try {
      await POST_API('/admin/categories/delete', { cateCode: code });
      fetchAll();
    } catch (e) {
      Alert.alert("오류", "카테고리 삭제 실패");
    }
  };

  const createItem = async () => {
    try {
      await POST_API(`/admin/items`, {
        ...info,
        price: Number(info.price),
        stock: Number(info.stock),
      });
      setItemModal(false);
      fetchAll();
    } catch (e) {
      Alert.alert("오류", "상품 등록 실패");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  const sections = categories.map((cat) => ({
    title: cat.cateName,
    data: items.filter((i) => i.cateCode === cat.cateCode),
  }));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCatModal(true)}
        >
          <Text style={styles.buttonText}>카테고리 관리</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setItemModal(true)}
        >
          <Text style={styles.buttonText}>상품 등록</Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.itemCode.toString()}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.rowItem}>
            <Text>{item.itemName}</Text>
            <Text>{item.price.toLocaleString()}원</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* 카테고리 모달 */}
      <Modal visible={catModal} animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={styles.modal}>
              <Text style={styles.modalTitle}>카테고리 관리</Text>
              <TextInput
                style={styles.input}
                placeholder="새 카테고리명"
                value={newCat}
                onChangeText={setNewCat}
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={addCategory}
              >
                <Text style={styles.modalButtonText}>등록</Text>
              </TouchableOpacity>
              <SectionList
                sections={[{ title: "등록된 카테고리", data: categories }]}
                keyExtractor={(cat) => cat.cateCode.toString()}
                renderSectionHeader={({ section }) => (
                  <Text style={styles.secTitle}>{section.title}</Text>
                )}
                renderItem={({ item }) => (
                  <View style={styles.rowItem}>
                    <Text>{item.cateName}</Text>
                    <TouchableOpacity
                      onPress={() => removeCategory(item.cateCode)}
                    >
                      <Text style={styles.danger}>삭제</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setCatModal(false)}
              >
                <Text style={styles.modalButtonText}>닫기</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* 상품 등록 모달 */}
      <Modal visible={itemModal} animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={styles.modal}>
              <Text style={styles.modalTitle}>상품 등록</Text>

              {/* cateCode는 Picker로! */}
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={info.cateCode}
                  onValueChange={(itemValue) =>
                    setInfo((i) => ({ ...i, cateCode: itemValue }))
                  }
                >
                  <Picker.Item label="카테고리를 선택하세요" value="" />
                  {categories.map((cat) => (
                    <Picker.Item
                      key={cat.cateCode}
                      label={cat.cateName}
                      value={cat.cateCode}
                    />
                  ))}
                </Picker>
              </View>

              {["itemName", "price", "stock", "seller", "description"].map(
                (key) => (
                  <TextInput
                    key={key}
                    style={styles.input}
                    placeholder={key}
                    value={info[key]}
                    onChangeText={(v) => setInfo((i) => ({ ...i, [key]: v }))}
                  />
                )
              )}
              <TouchableOpacity
                style={styles.selectImageButton}
                onPress={pickImage}
              >
                <Text style={styles.selectImageButtonText}>🖼️ 이미지 선택</Text>
              </TouchableOpacity>

              {image && (
                <Image source={{ uri: image }} style={styles.imagePreview} />
              )}
              <TouchableOpacity style={styles.modalButton} onPress={createItem}>
                <Text style={styles.modalButtonText}>등록</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={resetItemForm} // 여기 resetItemForm 함수 호출해야 해!
              >
                <Text style={styles.modalButtonText}>닫기</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f0fff0" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#e6f5e6",
    padding: 8,
  },
  separator: { height: 1, backgroundColor: "#ddd" },
  input: {
    borderWidth: 1,
    borderColor: "#c8e6c9",
    borderRadius: 6,
    padding: 10,
    marginVertical: 8,
  },
  modal: { flex: 1, padding: 20, backgroundColor: "#f0fff0" },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  modalButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  secTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2e7d32",
    marginVertical: 8,
  },
  danger: { color: "#c0392b", fontWeight: "bold" },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
  selectImageButton: {
    backgroundColor: "#ffffff", // 하얀 배경
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 16, // 버튼 사이 여백!
    alignItems: "center",
  },
  selectImageButtonText: {
    color: "#4CAF50", // 초록색 텍스트
    fontSize: 16,
    fontWeight: "bold",
  },
});
