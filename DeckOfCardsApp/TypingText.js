import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class AnimationTypingText extends Component {
  constructor() {
    super();

    this.index = 0;

    this.typing_timer = -1;

    this.blinking_cursor_timer = -1;

    this.state = {text: '', blinking_cursor_color: 'transparent'};
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.text.length >= this.props.text.length &&
      this.state.text === this.props.text
    ) {
      this.props.handleTypingDone();
    }
    if (prevProps.text !== this.props.text) {
      this.setState(
        {
          text: '',
          blinking_cursor_color: 'transparent',
        },
        () => {
          clearTimeout(this.typing_timer);
          this.index = 0;
          this.typing_timer = -1;

          clearInterval(this.blinking_cursor_timer);

          this.blinking_cursor_timer = -1;

          this.typingAnimation();
          this.blinkingCursorAnimation();
        },
      );
    }
  }

  componentDidMount() {
    this.typingAnimation();
    this.blinkingCursorAnimation();
  }

  componentWillUnmout() {
    clearTimeout(this.typing_timer);

    this.typing_timer = -1;

    clearInterval(this.blinking_cursor_timer);

    this.blinking_cursor_timer = -1;
  }

  typingAnimation = () => {
    clearTimeout(this.typing_timer);

    this.typing_timer = -1;

    if (this.index < this.props.text.length) {
      if (this.refs.animatedText) {
        this.setState(
          {text: this.state.text + this.props.text.charAt(this.index)},
          () => {
            this.index++;

            this.typing_timer = setTimeout(() => {
              this.typingAnimation();
            }, this.props.typingAnimationDuration);
          },
        );
      }
    }
  };

  blinkingCursorAnimation = () => {
    this.blinking_cursor_timer = setInterval(() => {
      if (this.refs.animatedText) {
        if (this.state.blinking_cursor_color == 'transparent')
          this.setState({blinking_cursor_color: this.props.color});
        else this.setState({blinking_cursor_color: 'transparent'});
      }
    }, this.props.blinkingCursorAnimationDuration);
  };

  render() {
    return (
      <View style={{}}>
        <Text
          ref="animatedText"
          style={[
            {
              color: this.props.color,
              fontSize: this.props.textSize,
              textAlign: 'center',
            },
            this.props.style,
          ]}>
          {this.state.text}
          <Text style={{color: this.state.blinking_cursor_color}}>|</Text>
        </Text>
      </View>
    );
  }
}

AnimationTypingText.defaultProps = {
  text: 'Default Typing Animated Text.',
  color: 'rgb( 77, 192, 103 )',
  textSize: 30,
  typingAnimationDuration: 50,
  blinkingCursorAnimationDuration: 190,
};
