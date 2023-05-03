import axios from "axios";
import { useQuery } from "react-query";
import styled from "styled-components";

import { useAppSelector } from "../../../hooks/Redux";
import PreviewItem from "../../Preview/PreviewItem";

const Container = styled.section`
  @media (min-width: ${(props) => props.theme.breakPoints.tablet}) {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 20px;
  padding: 0 1em;

  @media (min-width: ${(props) => props.theme.breakPoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 25px;
    grid-row-gap: 40px;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
    padding: 0;
  }
`;

const queryKey = "proceedList";
const queryFn = (userId: number) =>
  axios.get(`/user/${userId}`).then((res) => res.data);

const ProceedList = () => {
  const { userId } = useAppSelector((state) => state.login);
  const { data, isLoading, error } = useQuery(queryKey, () => queryFn(userId));

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <Container>
      <Grid>
        {data &&
          data.map((el: any) => {
            return (
              <PreviewItem
                key={el.product_id}
                product_id={el.product_id}
                user_id={el.user_id}
                image_uri={el.image_uri}
                title={el.title}
                user_name={el.user_name}
                town={el.town}
                goal_num={el.goal_num}
                state_num={el.state_num}
                ended_time={el.ended_time}
              />
            );
          })}
      </Grid>
    </Container>
  );
};

export default ProceedList;
