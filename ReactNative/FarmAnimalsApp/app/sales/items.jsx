// src/screens/ItemManageScreen.js

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, FlatList, TextInput,
  StyleSheet, TouchableOpacity, Modal, Button, Image, Alert, ScrollView,
} from 'react-native';
import { GET, POST, DEL } from '../../apis/CRUD';

export default function ItemManageScreen() {
  const [categories, setCategories] = useState([]);
  const [items, setItems]         = useState([]);
  const [catModal, setCatModal]   = useState(false);
  const [newCat, setNewCat]       = useState('');
  const [itemModal, setItemModal] = useState(false);
  const [info, setInfo] = useState({
    cateCode: '', itemName:'', price:'', stock:'', seller:'', description:''
  });
  const [preview, setPreview] = useState(null);

  const fetchAll = async () => {
    try {
      const [cRes, iRes] = await Promise.all([
        GET('http://192.168.204.19:8080/admin/categories'),
        GET('http://192.168.204.19:8080/admin/items')
      ]);
      setCategories(cRes.data);
      setItems(iRes.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchAll(); }, []);

  const addCategory = async () => {
    try {
      await POST('http://192.168.204.19:8080/admin/categories', { cateName:newCat });
      Alert.alert('완료','카테고리 등록됨');
      setCatModal(false);
      fetchAll();
    } catch(e){ Alert.alert('오류','실패'); }
  };

  const removeCategory = async code => {
    try {
      await POST('http://192.168.204.19:8080/admin/categories/delete',{ cateCode: code });
      Alert.alert('완료','삭제됨');
      fetchAll();
    } catch(e){Alert.alert('오류','삭제실패');}
  };

  // itemModal 내부에서 파일 PICKER나 이미지 업로드 구현 필요
  // 생략: preview = uri, info 필드 채우기

  const createItem = async () => {
    // TODO: FormData + 파일 처리
    try {
      await POST('http://192.168.204.19:8080/admin/items', {
        ...info, price:Number(info.price), stock:Number(info.stock)
      });
      Alert.alert('완료','등록됨');
      setItemModal(false);
      fetchAll();
    } catch(e){Alert.alert('오류','등록실패');}
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.row}>
          <Button title="카테고리 관리" onPress={()=>setCatModal(true)}/>
          <Button title="상품 등록"   onPress={()=>setItemModal(true)}/>
        </View>

        {/* 카테고리 Modal */}
        <Modal visible={catModal} animationType="slide">
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>카테고리 관리</Text>
            <TextInput
              placeholder="새 카테고리명"
              style={styles.input}
              value={newCat}
              onChangeText={setNewCat}
            />
            <Button title="등록" onPress={addCategory}/>
            <FlatList
              data={categories}
              keyExtractor={c=>c.cateCode.toString()}
              renderItem={({item})=>
                <View style={styles.row}>
                  <Text>{item.cateName}</Text>
                  <TouchableOpacity onPress={()=>removeCategory(item.cateCode)}>
                    <Text style={styles.danger}>삭제</Text>
                  </TouchableOpacity>
                </View>
              }
            />
            <Button title="닫기" onPress={()=>setCatModal(false)}/>
          </View>
        </Modal>

        {/* 상품 등록 Modal (간단 폼) */}
        <Modal visible={itemModal} animationType="slide">
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>상품 등록</Text>
            <TextInput placeholder="상품명" style={styles.input}
              onChangeText={v=>setInfo(i=>({...i,itemName:v}))}
            />
            <TextInput placeholder="가격"   style={styles.input} keyboardType="numeric"
              onChangeText={v=>setInfo(i=>({...i,price:v}))}
            />
            <TextInput placeholder="재고"   style={styles.input} keyboardType="numeric"
              onChangeText={v=>setInfo(i=>({...i,stock:v}))}
            />
            <TextInput placeholder="판매처" style={styles.input}
              onChangeText={v=>setInfo(i=>({...i,seller:v}))}
            />
            <TextInput placeholder="설명"   style={styles.input}
              onChangeText={v=>setInfo(i=>({...i,description:v}))}
            />
            {/* TODO: 이미지 업로드 및 preview */}
            <Button title="등록" onPress={createItem}/>
            <Button title="닫기" onPress={()=>setItemModal(false)}/>
          </View>
        </Modal>

        {/* 분류별 상품 리스트 */}
        {categories.map(cat=>(
          <View key={cat.cateCode} style={{marginTop:16}}>
            <Text style={styles.section}>{cat.cateName}</Text>
            <FlatList
              data={items.filter(i=>i.cateCode===cat.cateCode)}
              keyExtractor={i=>i.itemCode.toString()}
              renderItem={({item})=>(
                <View style={styles.row}>
                  <Text>{item.itemName}</Text>
                  <Text>{item.price.toLocaleString()}원</Text>
                </View>
              )}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#fff'},
  container:{padding:16},
  row:{flexDirection:'row',justifyContent:'space-between',marginBottom:12},
  section:{fontSize:18,fontWeight:'bold',marginVertical:8},
  input:{borderWidth:1,borderColor:'#ccc',borderRadius:4,padding:8,marginBottom:8},
  modal:{flex:1,padding:16,backgroundColor:'#fff'},
  modalTitle:{fontSize:20,fontWeight:'bold',marginBottom:12},
  danger:{color:'#c0392b'},
});
