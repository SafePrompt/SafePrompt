declare module 'react-highlight-words' {
    import * as React from 'react';
  
    export interface HighlighterProps {
      autoEscape?: boolean;
      caseSensitive?: boolean;
      highlightClassName?: string;
      highlightStyle?: React.CSSProperties;
      sanitize?: (text: string) => string;
      searchWords: string[];
      textToHighlight: string;
      unhighlightClassName?: string;
      unhighlightStyle?: React.CSSProperties;
      activeClassName?: string;
      activeIndex?: number;
      findChunks?: (options: {
        autoEscape?: boolean;
        caseSensitive?: boolean;
        sanitize?: (text: string) => string;
        searchWords: string[];
        textToHighlight: string;
      }) => { start: number; end: number }[];
      onMouseOverHighlight?: (event: MouseEvent, highlight: { start: number; end: number }) => void;
      onMouseOutHighlight?: (event: MouseEvent, highlight: { start: number; end: number }) => void;
      onClickHighlight?: (event: MouseEvent, highlight: { start: number; end: number }) => void;
    }
  
    export default class Highlighter extends React.Component<HighlighterProps> {}
  }
  