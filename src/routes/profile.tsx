// // import { useEffect, useState } from "react";
// // // import { auth, db } from "../firebase";
// import styled from "styled-components";

// // // import { updateDoc, doc } from "firebase/firestore";
// // // import {
// // //   query,
// // //   collection,
// // //   where,
// // //   limit,
// // //   orderBy,
// // //   getDocs,
// // // } from "firebase/firestore";
// // // import type { ITweet } from "../components/timeline";
// // // import Tweet from "../components/tweet";
// // // import { updateProfile } from "firebase/auth";

// // const Wrapper = styled.div`
// //   display: flex;
// //   align-items: center;
// //   flex-direction: column;
// //   gap: 20px;
// // `;

// // const AvatarUpload = styled.label`
// //   width: 80px;
// //   overflow: hidden;
// //   height: 80px;
// //   border-radius: 50%;
// //   background-color: #1d9bf0;
// //   cursor: pointer;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   svg {
// //     width: 50px;
// //   }
// // `;

// // const AvatarImg = styled.img`
// //   width: 100%;
// // `;

// // const AvatarInput = styled.input`
// //   display: none;
// // `;

// // const Name = styled.span`
// //   font-size: 22px;
// // `;

// // const NameEditButton = styled.button`
// //   cursor: pointer;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   border: 2px solid white;
// //   height: 50px;
// //   width: 50px;
// //   border-radius: 25px;
// //   svg {
// //     width: 30px;
// //     fill: white;
// //   }
// // `;

// // const TextArea = styled.textarea`
// //   border: 2px solid white;
// //   padding: 20px;
// //   border-radius: 20px;
// //   font-size: 16px;
// //   color: white;
// //   background-color: black;
// //   width: 100%;
// //   resize: none;
// //   font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
// //     Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

// //   &::placeholder {
// //     font-size: 16px;
// //   }
// //   &:focus {
// //     outline: none;
// //     border-color: #1d9bf0;
// //   }
// // `;

// // // const Tweets = styled.div`
// // //   display: flex;
// // //   flex-direction: column;
// // //   gap: 10px;
// // // `;

// const Wrapper = styled.div`
//   // display: flex;
//   // flex-direction: column;
//   gap: 20px;
//   width: 100%;
//   height: 100vh;
// `;

// const Header = styled.div`
//   display: flex;
//   // flex-direction: row;
//   width: 100%;
//   height: 4rem;
//   padding: 0 3rem;
//   justify-content: space-between;
//   align-items: center;
//   flex-shrink: 0;
//   border-bottom: 1px solid #000;
//   background: #fff;
// `;

// const MyProfile = styled.h2`
//   flex: 1;
//   color: #000;
//   // font-family: Pretendard;
//   font-size: 1.25rem;
//   font-style: normal;
//   font-weight: 500;
//   line-height: normal;
// `;

// const LeftContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 4rem;
// `;

// const LeftInnerContainer = styled.div`
//   display: flex;
//   align-items: flex-start;
//   gap: 1.25rem;
// `;

// const ContentsContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex: 1;
//   height: 100%;
// `;

// const EmptySpace = styled.div`
//   flex: 3;
//   height: 100%;
// `;

// const ChattingSpace = styled.div`
//   flex: 84.9375;
//   // height: 103.8125rem;
//   height: 100%;
//   // position: relative;
//   // left: 3rem;
//   flex-shrink: 0;
//   // background-color: "tomato";
// `;

// const RegisteredInfo = styled.div`
//   position: relative;
//   // right: 0;
//   flex: 32.06;
//   height: 100%;
//   // height: 103.8125rem;
// `;

// const SitesContainer = styled.div`
//   position: absolute;
//   width: 80.5%;
//   top: 5.81rem;
//   right: 3rem;
// `;

// export default function Profile() {
//   return (
//     <Wrapper>
//       <Header>
//         <LeftContainer>
//           <MyProfile>로고</MyProfile>
//           <LeftInnerContainer>
//             <h4>정보설정</h4>
//             <h4>수집함</h4>
//           </LeftInnerContainer>
//         </LeftContainer>
//         <div>
//           <MyProfile>내 프로필</MyProfile>
//         </div>
//       </Header>
//       <ContentsContainer>
//         <EmptySpace>tmp</EmptySpace>
//         <ChattingSpace>tmp1</ChattingSpace>
//         <RegisteredInfo>
//           <SitesContainer>yap</SitesContainer>
//         </RegisteredInfo>
//       </ContentsContainer>
//     </Wrapper>
//   );
// }

