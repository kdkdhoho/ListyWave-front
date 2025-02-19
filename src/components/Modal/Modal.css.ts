import { style, styleVariants, ComplexStyleRule } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const background = style({
  width: '100vw',
  height: '100vh',
  zIndex: 100,

  position: 'fixed',
  top: '0px',
  left: '0px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: 'rgba(25, 25, 27, 0.3)',
});

const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2.4rem',

  backgroundColor: vars.color.white,
});

interface SizeVariantsType {
  [key: string]: ComplexStyleRule;
}

export const sizeVariants = styleVariants<SizeVariantsType>({
  basic: [
    container,
    {
      width: '326px',
      padding: '2.4rem',
      borderRadius: '0.8rem',
    },
  ],
  large: [
    container,
    {
      width: '391px',
      padding: '6rem 7.5rem',
      borderRadius: '3rem',
    },
  ],
});
