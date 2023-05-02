import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { RiKakaoTalkFill } from "@react-icons/all-files/ri/RiKakaoTalkFill";
import { SiNaver } from "react-icons/si";
import styled from "styled-components";

interface Prop {
  backgroundColor?: string;
  borderRadius?: string;
  name?: string;
}

const OauthContent = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  margin: 0;
  padding: 0;
`;
const OauthLi = styled.li<Prop>`
  width: 50px;
  height: 50px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : ({ theme }) => theme.colors.black300};
  border: none;
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : "100%"};
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const socialLogin = [
  {
    name: "google",
    element: <FcGoogle size="30" />,
    background: "",
  },
  {
    name: "naver",
    element: <SiNaver size="26" color="white" />,
    background: "#03CF5B",
  },
  {
    name: "kakao",
    element: <RiKakaoTalkFill size="36" />,
    background: "#FEE501",
  },
];

const clickBtnHandler = (name: string | undefined) => {
  if (name === "kakao") {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    return url;
  }
};

const OauthsForm = () => {
  return (
    <OauthContent>
      {socialLogin.map((el) => (
        <OauthLi backgroundColor={el.background} key={el.name} name={el.name}>
          <a href={clickBtnHandler(el.name)}>{el.element}</a>
        </OauthLi>
      ))}
    </OauthContent>
  );
};

export default OauthsForm;
