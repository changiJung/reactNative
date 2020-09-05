import React, { useState } from 'react'
import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignForm = ({ navigation }) => {

    // State 체크
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [chkpassword, setChkPassword] = useState('');
    const [email, setEmail] = useState('');

    const onChangeId = (textValue) => setId(textValue);
    const onChangePw = (textValue) => setPassword(textValue);
    const onChangePwChk = (textValue) => setChkPassword(textValue);
    const onChangeEmail = (textValue) => setEmail(textValue);

    const validateSign = () => {
        if (!id) {
            Alert.alert('에러', '아이디를 입력해주세요', [{ text: '확인' }]);
            return false;
        }
        if (password !== chkpassword) {
            Alert.alert('에러', '비밀번호가 일치하지 않습니다', [{ text: '확인' }]);
            return false;
        }
        if (!email) {
            Alert.alert('에러', '이메일을 입력해주세요', [{ text: '확인' }]);
            return false;
        }
        return true;
    }

    const signUser = async () => {
        if (validateSign() === true) {


            //유저 생성
            const user = {
                'userId': id,
                'userPw': password,
                'userEmail': email
            };

            fetch('http://192.168.219.102:5100/api/v1/user', {
                method: 'POST',
                body: JSON.stringify(user), // data can be `string` or {object}!
                headers: {
                    'Accept': 'application/json, text/javascript',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'x-requested-with',
                    'Vary': 'Origin',
                },
            }).then((response) =>
                response.json()
            ).then((data) =>
                navigation.push('MainForm')
            ).catch((error) => console.error(error))
                .finally(
                    console.log('finish')
                );


        }


    }



    return (



        <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 4, flexDirection: "row" }}>
                <View style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={styles.flex4}>
                        <Text>
                            <Icon name="id-badge" size={20}></Icon>

                            아이디
                            </Text>
                    </View>
                    <View style={styles.flex4}>
                        <Text>비밀번호</Text>
                    </View>
                    <View style={styles.flex4}>
                        <Text>비밀번호확인</Text>
                    </View>
                    <View style={styles.flex4}>
                        <Text>이메일</Text>
                    </View>
                </View>
                <View style={{ flex: 3 }}>
                    <View style={styles.flexLeft}>
                        <TextInput placeholder="아이디를 입력해주세요" style={styles.input}
                            onChangeText={onChangeId}>
                        </TextInput>
                    </View>
                    <View style={styles.flexLeft}>
                        <TextInput placeholder="비밀번호를 입력해주세요" style={styles.input}
                            onChangeText={onChangePw}
                            secureTextEntry={true} >
                        </TextInput>
                    </View>
                    <View style={styles.flexLeft}>
                        <TextInput placeholder="비밀번호를 입력해주세요" style={styles.input}
                            onChangeText={onChangePwChk}
                            secureTextEntry={true} >
                        </TextInput>
                    </View>
                    <View style={styles.flexLeft}>
                        <TextInput placeholder="이메일을 입력해주세요" style={styles.input}
                            onChangeText={onChangeEmail}>
                        </TextInput>
                    </View>

                </View>
            </View>

            <View style={{ flexDirection: "row", paddingTop: 5, alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity style={styles.btn} onPress={() => signUser()}>
                    <Text style={styles.btnText}> <Icon name="plus" size={20}></Icon> 회원가입</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
                    <Text style={styles.btnText}> <Icon name="plus" size={20}></Icon> 뒤로가기</Text>
                </TouchableOpacity>
            </View>
        </View >

    )
}

const styles = StyleSheet.create({
    flex4: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    flexLeft: {
        flex: 1, alignItems: 'stretch', justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
    },
    borderLeft: {
        borderBottomLeftRadius: 40,
        padding: 5,
    }



});

export default SignForm;