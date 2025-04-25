// app/sales/orders.jsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, FlatList,
  StyleSheet, ActivityIndicator, TouchableOpacity,
  Modal, Button, ScrollView
} from 'react-native';
import { GET } from '@/apis/CRUD';

const baseUrl = 'http://192.168.204.19:8080';

export default function OrdersInfoScreen() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [sel, setSel]         = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await GET(`${baseUrl}/admin/orders`);
        setOrders(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#3F7D58" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={orders}
        keyExtractor={o => o.orderNumber}
        ListHeaderComponent={<Text style={styles.title}>주문 정보</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => setSel(item)}
          >
            <Text style={[styles.cell,{flex:2}]}>{item.orderDate}</Text>
            <Text style={[styles.cell,{flex:3}]}>{item.orderNumber}</Text>
            <Text style={[styles.cell,{flex:2}]}>{item.userId}</Text>
            <Text style={[styles.cell,{flex:2}]}>{item.totalPrice.toLocaleString()}원</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!sel} animationType="slide">
        <SafeAreaView style={styles.modal}>
          <ScrollView>
            <Text style={styles.modalTitle}>주문상세 ({sel?.orderNumber})</Text>
            {sel && sel.items.map((it, i) => (
              <View key={i} style={styles.row}>
                <Text style={{flex:1}}>{i+1}.</Text>
                <Text style={{flex:3}}>{it.productName}</Text>
                <Text style={{flex:1}}>x{it.qty}</Text>
                <Text style={{flex:2}}>{it.price.toLocaleString()}원</Text>
              </View>
            ))}
            <Button title="닫기" onPress={() => setSel(null)} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex:1, backgroundColor:'#fff' },
  loader: { flex:1, justifyContent:'center', alignItems:'center' },
  title:  { fontSize:20, fontWeight:'bold', textAlign:'center', padding:16 },
  row:    { flexDirection:'row', padding:12, borderBottomWidth:1, borderColor:'#eee' },
  cell:   { textAlign:'center' },
  modal:  { flex:1, padding:16, backgroundColor:'#fff' },
  modalTitle:{ fontSize:18, fontWeight:'bold', marginBottom:12 },
});
