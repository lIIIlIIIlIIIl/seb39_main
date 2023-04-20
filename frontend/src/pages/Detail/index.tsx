/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Participant from "./Participant";
import Publisher from "./Publisher";

const Page = styled.div`
  width: 100%;
  padding: 70px 0;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Detail = () => {
  const { product_id, user_id } = useParams();
  const user = JSON.parse(localStorage.getItem("users") as string);

  //TODO Detail page Data 받아오기

  const { data } = useQuery(
    [product_id],
    async () =>
      await axios(`/${user_id}/${product_id}`).then(({ data }) => data)
  );

  if (!user) {
    return (
      <Page>
        <Container>
          {data && (
            <Participant
              user_id={data.user_id}
              user_name={data.user_name}
              score={data.score}
              profileImage_uri={data.profileImage_uri}
              product_id={data.product_id}
              region={data.region}
              unit={data.unit}
              town={data.town}
              goal_num={data.goal_num}
              category={data.category}
              state_num={data.state_num}
              image_uri={data.image_uri}
              title={data.title}
              body={data.body}
              generated_time={data.generated_time}
              ended_time={data.ended_time}
              status={data.status}
              base_price={data.base_price}
              enteredUser={data.enteredUser}
            />
          )}
        </Container>
      </Page>
    );
  }
  // data && data.userId === parseInt(user.userId)
  //   ? console.log("good")
  //   : console.log("fasle");

  return (
    //TODO: 쿠키의 user_id === user_id ? <게시자 페이지 /> : <참여자 페이지 />

    <Page>
      <Container>
        {data && parseInt(user.userId) === data.userId ? (
          <Publisher
            user_id={data.user_id}
            user_name={data.user_name}
            score={data.score}
            profileImage_uri={data.profileImage_uri}
            product_id={data.product_id}
            region={data.region}
            unit={data.unit}
            town={data.town}
            goal_num={data.goal_num}
            category={data.category}
            state_num={data.stateQuantity}
            image_uri={data.image_uri}
            title={data.title}
            body={data.body}
            generated_time={data.generated_time}
            ended_time={data.ended_time}
            status={data.state}
            base_price={data.base_price}
            enteredUser={data.enteredUser}
          />
        ) : (
          data && (
            <Participant
              user_id={data.user_id}
              user_name={data.user_name}
              score={data.score}
              profileImage_uri={data.profileImage_uri}
              product_id={data.product_id}
              region={data.region}
              unit={data.unit}
              town={data.town}
              goal_num={data.goal_num}
              category={data.category}
              state_num={data.state_num}
              image_uri={data.image_uri}
              title={data.title}
              body={data.body}
              generated_time={data.generated_time}
              ended_time={data.ended_time}
              status={data.state}
              base_price={data.base_price}
            />
          )
        )}
      </Container>
    </Page>
  );
};

export default Detail;
