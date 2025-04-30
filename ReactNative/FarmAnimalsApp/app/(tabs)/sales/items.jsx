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
import { Animated } from "react-native";
<<<<<<< HEAD
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomDropdown from "@/components/common/CustomDropdown";
=======
import AntDesign from '@expo/vector-icons/AntDesign';
import { GET_API, POST_API } from "../../../apis/testcrud";
>>>>>>> dev

const baseUrl = "http://10.0.2.2:8080";

export default function ItemManageScreen() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catModal, setCatModal] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [itemModal, setItemModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [targetDeleteCode, setTargetDeleteCode] = useState(null);
  const [itemConfirmVisible, setItemConfirmVisible] = useState(false);
  const [itemErrorVisible, setItemErrorVisible] = useState(false);

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

  const askDelete = (code) => {
    setTargetDeleteCode(code);
    setConfirmVisible(true);
  };

  const handleDelete = async () => {
    try {
      await POST(`${baseUrl}/admin/categories/delete`, {
        cateCode: targetDeleteCode,
      });
      setConfirmVisible(false);
      fetchAll();
    } catch (e) {
      Alert.alert("오류", "카테고리 삭제 실패");
    }
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
      setItemConfirmVisible(true);
      resetItemForm();
      fetchAll();
    } catch (e) {
      console.error(e);
      setItemErrorVisible(true);
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
            <Text style={styles.sectionHeaderText}>🥩 {section.title}</Text>
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
                    <DeleteButton onPress={() => askDelete(item.cateCode)} />
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

      <Modal visible={itemConfirmVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 24,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#D1FAE5",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <AntDesign name="checkcircleo" size={32} color="#10B981" />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#10B981",
                marginBottom: 8,
              }}
            >
              등록 완료!
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#555",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              상품이 성공적으로 등록되었습니다.
            </Text>

            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#10B981",
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={() => setItemConfirmVisible(false)}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={itemErrorVisible} transparent animationType="fade">
  <View style={{
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  }}>
    <View style={{
      width: "80%",
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 24,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    }}>
      <View style={{
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#FEE2E2",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
      }}>
        <AntDesign name="closecircleo" size={32} color="#DC2626" />
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#DC2626", marginBottom: 8 }}>등록 실패!</Text>
      <Text style={{ fontSize: 14, color: "#555", textAlign: "center", marginBottom: 20 }}>
        상품 등록 중 오류가 발생했습니다.
      </Text>

      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "#DC2626",
          paddingVertical: 10,
          borderRadius: 8,
          alignItems: "center"
        }}
        onPress={() => setItemErrorVisible(false)}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>닫기</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


      {/* 상품 등록 모달 */}
      <Modal visible={itemModal} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "90%",
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 24,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#10B981",
                marginBottom: 16,
              }}
            >
              📦 상품 등록
            </Text>

            {/* 카테고리 선택 */}
            <CustomDropdown
  items={categories}
  selectedValue={info.cateCode}
  onValueChange={(value) => setInfo((prev) => ({ ...prev, cateCode: value }))}
/>


            {/* 상품 정보 입력 */}
            {["itemName", "price", "stock", "seller", "description"].map(
              (key) => (
                <TextInput
                  key={key}
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 10,
                  }}
                  placeholder={key}
                  value={info[key]}
                  onChangeText={(v) => setInfo((i) => ({ ...i, [key]: v }))}
                />
              )
            )}

            {/* 이미지 선택 버튼 */}
            <TouchableOpacity
              style={{
                width: "100%",
                borderWidth: 2,
                borderColor: "#10B981",
                borderRadius: 8,
                paddingVertical: 12,
                marginVertical: 10,
                alignItems: "center",
              }}
              onPress={pickImage}
            >
              <Text style={{ fontWeight: "bold", color: "#10B981" }}>
                🖼️ 이미지 선택
              </Text>
            </TouchableOpacity>

            {/* 이미지 미리보기 */}
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 120,
                  height: 120,
                  marginVertical: 10,
                  borderRadius: 10,
                }}
              />
            )}

            {/* 등록 / 닫기 버튼 */}
            <View
              style={{ flexDirection: "row", marginTop: 12, width: "100%" }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#10B981",
                  paddingVertical: 12,
                  borderRadius: 8,
                  marginRight: 8,
                  alignItems: "center",
                }}
                onPress={createItem}
              >
                <Text style={{ fontWeight: "bold", color: "#fff" }}>등록</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#E5E7EB",
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: "center",
                }}
                onPress={resetItemForm}
              >
                <Text style={{ fontWeight: "bold", color: "#374151" }}>
                  닫기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={confirmVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 24,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FEE2E2",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <AntDesign name="delete" size={32} color="#DC2626" />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#DC2626",
                marginBottom: 8,
              }}
            >
              삭제할까요?
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#555",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              이 작업은 되돌릴 수 없습니다.
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#E5E7EB",
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: "center",
                  marginRight: 8,
                }}
                onPress={() => setConfirmVisible(false)}
              >
                <Text style={{ fontWeight: "bold", color: "#374151" }}>
                  취소
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#EF4444",
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: "center",
                }}
                onPress={handleDelete}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
