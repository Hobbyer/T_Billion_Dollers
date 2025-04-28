import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Picker, ScrollView, Alert } from 'react-native';

const AdminAccountForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('superadmin');

  const handleSubmit = () => {
    if (name && email && password) {
      // 계정 생성 로직 처리 (예: API 요청)
      Alert.alert('계정 생성', `이름: ${name}\n이메일: ${email}\n권한: ${role}`);
    } else {
      Alert.alert('오류', '모든 필드를 입력해주세요.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🛠️ 관리자 계정 생성</Text>

      {/* 이름 입력 */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="관리자 이름을 입력하세요"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* 이메일 입력 */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          placeholder="관리자 이메일을 입력하세요"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* 비밀번호 입력 */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* 권한 선택 */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>권한</Text>
        <Picker
          selectedValue={role}
          style={styles.picker}
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="전체 관리자" value="superadmin" />
          <Picker.Item label="콘텐츠 관리자" value="contentadmin" />
          <Picker.Item label="사용자 관리자" value="useradmin" />
        </Picker>
      </View>

      {/* 제출 버튼 */}
      <Button title="계정 생성" onPress={handleSubmit} color="#32CD32" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0fff0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#006400',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#228B22',
  },
  input: {
    height: 40,
    borderColor: '#90ee90',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
  },
  picker: {
    height: 40,
    borderColor: '#90ee90',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default AdminAccountForm;