// // export default function Profile({ id }: ITweet) {
// //   const user = auth.currentUser;
// //   const [avatar, setAvatar] = useState(user?.photoURL);
// //   // const [tweets, setTweets] = useState<ITweet[]>([]);
// //   const [edit, setEdit] = useState(false);
// //   const [editedNickName, setEditedNickName] = useState("");
// //   const [disable, setDisable] = useState(false);

// //   const fetchTweets = async () => {
// //     // const tweetQuery = query(
// //     //   collection(db, "tweets"),
// //     //   where("userId", "==", user?.uid),
// //     //   orderBy("createdAt", "desc"),
// //     //   limit(25)
// //     // );
// //     // const snapshot = await getDocs(tweetQuery);
// //     // const tweets = snapshot.docs.map((doc) => {
// //     //   const { tweet, createdAt, userId, username, photo } = doc.data();
// //     //   return {
// //     //     tweet,
// //     //     createdAt,
// //     //     userId,
// //     //     username,
// //     //     photo,
// //     //     id: doc.id,
// //     //   };
// //     // });
// //     // setTweets(tweets);
// //   };

// //   const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
// //     setEditedNickName(e.target.value);
// //   };

// //   const onEdit = async () => {
// //     try {
// //     } catch (e) {
// //       console.log(e);
// //     }
// //     setEdit(false);
// //   };

// //   useEffect(() => {
// //     fetchTweets();
// //   }, []);
// //   return (
// //     <Wrapper>
// //       <AvatarUpload htmlFor="avatar">
// //         {avatar ? (
// //           <AvatarImg src={avatar} />
// //         ) : (
// //           <svg
// //             data-slot="icon"
// //             fill="currentColor"
// //             viewBox="0 0 16 16"
// //             xmlns="http://www.w3.org/2000/svg"
// //             aria-hidden="true"
// //           >
// //             <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"></path>
// //           </svg>
// //         )}
// //       </AvatarUpload>
// //       <AvatarInput id="avatar" type="file" accept="image/*" />

// //       <Name>
// //         {edit ? (
// //           <TextArea
// //             defaultValue={user?.displayName ?? "Anonymous"}
// //             onChange={onChange}
// //           ></TextArea>
// //         ) : (
// //           user?.displayName ?? "Anonymous"
// //         )}
// //       </Name>
// //       {edit ? (
// //         <NameEditButton onClick={onEdit} className="done" disabled={disable}>
// //           Done
// //         </NameEditButton>
// //       ) : (
// //         <NameEditButton onClick={() => setEdit(true)}>
// //           <svg
// //             data-slot="icon"
// //             fill="currentColor"
// //             viewBox="0 0 20 20"
// //             xmlns="http://www.w3.org/2000/svg"
// //             aria-hidden="true"
// //           >
// //             <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z"></path>
// //             <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z"></path>
// //           </svg>
// //         </NameEditButton>
// //       )}
// //       {/* <Tweets>
// //         {tweets.map((tweet) => (
// //           <Tweet key={tweet.id} {...tweet} />
// //         ))}
// //       </Tweets> */}
// //     </Wrapper>
// //   );
// // }

import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f7f8fa;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e5e8eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  box-sizing: border-box;
`;

const LeftHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1d9bf0;
  letter-spacing: -0.5px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const NavItem = styled.button`
  background: none;
  border: none;
  color: #222;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  &:hover {
    color: #1d9bf0;
  }
`;

const ProfileTitle = styled.div`
  color: #222;
  font-size: 1.125rem;
  font-weight: 600;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  width: 100%;
  min-height: 0;
`;

const LeftSidebar = styled.aside`
  width: 240px;
  background: #fff;
  border-right: 1px solid #e5e8eb;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 24px;
  gap: 32px;
`;

const SidebarTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1d9bf0;
  margin-bottom: 16px;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const SidebarMenuItem = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? "#f1f8fd" : "none")};
  border: none;
  color: ${({ active }) => (active ? "#1d9bf0" : "#222")};
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #f1f8fd;
    color: #1d9bf0;
  }
`;

const CenterContent = styled.section`
  flex: 1.5;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ProfileCard = styled.div`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(29, 155, 240, 0.06);
  padding: 40px 32px;
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Avatar = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #e5e8eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #b0b8c1;
  font-weight: 700;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Name = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #222;
