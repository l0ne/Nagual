import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {
  Background,
  ContentWrapper,
  HeaderContainer,
  ImageBackground,
  PageContainer,
} from '../../styled-componets/PageContainer';
import {Logo} from '../../components/Logo';
import {CreateIcon, SettingsIcon} from '../../components/Icon';
import {getUser} from '../../services/Airtable/Airtable';
import {handleDevice} from '../../services/User/UserService';
import {saveUserId} from '../../services/Storage/Storage';
import {AnimatedContainer} from '../../components/Animated';
import {DICTIONARY} from '../../dict';

const HomeScreen = ({navigation}) => {
  const [device, setDevice] = useState({});

  useEffect(() => {
    handleDevice().then(r => {
      console.log(r);
      setDevice(r);
    });
  }, []);

  useEffect(() => {
    if (device && device.Users) {
      getUser(device.Users[0]).then(r => {
        saveUserId(r);
      });
    }
  }, [device]);

  const [second, setSecond] = useState(false);

  useEffect(() => {
    setTimeout(() => setSecond(true), 1000);
  }, []);

  const [third, setThird] = useState(false);

  useEffect(() => {
    setTimeout(() => setThird(true), 2000);
  }, []);

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
          <TextContainer>
            <AnimatedContainer>
              <AnimatedText>{DICTIONARY.AskQuestion}</AnimatedText>
            </AnimatedContainer>
            {third && (
              <AnimatedContainer>
                <AnimatedText>{DICTIONARY.TurnOffMind}</AnimatedText>
              </AnimatedContainer>
            )}
            {second && (
              <AnimatedContainer>
                <AnimatedText>{DICTIONARY.ReadyToAnswer}</AnimatedText>
              </AnimatedContainer>
            )}
          </TextContainer>
          <GoButton onPress={() => navigation.navigate('QuoteScreen')}>
            <ButtonText>{DICTIONARY.PressButton}</ButtonText>
          </GoButton>
        </ContentWrapper>
      </ImageBackground>
    </PageContainer>
  );
};

export default HomeScreen;

const AnimatedText = styled.Text`
  color: #ffffff;
  font-size: 32px;
  font-weight: 200;
`;

const TextContainer = styled.View`
  height: 30%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const GoButton = styled.TouchableOpacity`
  width: 80%;
  border-color: #ffffff;
  border-width: 1px;
  border-style: solid;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 32px;
  font-weight: 300;
`;
