// src/screens/OrdersInfoScreen.js

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, FlatList, StyleSheet,
  ActivityIndicator, TouchableOpacity, Modal, Button, ScrollView,
} from 'react-native';
import { GET } from '../../apis/CRUD';

export default function OrdersInfoScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sel, setSel] = useState(null);

  useEffect(() => {
    (async()=>{
      try {
        const res = await GET('http://192.168.204.19:8080/admin/orders');
        setOrders(res.data);
      } catch(e){console.error(e);}
      finally{setLoading(false);}
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.center} size="large" color="#3F7D58"/>;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={orders}
        keyExtractor={o=>o.orderNumber}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=>setSel(item)} style={styles.row}>
            <Text style={styles.cell}>{item.orderDate}</Text>
            <Text style={[styles.cell,{flex:2}]}>{item.orderNumber}</Text>
            <Text style={styles.cell}>{item.userId}</Text>
            <Text style={styles.cell}>{item.totalPrice.toLocaleString()}원</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={<Text style={styles.title}>주문 정보</Text>}
      />

      {/* 상세 Modal */}
      <Modal visible={!!sel} animationType="slide">
        <SafeAreaView style={styles.modal}>
          <ScrollView>
            <Text style={styles.modalTitle}>
              주문상세 ({sel?.orderNumber})
            </Text>
            {sel && (
              <>
                <Text>주문일자: {sel.orderDate}</Text>
                <Text>주문자: {sel.userName} ({sel.userId})</Text>
                <Text>주소: {sel.address}</Text>
                <Text>상태: {sel.orderStatus} / {sel.shippingStatus}</Text>
                <Text style={{marginTop:12, fontWeight:'bold'}}>상품목록</Text>
                {sel.items.map((it,i)=>(
                  <View key={i} style={styles.row}>
                    <Text>{i+1}.</Text>
                    <Text style={{flex:2}}>{it.productName}</Text>
                    <Text>x{it.qty}</Text>
                    <Text>{it.price.toLocaleString()}원</Text>
                  </View>
                ))}
              </>
            )}
            <Button title="닫기" onPress={()=>setSel(null)}/>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#fff'},
  center:{flex:1,justifyContent:'center'},
  title:{fontSize:20,fontWeight:'bold',textAlign:'center',padding:16},
  row:{flexDirection:'row',padding:12,borderBottomWidth:1,borderColor:'#eee'},
  cell:{flex:1,textAlign:'center'},
  modal:{flex:1,padding:16,backgroundColor:'#fff'},
  modalTitle:{fontSize:18,fontWeight:'bold',marginBottom:12},
});
