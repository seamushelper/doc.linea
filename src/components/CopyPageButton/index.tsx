import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export default function CopyPageButton(): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleCopyPage = async () => {
    // TODO: implement "Copy page as Markdown for LLMs" — copy the Markdown source of the current page instead of the URL
    setCopied(true);
  };

  const handleViewAsMarkdown = () => {
    // TODO: implement "View this page as plain text" — navigate to the Markdown version of the current page
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Copy page options"
        aria-expanded={isOpen}
        aria-haspopup="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true">
          <rect
            x="5"
            y="5"
            width="9"
            height="9"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M3 11V3C3 2.44772 3.44772 2 4 2H10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span>{copied ? "Copied" : "Copy page"}</span>
        <svg
          width="9"
          height="13"
          viewBox="0 0 9 13"
          fill="none"
          aria-hidden="true"
          className={isOpen ? styles.chevronOpen : styles.chevron}>
          <path
            d="M1 1L7 6.5L1 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="menu">
          <button
            className={styles.dropdownItem}
            onClick={handleCopyPage}
            role="menuitem">
            <span className={styles.itemTitle}>Copy page</span>
            <span className={styles.itemSubtitle}>
              Copy page as Markdown for LLMs
            </span>
          </button>
          <button
            className={styles.dropdownItem}
            onClick={handleViewAsMarkdown}
            role="menuitem">
            <span className={styles.itemTitle}>View as Markdown</span>
            <span className={styles.itemSubtitle}>
              View this page as plain text
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
