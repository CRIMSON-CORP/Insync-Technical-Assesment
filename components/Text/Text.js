import PropTypes from 'prop-types';
import { memo } from 'react';
import { Text as RNText, TextStyle } from 'react-native';

function Text({ size, color, weight, style, children }) {
  return (
    <RNText
      style={{
        color,
        fontSize: size,
        fontWeight: weight,
        ...style,
      }}>
      {children}
    </RNText>
  );
}

Text.defaultProps = {
  size: 16,
  weight: '400',
  color: '#FFF',
  style: {},
};

Text.propTypes = {
  size: PropTypes.number,
  weight: PropTypes.oneOf([
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ]),
  color: PropTypes.string,
  style: PropTypes.shape(TextStyle),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]).isRequired,
};

export default memo(Text);
