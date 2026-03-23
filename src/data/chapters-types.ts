export type ContentBlock =
  | { type: 'paragraph'; html: string }
  | { type: 'scene-break' };
