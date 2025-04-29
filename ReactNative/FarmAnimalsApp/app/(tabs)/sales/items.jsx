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
import { Animated } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { GET_API, POST_API } from "../../../apis/testcrud";

const baseUrl = "http://10.0.2.2:8080";

export default function ItemManageScreen() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catModal, setCatModal] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [itemModal, setItemModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [info, setInfo] = useState({
    cateCode: "",
    itemName: "",
    price: "",
    stock: "",
    seller: "",
    description: "",
  });
  const [image, setImage] = useState(null);

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

    Alert.alert(
      "삭제 확인", // 제목
      "정말 삭제하시겠습니까?", // 내용
      [
        {
          text: "취소", // ❌ 취소
          style: "cancel",
        },
        {
          text: "삭제", // ✅ 삭제
          style: "destructive",
          onPress: async () => {
            try {
              await POST(`${baseUrl}/admin/categories/delete`, {
                cateCode: code,
              });
              fetchAll();
            } catch (e) {
              Alert.alert("오류", "카테고리 삭제 실패");
            }
          },
        },
      ],
      { cancelable: true }
    );

  };

  const DeleteButton = ({ onPress }) => {
    const scale = useState(new Animated.Value(1))[0];
  
    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: true,
      }).start();
    };
  
    const handlePressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };
  
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
          style={styles.deleteButton}
        >
            <AntDesign name="delete" size={24} color="#198754" />
        </TouchableOpacity>
      </Animated.View>
    );
  };
  

  const createItem = async () => {
    try {
      await POST_API(`/admin/items`, {
        ...info,
        price: Number(info.price),
        stock: Number(info.stock),
      });
      resetItemForm();
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

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchText.toLowerCase())
  );

  const sections = categories.map((cat) => ({
    title: cat.cateName,
    data: filteredItems.filter((i) => i.cateCode === cat.cateCode),
  }));

  const [confirmVisible, setConfirmVisible] = useState(false);
const [targetDeleteCode, setTargetDeleteCode] = useState(null);


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

      <TextInput
        style={styles.searchInput}
        placeholder="상품명 검색..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.itemCode.toString()}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeaderBox}>
            <Text style={styles.sectionHeaderText}>🥬 {section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.rowItem}>
            <Image
              source={{
                uri: item.imagePath || "https://via.placeholder.com/50",
              }}
              style={styles.listImage}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={styles.itemPrice}>
                {item.price.toLocaleString()}원
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* 카테고리 관리 모달 */}
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
                  <View style={styles.sectionHeaderBox}>
                    <Text style={styles.sectionHeaderText}>
                      📦 {section.title}
                    </Text>
                  </View>
                )}
                renderItem={({ item }) => (
                  <View style={styles.rowItem}>
                    <Text style={styles.itemName}>{item.cateName}</Text>
                    <DeleteButton onPress={()=>{removeCategory(item.cateCode)}} />
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

              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  dropdownIconColor="#4CAF50"
                  selectedValue={info.cateCode}
                  onValueChange={(itemValue) =>
                    setInfo((i) => ({ ...i, cateCode: itemValue }))
                  }
                >
                  <Picker.Item label="카테고리를 선택하세요" value="" />
                  {categories.map((cat) => (
                    <Picker.Item
                      key={cat.cateCode}
                      label={`📦 ${cat.cateName}`}
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
                onPress={resetItemForm}
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
  safe: { flex: 1, backgroundColor: "#E8F5E9" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#81C784",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  searchInput: {
    borderWidth: 1,
    borderColor: "#A5D6A7",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    margin: 12,
  },
  sectionHeaderBox: {
    backgroundColor: "#C8E6C9",
    borderRadius: 12,
    padding: 10,
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: 12,
  },
  sectionHeaderText: { fontSize: 18, fontWeight: "bold", color: "#2E7D32" },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 8,
    borderRadius: 10,
  },
  listImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  itemName: { fontSize: 16, fontWeight: "bold", color: "#2E7D32" },
  itemPrice: { fontSize: 14, color: "#666" },
  separator: { height: 1, backgroundColor: "#ccc" },
  modal: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E8F5E9",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
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
  modalButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectImageButton: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 16,
    alignItems: "center",
  },
  selectImageButtonText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
  deleteButton: {
    marginLeft: "auto",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#C62828",
    fontWeight: "bold",
    fontSize: 14,
  },
});
