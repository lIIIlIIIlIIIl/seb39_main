import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import CategoryFilter from "../../components/Category/CategoryFilter";
import PreviewList from "../../components/Preview/PreviewList";
import { useRouter } from "../../hooks/useRouter";

const Page = styled.div`
  width: 100%;
  padding: 50px 0;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: ${(props) => props.theme.breakPoints.desktop}) {
    width: 70%;
    max-width: 900px;
  }
`;

const Category = () => {
  const { select } = useParams();
  const [selected, setSelected] = useState<string>(select ? select : "전체");
  const { routeTo } = useRouter();

  const changeSelect = (select: string) => {
    setSelected(select);

    if (select === "전체") return routeTo("/category");
    return routeTo(`/category/${select}`);
  };

  return (
    <Page>
      <Container>
        <CategoryFilter selected={selected} changeSelect={changeSelect} />
        <PreviewList selected={selected ? selected : ""} />
      </Container>
    </Page>
  );
};

export default Category;
