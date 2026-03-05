import { useRef, useCallback } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "./icons";
import { WebsiteCard, type WebsiteItem } from "./WebsiteCard";
import { Mixpanel } from "../../utils/mixpanel";

function useCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollLeft = useCallback(() => {
    ref.current?.scrollBy({ left: -332, behavior: "smooth" });
  }, []);
  const scrollRight = useCallback(() => {
    ref.current?.scrollBy({ left: 332, behavior: "smooth" });
  }, []);
  return { ref, scrollLeft, scrollRight };
}

interface CardSectionProps {
  highlightText: string;
  titleLine1Suffix: string;
  titleLine2: string;
  websites: WebsiteItem[];
  onAdd: (url: string, title: string) => void;
  tabName?: "AI추천" | "카테고리";
}

export function CardSection({
  highlightText,
  titleLine1Suffix,
  titleLine2,
  websites,
  onAdd,
  tabName,
}: CardSectionProps) {
  const { ref, scrollLeft, scrollRight } = useCarousel();

  const handleScrollLeft = () => {
    scrollLeft();
    if (tabName) Mixpanel.track("scroll_recommendation", { tab_name: tabName });
  };

  const handleScrollRight = () => {
    scrollRight();
    if (tabName) Mixpanel.track("scroll_recommendation", { tab_name: tabName });
  };

  return (
    <SectionBlock>
      <SectionHeader>
        <div>
          <SectionTitleLine>
            <Highlight>{highlightText}</Highlight> {titleLine1Suffix}
          </SectionTitleLine>
          <SectionTitleLine>{titleLine2}</SectionTitleLine>
        </div>
        <ArrowGroup>
          <ArrowBtn type="button" onClick={handleScrollLeft} $position="left">
            <ChevronLeft />
          </ArrowBtn>
          <ArrowBtn type="button" onClick={handleScrollRight} $position="right">
            <ChevronRight />
          </ArrowBtn>
        </ArrowGroup>
      </SectionHeader>
      <CarouselWrapper>
        <ScrollContainer ref={ref}>
          {websites.map((w, index) => (
            <WebsiteCard
              key={w.id}
              item={w}
              onAdd={onAdd}
              tabName={tabName}
              rank={index + 1}
            />
          ))}
        </ScrollContainer>
        <FadeOverlay />
      </CarouselWrapper>
    </SectionBlock>
  );
}

const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 3rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const SectionTitleLine = styled.p`
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.5;
  color: #141618;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Highlight = styled.span`
  font-weight: 700;
  color: #06f;
`;

const ArrowGroup = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const ArrowBtn = styled.button<{ $position: "left" | "right" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid #eaebec;
  background: #fff;
  cursor: pointer;
  border-radius: ${({ $position }) =>
    $position === "left" ? "0.25rem 0 0 0.25rem" : "0 0.25rem 0.25rem 0"};

  &:hover {
    background: #f7f8fa;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 0.75rem; /* 12px */
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 3rem;

  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const FadeOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 5.75rem;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff);
  pointer-events: none;
`;
