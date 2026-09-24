/**
 * HTML Sanitization utilities
 * Prevents XSS attacks by sanitizing user-provided HTML content
 */

import DOMPurify from 'dompurify';

// Matches bare http(s) URLs, trimming trailing punctuation that's likely
// sentence formatting rather than part of the link (e.g. "...fotos: https://x.com.")
const URL_REGEX = /https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"]/g;

/**
 * Wraps bare URLs in a plain-text string with anchor tags.
 * Must run before sanitizing so DOMPurify validates the resulting markup.
 * @param {string} text - Plain text possibly containing bare URLs
 * @returns {string} - Text with URLs replaced by <a> tags
 */
const linkifyURLs = (text) =>
  text.replace(
    URL_REGEX,
    (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  );

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param {string} html - The HTML string to sanitize
 * @returns {string} - Sanitized HTML string
 */
export const sanitizeHTML = (html) => {
  if (!html) return '';
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });
};

/**
 * Sanitizes HTML and converts newlines to <br> tags
 * Useful for displaying user-provided text with line breaks
 * @param {string} text - The text to sanitize and convert
 * @returns {string} - Sanitized HTML string with <br> tags
 */
export const sanitizeWithLineBreaks = (text) => {
  if (!text) return '';
  // Linkify first (raw text, no markup yet), then sanitize the result, then
  // replace newlines (to prevent injection via newline manipulation)
  const sanitized = DOMPurify.sanitize(linkifyURLs(text), {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });
  return sanitized.replace(/\n/g, '<br>');
};

/**
 * Strips all HTML tags from a string
 * Useful for displaying plain text from HTML content
 * @param {string} html - The HTML string to strip
 * @returns {string} - Plain text without HTML tags
 */
export const stripHTML = (html) => {
  if (!html) return '';
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
};
