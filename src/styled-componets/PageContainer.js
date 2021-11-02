import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const PageContainer = styled.SafeAreaView`
  flex: 1;
  background-color: rgba(81, 74, 157, 0.7);
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const Background = styled(LinearGradient).attrs({
  colors: ['#514A9D', '#24C6DC'],
  start: {x: 1, y: 0},
  end: {x: 1, y: 1},
})`
  height: 100%;
  width: 100%;
  opacity: 0.7;
  position: absolute;,
`;

export const ContentWrapper = styled.View`
  flex: 1;
  padding: 30px 10px 30px 10px;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderContainer = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
`;
