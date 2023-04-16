import styled from 'styled-components';

const grid = 8;
export const borderRadius = 2;
export const Button = styled.button`
  width: 200px;
  border-radius: 2px;
`;

export const getBackgroundColor = (
  isDragging: any,
  isGroupedOver: any,
  authorColors: { soft: any },
) => {
  if (isDragging) {
    return authorColors.soft;
  }

  if (isGroupedOver) {
    return '#EBECF0';
  }

  return '#FFFFFF';
};

export const getBorderColor = (
  isDragging: any,
  authorColors: { hard: any },
) => (isDragging ? authorColors.hard : 'transparent');

const imageSize = 40;

export const CloneBadge = styled.div`
  background: #79f2c0;
  bottom: ${grid / 2}px;
  border: 2px solid #57d9a3;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: -${imageSize / 3}px;
  top: -${imageSize / 3}px;
  transform: rotate(40deg);
  height: ${imageSize}px;
  width: ${imageSize}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`;

export const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
      Needed to wrap text in ie11
      https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
    */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;

export const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;

export const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;

export const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;

export function getStyle(provided: any, style: any) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}
