import React, { Component } from 'react';
import { AppLoading, Font } from 'expo';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import { RED_COLOR } from '../constants';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    }
  }

  toggle1 = () => {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    })

    this.props.navigation.navigate('Home')
  }

  toggle2 = () => {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false
    })

    this.props.navigation.navigate('Category')
  }

  toggle3 = () => {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    })

    this.props.navigation.navigate('Cart')
  }

  toggle4 = () => {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true
    })

    this.props.navigation.navigate('Profile')
  }

  render() {
    const {
      tab1,
      tab2,
      tab3,
      tab4
    } = this.state

    return (
      <Footer>
        <FooterTab>
          <Button
            vertical
            active={tab1}
            onPress={this.toggle1}
          >
            <Icon name="home" />
            <Text>Home</Text>
          </Button>
          <Button
            vertical
            active={tab2}
            onPress={this.toggle2}
          >
            <Icon name="apps" />
            <Text>classification</Text>
          </Button>
          <Button
            vertical
            active={tab3}
            onPress={this.toggle3}
          >
            <Icon name="cart" />
            <Text>shopping cart</Text>
          </Button>
          <Button
            vertical
            active={tab4}
            onPress={this.toggle4}
          >
            <Icon name="person" />
            <Text>mine</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}
