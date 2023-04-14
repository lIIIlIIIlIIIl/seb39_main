/* eslint-disable prettier/prettier */
import axios from "axios";
import styled from "styled-components";

import Button from "../../common/Button/ButtonForm";
import SignupSelect from "../../common/Select/SelectForm";
import { useRouter } from "../../hooks/useRouter";
import SignupInputs from "./SignupInputs";

const Form = styled.form`
  width: 100%;
`;

const SignupButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

interface UserInfo {
  email: string;
  password: string;
  nickName: string;
  region: string;
  town: string;
  profileUrl: string;
}

const SignupForm = () => {
  const { routeTo } = useRouter();
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("userEmail") as string;
    const nickName = formData.get("userNickname") as string;
    const password = formData.get("userPassword") as string;
    const passowrdConfirm = formData.get("userPasswordConfirm") as string;
    const region = formData.get("region") as string;
    const town = formData.get("town") as string;

    if (email === "") {
      return alert("이메일을 입력해주세요.");
    }
    if (nickName === "") {
      return alert("닉네임을 입력해주세요.");
    }
    if (password === "") {
      return alert("비밀번호를 입력해주세요.");
    }
    if (passowrdConfirm === "") {
      return alert("비밀번호를 확인해주세요.");
    }
    if (passowrdConfirm !== password) {
      return alert("비밀번호가 일치하지 않습니다");
    }
    if (region === "") {
      return alert("지역을 선택해주세요.");
    }
    if (town === "") {
      return alert("동네를 선택해주세요.");
    }

    if (
      email &&
      nickName &&
      password &&
      passowrdConfirm &&
      password === passowrdConfirm &&
      region &&
      town
    ) {
      const userInfo: UserInfo = {
        email,
        password,
        nickName,
        region,
        town,
        profileUrl: "https://source.unsplash.com/80x80/?cat",
      };

      const response = await axios.post("/signup", userInfo);

      if (response.status !== 200) {
        alert("회원가입 실패");
      }

      if (response.status === 200) {
        routeTo("/login");
      }
    }
  };
  return (
    <Form onSubmit={onSubmitHandler}>
      <SignupInputs />
      <SignupSelect label1="지역" label2="동네" />
      <SignupButton>
        <Button width="100%" height="3rem">
          회원가입
        </Button>
      </SignupButton>
    </Form>
  );
};

export default SignupForm;
