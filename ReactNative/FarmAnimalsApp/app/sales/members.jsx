// src/screens/MembersInfoScreen.js

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, FlatList,
  TextInput, Button, StyleSheet, ActivityIndicator,
} from 'react-native';
import { GET } from '../../apis/CRUD';

export default function MembersInfoScreen() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kw, setKw] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await GET('http://192.168.204.19:8080/admin/members');
      setMembers(res.data);
    } catch(e){console.error(e);}
    finally{setLoading(false);}
  };

  useEffect(() => { fetchAll(); }, []);

  const search = async () => {
    setLoading(true);
    try {
      const res = await GET(
        `http://192.168.204.19:8080/admin/members/search?keyword=${kw}&page=0&size=5`
      );
      setMembers(res.data);
    } catch(e){console.error(e);}
    finally{setLoading(false);}
  };

  if (loading) {
    return <ActivityIndicator style={styles.center} size="large" color="#3F7D58"/>;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.searchRow}>
        <Text>회원 수: {members.length}명</Text>
        <TextInput
          style={styles.input}
          placeholder="회원 검색"
          value={kw}
          onChangeText={setKw}
        />
        <Button title="검색" onPress={search}/>
      </View>
      <FlatList
        data={members}
        keyExtractor={(m,i)=>i.toString()}
        renderItem={({item, index})=>(
          <View style={styles.row}>
            <Text style={styles.cell}>{members.length-index}</Text>
            <Text style={styles.cell2}>{item.userId}</Text>
            <Text style={styles.cell2}>{item.name}</Text>
            <Text style={styles.cell2}>{item.phoneNumber}</Text>
            <Text style={styles.cell2}>{item.email}</Text>
            <Text style={styles.cell2}>{item.address}</Text>
            <Text style={styles.cell2}>{item.authority}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={[styles.row, styles.headerRow]}>
            {['#','ID','이름','전화','이메일','주소','권한'].map((h,i)=>
              <Text key={i} style={styles.headerCell}>{h}</Text>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#fff'},
  center:{flex:1,justifyContent:'center'},
  searchRow:{flexDirection:'row',alignItems:'center',padding:16,justifyContent:'space-between'},
  input:{flex:1,borderWidth:1,borderColor:'#ccc',borderRadius:4,padding:8,marginHorizontal:8},
  row:{flexDirection:'row',padding:12,borderBottomWidth:1,borderColor:'#eee'},
  headerRow:{backgroundColor:'#f0f0f0'},
  cell:{width:30,textAlign:'center',fontWeight:'bold'},
  cell2:{flex:1,textAlign:'center'},
  headerCell:{flex:1,textAlign:'center',fontWeight:'bold'},
});
