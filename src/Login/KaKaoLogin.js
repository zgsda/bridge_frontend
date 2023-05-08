import axios from 'axios';
import { useState } from 'react';
import { useEffect } from "react";
import kakaoLogo from '../Login/kakao_login_large.png';
import style from '../Login/Login.module.css'

// const KakaoLogin = ({history}) => {

// // const REST_API_KEY = "~~";
// // const REDIRECT_URI =  "http://localhost:3000/auth/kakao/callback";

// // export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// const KakaoLogin = ({history}) => {

const KakaoLogin = ({ }) => {
    const { Kakao } = window;

    const JAVASCRIPT_APP_KEY = '68aeb9a371fc365c535495a103132163';

    // 액세스 토큰을 상태 변수로 선언 
    // 로그인 버튼 출력 제어에 사용
    const [accessToken, setAccessToken] = useState('');
    const [userName, setUserName] = useState('');
    const [userNickName, setUserNickName] = useState('');


    const handlerLogin = () => {
        // 간편 로그인을 요청
        // 인증 성공 시 redirectUri 주소로 인가 코드를 전달

        Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/3'
        });
    };

    useEffect(() => {

        Kakao.init(JAVASCRIPT_APP_KEY);

        // 쿼리 스트링으로 부터 인가 코드를 추출
        const code = window.location.search.split('=')[1];
        if (code) {
            // REST API로 토큰 받기를 요청
            axios.post(
                'https://kauth.kakao.com/oauth/token', {
                grant_type: 'authorization_code',                   // 고정
                client_id: JAVASCRIPT_APP_KEY,                      // 앱 REST API 키
                redirect_uri: 'http://localhost:3000/3',   // 인가 코드가 리다이렉트된 URI
                code: code                                          // 인가 코드 받기 요청으로 얻은 인가 코드
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }
            )
                .then(response => {

                    console.log(response);

                    const accessToken = response.data.access_token;         // 사용자 액세스 토큰 값
                    setAccessToken(accessToken);

                    // 액세스 토큰 값을 할당
                    Kakao.Auth.setAccessToken(accessToken);
                    console.log(accessToken);

                    // 사용자 정보 가져오기
                    Kakao.API.request({
                        url: '/v2/user/me'
                    })
                        .then(response => {
                            // 사용자 정보 로깅
                            console.log(response);

                            // 애플리케이션에서 필요한 정보를 추출해서 로컬 스토리지에 저장
                            const { kakao_account } = response;
                            // console.log(kakao_account);

                            sessionStorage.setItem('userNickname', kakao_account.profile.nickname);
                            sessionStorage.setItem('userPhoto', kakao_account.profile.profile_image_url);
                            sessionStorage.setItem('email', kakao_account.email);
                            sessionStorage.setItem('accesstoken', accessToken);

                            axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/pass/login`, { "userNickName": kakao_account.profile.nickname,
                                    'userEmail' : kakao_account.email })
                                .then((response) => {
                                    console.log(response);
                                    if (response.data) {
                                        sessionStorage.setItem("token", response.data);
                                        alert('로그인 성공');
                                        window.location.href = "/";

                                    }
                                    else {
                                        sessionStorage.clear();
                                        alert('로그인 실패');
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    sessionStorage.clear();
                                    alert('일치하는 정보가 없습니다.');
                                })
                            // history.push('/');
                            // 홈(/) 화면으로 이동
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => console.log(error));
<<<<<<< HEAD
        }
    }, []);
=======
            }
        },[]);
>>>>>>> b7ba2cdb6019baca0a57afcb019b3cd69641535f



    return (
        <>
            {/* https://developers.kakao.com/tool/resource/login */}
            {!accessToken &&
<<<<<<< HEAD
                <img style={{ width: 277, height: 60, cursor: 'pointer' }}
                    src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_wide.png"
=======
                <img className={style.logo} style={{ width: 120, height: 60, cursor: 'pointer' }}
                    src={kakaoLogo}
>>>>>>> b7ba2cdb6019baca0a57afcb019b3cd69641535f
                    onClick={handlerLogin} />
            }
        </>
    );
}
export default KakaoLogin;


