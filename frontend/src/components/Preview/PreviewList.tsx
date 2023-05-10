/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { useRouter } from "../../hooks/useRouter";
import PreviewItem from "./PreviewItem";

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

type Props = {
  selected: string;
};

interface PageData {
  base_price: number;
  body: string;
  category: string;
  ended_time: string;
  generated_time: string;
  goal_num: number;
  image_uri: string;
  product_id: number;
  profileImage_uri: string;
  region: string;
  score: number;
  stateQuantity: number;
  state_num: number;
  status: string;
  title: string;
  town: string;
  unit: string;
  user_id: number;
  user_name: string;
}

const queryKey = "category";
const queryFn = (selectCategory: string) => {
  return axios.post(`/category`, { selectCategory }).then((res) => res.data);
};

const PreviewList = ({ selected }: Props) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async (selected: string) => {
    setIsLoading(true);
    const data = await queryFn(selected);
    setList((prev) => data);
    setIsLoading(false);
  };
  useEffect(() => {
    getData(selected);
  }, [selected]);

  if (isLoading) {
    return <h1>로딩중...</h1>;
  }

  return (
    <Container>
      <Grid>
        {list &&
          list.map((el: PageData) => {
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

export default PreviewList;
