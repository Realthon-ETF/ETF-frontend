import { useState } from "react";
import { useAuth } from "../AuthContext";
import UploadFlow from "./upload";
import Recommendations from "./recommendations";

type Tab = "upload" | "recommendations";

export default function Settings() {
  const { hasResume } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>(
    hasResume ? "recommendations" : "upload",
  );

  return (
    <>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem 2rem" }}>
        <button
          onClick={() => setActiveTab("upload")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: activeTab === "upload" ? 700 : 400,
            borderBottom:
              activeTab === "upload"
                ? "2px solid #007bff"
                : "2px solid transparent",
            padding: "0.5rem 0",
            color: activeTab === "upload" ? "#007bff" : "#878a93",
          }}
        >
          이력서 업로드
        </button>
        <button
          onClick={() => setActiveTab("recommendations")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: activeTab === "recommendations" ? 700 : 400,
            borderBottom:
              activeTab === "recommendations"
                ? "2px solid #007bff"
                : "2px solid transparent",
            padding: "0.5rem 0",
            color: activeTab === "recommendations" ? "#007bff" : "#878a93",
          }}
        >
          추천 설정
        </button>
      </nav>

      {activeTab === "upload" ? <UploadFlow /> : <Recommendations />}
    </>
  );
}
