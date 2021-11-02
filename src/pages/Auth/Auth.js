import React, {useState} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {
  Background,
  ContentWrapper,
  HeaderContainer,
  ImageBackground,
  PageContainer,
} from '../../styled-componets/PageContainer';
import {Logo} from '../../components/Logo';
import {AuthorIcon, BookIcon} from '../../components/Icon';

const AuthScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <PageContainer>
      <ImageBackground source={require('./loading.png')} resizeMode="cover">
        <Background />
        <ContentWrapper>
          <HeaderContainer>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Logo size="big" />
            </View>
          </HeaderContainer>
          <FormContainer>
            <InputContainer>
              <IconContainer>
                <AuthorIcon />
              </IconContainer>
              <EmailTextInput
                onChangeText={e => setEmail(e)}
                value={email}
                placeholder="Email"
              />
            </InputContainer>
            {!!email && (
              <InputContainer>
                <IconContainer>
                  <BookIcon />
                </IconContainer>
                <EmailTextInput
                  onChangeText={e => setPass(e)}
                  value={pass}
                  placeholder="Пароль"
                />
              </InputContainer>
            )}
            <GoButton onPress={() => navigation.navigate('QuoteScreen')}>
              <ButtonText>Войти</ButtonText>
            </GoButton>
          </FormContainer>
          <FormContainer />
        </ContentWrapper>
      </ImageBackground>
    </PageContainer>
  );
};

export default AuthScreen;

const FormContainer = styled.View`
  height: 30%;
  width: 80%;
  align-items: center;
`;

const GoButton = styled.TouchableOpacity`
  width: 100%;
  border-color: #ffffff;
  border-width: 1px;
  border-style: solid;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 32px;
  font-weight: 300;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid #e4e9f2;
  width: 100%;
  border-radius: 5px;
  background-color: #f7f9fc;
  margin-top: 20px;
  height: 40px;
`;

const IconContainer = styled.View`
  width: 30px;
  margin-left: 5px;
  opacity: 0.5;
`;

const EmailTextInput = styled.TextInput`
  width: 100%;
  height: 100%;
`;
