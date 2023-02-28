import { handleActions, createAction } from 'redux-actions';
// import axios from 'axios';

/** 1) 상태값 - 단순한 json 객체. */
const initialState = {
    loading: false,     // 현재 검색중인지 여부 (Ajax 시작시 true로 변경)
    result: [],         // Ajax를 통해 가져온 뉴스목록 (성공시에 내용이 채워짐)
    error: false        // 에러 발생 여부 (실패시 true로 변경)
};

/** 2) 액션 - 컴포넌트가 겪는 상황을 구분하는 문자열 값 */
// --> 일반적으로 Ajax 처리를 수행할 때는 하나의 기능에 3개의 상태값을 둔다.
// 리스트 가져오기 시작 --> loading값을 true로, result는 비우고, error는 false로 처리
const GET_USERINFO = 'User/GET_USERINFO';
// 리스트 가져오기 성공 --> loading값을 false로, result는 채우고, error는 false로 처리
const GET_USERINFO_SUCCESS = 'User/GET_USERINFO_SUCCESS';
// 리스트 가져오기 실패 --> loading값을 false로, result는 비우고, error는 true로 처리
const GET_USERINFO_FAILURE = 'User/GET_USERINFO_FAILURE';


const auth = 'http://124.49.227.243:8083/authenticate';

/** 3) 액션 생성 함수 - 액션 객체를 만들어서 리턴한다. */
// ReduxThunk에 의한 비동기 함수안에서 Ajax 처리 후, 결과를 반환하기 위해 이 함수들을 dispatch한다.
export const getUserInfoAction          = createAction(GET_USERINFO);
export const getUserInfoSuccessAction   = createAction(GET_USERINFO_SUCCESS);
export const getUserInfoFailureAction   = createAction(GET_USERINFO_FAILURE);

/** 4) 리듀서를 활용하여 스토어에 연결할 Action 정의하기 */
// Ajax 연동 상황에 따라 미리 정의한 상태값을 갱신하기만 하면 된다.
export default handleActions(
    {
        // 리스트 가져오기 시작 --> loading값을 true로, result는 비우고, error는 false로 처리
        [GET_USERINFO]: (state = initialState, action) => {
            return {
                ...state,
                loading: true,
                result: [],
                error: false
            };
        },
        // 리스트 가져오기 성공 --> loading값을 false로, result는 채우고, error는 false로 처리
        [GET_USERINFO_SUCCESS]: (state = initialState, action) => {
            return {
                ...state,
                loading: false,
                // 백엔드에서 전달하는 JSON 데이터 전문은 항상 action.payload 로 전달된다. 
                // 이 값을 통째로 활용할 것인지, 일부만 활용할 것인지에 따라
                // result에 채워 넣을 값이 결정된다.
                result: action.payload.result,
                error: false
            };
        },
        // 리스트 가져오기 실패 --> loading값을 false로, result는 비우고, error는 true로 처리
        [GET_USERINFO_FAILURE]: (state = initialState, action) => {
            return {
                ...state,
                loading: false,
                result: [],
                // 백엔드에서 전달하는 JSON 데이터 전문은 항상 action.payload 로 전달된다.
                // 에러가 발생한 경우 그 원인이 백엔드에 있다면
                // 대부분의 백엔드 시스템은 JSON 안에 에러 메시지를 포함시켜 전달해 준다.
                // 이 경우 어떤 json key에 에러 메시지가 저장되어 있는지를 문의하거나 메뉴얼 문서를 통해 확인해야 한다.
                error: action.payload.error
            };
        }
    },
    initialState
);

/** 5) 비동기 작업을 수행할 함수 정의 (ReduxThunk 적용) */
// 실제 동작할 함수 하나만 정의.
// 이 안에서 상태가 변경되도록 구성
export const userInfoAsync = (id, password) => async dispatch => {
    // 리스트 가져오기 시작 --> loading값을 true로, result는 비우고, error는 false로 처리
    dispatch(getUserInfoAction());

    const jwtRequest = {
        'userId': id,
        'userPw': password
    };

    // 예외처리: try 블록을 실행하는 도중 에러가 발생하면 그 즉시 처리를 중단하고 catch 블록으로 제어가 이동한다.
    try {
        // Ajax 연동 결과로 전달되는 JSON 전문은 response.data 로 접근할 수 있다.

        const token = '';


        const response = fetch(auth, {
            method: 'POST',
            body: JSON.stringify(jwtRequest), // data can be `string` or {object}!
            headers: {
                'Accept': 'application/json, text/javascript',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-requested-with',
                'Access-Control-Allow-Origin': 'http://192.168.219.101:8083/authenticate',
                'Vary': 'Origin'
            },

        })
            .then((response) =>
                response.json()
            )
            .then((json) =>
            dispatch(getUserInfoSuccessAction({result: json.token}))

            )
            .catch((error) => console.error(error))
            .finally();

        /** 리스트 가져오기 성공 --> loading값을 false로, result는 채우고, error는 false로 처리 */
        // 여기서 전달하는 파라미터가 action 함수 안에서 `action.payload`가 된다.
        // dispatch(getUserInfoSuccessAction({result: response.data}));
    } catch (e) {
        /** 리스트 가져오기 실패 --> loading값을 false로, result는 비우고, error는 true로 처리 */
        // 에러 내용을 로그에 출력해 보자!!!
        console.group("에러내용");
        console.error(e);
        console.groupEnd();
        // 여기서 전달하는 파라미터가 action 함수 안에서 `action.payload`가 된다.
        dispatch(getUserInfoFailureAction({error: '유저정보를 가지고 오는데 실패했습니다.'}));
    }
};