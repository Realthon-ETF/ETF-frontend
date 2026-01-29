import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api";

import { Sidebar } from "../components/profile/Sidebar";
import { BasicInfoSection } from "../components/profile/BasicInfoSection";
import { ResumeSection } from "../components/profile/ResumeSection";
import { LikedSection } from "../components/profile/LikedSection";
import { Section } from "../components/profile/Profile.style";

import type { ProfileFormData, ProfileResponse } from "../types/auth";
import type { ResumeFormData, ResumeResponse } from "../types/resume";
import type { LikedResponse, NotificationItem } from "../types/notification";

import type { CategoryType } from "../components/notifications/constants";

// Define Tab Types
type TabType = "basic" | "summary" | "website" | "likes";

export default function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // State for Navigation Logic
  const [activeTab, setActiveTab] = useState<TabType>("basic");

  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    phone: "",
    email: "",
    school: "",
    major: "",
    interest: "",
    alarmPeriod: "",
    alarmTime: "",
  });

  const [resumeData, setResumeData] = useState<ResumeFormData>({
    summary: "요약문을 넣습니다. 유저가 수정할 수 있는 내용입니다.",
  });

  const [likedNotifications, setLikedNotifications] = useState<
    NotificationItem[]
  >([]);

  const [isProfileEditable, setIsProfileEditable] = useState<boolean>(false);
  const [isResumeEditable, setIsResumeEditable] = useState<boolean>(false);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const { data } = await api.get<ProfileResponse>("/auth/me");
  //       setFormData((prev) => ({
  //         ...prev,
  //         name: data.username,
  //         phone: data.phoneNumber,
  //         email: data.email,
  //         school: data.school,
  //         major: data.major,
  //         interest: data.interestFields.join(", "),
  //         alarmPeriod: data.intervalDays.toString(),
  //         alarmTime: data.alarmTime ? data.alarmTime.split(":")[0] : "09",
  //       }));
  //     } catch (err) {
  //       console.error("Profile fetch failed:", err);
  //     }

  //     try {
  //       const { data } = await api.get<ResumeResponse>("/auth/resume");
  //       setFormData((prev) => ({
  //         ...prev,
  //         summary: data.summary,
  //       }));
  //     } catch (err) {
  //       console.error("Resume fetch failed:", err);
  //     } finally {
  //       // Set loading to false after both requests attempt to finish
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     // 1. Initiate both requests simultaneously (do not await yet)
  //     // We attach a .catch() to each promise individually so one failure doesn't kill the other.
  //     const profilePromise = api
  //       .get<ProfileResponse>("/auth/me")
  //       .catch((err) => {
  //         console.error("Profile fetch failed:", err);
  //         return null; // Return null to signal failure
  //       });

  //     const resumePromise = api
  //       .get<ResumeResponse>("/auth/resume")
  //       .catch((err) => {
  //         console.error("Resume fetch failed:", err);
  //         return null;
  //       });

  //     const likedPromise = api
  //       .get<LikedResponse>("/notifications/likes")
  //       .catch((err) => {
  //         console.error("Profile fetch failed:", err);
  //         return null;
  //       });

  //     try {
  //       // 2. Wait for all of the APIs to finish
  //       const [profileRes, resumeRes, likedRes] = await Promise.all([
  //         profilePromise,
  //         resumePromise,
  //         likedPromise,
  //       ]);

  //       // 3. Process the results cleanly
  //       setFormData((prev) => {
  //         let newData = { ...prev };

  //         // Update Profile Data if successful
  //         if (profileRes?.data) {
  //           const { data } = profileRes;
  //           newData = {
  //             ...newData,
  //             name: data.username,
  //             phone: data.phoneNumber,
  //             email: data.email,
  //             school: data.school,
  //             major: data.major,
  //             interest: data.interestFields.join(", "),
  //             alarmPeriod: data.intervalDays.toString(),
  //             alarmTime: data.alarmTime ? data.alarmTime.split(":")[0] : "09",
  //           };
  //         }

  //         // if (resumeRes.status === "fulfilled" && resumeRes.value) {
  //         //   newData.summary = resumeRes.value.data.summary;
  //         // }
  //         return newData;
  //       });

  //       setResumeData((prev) => {
  //         let newData = { ...prev };
  //         if (resumeRes?.data) {
  //           const { data } = resumeRes;
  //           newData = {
  //             ...newData,
  //             summary: data.summary,
  //           };
  //         }
  //         return newData;
  //       });

  //       // setLikedNotifications((prev) => {
  //       //   let newData = { ...prev };
  //       //   if (resumeRes?.data) {
  //       //     const { data } = likedRes;
  //       //     newData = {
  //       //       ...newData,
  //       //     };
  //       //   }
  //       //   return newData;
  //       // });
  //       if (likedRes?.data) {
  //       const transformed: NotificationItem[] = likedRes.data.notifications.map((notif) => ({
  //         id: notif.notificationId.toString(),
  //         category: (notif.category as CategoryType) || "취업 포털",
  //         title: notif.title,
  //         source: notif.sourceName,
  //         url: notif.originalUrl,
  //         isLiked: notif.liked,
  //         // Add any defaults your UI expects
  //         isNew: false,
  //       }));

  //       setLikedNotifications(transformed);
  //     }

  //     } catch (err) {
  //       console.error("Unexpected error during parallel fetch:", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // 1. Initiate all requests in parallel
      const profilePromise = api
        .get<ProfileResponse>("/auth/me")
        .catch((err) => {
          console.error(err);
          return null;
        });
      const resumePromise = api
        .get<ResumeResponse>("/auth/resume")
        .catch((err) => {
          console.error(err);
          return null;
        });
      const likedPromise = api
        .get<LikedResponse>("/notifications/likes")
        .catch((err) => {
          console.error(err);
          return null;
        });

      try {
        // 2. Wait for everything
        const [profileRes, resumeRes, likedRes] = await Promise.all([
          profilePromise,
          resumePromise,
          likedPromise,
        ]);

        // 3. Update Profile State
        if (profileRes?.data) {
          const { data } = profileRes;
          setFormData((prev) => ({
            ...prev,
            name: data.username,
            phone: data.phoneNumber,
            email: data.email,
            school: data.school,
            major: data.major,
            interest: data.interestFields.join(", "),
            alarmPeriod: data.intervalDays.toString(),
            alarmTime: data.alarmTime ? data.alarmTime.split(":")[0] : "09",
          }));
        }

        // 4. Update Resume State
        if (resumeRes?.data) {
          setResumeData({ summary: resumeRes.data.summary });
        }

        // 5. Update and TRANSFORM Liked Notifications
        if (likedRes?.data) {
          const transformed: NotificationItem[] =
            likedRes.data.notifications.map((notif) => ({
              id: notif.notificationId.toString(),
              category: (notif.category as CategoryType) || "취업 포털",
              title: notif.title,
              source: notif.sourceName,
              url: notif.originalUrl,
              isLiked: notif.liked,
              // // Add any defaults your UI expects
              // isNew: false,
            }));

          setLikedNotifications(transformed);
        }
      } catch (err) {
        console.error("Parallel fetch failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "summary") {
      setResumeData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      // Otherwise update profile formData
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleProfileEditBtnClick = async () => {
    if (isLoading) return;

    if (isProfileEditable) {
      try {
        setIsLoading(true);
        await api.patch("/auth/me", {
          username: formData.name,
          phoneNumber: formData.phone,
          email: formData.email,
          school: formData.school,
          major: formData.major,
          intervalDays: parseInt(formData.alarmPeriod, 10),
          alarmTime: `${(formData.alarmTime || "09").padStart(2, "0")}:00:00`,
        });
        alert("저장되었습니다.");
      } catch (err) {
        alert("저장에 실패했습니다.");
        return;
      } finally {
        setIsLoading(false);
      }
    }
    setIsProfileEditable((prev) => !prev);
  };

  const handleResumeEditBtnClick = async () => {
    if (isLoading) return;

    if (isResumeEditable) {
      try {
        setIsLoading(true);
        await api.patch("/auth/resume", {
          summary: resumeData.summary,
        });
        alert("저장되었습니다.");
      } catch (err) {
        alert("저장에 실패했습니다.");
        return;
      } finally {
        setIsLoading(false);
      }
    }
    setIsResumeEditable((prev) => !prev);
  };

  const handleToggleLike = async (id: string) => {
    // Optimistic Update: Remove from list immediately if it's the "Likes" page
    // because unliking something here means it should disappear.
    const previousState = [...likedNotifications];

    // Remove the item from view immediately
    setLikedNotifications((prev) => prev.filter((item) => item.id !== id));

    try {
      // API Call (Assuming you have an endpoint for this)
      await api.post(`/notifications/${id}/like`);
    } catch (err) {
      console.error("Like toggle failed", err);
      // Revert if API fails
      setLikedNotifications(previousState);
      alert("요청을 처리하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <PageWrapper>
      <ProfileContainer>
        {/* Changed from div to Semantic <Sidebar> (aside) */}
        {/* <Sidebar>
          <div className="sidebar-header">
            <h1>
              {formData.name}님의
              <br />
              마이페이지
            </h1>

          </div>
          <div className="divider" />

          <nav className="nav-menu">
            <ul>
              <li>
                <button
                  className={`nav-item ${activeTab === "basic" ? "active" : ""}`}
                  onClick={() => setActiveTab("basic")}
                >
                  기본 정보
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${activeTab === "summary" ? "active" : ""}`}
                  onClick={() => setActiveTab("summary")}
                >
                  내 요약 정보
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${activeTab === "website" ? "active" : ""}`}
                  onClick={() => setActiveTab("website")}
                >
                  내 웹사이트
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${activeTab === "likes" ? "active" : ""}`}
                  onClick={() => setActiveTab("likes")}
                >
                  좋아요
                </button>
              </li>
            </ul>
          </nav>

          <button className="logout-btn">로그아웃</button>
        </Sidebar> */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userName={formData.name || "유저"}
        />

        <MainContent>
          {/* Conditional Rendering based on activeTab */}
          {activeTab === "basic" && (
            <BasicInfoSection
              data={formData}
              isEditable={isProfileEditable}
              isLoading={isLoading}
              onEditToggle={handleProfileEditBtnClick}
              onChange={onChange}
            />
          )}
          {activeTab === "summary" && (
            <ResumeSection
              summary={resumeData.summary}
              isEditable={isResumeEditable}
              isLoading={isLoading}
              onEditToggle={handleResumeEditBtnClick}
              onChange={onChange} // This handles the textarea update
            />
          )}
          {activeTab === "website" && (
            <Section>
              <h2>준비 중입니다.</h2>
            </Section>
          )}
          {activeTab === "likes" && (
            <LikedSection
              notifications={likedNotifications}
              onToggleLike={handleToggleLike}
            />
          )}
        </MainContent>
      </ProfileContainer>
    </PageWrapper>
  );
}

// --- Styled Components ---

const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  // padding-bottom: 4rem;
  background: #fff;
  display: flex;
  justify-content: flex-start;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// 1. Changed to 'aside' for semantics
// const Sidebar = styled.aside`
//   width: 30%;
//   background: #f7fbff;
//   padding: 3.5rem 2rem;
//   min-height: calc(100vh - 4rem);
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
//   border-right: 1px solid #eaebec;

//   @media (max-width: 768px) {
//     width: 100%;
//     min-height: auto;
//     padding: 2rem;
//   }

//   .sidebar-header {
//     h1 {
//       color: #141618;
//       font-size: 2rem;
//       font-weight: 600;
//       margin: 0;
//       white-space: pre-wrap;
//       line-height: 1.3;
//     }

//     .subtitle {
//       color: #06f;
//       font-size: 1.25rem;
//       font-weight: 700;
//       margin-top: 1rem;
//       margin-bottom: 0;
//     }
//   }

//   .divider {
//     height: 1px;
//     background: #eaebec;
//     width: 100%;
//   }

//   .nav-menu {
//     ul {
//       list-style: none;
//       padding: 0;
//       margin: 0;
//       display: flex;
//       flex-direction: column;
//       gap: 2rem;
//     }

//     /* 2. Changed styling for button instead of p */
//     .nav-item {
//       font-size: 1.25rem;
//       font-weight: 500;
//       color: #46474c;
//       cursor: pointer;
//       transition: all 0.2s;

//       /* Reset button default styles */
//       background: none;
//       border: none;
//       text-align: left;
//       padding: 0;
//       font-family: inherit;
//       width: 100%;

//       &.active {
//         color: #06f;
//         font-weight: 700;
//       }

//       &:hover {
//         color: #06f;
//       }
//     }
//   }

//   .logout-btn {
//     margin-top: auto;
//     text-decoration: underline;
//     color: #878a93;
//     font-size: 1rem;
//     cursor: pointer;
//     border: none;
//     background: none;
//     padding: 0;
//     font-weight: 500;
//     text-align: left;
//   }
// `;

const MainContent = styled.main`
  flex: 1;
  padding: 5.5rem 3rem;
  max-width: 700px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

// 직전 버전 코드
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { InputGroup } from "../components/input-group";
// import editicon from "../assets/edit-icon.svg";
// import api from "../api"; // Import your axios instance
// // import { useAuth } from "../AuthContext";

// interface ProfileFormData {
//   name: string;
//   phone: string;
//   email: string;
//   school: string;
//   major: string;
//   interest: string; // Managed as a string in the UI
//   alarmPeriod: string; // Managed as string to match <select> value
//   alarmTime: string; // Managed as "09" (string)
//   summary: string;
// }

// interface ProfileResponse {
//   userId: number;
//   loginId: string;
//   username: string;
//   phoneNumber: string;
//   email: string;
//   school: string;
//   major: string;
//   interestFields: string[];
//   intervalDays: number;
//   alarmTime: string; // response는 "09:30:00"와 같이 받지만,
//   // 실제 저장은 '시/분/초' 중 '시'만 저장함
// }

// interface ResumeResponse {
//   userId: number;
//   summary: string;
// }

// export default function Profile() {
//   // const { user } = useAuth();
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   // 1. Refactor: Use a single object for all form data
//   const [formData, setFormData] = useState<ProfileFormData>({
//     name: "",
//     phone: "",
//     email: "",
//     school: "",
//     major: "",
//     interest: "",
//     alarmPeriod: "",
//     alarmTime: "",
//     summary: "요약문을 넣습니다. 유저가 수정할 수 있는 내용입니다.",
//   });

//   const [isProfileEditable, setIsProfileEditable] = useState<boolean>(false);
//   const [isResumeEditable, setIsResumeEditable] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       // try {
//       //   // setIsLoading(true);
//       //   // api.ts automatically attaches the Bearer token
//       //   const { data } = await api.get<ProfileResponse>("/auth/me");
//       //   // const { data: resume } = await api.get<ResumeResponse>("/resumes/pdf");

//       //   // 3. Map API data to local state
//       //   setFormData((prev) => ({
//       //     ...prev,
//       //     name: data.username,
//       //     phone: data.phoneNumber,
//       //     email: data.email,
//       //     school: data.school, // not required
//       //     major: data.major, // not required
//       //     interest: data.interestFields.join(", "), // Array to String
//       //     alarmPeriod: data.intervalDays.toString(), // default value exists
//       //     // alarmPeriod: data.parseInt(formData.alarmPeriod, 10),
//       //     // alarmTime:
//       //     alarmTime: data.alarmTime.split(":")[0], // "09:30:00" -> "09"
//       //     // alarmTime: parseInt(data.alarmTime, 10);
//       //     // default value exists
//       //   }));

//       //   // setFormData((prev) => ({
//       //   //   ...prev,
//       //   //   summary: resume.summary,
//       //   // }));
//       // } catch (err) {
//       //   console.error("Failed to fetch profile:", err);
//       //   alert("프로필 정보를 불러오는데 실패했습니다.");
//       // } finally {
//       //   // setIsLoading(false);
//       // }
//       try {
//         const { data } = await api.get<ProfileResponse>("/auth/me");
//         setFormData((prev) => ({
//           ...prev,
//           name: data.username,
//           phone: data.phoneNumber,
//           email: data.email,
//           school: data.school,
//           major: data.major,
//           interest: data.interestFields.join(", "),
//           alarmPeriod: data.intervalDays.toString(),
//           alarmTime: data.alarmTime.split(":")[0],
//         }));
//       } catch (err) {
//         console.error("Profile fetch failed:", err);
//         // Optional: alert("프로필 정보를 불러오는데 실패했습니다.");
//       }

//       // 2. Fetch Resume Data independently
//       try {
//         const { data } = await api.get<ResumeResponse>("/auth/resume");
//         setFormData((prev) => ({
//           ...prev,
//           summary: data.summary,
//         }));
//       } catch (err) {
//         console.error("Resume fetch failed:", err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // 2. Unified Change Handler
//   const onChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleProfileEditBtnClick = async () => {
//     // prevent duplicate API call when on loading state
//     if (isLoading) return;

//     if (isProfileEditable) {
//       // If we are currently in "Edit Mode" and clicking "수정 완료"
//       try {
//         setIsLoading(true);
//         // update할 필요가 없다면 const {data}로 return을 받아올 필요가 없음
//         await api.patch("/auth/me", {
//           username: formData.name,
//           phoneNumber: formData.phone,
//           email: formData.email,
//           school: formData.school,
//           major: formData.major,
//           intervalDays: parseInt(formData.alarmPeriod, 10),
//           // alarmTime: `${formData.alarmTime.padStart(2, "0")}:00:00`,
//           alarmTime: `${(formData.alarmTime || "03").padStart(2, "0")}:00:00`,
//         });
//         // todo: update username if modified
//         // updateUser(data.username);
//         // This requires adding a 'setUser' or 'updateUser' method to your AuthContext
//         alert("저장되었습니다.");
//       } catch (err) {
//         alert("저장에 실패했습니다.");
//         return; // Don't exit edit mode if save fails
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     setIsProfileEditable((prev) => !prev);
//   };

//   const handleResumeEditBtnClick = async () => {
//     if (isResumeEditable) {
//       // If we are currently in "Edit Mode" and clicking "수정 완료"
//       try {
//         setIsLoading(true);
//         await api.patch("/auth/resume", {
//           summary: formData.summary,
//         });
//         alert("저장되었습니다.");
//       } catch (err) {
//         alert("저장에 실패했습니다.");
//         return; // Don't exit edit mode if save fails
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     setIsResumeEditable((prev) => !prev);
//   };

//   return (
//     <PageWrapper>
//       <ProfileContainer>
//         <Sidebar>
//           <div className="sidebar-header">
//             <h1>
//               {formData.name}님의
//               <br />
//               마이페이지
//             </h1>
//             <p className="subtitle">내 정보</p>
//           </div>
//           <div className="divider" />
//           <div className="nav-menu">
//             <p className="nav-item">내 요약 정보</p>
//             <p className="nav-item">내 웹사이트</p>
//             <p className="nav-item">좋아요</p>
//           </div>
//           <button className="logout-btn">로그아웃</button>
//         </Sidebar>

//         <MainContent>
//           <Section>
//             <div className="section-header">
//               <h2>기본 정보</h2>
//               <button
//                 type="button"
//                 onClick={handleProfileEditBtnClick}
//                 disabled={isLoading}
//               >
//                 {isProfileEditable ? "완료" : "수정"}
//                 <img src={editicon} alt="edit" />
//               </button>
//             </div>

//             <div className="input-list">
//               <InputGroup
//                 label="이름"
//                 id="user-name"
//                 name="name"
//                 placeholder="성함을 입력하세요"
//                 value={formData.name}
//                 onChange={onChange}
//                 disabled={!isProfileEditable}
//               />
//               <InputGroup
//                 label="전화번호"
//                 id="user-phone"
//                 type="tel"
//                 name="phone"
//                 placeholder="전화번호를 입력하세요"
//                 value={formData.phone}
//                 onChange={onChange}
//                 disabled={!isProfileEditable}
//               />
//               <InputGroup
//                 label="이메일"
//                 id="user-email"
//                 type="email"
//                 name="email"
//                 placeholder="이메일을 입력하세요"
//                 value={formData.email}
//                 onChange={onChange}
//                 disabled={!isProfileEditable}
//               />
//               <InputGroup
//                 label="학교"
//                 id="user-school"
//                 name="school"
//                 placeholder="예) 한국대학교"
//                 value={formData.school}
//                 onChange={onChange}
//                 disabled={!isProfileEditable}
//               />
//               <InputGroup
//                 label="학과"
//                 id="user-department"
//                 name="major"
//                 placeholder="예) 경영학과"
//                 value={formData.major}
//                 onChange={onChange}
//                 disabled={!isProfileEditable}
//               />
//               <InputGroup
//                 label="관심 직무"
//                 id="user-interest"
//                 name="interest"
//                 placeholder="예) UI/UX 디자인"
//                 value={formData.interest}
//                 onChange={onChange}
//                 disabled={!isProfileEditable}
//               />

//               {/* --- New Custom Selects --- */}

//               {/* Alarm Period */}
//               <SelectRow>
//                 <label htmlFor="alarm-period">알림 주기</label>
//                 <div className="select-wrapper">
//                   <select
//                     id="alarm-period"
//                     name="alarmPeriod"
//                     value={formData.alarmPeriod}
//                     onChange={onChange}
//                     disabled={!isProfileEditable}
//                   >
//                     <option value="">선택</option>
//                     {[1, 2, 3, 4, 5, 6, 7].map((v) => (
//                       <option key={v} value={v}>
//                         {v}
//                       </option>
//                     ))}
//                   </select>
//                   <span>일마다 한 번씩</span>
//                 </div>
//               </SelectRow>

//               {/* Alarm Time */}
//               <SelectRow>
//                 <label htmlFor="alarm-time">알림 시간</label>
//                 <div className="select-wrapper">
//                   <select
//                     id="alarm-time"
//                     name="alarmTime"
//                     value={formData.alarmTime}
//                     onChange={onChange}
//                     disabled={!isProfileEditable}
//                   >
//                     <option value="">선택</option>
//                     {Array.from({ length: 24 }).map((_, i) => (
//                       <option key={i} value={i.toString().padStart(2, "0")}>
//                         {i.toString().padStart(2, "0")}:00
//                       </option>
//                     ))}
//                   </select>
//                   <span>시에 알람을 받아요</span>
//                 </div>
//               </SelectRow>
//             </div>
//           </Section>

//           {/* --- Section 2: Resume Summary --- */}
//           <Section>
//             <div className="section-header">
//               <h2>이력서 요약 정보</h2>
//               <button
//                 type="button"
//                 onClick={handleResumeEditBtnClick}
//                 disabled={isLoading}
//               >
//                 {isResumeEditable ? "완료" : "수정"}
//                 <img src={editicon} alt="edit" />
//               </button>
//             </div>

//             <StyledTextArea
//               name="summary"
//               value={formData.summary}
//               onChange={onChange}
//               disabled={!isResumeEditable}
//               placeholder="이력서 요약을 입력해주세요."
//               spellCheck={false}
//             />
//           </Section>
//         </MainContent>
//       </ProfileContainer>
//     </PageWrapper>
//   );
// }

// // --- Styled Components ---

// const PageWrapper = styled.div`
//   width: 100%;
//   min-height: calc(100vh - 4rem);
//   background: #fff;
//   display: flex;
//   justify-content: flex-start;
//   padding-bottom: 4rem;
// `;

// const ProfileContainer = styled.main`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   width: 100%;
//   padding: 0;

//   h1 {
//     color: #141618;
//     text-align: center;
//     font-size: 2.375rem;
//     font-weight: 600;
//     margin-top: 3.5rem;
//     margin-bottom: 2rem;

//     @media (max-width: 480px) {
//       font-size: 1.75rem;
//       margin-top: 2rem;
//     }
//   }
// `;

// const Sidebar = styled.div`
//   width: 30%;
//   background: #f7fbff;
//   padding: 3.5rem 2rem;
//   min-height: calc(100vh - 4rem);
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
//   border-right: 1px solid #eaebec;

//   .sidebar-header {
//     h1 {
//       color: #141618;
//       font-size: 2rem;
//       font-weight: 600;
//       margin: 0;
//       white-space: pre-wrap;
//       line-height: 1.3;
//     }

//     .subtitle {
//       // color: #06f;
//       font-size: 1.25rem;
//       font-weight: 700;
//       margin-top: 1rem;
//       margin-bottom: 0;
//     }
//   }

//   .divider {
//     height: 1px;
//     background: #eaebec;
//     width: 100%;
//   }

//   .nav-menu {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;

//     .nav-item {
//       font-size: 1.25rem;
//       font-weight: 500;
//       color: #46474c;
//       cursor: pointer;
//       transition: all 0.2s;

//       &:hover {
//         color: #06f;
//         font-weight: 700;
//       }
//     }
//   }

//   .logout-btn {
//     margin-top: auto;
//     text-decoration: underline;
//     color: #878a93;
//     font-size: 1rem;
//     cursor: pointer;
//     border: none;
//     background: none;
//     padding: 0;
//     font-weight: 500;
//   }
// `;

// const MainContent = styled.div`
//   flex: 1;
//   padding: 5.5rem 3rem;
//   max-width: 700px;
//   width: 100%;
// `;

// const Section = styled.section`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   gap: 1.25rem;
//   margin-bottom: 3rem;

//   .section-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;

//     h2 {
//       color: #141618;
//       font-size: 1.25rem;
//       font-weight: 600;
//       margin: 0;
//     }

//     button {
//       display: flex;
//       padding: 0.25rem 0.5rem;
//       align-items: center;
//       gap: 0.25rem;
//       border-radius: 0.5rem;
//       border: 1px solid #eaebec;
//       background: #fff;
//       color: #5a5c63;
//       font-size: 0.875rem;
//       font-weight: 500;
//       cursor: pointer;
//       transition: background 0.2s;

//       &:hover {
//         background: #f7f8fa;
//       }

//       &:disabled {
//         cursor: not-allowed;
//         opacity: 0.6;
//         background: #f0f0f0;
//       }

//       img {
//         width: 1rem;
//         height: 1rem;
//       }
//     }
//   }

//   .input-list {
//     display: flex;
//     flex-direction: column;
//     gap: 1.5rem;
//   }
// `;

// // Integrated your custom CSS here
// const SelectRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 1rem;

//   label {
//     /* Assuming standard label styles usually match InputGroup label */
//     font-size: 1rem;
//     font-weight: 500;
//     min-width: 5rem;
//     white-space: nowrap;
//     color: #141618; /* Added for consistency */
//   }

//   .select-wrapper {
//     flex: 1;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;

//     select {
//       padding: 0.8rem 1rem;
//       border-radius: 1.25rem;
//       border: 1px solid #c2c4c8;
//       background-color: white;
//       cursor: pointer;
//       min-width: 8rem;
//       font-size: 1rem;

//       /* Visual feedback for disabled state */
//       &:disabled {
//         background-color: #f5f5f5;
//         cursor: not-allowed;
//         color: #999;
//       }

//       &:focus {
//         outline: none;
//         border-color: #2e3847;
//       }
//     }

//     span {
//       color: #5a5c63;
//       font-size: 0.875rem;
//       font-weight: 500;
//       white-space: nowrap;
//     }
//   }

//   /* Mobile handling */
//   @media (max-width: 480px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 0.5rem;

//     .select-wrapper {
//       width: 100%;
//       justify-content: space-between; /* Spreads select and text on mobile */

//       select {
//         flex: 1; /* Makes select take available space */
//       }
//     }
//   }
// `;

// const StyledTextArea = styled.textarea`
//   width: 100%;
//   min-height: 200px;
//   padding: 1rem;
//   border-radius: 0.5rem;
//   border: 1px solid #eaebec;
//   background: ${(props) => (props.disabled ? "#f7f8fa" : "#fff")};
//   color: #000;
//   font-size: 1rem;
//   font-weight: 500;
//   line-height: 1.6;
//   resize: vertical;
//   font-family: inherit;

//   &:focus {
//     outline: none;
//     border-color: #2e3847;
//   }
// `;
