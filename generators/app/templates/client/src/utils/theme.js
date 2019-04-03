import { css } from 'styled-components';
import Color from 'color';

const lighten = color => {
  console.log({ color });

  return Color(color)
    .alpha(0.5)
    .lighten(0.5);
};
const darken = color => {
  console.log({ color });

  return Color(color)
    .alpha(0.5)
    .darken(0.5);
};

export const colors = {
  Primary: '#6495ED', // cornflowerblue
  Secondary: '#5CE5F7', // analogue of cornflowblue
  Compliment: '#663399', // rebeccapurple
  Text: '#000',
  Button: {
    bgColor: '#6495ED',
    color: '#fff',
    hover: 'rgba(255,255,255,0.3)',
    active: '',
  },
  system: {
    ERROR: '#f7d7da',
    SUCCESS: '#d5edda',
    WARNING: '#fff3cd',
    GENERAL: '#cae6fe',
  },
  lighten,
  darken,
};

export const styles = {
  grow: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,
  middle: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ellipsisMask: css`
    display: inline-block;
    font-size: inherit;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `,
  // Material Design box-shadows
  boxShadows: [
    css`
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      transition: all 0.25s ease-in-out;
      &:hover {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
          0 6px 6px rgba(0, 0, 0, 0.23);
      }
    `,
    css`
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    `,
    css`
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    `,
    css`
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    `,
    css`
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
        0 15px 12px rgba(0, 0, 0, 0.22);
    `,
  ],
};

module.exports = {
  colors,
  styles,
};
