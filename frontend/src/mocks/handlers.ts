/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
import { rest } from "msw";

import { DetailType } from "../types/post";
import { popularData, TotalData, UserData } from "./data";
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

interface Category {
  user_id: number;
  user_name: string;
  score: number;
  profileImage_uri: string;
  product_id: number;
  region: string;
  town: string;
  category: string;
  goal_num: number;
  state_num: number;
  image_uri: string;
  title: string;
  body: string;
  generated_time: string;
  ended_time: string;
  status: string;
  unit: string;
  base_price: number;
  stateQuantity: number;
}

const productData: DetailType[] = [];

let categoryData: Category[] = [
  {
    user_name: "호랑나비",
    user_id: 11111,
    product_id: 1004,
    profileImage_uri: "https://source.unsplash.com/80x80/?cat",
    category: "도서",
    title: "책구입하실분",
    image_uri:
      "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/861/099c440d992c30b318ee6890630dda11_res.jpeg",
    unit: "1",
    base_price: 10000,
    goal_num: 10,
    generated_time: "2023-04-20",
    ended_time: "2023-10-10",
    town: "강남구",
    region: "서울특별시",
    body: "<p>책 같이 구입하실분~~~</p>",
    stateQuantity: 0,
    score: 0,
    state_num: 0,
    status: "proceeding",
  },
  {
    user_name: "개방",
    user_id: 11112,
    product_id: 1005,
    profileImage_uri: "https://source.unsplash.com/80x80/?cat",
    category: "식품",
    title: "야채구입하실분~",
    image_uri: "https://source.unsplash.com/400x400/?vegetable",
    unit: "1",
    base_price: 10000,
    goal_num: 10,
    generated_time: "2023-04-20",
    ended_time: "2023-10-10",
    town: "강남구",
    region: "서울특별시",
    body: "<p>야채 같이 구입하실분~</p>",
    stateQuantity: 0,
    score: 0,
    state_num: 0,
    status: "proceeding",
  },
  {
    user_name: "스타벅",
    user_id: 11114,
    product_id: 1006,
    profileImage_uri: "https://source.unsplash.com/80x80/?cat",
    category: "식품",
    title: "밀키트 구입 하실 분~",
    image_uri: "https://source.unsplash.com/400x400/?food",
    unit: "1",
    base_price: 10000,
    goal_num: 10,
    generated_time: "2023-04-20",
    ended_time: "2023-10-10",
    town: "강남구",
    region: "서울특별시",
    body: "<p>야채 같이 구입하실분~</p>",
    stateQuantity: 0,
    score: 0,
    state_num: 0,
    status: "proceeding",
  },
  {
    user_name: "키친",
    user_id: 11115,
    product_id: 1007,
    profileImage_uri: "https://source.unsplash.com/80x80/?cat",
    category: "식품",
    title: "밀키트 구입 하실 분~",
    image_uri: "https://source.unsplash.com/400x400/?food",
    unit: "1",
    base_price: 10000,
    goal_num: 10,
    generated_time: "2023-04-20",
    ended_time: "2023-10-10",
    town: "강남구",
    region: "서울특별시",
    body: "<p>야채 같이 구입하실분~</p>",
    stateQuantity: 0,
    score: 0,
    state_num: 0,
    status: "proceeding",
  },
];

const handlers = [
  rest.get("/popular", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(popularData));
  }),

  rest.get("/groupbuying", (req, res, ctx) => {
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

    const randomID = Math.floor(Math.random() * 1000000);

    const findUser = UserData.find((element) => element.email === email);

    if (findUser) {
      return res(ctx.status(400, "user exists"));
    }

    if (findUser === undefined) {
      UserData.push({
        userId: Number(randomID),
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

    const filterData = TotalData.filter((data) => {
      if (
        data.user_id === Number(userid) &&
        data.product_id === Number(productid)
      ) {
        return data;
      }
    });
    return res(ctx.status(200), ctx.json(filterData[0]));
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
    return res(ctx.status(200), ctx.json(productData[0]));
  }),

  rest.post("/category", async (req, res, ctx) => {
    const { selectCategory } = await req.json();
    if (selectCategory === "전체") {
      return res(ctx.status(200), ctx.json(TotalData));
    }

    const filteredData = TotalData.filter(
      (data) => data.category === selectCategory
    );

    return res(ctx.status(200), ctx.json(filteredData));
  }),

  rest.post("/new", async (req, res, ctx) => {
    const productInfo = await req.json();
    const productId = Math.floor(Math.random() * 10000000);

    const newProduct: Category = {
      product_id: productId,
      user_id: productInfo.userId,
      user_name: productInfo.userNickname,
      profileImage_uri: productInfo.profileImage_uri,
      category: productInfo.category,
      title: productInfo.title,
      image_uri: "https://source.unsplash.com/400x400/?any",
      unit: productInfo.unit,
      base_price: productInfo.unitPerPrice,
      goal_num: productInfo.goalQuantity,
      generated_time: productInfo.startTime,
      ended_time: productInfo.endedTime,
      town: productInfo.town,
      region: productInfo.region,
      body: productInfo.edit,
      stateQuantity: 0,
      score: 0,
      state_num: 0,
      status: "PROCEED",
    };
    categoryData.unshift(newProduct);
    TotalData.push(newProduct);

    return res(ctx.status(200));
  }),

  rest.get("/user/:id", (req, res, ctx) => {
    const { id } = req.params;
    const myData = TotalData.filter((data) => data.user_id === Number(id));

    return res(ctx.status(200), ctx.json(myData));
  }),

  rest.post("/delete/post", async (req, res, ctx) => {
    const { userId, product_id } = await req.json();
    const isUser = UserData.find((el) => el.userId === userId) || false;

    if (isUser) {
      const findPost = TotalData.findIndex(
        (el) => el.product_id === product_id
      );
      delete TotalData[findPost];
    }

    return res(ctx.status(200), ctx.json("success"));
  }),
];

export default handlers;
