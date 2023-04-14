/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";

import InputForm from "../../common/Input/InputForm";

const InputContent = styled.div`
  width: 100%;
`;

const SignupInputs = () => {
  return (
    <InputContent>
      <InputForm
        id="userEmail"
        type="email"
        lableText="이메일"
        marginBottom="15px"
      />

      <InputForm
        id="userNickname"
        type="text"
        marginBottom="15px"
        lableText="닉네임"
      />

      <InputForm
        id="userPassword"
        type="password"
        marginBottom="15px"
        lableText="비밀번호"
      />

      <InputForm
        id="userPasswordConfirm"
        type="password"
        marginBottom="15px"
        lableText="비밀번호 확인"
      />
    </InputContent>
  );
};

export default SignupInputs;
