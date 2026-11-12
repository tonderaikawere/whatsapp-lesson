'use client';

import React from 'react';

/**
 * Formats WhatsApp text markup into proper HTML elements:
 * - *bold* -> <strong>bold</strong>
 * - _italic_ -> <em>italic</em>
 * - ~strike~ -> <del>strike</del>
 * - ```code``` -> <code>code</code>
 * - Links (https://...) -> <a>...</a>
 */
export function formatWhatsAppText(text: string): React.ReactNode {
  if (!text) return null;

  // Split lines to preserve line breaks
  const lines = text.split('\n');

  return lines.map((line, lineIdx) => {
    // Process formatting on each line
    const elements: React.ReactNode[] = [];
    let remaining = line;
    let keyIdx = 0;

    // Regex for bold (*...*), italic (_..._), strikethrough (~...~), monospace (```...```), and URLs
    const regex = /(```[\s\S]*?```|\*([^*\n]+)\*|_([^_ \n][^_ \n]*?)_|~([^~\n]+)~|(https?:\/\/[^\s]+))/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(line)) !== null) {
      // Text before match
      if (match.index > lastIndex) {
        elements.push(line.substring(lastIndex, match.index));
      }

      const fullMatch = match[0];

      if (fullMatch.startsWith('```') && fullMatch.endsWith('```')) {
        // Monospace code
        const codeText = fullMatch.slice(3, -3);
        elements.push(
          <code
            key={`code-${lineIdx}-${keyIdx++}`}
            style={{
              backgroundColor: 'rgba(0,0,0,0.06)',
              padding: '2px 4px',
              borderRadius: 4,
              fontFamily: 'monospace',
              fontSize: '0.85em',
            }}
          >
            {codeText}
          </code>
        );
      } else if (fullMatch.startsWith('*') && fullMatch.endsWith('*')) {
        // Bold
        elements.push(
          <strong key={`bold-${lineIdx}-${keyIdx++}`} style={{ fontWeight: 700 }}>
            {match[2]}
          </strong>
        );
      } else if (fullMatch.startsWith('_') && fullMatch.endsWith('_')) {
        // Italic
        elements.push(
          <em key={`italic-${lineIdx}-${keyIdx++}`} style={{ fontStyle: 'italic' }}>
            {match[3]}
          </em>
        );
      } else if (fullMatch.startsWith('~') && fullMatch.endsWith('~')) {
        // Strikethrough
        elements.push(
          <del key={`strike-${lineIdx}-${keyIdx++}`} style={{ textDecoration: 'line-through' }}>
            {match[4]}
          </del>
        );
      } else if (fullMatch.startsWith('http://') || fullMatch.startsWith('https://')) {
        // URL Link
        elements.push(
          <a
            key={`link-${lineIdx}-${keyIdx++}`}
            href={fullMatch}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#027eb5',
              textDecoration: 'underline',
              wordBreak: 'break-all',
            }}
          >
            {fullMatch}
          </a>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      elements.push(line.substring(lastIndex));
    }

    return (
      <React.Fragment key={`line-${lineIdx}`}>
        {elements}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}
