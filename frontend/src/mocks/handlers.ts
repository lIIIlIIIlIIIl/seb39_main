/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
import { rest } from "msw";

import { DetailType } from "../types/post";
import { popularData, UserData } from "./data";
import {
  fullData,
  responseForPage1,
  responseForPage2,
  responseForPage3,
  responseForPage4,
  responseForPage5,
  responseForPage6,
  responseForPage7,
  responseForPage8,
  responseForPage9,
  responseForPage10,
} from "./datalist";

type user = {
  userEmail: string;
  userPassword: string;
  userNickname: string;
  userId: string;
}[];

const users: user = [
  {
    userEmail: "abc@naver.com",
    userPassword: "123123",
    userNickname: "손흥민",
    userId: "sunwpdk124145",
  },
];

const productData: DetailType[] = [];

const handlers = [
  rest.get("/popular", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(popularData));
  }),

  rest.get("https://groupbuying/api/", (req, res, ctx) => {
    const pageNumber = req.url.searchParams.get("page");
    let response;

    if (pageNumber === "1") {
      response = responseForPage1;
    }
    if (pageNumber === "2") {
      response = responseForPage2;
    }
    if (pageNumber === "3") {
      response = responseForPage3;
    }
    if (pageNumber === "4") {
      response = responseForPage4;
    }
    if (pageNumber === "5") {
      response = responseForPage5;
    }
    if (pageNumber === "6") {
      response = responseForPage6;
    }
    if (pageNumber === "7") {
      response = responseForPage7;
    }
    if (pageNumber === "8") {
      response = responseForPage8;
    }
    if (pageNumber === "9") {
      response = responseForPage9;
    }
    if (pageNumber === "10") {
      response = responseForPage10;
    }

    return res(ctx.status(200), ctx.delay(400), ctx.json(response));
  }),

  rest.post("/login", async (req, res, ctx) => {
    const { userEmail, userPassword } = await req.json();

    const findUser = UserData.find(
      (element) =>
        element.email === userEmail && element.password === userPassword
    );

    if (findUser === undefined) {
      return res(ctx.status(400, "fail"));
    }
    if (findUser) {
      return res(
        ctx.status(200),
        ctx.json({
          userId: findUser.userId,
          userNickname: findUser.nickName,
          profileImage_uri: "https://source.unsplash.com/80x80/?cat",
        })
      );
    }
  }),

  rest.post("/signup", async (req, res, ctx) => {
    const { email, nickName, password, region, town, profileUrl } =
      await req.json();

    const randomID =
      Date.now().toString(36) + Math.random().toString(36).slice(2);

    const findUser = UserData.find((element) => element.email === email);

    if (findUser) {
      return res(ctx.status(400, "user exists"));
    }

    if (findUser === undefined) {
      UserData.push({
        userId: randomID,
        email,
        nickName,
        password,
        region,
        town,
        profileUrl,
      });

      return res(ctx.status(200, "signup success"));
    }
  }),

  rest.get("/product/:userid/:productid", (req, res, ctx) => {
    const { userid, productid } = req.params;

    fullData.map((data) => {
      if (
        data.user_id === Number(userid) &&
        data.product_id === Number(productid)
      ) {
        productData[0] = data;
      }
    });
    console.log(productData[0]);
    return res(ctx.status(200), ctx.json(productData[0]));
  }),

  rest.get("/participate/:user_id/:product_id", async (req, res, ctx) => {
    const { user_id, product_id } = req.params;

    fullData.map((data) => {
      if (
        data.user_id === Number(user_id) &&
        data.product_id === Number(product_id)
      ) {
        productData[0] = data;
      }
    });
    console.log(productData[0]);
    return res(ctx.status(200), ctx.json(productData[0]));
  }),
];

export default handlers;
