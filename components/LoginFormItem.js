// import React, { useState } from 'react';
// import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, FlatList, ActivityIndicator } from 'react-native';

// import { useSelector, useDispatch } from 'react-redux';
// // 모듈기능 참조
// import * as userModule from '../modules/userInfo';








// const LoginFormItem = (props) => {

//     /** Hook 기능을 통해 리덕스 상태값 가져오기 */
//     // -> useSelector()함수에 전달하는 콜백함수가 호출되면서 
//     //    state 파라미터에 newsModule 객체가 포함된다.
//     //    state.newsModule 안에서 사용하고자 하는 값들만 별도의 JSON으로 묶어 리턴할 수 있지만 일반적으로 module 안에 정의되어 있는 모든 기능을 그대로 리턴하고 사용할 값들만 비구조 문법으로 정의한다.
//     const { result, loading, error } = useSelector(state => {
//         console.log(state);
//         return {
//             ...state.userModule
//         };
//     });

//     /** action함수를 dispatch 시키기 위한 기능 가져오기 */
//     const dispatch = useDispatch();

//     /** match 값이 변경될 때만 실행되는 hook 정의 */
//     // 여기서 모듈에 정의해 놓은 thunk 함수를 dispatch하면 redux의 액션 함수가 실행되면서 상태값을 갱신하게 된다.
//     React.useEffect(() => {
//         dispatch(userModule.userInfoAsync(props.id, props.password));
//     }, [props]);

//     // 로딩중 메시지 표시
//     if (loading) {
//         return <Text style={{color: 'green'}}>잠시 기다려 주세요 ...</Text>;
//     }

//     // 에러 메시지 표시
//     if (error) {
//         return <Text style={{color: 'red'}}>{error}</Text>;
//     }



//     // 그 외의 정상인 경우
//     return (
//          <Text style={{color: 'green'}}>로그인이 정상 처리 되었습니다.</Text>

//     );
// };


// export default React.memo(LoginFormItem);