import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api";

import { Sidebar } from "../components/profile/Sidebar";
import { BasicInfoSection } from "../components/profile/BasicInfoSection";
import { ResumeSection } from "../components/profile/ResumeSection";
import { LikedSection } from "../components/profile/LikedSection";
import { WebsiteSection } from "../components/profile/WebsiteSection";

import type { ProfileFormData, ProfileResponse } from "../types/auth";
import type { ResumeFormData, ResumeResponse } from "../types/resume";
import type { LikedResponse, NotificationItem } from "../types/notification";
import type { TargetUrl, TargetUrlsResponse } from "../types/website";

import type { CategoryType } from "../components/notifications/constants";

import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
// Define Tab Types
type TabType = "basic" | "summary" | "website" | "likes";

export default function Profile() {
  // const {user} = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // State for Navigation Logic — accept initial tab from navigation state
  const [activeTab, setActiveTab] = useState<TabType>(
    () =>
      (location.state as { activeTab?: TabType } | null)?.activeTab || "basic",
  );

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

  const [websiteUrls, setWebsiteUrls] = useState<TargetUrl[]>([]);

  const [isProfileEditable, setIsProfileEditable] = useState<boolean>(false);
  const [isResumeEditable, setIsResumeEditable] = useState<boolean>(false);
  const [isWebsiteEditable, setIsWebsiteEditable] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // 1. Initiate all requests in parallel
      // 원래는 각각의 API 호출을 모두 개별 try-catch문으로 모두 각각 호출해서 waterfall 문제가 생겼음
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
      const websitePromise = api
        .get<TargetUrlsResponse>("/users/me/target-urls")
        .catch((err) => {
          console.error(err);
          return null;
        });

      try {
        // 2. Wait for everything
        const [profileRes, resumeRes, likedRes, websiteRes] = await Promise.all(
          [profilePromise, resumePromise, likedPromise, websitePromise],
        );

        // 3. Update Profile State
        if (profileRes?.data) {
          const { data } = profileRes;
          setFormData((prev) => ({
            ...prev,
            name: data.username,
            phone: data.phoneNumber,
            email: data.email,
            school: data.school, // not necessary
            major: data.major, // not necessary
            interest: data.interestFields.join(", "), // Array to string
            alarmPeriod: data.intervalDays.toString(),
            alarmTime: data.alarmTime ? data.alarmTime.split(":")[0] : "09", // Default value exists
            // "09:30:00" -> "09"
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

        // 6. Update Website URLs
        if (websiteRes?.data) {
          setWebsiteUrls(websiteRes.data.targetUrls);
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
    // prevent duplicate API call when on loading state
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
          intervalDays: parseInt(formData.alarmPeriod, 10), // reverse formatting
          alarmTime: `${(formData.alarmTime || "09").padStart(2, "0")}:00:00`,
        });
        // todo: update username if modified
        // updateUser(data.username);
        // This requires adding a 'setUser' or 'updateUser' method to your AuthContext
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

  const handleWebsiteEditToggle = () => {
    setIsWebsiteEditable((prev) => !prev);
  };

  const handleAddWebsite = async (url: string) => {
    const { data } = await api.post("/users/me/target-urls", {
      targetUrl: url,
    });
    setWebsiteUrls((prev) => [...prev, data]);
  };

  const handleUpdateWebsite = async (id: number, url: string) => {
    const { data } = await api.patch(`/users/me/target-urls/${id}`, {
      targetUrl: url,
    });
    setWebsiteUrls((prev) =>
      prev.map((item) => (item.targetUrlId === data.targetUrlId ? data : item)),
    );
  };

  const handleDeleteWebsite = async (id: number) => {
    await api.delete(`/users/me/target-urls/${id}`);
    setWebsiteUrls((prev) => prev.filter((item) => item.targetUrlId !== id));
  };

  return (
    <>
      <Helmet>
        <title>내 프로필 | 알려주잡</title>
        <meta name="description" content="프로필 페이지" />
      </Helmet>
      <PageWrapper>
        <ProfileContainer>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <MainContent>
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
                onChange={onChange}
              />
            )}
            {activeTab === "website" && (
              <WebsiteSection
                websites={websiteUrls}
                isEditable={isWebsiteEditable}
                isLoading={isLoading}
                onEditToggle={handleWebsiteEditToggle}
                onAdd={handleAddWebsite}
                onUpdate={handleUpdateWebsite}
                onDelete={handleDeleteWebsite}
              />
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
    </>
  );
}

// --- Styled Components ---

const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: #fff;
  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  padding: 0;

  @media (min-width: 769px) {
    flex-direction: row;
    align-items: stretch;
    min-height: calc(100vh - 4rem);
  }
`;

const MainContent = styled.main`
  width: 100%;
  padding: 1.5rem 1.25rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    flex: 1;
    padding: 5.5rem 3rem;
    max-width: 700px;
  }
`;
