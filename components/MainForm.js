import React, { useState } from 'react';
import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';








const MainForm = ({ route, navigation }) => {




    const [isLoading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});

    /**
     * @param {React.SetStateAction<string>} textValue
     */
    const onChange = (textValue) => setId(textValue);

    /**
     * @param {React.SetStateAction<string>} password
     */
    const onPwChange = (password) => setPassword(password);

    /**
     * @param {string} id
     * @param {string} password
     */
    const userLogin = () => {

        if (userValidate() === true) {

            const user = {
                'userId': id,
                'userPw': password,
            };

            fetch('http://192.168.219.102:5100/api/v1/loginUser', {
                method: 'POST',
                body: JSON.stringify(user), // data can be `string` or {object}!
                headers: {
                    'Accept': 'application/json, text/javascript',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'x-requested-Wwith',
                    'Vary': 'Origin',
                },
            }).then((response) =>
                response.json()
            ).then((data) => {


                if(data.data[0] !== undefined) {
                    console.log('성공')
                 
                    navigation.navigate('MainBoard', {
                         //userId: id ,
                         itemId: Math.floor(Math.random() * 100),
                      });
                      
                    
                } else {
                    Alert.alert('에러', '로그인에 실패했습니다', [{text : '확인'}]);
                }

            }

            ).catch((error) => console.error(error))
                .finally(
                    console.log('finish')
                );


        }



    }




    const userValidate = () => {
        if (!id) {
            Alert.alert('에러', '아이디를 입력해주세요', [{ text: '확인' }]);
            return false;
        }
        if (!password) {
            Alert.alert('에러', '비밀번호를 입력해주세요', [{ text: '확인' }]);
            return false;
        }
        return true;
    };

    return (
        <View>

            <View
                style={styles.styleCenter}
            >

                <Image
                    style={
                        {
                            width: 400, height: 400,
                        }
                    }
                    source={require('../assets/chicken.jpg')}

                />
            </View>


            <TextInput placeholder="아이디를 입력해주세요" style={styles.input}
                autoFocus={true} onChangeText={onChange}
            >
            </TextInput>

            <TextInput placeholder="비밀번호를 입력해주세요" style={styles.input}
                onChangeText={onPwChange}
                secureTextEntry={true} >
            </TextInput>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <TouchableOpacity style={styles.btn} onPress={() => userLogin()}>
                    <Text style={styles.btnText}> <Icon name="plus" size={20}></Icon> 로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.push('SignForm')}>
                    <Text style={styles.btnText}> <Icon name="plus" size={20}></Icon> 회원가입</Text>
                </TouchableOpacity>
            </View>


            {/* {isLoading === true &&
            <LoginInfo id={id} password={password}></LoginInfo>
            } */}




        </View>

    );



};

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center'
    },
    styleCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },


});

export default MainForm;