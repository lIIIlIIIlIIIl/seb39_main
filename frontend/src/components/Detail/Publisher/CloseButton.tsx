import axios from "axios";
import styled from "styled-components";

import Button from "../../../common/Button/ButtonForm";
import { useAppSelector } from "../../../hooks/Redux";
import { useRouter } from "../../../hooks/useRouter";

const Container = styled(Button)`
  border-radius: 3px;
`;

type Props = {
  product_id: number;
};

const CloseButton = ({ product_id }: Props) => {
  const { userId } = useAppSelector((state) => state.login);
  const { routeTo } = useRouter();

  const CloseHandler = async () => {
    if (window.confirm("해당 공동구매 모집을 종료하시겠습니까?")) {
      const response = await axios
        .post("/delete/post", { userId, product_id })
        .then((res) => res.status === 200);

      response && routeTo("/user");
    }
  };

  return (
    <Container width="100%" height="2.5em" onClick={CloseHandler}>
      모집 종료
    </Container>
  );
};

export default CloseButton;
