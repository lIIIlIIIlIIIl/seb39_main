/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import React, { useRef } from "react";
import styled from "styled-components";

import { categories } from "../../assets/Selector/SeletorOptions";
import Button from "../../common/Button/ButtonForm";
import InputForm from "../../common/Input/InputForm";
import CategorySelector from "../../common/Select/CategorySelector";
import SelectForm from "../../common/Select/SelectForm";
import { useRouter } from "../../hooks/useRouter";
import ImgUpload from "./ImgUpload";
import TextEditor from "./TextEditor";

const EditForm = styled.form`
  width: 100%;
`;

const DateComponent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const ButtonContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 50px;
`;

const WriteForm = () => {
  const editorRef = useRef<Editor>(null);
  const { routeBack, routeTo } = useRouter();

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  const toDay =
    month < 10 ? `${year}-0${month}-${day}` : `${year}-${month}-${day}`;

  const newProductHandler = async (evnet: React.FormEvent<HTMLFormElement>) => {
    evnet.preventDefault();
    const { userId, userNickname, profileImage_uri } = JSON.parse(
      localStorage.getItem("user") as string
    );

    const productData = new FormData(evnet.currentTarget);

    const productInfo = {
      userId,
      userNickname,
      profileImage_uri,
      category: productData.get("category") as string,
      title: productData.get("title") as string,
      productImage: URL.createObjectURL(
        productData.get("productImage") as Blob
      ),
      unit: productData.get("unit") as string,
      unitPerPrice: productData.get("unitPerPrice") as string,
      goalQuantity: productData.get("goalQuantity") as string,
      startTime: toDay,
      endedTime: productData.get("endedTime") as string,
      town: productData.get("town") as string,
      region: productData.get("region") as string,
      edit: editorRef.current?.getInstance().getHTML(),
    };

    const response = await axios.post("/new", productInfo);

    if (response.status === 200) {
      return;
    }
  };

  const writeButtonHandler = () => {
    routeTo("/user");
  };

  const cancelButtonHandler = () => {
    routeBack();
  };

  return (
    <EditForm onSubmit={newProductHandler}>
      <CategorySelector
        name="category"
        lableText="카테고리"
        options={categories}
      />
      <InputForm
        name="title"
        lableText="상품명"
        type="text"
        marginBottom="2rem"
      />
      <ImgUpload name="productImage" />
      <InputForm name="unit" lableText="단위" type="text" marginBottom="2rem" />
      <InputForm
        name="unitPerPrice"
        lableText="단위 당 금액"
        type="number"
        marginBottom="2rem"
      />
      <InputForm
        name="goalQuantity"
        lableText="총수량"
        type="number"
        marginBottom="2rem"
      />
      <DateComponent>
        <InputForm
          name="startTime"
          lableText="시작 날짜"
          type="date"
          width="48%"
          value={toDay}
        />
        <InputForm
          name="endedTime"
          lableText="종료 날짜"
          type="date"
          width="48%"
        />
      </DateComponent>
      <SelectForm label1="지역" label2="동네" />
      <TextEditor editorRef={editorRef} />
      <ButtonContent>
        <Button
          backgroundColor="#BDBDBD"
          hoverBackground="#9E9E9E"
          onClick={cancelButtonHandler}
          width="150px"
          height="2.5rem"
        >
          취소
        </Button>
        <Button onClick={writeButtonHandler} width="150px" height="2.5rem">
          작성
        </Button>
      </ButtonContent>
    </EditForm>
  );
};

export default WriteForm;
