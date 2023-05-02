/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import styled from "styled-components";

import { useRouter } from "../../hooks/useRouter";

const getKaKaoUserData = async (token: string) => {
  const kakaoUser = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userInfo = {
    profileImage_uri: kakaoUser.data.properties.profile_image,
    userId: kakaoUser.data.id,
    userNickname: kakaoUser.data.properties.nickname,
  };

  localStorage.setItem("user", JSON.stringify(userInfo));
};

const KakaoOauth = () => {
  const { routeTo } = useRouter();

  const params = new URL(document.location.toString()).searchParams;
  const AUTHORIZE_CODE = params.get("code");
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const client_id = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const grant_type = "authorization_code";

  const getToken = async () => {
    const response = await axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        return { success: "ok", accessToken: res.data.access_token };
      });

    if (response.success === "ok") {
      getKaKaoUserData(response.accessToken);
      routeTo("/");
    }
  };

  getToken();

  return (
    <Wrap>
      <h1>로그인 중...</h1>
    </Wrap>
  );
};

export default KakaoOauth;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