`;

const Email = styled.div`
  font-size: 1rem;
  color: #888;
`;

const RightPanel = styled.aside`
  width: 320px;
  background: #fff;
  border-left: 1px solid #e5e8eb;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 32px;
  gap: 32px;
`;

const InfoContainer = styled.div`
  display: flex;
  // width: 26.8125rem;
  width: 100%;
  padding: 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 0.75rem;
  background: #f7f7f8;
`;

const InfoContainerHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const InfoContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const InfoContents = styled.div`
  display: flex;
  // width: 18.9375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  width: 79.52%;
`;

const InfoLink = styled.a`
  word-break: break-all;
  color: #1d9bf0;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// const InfoTitle = styled.h3`
//   font-size: 1.125rem;
//   font-weight: 700;
//   color: #1d9bf0;
//   margin-bottom: 16px;
// `;

// const InfoSection = styled.div`
//   width: 100%;
//   color: #222;
//   font-size: 1rem;
// `;

export default function Profile() {
  return (
    <Wrapper>
      <Header>
        <LeftHeaderWrapper>
          <Logo>로고</Logo>
          <Nav>
            <NavItem>정보설정</NavItem>
            <NavItem>수집함</NavItem>
          </Nav>
        </LeftHeaderWrapper>
        <ProfileTitle>내 프로필</ProfileTitle>
      </Header>
      <Main>
        <LeftSidebar>
          <SidebarTitle>내 메뉴</SidebarTitle>
          <SidebarMenu>
            <SidebarMenuItem active>프로필</SidebarMenuItem>
            <SidebarMenuItem>알림 설정</SidebarMenuItem>
            <SidebarMenuItem>계정 관리</SidebarMenuItem>
          </SidebarMenu>
        </LeftSidebar>
        <CenterContent>
          <ProfileCard>
            <Avatar>👤</Avatar>
            <ProfileInfo>
              <Name>홍길동</Name>
              <Email>honggildong@email.com</Email>
            </ProfileInfo>
          </ProfileCard>
          {/* Add more content sections here as needed */}
        </CenterContent>
        <RightPanel>
          <InfoContainer>
            <InfoContainerHeader>
              <InfoContainerHeaderWrapper>
                <h4>등록된 웹사이트</h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.5898 11.7129C21.5898 12.7033 20.7904 13.5028 19.8 13.5028C18.8096 13.5028 18.0102 12.7033 18.0102 11.7129C18.0102 10.7226 18.8096 9.9231 19.8 9.9231C20.7904 9.9231 21.5898 10.7226 21.5898 11.7129ZM13.7797 11.7129C13.7797 12.7033 12.9802 13.5028 11.9898 13.5028C10.9995 13.5028 10.2 12.7033 10.2 11.7129C10.2 10.7226 10.9995 9.9231 11.9898 9.9231C12.9802 9.9231 13.7797 10.7226 13.7797 11.7129ZM4.17967 13.5028C5.17004 13.5028 5.9695 12.7033 5.9695 11.7129C5.9695 10.7226 5.17004 9.92309 4.17967 9.92309C3.18929 9.92309 2.38984 10.7226 2.38984 11.7129C2.38984 12.7033 3.18929 13.5028 4.17967 13.5028Z"
                    fill="#141618"
                  />
                </svg>
              </InfoContainerHeaderWrapper>
              <h4>4개</h4>
            </InfoContainerHeader>
            <InfoContents>
              <div>
                <h2>서강대학교 공지</h2>
                <InfoLink href="https://creative.sognag.ac.kr/blog/newsevents/">
                  https://creative.sognag.ac.kr/blog/newsevents/
                </InfoLink>
              </div>
              <div>
                <h2>서강대학교 공지</h2>
                <InfoLink href="https://creative.sognag.ac.kr/blog/newsevents/">
                  https://creative.sognag.ac.kr/blog/newsevents/
                </InfoLink>
              </div>
              <div>
                <h2>서강대학교 공지</h2>
                <InfoLink href="https://creative.sognag.ac.kr/blog/newsevents/">
                  https://creative.sognag.ac.kr/blog/newsevents/
                </InfoLink>
              </div>
            </InfoContents>
          </InfoContainer>
          {/* <InfoTitle>등록 정보</InfoTitle>
          <InfoSection>
            <div>이메일 인증 완료</div>
            <div>마지막 로그인: 2025-11-22</div>
          </InfoSection> */}
        </RightPanel>
      </Main>
    </Wrapper>
  );
}
