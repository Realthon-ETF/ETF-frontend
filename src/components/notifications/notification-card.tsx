import { useState } from "react";
import styled from "styled-components";
import type { NotificationItem } from "./types";
import { getNotificationBadgeColor } from "./constants";
import api from "../../api";

export interface NotificationCardProps {
  item: NotificationItem;
}

export default function NotificationCard({ item }: NotificationCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(item.isLiked);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents navigation if the card is inside a link
    e.stopPropagation(); // Prevents the card's click event from firing
    setIsLiked(!isLiked);

    // const response = await fetch(
    //   `${import.meta.env.VITE_BASE_URL}/notifications/${item.id}/like`,
    // );
    try {
      // const { data } = await api.get("/notifications/${item.id}/like");
      await api.post("/notifications/${item.id}/like");
    } catch (err) {
      console.error("Profile fetch failed:", err);
    }
  };

  return (
    <CardItem>
      {/* Semantic: Article represents a self-contained composition */}
      <article>
        <div className="badge-row">
          <Badge $bgColor={getNotificationBadgeColor(item.category)}>
            {item.category}
          </Badge>
          {/* <img $isliked={item.isLiked} src={liked} /> */}
          <IconButton onClick={handleLikeClick} aria-label="Like notification">
            <HeartIcon color={isLiked ? "#FF4D4D" : "#C2C4C8"} />
          </IconButton>
        </div>

        <h3>{item.title}</h3>

        <div className="meta-info">
          <span className="source-icon" aria-hidden="true" />
          <span className="source-name">{item.source}</span>
        </div>
      </article>
    </CardItem>
  );
}

const CardItem = styled.li`
  article {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s ease;
    cursor: default; /* or pointer if clickable */

    &:hover {
      background-color: #f9f9f9;
    }
  }

  h3 {
    font-family: "Pretendard", sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #141618;
    margin: 0;
    line-height: 1.3;

    /* Text truncation */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }

  .badge-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .meta-info {
    display: flex;
    align-items: center;
    gap: 0.375rem;

    .source-icon {
      width: 1rem;
      height: 1rem;
      border-radius: 0.125rem;
      background-color: #d9d9d9;
      flex-shrink: 0;
    }

    .source-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: #5a5c63;

      @media (max-width: 480px) {
        font-size: 0.8rem;
      }
    }
  }
`;

// Helper component for dynamic props (hard to nest cleanly if prop-driven)
const Badge = styled.span<{ $bgColor: string }>`
  background-color: ${(props) => props.$bgColor};
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-family: "Pretendard", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: #141618;
  display: inline-block;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

// 1. Create a styled component for the image
const HeartIcon = ({ color }: { color: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.8839 3.50358C3.52785 3.50358 1.60711 5.50759 1.71078 7.79173L1.71164 7.81061V7.82951C1.71164 9.7649 2.83722 11.8032 4.56753 13.6836C6.16366 15.4182 8.18488 16.9193 9.99985 17.9521C11.8152 16.9194 13.8364 15.4208 15.4323 13.6877C17.1621 11.8092 18.288 9.77082 18.288 7.82942V7.81052L18.2888 7.79165C18.3925 5.50754 16.4717 3.50358 14.1157 3.50358C12.6896 3.50358 11.4341 4.204 10.6804 5.27085L9.99981 6.2343L9.31918 5.27085C8.56551 4.204 7.30996 3.50358 5.8839 3.50358ZM0.0449951 7.84828C-0.0914347 4.60036 2.60713 1.83691 5.8839 1.83691C7.48766 1.83691 8.9429 2.47539 9.99981 3.51033C11.0567 2.47539 12.5119 1.83691 14.1157 1.83691C17.3924 1.83691 20.091 4.6003 19.9546 7.8482C19.9475 10.3998 18.4949 12.8222 16.6583 14.8167C14.8005 16.8342 12.4429 18.5318 10.3961 19.6381L9.99981 19.8523L9.60357 19.6381C7.55629 18.5316 5.19868 16.8309 3.34109 14.8122C1.50498 12.8168 0.0521068 10.3944 0.0449951 7.84828Z"
      fill={color}
      style={{ transition: "fill 0.2s ease" }}
    />
  </svg>
);
