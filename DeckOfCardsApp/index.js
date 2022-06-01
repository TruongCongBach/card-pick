import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Cards from './cards';
import AnimationTypingText from './TypingText';

const useDrawCardsRandom = deck => {
  const [deckOfCard, setDeckOfCard] = useState(deck.cards);

  const [deckOfCardDrawed, setDeckOfCardDrawed] = useState([]);

  const [card, setCard] = useState(deck.about);

  const restart = () => {
    setDeckOfCard(deck.cards);
  };

  const getCard = () => {
    if (!deckOfCard.length) {
      return null;
    }
    const indexRandom = Math.floor(Math.random() * deckOfCard.length);
    const carded = deckOfCard[indexRandom];
    setDeckOfCardDrawed([...deckOfCardDrawed, carded]);
    setCard(carded);
    const deckOfCardNewAfterDraw = deckOfCard.filter(
      item => item.id !== carded.id,
    );
    if (!deckOfCardNewAfterDraw.length) {
      setDeckOfCard(deck.cards.filter(item => item.id !== carded.id));
    } else {
      setDeckOfCard(deckOfCardNewAfterDraw);
    }
  };

  return [card, getCard];
};

const DeckOfCardsApp = () => {
  const [card, getCard] = useDrawCardsRandom(Cards.steamy);
  const [isAnimationDone, setIsAnimationDone] = useState(true);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.png')}
        resizeMode="cover"
        style={styles.image}>
        <View
          style={{
            flex: 4,
            justifyContent: 'center',
          }}>
          <AnimationTypingText
            handleTypingDone={() => setIsAnimationDone(true)}
            style={styles.text}
            color={'#fc5556'}
            text={card.content}
          />
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fc5556',
              marginHorizontal: 40,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#2f3d86',
            }}
            underlayColor="#fff"
            disabled={!isAnimationDone}
            onPress={() => {
              setIsAnimationDone(false);
              getCard();
            }}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                paddingHorizontal: 20,
                paddingVertical: 10,
                fontSize: 40,
              }}>
              {isAnimationDone ? 'Pick !' : 'loading...'}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  text: {
    fontSize: 42,
    lineHeight: 44,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 40,
  },
});

export default DeckOfCardsApp;
