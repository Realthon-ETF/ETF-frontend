import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import api from "../api";
import { Mixpanel } from "../utils/mixpanel";
import { UploadStep } from "../components/upload/UploadStep";
import { ResultStep } from "../components/upload/ResultStep";
import { ConfirmedStep } from "../components/upload/ConfirmedStep";

type Step = "upload" | "result" | "confirmed";

export default function UploadFlow() {
  const navigate = useNavigate();
  const { user, setHasResume } = useAuth();
  const name = user?.username ?? "사용자";

  // Step management
  const [currentStep, setCurrentStep] = useState<Step>("upload");

  // Upload step state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mixpanel: track upload start time for wait_time calculation
  const uploadStartTime = useRef<number>(0);

  // Result step state
  const [fileName, setFileName] = useState<string>("");
  const [editableSummary, setEditableSummary] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Upload step handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File | undefined) => {
    if (!file) return;
    if (file.type === "application/pdf" && file.size <= 10 * 1024 * 1024) {
      setSelectedFile(file);
    } else {
      alert("10MB 이내의 PDF 파일만 업로드할 수 있습니다.");
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    validateAndSetFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAnalyzeClick = async () => {
    if (!isAgreed || !selectedFile || isUploading) return;

    try {
      setIsUploading(true);

      // Event 1: resume_upload_started
      Mixpanel.track("resume_upload_started");
      uploadStartTime.current = Date.now();

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await api.post("/resumes/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const waitTimeSec = ((Date.now() - uploadStartTime.current) / 1000).toFixed(1);

      // Event 2: resume_upload_completed
      Mixpanel.track("resume_upload_completed", {
        file_size: `${(selectedFile.size / 1024 / 1024).toFixed(2)}MB`,
        upload_time: `${waitTimeSec}s`,
        is_retry: false,
      });

      // Update state and move to result step
      setFileName(selectedFile.name);
      setEditableSummary(response.data.summary);
      setCurrentStep("result");

      // Event 3: view_ai_analysis
      Mixpanel.track("view_ai_analysis", {
        wait_time: `${waitTimeSec}s`,
      });
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "오류가 발생했습니다.";
      alert(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  // Result step handlers
  const handleEditToggle = () => {
    if (isLoading) return;
    setIsEditable((prev) => !prev);
  };

  const handleServiceStart = async () => {
    // Event 4: click_apply_service
    Mixpanel.track("click_apply_service", {
      page_name: "이력서 분석 결과",
    });

    setIsLoading(true);
    try {
      await api.patch("/auth/resume", {
        summary: editableSummary,
      });

      setCurrentStep("confirmed");
      setHasResume(true);

      // Event 5: complete_apply_service
      Mixpanel.track("complete_apply_service");
    } catch (error: any) {
      console.error("Resume update failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "저장에 실패했습니다.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Confirmed step handlers
  const handleSettingsClick = () => {
    navigate("/profile");
  };

  switch (currentStep) {
    case "upload":
      return (
        <UploadStep
          name={name}
          selectedFile={selectedFile}
          isUploading={isUploading}
          isAgreed={isAgreed}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
          onFileDelete={handleFileDelete}
          onButtonClick={handleButtonClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onAgreementToggle={() => setIsAgreed(!isAgreed)}
          onAnalyzeClick={handleAnalyzeClick}
        />
      );
    case "result":
      return (
        <ResultStep
          name={name}
          fileName={fileName}
          editableSummary={editableSummary}
          isEditable={isEditable}
          isLoading={isLoading}
          onEditToggle={handleEditToggle}
          onSummaryChange={setEditableSummary}
          onServiceStart={handleServiceStart}
        />
      );
    case "confirmed":
      return <ConfirmedStep onSettingsClick={handleSettingsClick} />;
    default:
      return null;
  }
}
