"use client";

import { useEffect, useState } from "react";
import styles from "./PlacementTalkForm.module.css";
import { usePlacementTalkForm } from "./usePlacementTalkForm";

export default function PlacementTalkForm() {
  const {
    formData,
    errors,
    submitStatus,
    isSubmitting,
    searchTerm,
    showSuggestions,
    filteredDepts,
    handleChange,
    handleBranchInputChange,
    selectDepartment,
    setShowSuggestions,
    handleSubmit,
  } = usePlacementTalkForm();

  const [registrationComplete, setRegistrationComplete] = useState(false);

  useEffect(() => {
    if (submitStatus?.type === "success") {
      setRegistrationComplete(true);
    }
  }, [submitStatus?.type]);

  if (registrationComplete) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIconRing}>
          <svg viewBox="0 0 52 52" className={styles.successSvg}>
            <circle cx="26" cy="26" r="25" fill="none" className={styles.successCircle} />
            <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" className={styles.successCheck} />
          </svg>
        </div>
        <h3 className={styles.successTitle}>You're In!</h3>
        <p className={styles.successMessage}>
          Your seat is confirmed for <strong>Placement Talk v2.0.26</strong>. Get ready for an insightful session with our distinguished alumni on placements, industry insights & live Q&A.
        </p>
        <a
          href="https://linktr.ee/CodeRIT"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.communityBtn}
        >
          <span>Join Our Community</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>

      {/* Row 1: Name + USN */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 110 8 4 4 0 010-8z"/>
            </svg>
            Full Name <span className={styles.req}>*</span>
          </label>
          <div className={`${styles.inputWrap} ${errors.name ? styles.hasError : ""}`}>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={styles.input}
              required
            />
          </div>
          {errors.name && <span className={styles.err}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="usn">
            <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
            </svg>
            USN <span className={styles.req}>*</span>
          </label>
          <div className={`${styles.inputWrap} ${errors.usn ? styles.hasError : ""}`}>
            <input
              id="usn"
              name="usn"
              type="text"
              value={formData.usn}
              onChange={handleChange}
              placeholder="e.g. 1MS24CS067"
              className={styles.input}
              required
            />
          </div>
          {errors.usn && <span className={styles.err}>{errors.usn}</span>}
        </div>
      </div>

      {/* Row 2: Email */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
          </svg>
          Email Address <span className={styles.req}>*</span>
        </label>
        <div className={`${styles.inputWrap} ${errors.email ? styles.hasError : ""}`}>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className={styles.input}
            required
          />
        </div>
        {errors.email && <span className={styles.err}>{errors.email}</span>}
      </div>

      {/* Row 3: Branch */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="branch">
          <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
          Branch <span className={styles.req}>*</span>
        </label>
        <div className={`${styles.inputWrap} ${errors.branch ? styles.hasError : ""}`}>
          <input
            id="branch"
            name="branch"
            type="text"
            value={searchTerm || formData.branch}
            onChange={handleBranchInputChange}
            onFocus={() => setShowSuggestions(searchTerm.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Start typing (e.g. CSE, Computer Science)"
            className={styles.input}
            required
            autoComplete="off"
          />
          <svg className={styles.inputChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
        {showSuggestions && searchTerm && (
          <ul className={styles.suggestions}>
            {filteredDepts.length > 0 ? filteredDepts.map((dept, idx) => (
              <li
                key={idx}
                onMouseDown={() => selectDepartment(dept)}
                className={styles.suggestionItem}
              >
                <span className={styles.deptName}>{dept.name}</span>
                <span className={styles.deptShort}>{dept.short}</span>
              </li>
            )) : (
              <li className={styles.noResult}>No matching department found</li>
            )}
          </ul>
        )}
        {errors.branch && <span className={styles.err}>{errors.branch}</span>}
      </div>

      {/* Row 4: Optional question */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="question">
          <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          Questions for Speakers / Club <span className={styles.optional}>(Optional)</span>
        </label>
        <div className={`${styles.textareaWrap} ${errors.question ? styles.hasError : ""}`}>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Anything you'd like to ask about placements, interviews, industry life..."
            className={styles.textarea}
            rows={3}
          />
        </div>
        <div className={styles.taFooter}>
          <span className={`${styles.charCount} ${formData.question.length > 450 ? styles.charWarn : ""}`}>
            {formData.question.length}/500
          </span>
          {errors.question && <span className={styles.err}>{errors.question}</span>}
        </div>
      </div>

      {submitStatus.message && (
        <div className={`${styles.statusBanner} ${styles[submitStatus.type]}`}>
          {submitStatus.type === "error" ? "⚠️" : "✅"} {submitStatus.message}
        </div>
      )}

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className={styles.spinner} />
            Registering...
          </>
        ) : (
          <>
            Register for Placement Talk
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
