import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Background,
  ContentWrapper,
  HeaderContainer,
  ImageBackground,
  PageContainer,
} from '../../styled-componets/PageContainer';
import {Logo} from '../../components/Logo';
import {CreateIcon, SettingsIcon} from '../../components/Icon';

// TODO Need implement :)
const ProfileScreen = ({navigation}) => {
  return (
    <PageContainer>
      <ImageBackground source={require('./home.png')} resizeMode="cover">
        <Background />
        <ContentWrapper>
          <HeaderContainer>
            <TouchableOpacity onPress={() => navigation.navigate('EditQuote')}>
              <CreateIcon />
            </TouchableOpacity>
            <Logo />
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <SettingsIcon />
            </TouchableOpacity>
          </HeaderContainer>
        </ContentWrapper>
      </ImageBackground>
    </PageContainer>
  );
};

export default ProfileScreen;
