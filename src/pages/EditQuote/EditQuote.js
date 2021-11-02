import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  TouchableOpacity,
  Text,
  Clipboard,
} from 'react-native';
import {
  createAuthor,
  createBook,
  createQuote,
  getAuthorList,
  getBookList,
} from '../../services/Airtable/Airtable';
import {
  Background,
  ContentWrapper,
  HeaderContainer,
  ImageBackground,
  PageContainer,
} from '../../styled-componets/PageContainer';
import {Logo} from '../../components/Logo';
import {
  AuthorIcon,
  BackIcon,
  BookIcon,
  ClearIcon,
  CloseIcon,
  PasteIcon,
} from '../../components/Icon';
import {getUserId} from '../../services/Storage/Storage';
import {DICTIONARY} from '../../dict';

const EditQuote = ({navigation}) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [book, setBook] = useState('');
  const [bookId, setBookId] = useState('');
  const [bookList, setBookList] = useState([]);
  const [authorsList, setAuthorsList] = useState([]);
  const [authorId, setAuthorId] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getUserId().then(r => {
      console.log(r);
      setUserId(r);
    });
  }, []);

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setQuote(text);
  };

  const clearForm = () => {
    setQuote('');
    setAuthor('');
    setBook('');
  };

  const saveQuote = async () => {
    if (!quote) {
      return false;
    }

    let newAuthor = {};
    let _authorId = authorId;
    if (!authorId && author) {
      newAuthor = await createAuthor(author);
      _authorId = newAuthor.id;
    }

    let newBook = {};
    let _bookId = bookId;
    if (!bookId && book) {
      newBook = await createBook(book);
      _bookId = newBook.id;
    }

    createQuote(quote, _authorId, _bookId, userId).then(() => {
      clearForm();
      navigation.navigate('Home', {id: quote.id});
    });
  };

  const findAuthor = text => {
    getAuthorList(text).then(r => setAuthorsList(r));
    setAuthor(text);
    setAuthorId('');
  };

  const selectAuthor = r => {
    setAuthorId(r.id);
    setAuthorsList([]);
    setAuthor(r.fields.Name);
  };

  const findBook = text => {
    getBookList(text).then(r => setBookList(r));
    setBook(text);
    setBookId('');
  };

  const selectBook = r => {
    setBookId(r.id);
    setBookList([]);
    setBook(r.fields.Name);
  };

  return (
    <PageContainer>
      <ImageBackground
        source={require('./edit-background.png')}
        resizeMode="cover">
        <Background />
        <ContentWrapper>
          <HeaderContainer>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon />
            </TouchableOpacity>
            <Logo />
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CloseIcon />
            </TouchableOpacity>
          </HeaderContainer>
          <FormContainer>
            <TitleText>{DICTIONARY.Edit}</TitleText>
            <StyledScrollView>
              <QuoteInputContainer>
                <QuoteTextInput
                  onChangeText={text => setQuote(text)}
                  value={quote}
                  multiline
                  numberOfLines={8}
                />
                {!quote && (
                  <PasteIconContainer>
                    <TouchableOpacity onPress={fetchCopiedText}>
                      <PasteIcon />
                    </TouchableOpacity>
                  </PasteIconContainer>
                )}
                {!!quote && (
                  <PasteIconContainer>
                    <TouchableOpacity onPress={() => setQuote('')}>
                      <ClearIcon />
                    </TouchableOpacity>
                  </PasteIconContainer>
                )}
              </QuoteInputContainer>
              <AuthorInputContainer>
                <AuthorIconContainer>
                  <AuthorIcon />
                </AuthorIconContainer>
                <AuthorTextInput onChangeText={findAuthor} value={author} />
              </AuthorInputContainer>
              {authorsList.map((r, k) => (
                <TouchableOpacity key={k} onPress={() => selectAuthor(r)}>
                  <Text>{r.fields.Name}</Text>
                </TouchableOpacity>
              ))}
              <AuthorInputContainer>
                <AuthorIconContainer>
                  <BookIcon />
                </AuthorIconContainer>
                <AuthorTextInput onChangeText={findBook} value={book} />
              </AuthorInputContainer>
              {bookList.map((r, k) => (
                <TouchableOpacity key={k} onPress={() => selectBook(r)}>
                  <Text>{r.fields.Name}</Text>
                </TouchableOpacity>
              ))}
              <Button onPress={saveQuote}>
                <ButtonText>{DICTIONARY.SaveButton}</ButtonText>
              </Button>
            </StyledScrollView>
          </FormContainer>
        </ContentWrapper>
      </ImageBackground>
    </PageContainer>
  );
};

export default EditQuote;

const QuoteTextInput = styled.TextInput`
  border: 1px solid #e4e9f2;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  background-color: #f7f9fc;
  margin-top: 20px;
`;

const AuthorTextInput = styled.TextInput`
  width: 100%;
  height: 100%;
`;

const FormContainer = styled.View`
  width: 100%;
  height: 80%;
  padding: 20px;
  align-items: center;
  background-color: #ffffff;
  border-radius: 30px;
`;

const StyledScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
  },
}))`
  width: 100%;
`;

const TitleText = styled.Text`
  color: #222b45;
  font-size: 32px;
  font-weight: 200;
  margin-top: 30px;
`;

const Button = styled.TouchableOpacity`
  border: 1px solid #edf1f7;
  width: 90%;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  height: 50px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  color: #222b45;
  font-size: 28px;
`;

const QuoteInputContainer = styled.View`
  flex-direction: row;
`;

const PasteIconContainer = styled.View`
  width: 30px;
  margin-top: 25px;
  margin-left: -30px;
  opacity: 0.5;
`;

const AuthorInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid #e4e9f2;
  width: 100%;
  border-radius: 5px;
  background-color: #f7f9fc;
  margin-top: 20px;
  height: 40px;
`;

const AuthorIconContainer = styled.View`
  width: 30px;
  margin-left: 5px;
  opacity: 0.5;
`;
