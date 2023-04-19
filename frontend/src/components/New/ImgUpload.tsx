/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AiOutlinePicture } from "@react-icons/all-files/ai/AiOutlinePicture";
import { RiDeleteBin5Line } from "@react-icons/all-files/ri/RiDeleteBin5Line";
import React, { useRef, useState } from "react";
import styled from "styled-components";

import Button from "../../common/Button/ButtonForm";

const ImgContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  > label {
    font-weight: bolder;
    font-size: ${({ theme }) => theme.fontSize.size15};
  }
`;

const ImgContent = styled.div`
  width: 100%;
  padding: 2rem 0;
  > img {
    display: block;
    width: 280px;
    height: 240px;
    margin: 0 auto;
  }
`;
const ButtonContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  > input {
    display: none;
  }
`;

interface PageProps {
  name: string;
}

const ImgUpload = ({ name }: PageProps) => {
  const [fileImage, setFileImage] = useState<string>("");

  const titleImgRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const onImgChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    console.log("file", file);
    if (!file) return;
    const url = URL.createObjectURL(file[0]);
    setFileImage(url);
  };

  const onInputClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    titleImgRef.current?.click();
  };

  const onImgDeleteHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setFileImage("");
  };

  return (
    <ImgContainer>
      <label htmlFor="titleImg">대표 이미지</label>
      <ImgContent>
        {fileImage && (
          <img alt="upload_image" src={fileImage ? fileImage : ""} />
        )}
      </ImgContent>
      <ButtonContent>
        <input
          type="file"
          id="titleImg"
          accept="image/*"
          name={name}
          ref={titleImgRef}
          onChange={onImgChangeHandler}
        />
        <Button onClick={onInputClickHandler}>
          <AiOutlinePicture size="40" />
        </Button>
        {fileImage && (
          <Button onClick={onImgDeleteHandler}>
            <RiDeleteBin5Line size="40" />
          </Button>
        )}
      </ButtonContent>
    </ImgContainer>
  );
};

export default ImgUpload;
