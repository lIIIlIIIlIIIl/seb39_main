/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../../common/Button/ButtonForm";
import LabelInput from "../../common/Input/LabelInput";
import { useRouter } from "../../hooks/useRouter";
const Form = styled.form`
  width: 100%;
  padding: 1em;
`;

const LinkContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;

  > a {
    > span {
      font-size: ${({ theme }) => theme.fontSize.size12};
      color: ${({ theme }) => theme.colors.cyan500};
    }
  }
`;

const ButtoneContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LoginForm = () => {
  const { routeTo } = useRouter();

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const userEmail = formData.get("userEmail") as string;

    const userPassword = formData.get("userPassword") as string;

    if (!userEmail) {
      return alert("이메일을 입력해주세요.");
    }

    if (!userPassword) {
      return alert("비밀번호를 입력해주세요.");
    }

    const loginResult = await axios.post("/login", {
      userEmail,
      userPassword,
    });

    if (loginResult.status !== 200) {
      alert("이메일 또는 비밀번호를 확인해주세요.");
    }

    if (loginResult.status === 200) {
      console.log(loginResult.data);
      localStorage.setItem("user", JSON.stringify(loginResult.data));
      routeTo("/");
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <LabelInput id="userEmail" type="email" lableText="이메일" />
      <LabelInput id="userPassword" type="password" lableText="비밀번호" />
      <LinkContent>
        <Link to="/password">
          <span>비밀번호 찾기</span>
        </Link>
      </LinkContent>
      <ButtoneContent>
        <Button width="100%" height="3rem">
          로그인
        </Button>
      </ButtoneContent>
    </Form>
  );
};

export default LoginForm;
