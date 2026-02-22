import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Section } from "./Profile.style";
import { EditButton } from "../EditButton";
import type { TargetUrl } from "../../types/website";

// --- Utility helpers ---

interface SiteMeta {
  title: string;
  favicon: string;
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function getOrigin(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return url;
  }
}

function googleFaviconUrl(url: string): string {
  return `https://www.google.com/s2/favicons?domain=${getHostname(url)}&sz=32`;
}

function resolveFaviconHref(href: string, pageUrl: string): string {
  if (href.startsWith("http")) return href;
  if (href.startsWith("//")) return `https:${href}`;
  if (href.startsWith("/")) return `${getOrigin(pageUrl)}${href}`;
  return `${getOrigin(pageUrl)}/${href}`;
}

async function fetchMetadata(url: string): Promise<SiteMeta> {
  const fallback: SiteMeta = {
    title: getHostname(url),
    favicon: googleFaviconUrl(url),
  };

  try {
    const res = await fetch(
      `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
    );
    const html = await res.text();
    if (!html) return fallback;

    // Parse title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch?.[1]?.trim() || fallback.title;

    // Parse favicon from <link rel="icon" ...> or <link rel="shortcut icon" ...>
    const iconMatch =
      html.match(
        /<link[^>]*rel=["'](?:shortcut\s+)?icon["'][^>]*href=["']([^"']+)["'][^>]*>/i,
      ) ??
      html.match(
        /<link[^>]*href=["']([^"']+)["'][^>]*rel=["'](?:shortcut\s+)?icon["'][^>]*>/i,
      );
    const favicon = iconMatch?.[1]
      ? resolveFaviconHref(iconMatch[1], url)
      : fallback.favicon;

    return { title, favicon };
  } catch {
    return fallback;
  }
}

// --- useMetadata hook ---

function useMetadata(websites: TargetUrl[]) {
  const [meta, setMeta] = useState<Record<number, SiteMeta>>({});

  useEffect(() => {
    let cancelled = false;

    websites.forEach((w) => {
      if (meta[w.targetUrlId]) return;

      fetchMetadata(w.targetUrl).then((result) => {
        if (!cancelled) {
          setMeta((prev) => ({ ...prev, [w.targetUrlId]: result }));
        }
      });
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [websites]);

  const clearMeta = (id: number) => {
    setMeta((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  return { meta, clearMeta };
}

// --- Props ---

interface WebsiteSectionProps {
  websites: TargetUrl[];
  isEditable: boolean;
  isLoading: boolean;
  onEditToggle: () => void;
  onAdd: (url: string) => Promise<void>;
  onUpdate: (id: number, url: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

// --- Component ---

export const WebsiteSection = ({
  websites,
  isEditable,
  isLoading,
  onEditToggle,
  onAdd,
  onUpdate,
  onDelete,
}: WebsiteSectionProps) => {
  const { meta, clearMeta } = useMetadata(websites);
  const [newUrl, setNewUrl] = useState("");
  const [editValues, setEditValues] = useState<Record<number, string>>({});

  // Sync editValues when entering edit mode
  useEffect(() => {
    if (isEditable) {
      const values: Record<number, string> = {};
      websites.forEach((w) => {
        values[w.targetUrlId] = w.targetUrl;
      });
      setEditValues(values);
    }
  }, [isEditable, websites]);

  const handleUpdate = async (id: number) => {
    const newValue = editValues[id];
    const original = websites.find((w) => w.targetUrlId === id);
    if (!newValue || newValue === original?.targetUrl) return;

    await onUpdate(id, newValue);
    clearMeta(id);
  };

  const handleAdd = async () => {
    const trimmed = newUrl.trim();
    if (!trimmed) return;
    await onAdd(trimmed);
    setNewUrl("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    action: () => void,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  return (
    <Section>
      <div className="section-header">
        <div>
          <h2>등록 웹사이트</h2>
          <CountText>
            <span className="count-number">{websites.length}</span>개 등록
          </CountText>
        </div>
        <EditButton
          isEditable={isEditable}
          isLoading={isLoading}
          onClick={onEditToggle}
        />
      </div>

      <WebsiteList>
        {websites.map((item) => (
          <WebsiteItem
            key={item.targetUrlId}
            $clickable={!isEditable}
            onClick={() =>
              !isEditable &&
              window.open(item.targetUrl, "_blank", "noopener,noreferrer")
            }
          >
            <div className="title-row">
              <Favicon
                src={
                  meta[item.targetUrlId]?.favicon ||
                  googleFaviconUrl(item.targetUrl)
                }
                alt=""
                width={20}
                height={20}
              />
              <span className="site-title">
                {meta[item.targetUrlId]?.title || getHostname(item.targetUrl)}
              </span>
              {isEditable && (
                <DeleteBtn
                  type="button"
                  onClick={() => onDelete(item.targetUrlId)}
                >
                  삭제
                </DeleteBtn>
              )}
            </div>
            {isEditable ? (
              <UrlInput
                type="text"
                value={editValues[item.targetUrlId] ?? item.targetUrl}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    [item.targetUrlId]: e.target.value,
                  }))
                }
                onBlur={() => handleUpdate(item.targetUrlId)}
                onKeyDown={(e) =>
                  handleKeyDown(e, () => handleUpdate(item.targetUrlId))
                }
              />
            ) : (
              <p className="site-url">{item.targetUrl}</p>
            )}
          </WebsiteItem>
        ))}
      </WebsiteList>

      {isEditable && (
        <AddRow>
          <UrlInput
            type="text"
            placeholder="https://example.com"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, handleAdd)}
          />
          <AddBtn type="button" onClick={handleAdd}>
            추가
          </AddBtn>
        </AddRow>
      )}
    </Section>
  );
};

// --- Styled Components ---

const CountText = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1rem;
  font-weight: 500;
  color: #141618;

  .count-number {
    color: #ff9200;
    font-weight: 500;
  }
`;

const WebsiteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const WebsiteItem = styled.div<{ $clickable?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: -0.5rem;
  transition: background 0.15s;

  &:hover {
    background: ${({ $clickable }) => ($clickable ? "#f7f8fa" : "transparent")};
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .site-title {
      color: #141618;
      font-size: 1.125rem;
      font-weight: 600;
    }
  }

  .site-url {
    color: #878a93;
    font-size: 0.875rem;
    font-weight: 500;
    margin: 0;
    word-break: break-all;
  }
`;

const Favicon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  object-fit: contain;
`;

const UrlInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #eaebec;
  background: #fff;
  color: #141618;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2e3847;
  }
`;

const DeleteBtn = styled.button`
  margin-left: auto;
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #e1e2e4;
  background: #fff;
  color: #e74c3c;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #fef2f2;
  }
`;

const AddRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const AddBtn = styled.button`
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #eaebec;
  background: #fff;
  color: #141618;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #f7f8fa;
  }
`;
