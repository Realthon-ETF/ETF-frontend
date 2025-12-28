import { useState } from "react";
import styled from "styled-components";
import del from "../assets/delete-icon.svg";
import { Button } from "../components/Button";

export default function Result() {
  const [name, setName] = useState<string>("");

  return (
    <Wrapper>
      <ResumeResultLayout>
        <ResumeInfo>
          <div>
            <span>등록된 이력서</span>
            <span className="resume-file-name">테스트</span>
          </div>
          <img src={del} />
        </ResumeInfo>
        <ResumeBody>
          <ResultHeader>
            <h1>이력서 분석 결과</h1>
            <h2>
              AI가 이력서 분석을 완료하고 {name}님만을 위한 맞춤 정보를 자동
              완성했습니다.
              <br />
              실제 커리어 목표와 다르거나 추가하고 싶은 내용이 있다면 수정하신
              후 서비스 시작 버튼을 눌러주세요.
            </h2>
          </ResultHeader>
          <ResumeSummary>
            <span>Dummy Text</span>
          </ResumeSummary>
        </ResumeBody>
        <ServiceStartBtn>서비스 시작하기</ServiceStartBtn>
      </ResumeResultLayout>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  // height: 100vh;
  background: #f7f8fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 4rem);
`;

const ResumeResultLayout = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 0;
`;

const ResultHeader = styled.div`
  h1 {
    align-self: stretch;
    color: #000;
    text-align: center;
    font-size: 2.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-top: 3.75rem;
  }

  h2 {
    align-self: stretch;
    color: #5c5c5c;
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    margin-top: 0.25rem;
  }
`;

const ResumeInfo = styled.div`
  display: flex;
  width: 19.75rem;
  padding: 0.5rem 1.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 2.25rem;
  border: 1px solid #aeb0b6;
  background: #fff;
  margin-top: 1.1875rem;
  // margin: 1.19rem auto 0 auto;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    flex: 1 0 0;

    span {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
      align-self: stretch;
      color: #5a5c63;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;

      &.resume-file-name {
        color: #141618;
        font-weight: 600;
      }
    }

  img {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }
`;

const ResumeBody = styled.div`
  display: flex;
  // width: 56.625rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.125rem;
`;

const ResumeSummary = styled.div`
  display: flex;
  height: 22.1875rem;
  padding: 1rem;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.75rem;
  border: 1px solid #eaf2fe;
  background: #f7fbff;

  span {
    color: #000;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: 180%;
  }
`;

const ServiceStartBtn = styled(Button)`
  display: inline-flex;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  background: #06f;
  margin-top: 2.25rem;
  color: #eaebec;
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;

  &:hover {
    cursor: pointer;
  }
`;
