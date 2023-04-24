/* eslint-disable prettier/prettier */
import { ReactNode, useState } from "react";
import styled from "styled-components";

import JoinedList from "./Joined/JoinedList";
import Keyword from "./Keword/Keyword";
import Proceed from "./ProceedList/Proceed";

const TabTitleBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.black300};
  column-gap: 3em;
  margin-bottom: 3em;
`;

const Tab = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.size18};

  &:hover {
    border-bottom: 3px solid ${(props) => props.theme.colors.cyan400};
  }

  &.active {
    font-weight: 900;
    border-bottom: 3px solid ${(props) => props.theme.colors.cyan400};
  }
`;

const ContentBox = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`;

interface TabsType {
  label: string;
  element: React.ReactNode;
}

const tabs: Array<TabsType> = [
  { label: "키워드", element: <Keyword /> },
  { label: "진행한 공구", element: <Proceed /> },
  { label: "참여한 공구", element: <JoinedList /> },
];

const UserContent = () => {
  const [selectedTab, setSelectedTab] = useState<ReactNode>(<Keyword />);

  return (
    <>
      <TabTitleBox>
        {tabs.map((el, index) => (
          <Tab
            key={index}
            className={selectedTab === el.element ? "active" : ""}
            onClick={() => setSelectedTab(el.element)}
          >
            {el.label}
          </Tab>
        ))}
      </TabTitleBox>
      <ContentBox>{selectedTab}</ContentBox>
    </>
  );
};

export default UserContent;
