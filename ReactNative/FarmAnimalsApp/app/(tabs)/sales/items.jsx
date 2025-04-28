// app/sales/items.jsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, SectionList, View, Text,
  TextInput, Button, Modal, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import { GET, POST, DEL } from '@/apis/CRUD';

// const baseUrl = 'http://192.168.204.19:8080';
const baseUrl = 'http://10.0.2.2:8080';

export default function ItemManageScreen() {
  const [categories, setCategories] = useState([]);
  const [items, setItems]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [catModal, setCatModal]     = useState(false);
  const [newCat, setNewCat]         = useState('');
  const [itemModal, setItemModal]   = useState(false);
  const [info, setInfo]             = useState({
    cateCode:'', itemName:'', price:'', stock:'', seller:'', description:''
  });

  // 1) 카테고리+아이템 로드
  const fetchAll = async () => {
    try {
      setLoading(true);
      const [cRes, iRes] = await Promise.all([
        GET(`${baseUrl}/admin/categories`),
        GET(`${baseUrl}/admin/items`),
      ]);
      setCategories(cRes.data);
      setItems(iRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // 2) 카테고리 추가/삭제
  const addCategory = async () => {
    try {
      await POST(`${baseUrl}/admin/categories`, { cateName: newCat });
      setCatModal(false);
      fetchAll();
    } catch (e) {
      Alert.alert('오류','카테고리 등록 실패');
    }
  };
  const removeCategory = async code => {
    try {
      await POST(`${baseUrl}/admin/categories/delete`,{ cateCode:code });
      fetchAll();
    } catch (e) {
      Alert.alert('오류','카테고리 삭제 실패');
    }
  };

  // 3) 상품 등록 (간단 폼)
  const createItem = async () => {
    try {
      await POST(`${baseUrl}/admin/items`, {
        ...info,
        price: Number(info.price),
        stock: Number(info.stock),
      });
      setItemModal(false);
      fetchAll();
    } catch (e) {
      Alert.alert('오류','상품 등록 실패');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#3F7D58" />
      </SafeAreaView>
    );
  }

  // 4) SectionList용 데이터 변환
  const sections = categories.map(cat => ({
    title: cat.cateName,
    data: items.filter(i => i.cateCode === cat.cateCode),
  }));

  return (
    <SafeAreaView style={styles.safe}>
      {/* 상단 버튼 */}
      <View style={styles.row}>
        <Button title="카테고리 관리" onPress={()=>setCatModal(true)} />
        <Button title="상품 등록" onPress={()=>setItemModal(true)} />
      </View>

      {/* SectionList */}
      <SectionList
        sections={sections}
        keyExtractor={item => item.itemCode.toString()}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.itemName}</Text>
            <Text>{item.price.toLocaleString()}원</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* 카테고리 Modal */}
      <Modal visible={catModal} animationType="slide">
        <SafeAreaView style={styles.modal}>
          <Text style={styles.modalTitle}>카테고리 관리</Text>
          <TextInput
            style={styles.input}
            placeholder="새 카테고리명"
            value={newCat}
            onChangeText={setNewCat}
          />
          <Button title="등록" onPress={addCategory} />
          <SectionList
            sections={[{ title:'등록된 카테고리', data:categories }]}
            keyExtractor={cat=>cat.cateCode.toString()}
            renderSectionHeader={({section}) => <Text style={styles.secTitle}>{section.title}</Text>}
            renderItem={({item}) => (
              <View style={styles.row}>
                <Text>{item.cateName}</Text>
                <TouchableOpacity onPress={()=>removeCategory(item.cateCode)}>
                  <Text style={styles.danger}>삭제</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Button title="닫기" onPress={()=>setCatModal(false)} />
        </SafeAreaView>
      </Modal>

      {/* 상품 등록 Modal */}
      <Modal visible={itemModal} animationType="slide">
        <SafeAreaView style={styles.modal}>
          <Text style={styles.modalTitle}>상품 등록</Text>
          {/** 필드: cateCode, itemName, price, stock, seller, description */}
          {['cateCode','itemName','price','stock','seller','description'].map(key=>(
            <TextInput
              key={key}
              style={styles.input}
              placeholder={key}
              value={info[key]}
              onChangeText={v=>setInfo(i=>({...i,[key]:v}))}
            />
          ))}
          <Button title="등록" onPress={createItem} />
          <Button title="닫기" onPress={()=>setItemModal(false)} />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:     { flex:1, backgroundColor:'#fff' },
  loader:   { flex:1, justifyContent:'center', alignItems:'center' },
  row:      { flexDirection:'row', justifyContent:'space-between', padding:12 },
  sectionHeader: { fontSize:18, fontWeight:'bold', backgroundColor:'#f0f0f0', padding:8 },
  separator:{ height:1, backgroundColor:'#ddd' },
  input:    { borderWidth:1, borderColor:'#ccc', borderRadius:4, padding:8, marginVertical:6 },
  modal:    { flex:1, padding:16, backgroundColor:'#fff' },
  modalTitle: { fontSize:20, fontWeight:'bold', marginBottom:12 },
  secTitle:{ fontSize:16, fontWeight:'600', marginVertical:8 },
  danger:   { color:'#c0392b' },
});
