import PropTypes from 'prop-types';
import { memo } from 'react';
import { Text as RNText, TextStyle } from 'react-native';

/**
 * @typedef TextProps
 * @property {number} size - This is the Font-Size of the text, should be a number
 * @property {string} color - This is the Color of the text, should be a HEX or RGBA string color value
 * @property {100| 200| 300| 400| 500| 600| 700| 800| 900} weight - This is the Font-Weight of the text, should be a number
 * @property {CSSStyleDeclaration} style - This is used to give any aditional styling to the text
 */

const fontWeightFamilyMap = {
  100: 'poppins-thin',
  200: 'poppins-extralight',
  300: 'poppins-light',
  400: 'poppins-regular',
  500: 'poppins-medium',
  600: 'poppins-semibold',
  700: 'poppins-bold',
  800: 'poppins-extrabold',
  900: 'poppins-black',
};

/**
 * @param {TextProps} TextProps
 * @returns {JSX.Element}
 */

function Text({ size, color, weight, style, children }) {
  return (
    <RNText
      style={{
        color,
        fontSize: size,
        fontFamily: fontWeightFamilyMap[weight],
        ...style,
      }}>
      {children}
    </RNText>
  );
}

Text.defaultProps = {
  size: 16,
  weight: 400,
  color: '#FFF',
  style: {},
};

Text.propTypes = {
  size: PropTypes.number,
  weight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900]),
  color: PropTypes.string,
  style: PropTypes.shape(TextStyle),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]).isRequired,
};

export default memo(Text);
