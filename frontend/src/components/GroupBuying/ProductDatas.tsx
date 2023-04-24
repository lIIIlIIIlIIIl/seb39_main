/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import PreviewItem from "../Preview/PreviewItem";

const Container = styled.section`
  @media (min-width: ${(props) => props.theme.breakPoints.tablet}) {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Grid = styled.div`
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

const ProductDatas = () => {
  //! page url이 바뀔 때 마다 api url을 바꿔서 쏘기
  const { regions, towns } = useParams();

  const {
    data,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery(
    ["product", regions, towns],
    async ({ pageParam = 1 }) => {
      let url = "";
      if (regions) {
        url = `&region=${regions}`;
      }
      if (towns && regions) {
        url = `&region=${regions}&&town=${towns}`;
      }
      return await axios
        .get(`/groupbuying/?page=${pageParam}`)
        .then(({ data }) => {
          return data;
        });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.lenth !== 0 ? nextPage : undefined;
      },
      refetchOnMount: true,
    }
  );

  const handleScroll = () => {
    if (data?.pages[data.pages.length - 1].next === null) {
      return;
    }
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    if (!isFetchingNextPage && !hasNextPage) {
      return window.removeEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <Container>
        <h1>Loading...</h1>;
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <h1>게시물을 가져오는데 실패하였습니다.</h1>;
      </Container>
    );
  }

  if (data === undefined) {
    return <Container></Container>;
  }

  return (
    <Container>
      <Grid>
        {data &&
          data.pages.map((pageData: any) => {
            return pageData.results.map((el: any) => {
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
            });
          })}
      </Grid>
    </Container>
  );
};

export default ProductDatas;
