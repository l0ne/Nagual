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
import {BackIcon} from '../../components/Icon';
import {getUserId} from '../../services/Storage/Storage';
import MasonryList from '@react-native-seoul/masonry-list';
import {getQuotesList} from '../../services/Airtable/Airtable';

const QuoteContainer = styled.View`
  background-color: #ffffff;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  margin-left: 10px;
`;

const QuoteText = styled.Text`
  color: #333333;
  font-size: 12px;
  font-weight: 300;
`;

const QuotesListScreen = ({navigation}) => {
  const [userId, setUserId] = useState(null);
  const [listOfQuotes, setListOfQuotes] = useState([]);

  useEffect(() => {
    getUserId().then(r => {
      console.log(r);
      setUserId(r);
    });
  }, []);

  useEffect(() => {
    getQuotesList(userId).then(r => {
      setListOfQuotes(r);
    });
  }, [userId]);

  return (
    <PageContainer>
      <ImageBackground source={require('./list.png')} resizeMode="cover">
        <Background />
        <ContentWrapper>
          <HeaderContainer>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon />
            </TouchableOpacity>
            <Logo />
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              {/*<SettingsIcon />*/}
            </TouchableOpacity>
          </HeaderContainer>
          <MasonryList
            style={{alignSelf: 'stretch'}}
            contentContainerStyle={{
              paddingHorizontal: 10,
              alignSelf: 'stretch',
            }}
            numColumns={2}
            data={listOfQuotes}
            renderItem={({item}) => {
              return (
                <QuoteContainer>
                  <QuoteText>{item.fields?.Quote}</QuoteText>
                </QuoteContainer>
              );
            }}
          />
        </ContentWrapper>
      </ImageBackground>
    </PageContainer>
  );
};

export default QuotesListScreen;
