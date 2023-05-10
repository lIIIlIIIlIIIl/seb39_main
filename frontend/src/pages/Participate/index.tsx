/* eslint-disable prettier/prettier */
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import ParticipateInfo from "../../components/Participate/ParticipateInfo";
import ProductDetail from "../../components/Participate/ProductDetail";

const Container = styled.div`
  width: 100%;
  padding: 90px 0 40px 0;
`;

const ParticipateContainer = styled.div`
  width: 40%;
  padding: 34px 32px 32px;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 7px 0px;
  margin: 0 auto;
`;

const Participate = () => {
  const { product_id, user_id } = useParams();

  const { data } = useQuery(
    [product_id],
    async () =>
      await axios(`/${user_id}/${product_id}`).then(({ data }) => data)
  );

  return (
    <Container>
      <ParticipateContainer>
        {data && (
          <ProductDetail
            ended_time={data.ended_time}
            goal_num={data.goal_num}
            state_num={data.state_num}
            title={data.title}
            image_uri={data.image_uri}
            unit={data.unit}
          />
        )}
        {data && (
          <ParticipateInfo
            base_price={data.base_price}
            goal_num={data.goal_num}
            product_id={data.product_id}
            state_num={data.state_num}
          />
        )}
      </ParticipateContainer>
    </Container>
  );
};

export default Participate;
