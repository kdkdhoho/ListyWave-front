import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

/**@todo 공용폰트 스타일 적용 */

export const wrapper = style({
  height: 'auto',
  padding: '0 27.5px 80px',
});

export const formWrapperOuter = style({
  padding: '15px 10px',

  width: '100%',
  height: 'auto',

  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,

  display: 'flex',
  alignItems: 'flex-end',
  gap: '4px',

  border: `1px solid ${vars.color.gray5}`,
  background: vars.color.white,
  zIndex: 1,
});

export const formWrapperInner = style({
  width: '100%',
  height: 'auto',
  padding: '7px 12px',

  display: 'flex',
  flexDirection: 'column',
  gap: '4px',

  borderRadius: '50px',
  border: `1px solid ${vars.color.gray5}`,
});

export const activeFormWrapper = style({
  borderRadius: '10px',
});

export const formContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const formInput = style({
  width: 'inherit',
  height: 'auto',

  flex: '1 0 0',

  fontSize: '1.2rem',
  wordBreak: 'break-all',
  wordWrap: 'break-word',
  whiteSpace: 'pre-wrap',
  resize: 'none',
});

export const replyNickname = style({
  marginRight: '8px',

  flex: '1 0 0',

  fontSize: '1.2rem',
  fontWeight: 400,
  color: vars.color.gray7,
});

export const formButton = style({
  marginLeft: '45px',

  background: 'none',
  fontSize: '1.2rem',
  fontWeight: 500,
  letterSpacing: '-0.36px',
});

export const totalCount = style({
  marginBottom: '15px',

  fontSize: '1.2rem',
  fontWeight: 600,
});

export const profileImage = style({
  width: '30px',
  minWidth: '30px',
  height: '30px',
  flex: '0 0 1',

  borderRadius: '16px',
  backgroundColor: vars.color.gray9,
});

export const commentWrapper = style({
  marginBottom: '20px',
});

export const activeReplyWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const replyNicknameWrapper = style({
  display: 'flex',
  alignItems: 'center',
});

export const clearButton = style({
  cursor: 'pointer',
});
