/* eslint-disable prettier/prettier */
import { IoChatbubbleEllipsesSharp } from "@react-icons/all-files/io5/IoChatbubbleEllipsesSharp";
import { Link, useLocation } from "react-router-dom";

import logoB from "../../../assets/Image/logo/logo-b.png";
import { useAppSelector } from "../../../hooks/Redux";
import Notification from "../../Notification";
import NavDropDown from "./Nav/NavDropDown";
import SearchInput from "./Search/SearchInput";
import * as S from "./style";

const UserFormHeader = () => {
  //TODO: 임시 로그인 상태 변수
  const isLogin = useAppSelector(state => state.login.isLogin);
  const location = useLocation();

  return (
    <S.Container>
      <S.HeaderBox>
        <S.LeftBox>
          <S.Logo>
            <Link to="/">
              <S.LogoImage src={logoB} />
            </Link>
          </S.Logo>
          <S.MenuBox>
            <S.MenuLink to="/groupbuying">공동구매</S.MenuLink>
            <S.MenuLink to="/category">카테고리</S.MenuLink>
          </S.MenuBox>
        </S.LeftBox>
        <SearchInput
          path={location.pathname}
          placeholder="검색어를 입력하세요."
          width="32%"
        />
        {isLogin ? (
          <S.RightBox>
            <Notification className="icon" />
            <Link to="/chat">
              <IoChatbubbleEllipsesSharp className="icon" />
            </Link>
            <NavDropDown className="icon" />
          </S.RightBox>
        ) : (
          <S.RightBox>
            <S.MenuLink to="/login"> 로그인 </S.MenuLink>
            <S.MenuLink to="/signup"> 회원가입 </S.MenuLink>
          </S.RightBox>
        )}
      </S.HeaderBox>
    </S.Container>
  );
};

export default UserFormHeader;
