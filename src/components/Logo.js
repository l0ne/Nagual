import React from 'react';
import {BigLogoImage, LogoImage} from '../styled-componets/Logo';

export const Logo = ({size}) => {
  if (size && size == 'big') {
    return <BigLogoImage source={require('./logo-big.png')} resizeMode="cover" />;
  }
  return <LogoImage source={require('./logo.png')} resizeMode="cover" />;
};
