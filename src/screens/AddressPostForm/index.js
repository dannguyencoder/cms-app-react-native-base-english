import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableNativeFeedback,
  StyleSheet,
  Platform,
  Modal
} from 'react-native';
import {
  Container,
  Footer,
  Content,
  View,
  Text,
  Form,
  Item,
  Label,
  Input,
  Toast,
  Spinner,
  CheckBox
} from 'native-base';
import {
  RED_COLOR, RE_PHONE
} from '../../constants';
import AddressPicker from '../../components/AddressPicker';
import {
  createAddress
} from '../../actions';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff'
  },
  footer: {
    height: 50,
    alignItems: 'center',
    backgroundColor: RED_COLOR
  },
  footerContent: {
    color: '#fff',
    fontSize: 18
  }
})

@connect(
  state => ({
    userId: state.auth.user.userId,
    token: state.auth.user.token,
    isAuthorized: state.auth.isAuthorized,
    isPostingAddress: state.address.isPostingAddress,
    postErrorMessage: state.address.postErrorMessage
  }),
  dispatch => ({
    createAddress: (userId, token, address) => dispatch(createAddress(userId, token, address))
  })
)
export default class AddressPostForm extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Add a new shipping address'
  })

  state = {
    modalVisible: false,
  }

  constructor(props) {
    super(props)

    this.state.form = this.props.navigation.state.params ?
      this.props.navigation.state.params.form || {
        consignee: "",
        phone: "",
        city: "",
        address: "",
        streetNumber: "",
        isDefautl: false
      } : {
        consignee: "",
        phone: "",
        city: "",
        address: "",
        streetNumber: "",
        isDefautl: false
      }
  }

  /**
   * addressPicker open event
   *
   * @memberof AddressPostForm
   */
  handleModalShow = () => {
    this.setState({
      modalVisible: true
    })
  }

  /**
   * adressPicker close event
   *
   * @memberof AddressPostForm
   */
  handleAddressModalClose = () => {
    this.setState({
      modalVisible: false
    })
  }

  /**
   * addressPicker select event
   *
   * @memberof AddressPostForm
   */
  handleModalSelect = (value) => {
    this.setState({
      modalVisible: false,
      form: {
        ...this.state.form,
        city: value
      }
    })
  }

  /**
   * Change isDefault
   *
   * @memberof AddressPostForm
   */
  handleIsDefaultChange = () => {
    this.setState({
      form: {
        ...this.state.form,
        isDefault: !this.state.form.isDefault
      }
    })
  }

  /**
   * Change the value of form
   *
   * @memberof AddressPostForm
   */
  handleValueChange = (value) => {
    this.setState({
      form: {
        ...this.state.form,
        ...value
      }
    })
  }

  handleSubmit = async () => {
    const {
      userId,
      token,
      navigation,
      isAuthorized,
      createAddress
    } = this.props
    const form = this.state.form
    if (!isAuthorized) {
      navigation.navigate('Signin', { from: 'PostAddress', params: {
        form: form
      }})
    } else {
      if(!this.validate()) {
        return ;
      }

      const phone = parseInt(form.phone, 10)
      await createAddress(userId, token, {
        ...form,
        phone
      })

      if (this.props.postErrorMessage !== "") {
        this.showToast(this.props.postErrorMessage, 'danger')
      } else {
        this.showToast('Successfully added new shipping address', 'success')

        navigation.navigate('Address')
      }
    }
  }

  validate = () => {
    const {
      form
    } = this.state

    if (form.consignee === "") {
      this.showToast('Please enter the correct consignee name')
      return false
    }

    if (!RE_PHONE.test(form.phone)) {
      this.showToast('Please enter the correct phone number')
      return false
    }

    if (form.city === "") {
      this.showToast('Please select city')
      return false
    }

    if (form.address === "") {
      this.showToast('Please enter the correct full address')
      return false
    }

    if (form.streetNumber === "") {
      this.showToast('Please enter the correct house number')
      return false
    }

    return true
  }

  showToast = (text, type = 'warning') => {
    Toast.show({
      text,
      position: 'absolute',
      type
    })
  }

  render() {

    return (
      <Container style={styles.wrapper}>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Consignee name</Label>
              <Input
                value={this.state.form.consignee}
                onChangeText={text => this.handleValueChange({consignee: text})}
              />
            </Item>
            <Item stackedLabel>
              <Label>cellphone number</Label>
              <Input
                keyboardType="numeric"
                maxLength={12}
                value={this.state.form.phone}
                onChangeText={text => this.handleValueChange({phone: text})}
              />
            </Item>
            <Item stackedLabel onPress={this.handleModalShow}>
              <Label>city</Label>
              <Input disabled value={this.state.form.city}/>
            </Item>
            <Item stackedLabel>
              <Label>Address</Label>
              <Input
                value={this.state.form.address}
                onChangeText={text => this.handleValueChange({address: text})}
              />
            </Item>
            <Item stackedLabel>
              <Label>House number</Label>
              <Input value={this.state.form.streetNumber} onChangeText={text => this.handleValueChange({streetNumber: text})}/>
            </Item>
            <Item onPress={this.handleIsDefaultChange}>
              <Label>Is it the default address?</Label>
              <CheckBox checked={this.state.form.isDefault} disabled color={RED_COLOR} />
              <Input disabled />
            </Item>
          </Form>
          <AddressPicker
            visible={this.state.modalVisible}
            handleClose={this.handleAddressModalClose}
            handleSelect={this.handleModalSelect}
          />
        </Content>
        <TouchableNativeFeedback onPress={this.handleSubmit}>
          <Footer style={styles.footer}>
            {
              this.props.isPostingAddress ? (
                <Spinner color="#fff" />
              ) : null
            }
            <Text style={styles.footerContent}>确认添加</Text>
          </Footer>
        </TouchableNativeFeedback>
      </Container>
    )
  }
}
