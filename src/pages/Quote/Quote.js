import React, {useEffect, useRef, useState} from 'react';
import {Button, Text, ScrollView, TouchableOpacity, Animated} from 'react-native';
import styled from 'styled-components';
import {countQuotes, getQuoteById} from '../../services/Airtable/Airtable';
import {
  Background,
  ContentWrapper,
  HeaderContainer,
  ImageBackground,
  PageContainer,
} from '../../styled-componets/PageContainer';
import {CloseIcon, CreateIcon} from '../../components/Icon';
import {Logo} from '../../components/Logo';
import {FadeInContainer} from '../../components/Animated';

const QuoteScreen = ({navigation, route}) => {
  const [quote, setQuote] = useState({});

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    countQuotes().then(r => {
      const random = randomIntFromInterval(1, Number(r));

      getQuoteById(random).then(r => {
        setQuote(r);
      });
    });
  }, []);

  return (
    <PageContainer>
      <ImageBackground
        source={require('./quote-background.png')}
        resizeMode="cover">
        <Background />
        <ContentWrapper>
          <HeaderContainer>
            <TouchableOpacity onPress={() => navigation.navigate('EditQuote')}>
              <CreateIcon />
            </TouchableOpacity>
            <Logo />
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CloseIcon />
            </TouchableOpacity>
          </HeaderContainer>
          <FadeInContainer style={{width: '100%'}}>
            <QuoteConatiner>
              <QuoteText>{quote.Quote}</QuoteText>
              <AuthorContainer>
                <AuthorText>{quote.AuthorName}</AuthorText>
                <AuthorText>{quote.BookName}</AuthorText>
              </AuthorContainer>
            </QuoteConatiner>
          </FadeInContainer>
        </ContentWrapper>
      </ImageBackground>
    </PageContainer>
  );
};

export default QuoteScreen;

const QuoteConatiner = styled.View`
  width: 100%;
  background-color: #ffffff;
  align-items: center;
  padding: 30px;
  border-radius: 30px;
  justify-content: center;
`;

const QuoteText = styled.Text`
  color: #333333;
  font-size: 18px;
  font-weight: 300;
`;

const AuthorContainer = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-top: 20px;
`;

const AuthorText = styled.Text`
  color: #333333;
  font-size: 12px;
  font-weight: 300;
`;
