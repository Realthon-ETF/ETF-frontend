import styled from "styled-components";
import { ExternalLinkIcon, PlusIcon } from "./icons";

export interface WebsiteItem {
  id: number;
  title: string;
  description: string;
  url: string;
}

function getFaviconUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return "";
  }
}

export function WebsiteCard({
  item,
  onAdd,
}: {
  item: WebsiteItem;
  onAdd: (url: string, title: string) => void;
}) {
  return (
    <Card>
      <CardTop>
        <CardHeaderRow>
          <CardFavicon src={getFaviconUrl(item.url)} alt="" />
          <ExternalLink
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLinkIcon />
          </ExternalLink>
        </CardHeaderRow>
        <CardTitle>{item.title}</CardTitle>
        <CardDesc>{item.description}</CardDesc>
      </CardTop>
      <AddButton
        type="button"
        onClick={() => onAdd(item.url, item.title)}
        aria-label="웹사이트 등록"
      >
        <PlusIcon />
      </AddButton>
    </Card>
  );
}

const Card = styled.div`
  flex-shrink: 0;
  width: 20rem;
  height: 14.375rem;
  min-width: 17.5rem;
  padding: 2rem;
  border: 1px solid #eaebec;
  border-radius: 1.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

const CardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CardFavicon = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.125rem;
  object-fit: contain;
`;

const ExternalLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.375rem;
  height: 1.375rem;
`;

const CardTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  color: #141618;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

const CardDesc = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: #141618;
  opacity: 0.6;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.125rem;
  height: 2.125rem;
  border-radius: 50%;
  background: #171719;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;

  &:hover {
    background: #333;
  }
`;
