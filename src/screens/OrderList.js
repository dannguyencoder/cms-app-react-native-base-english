import React from 'react';
import { connect } from 'react-redux';
import {
  ListView
} from 'react-native';
import {
  Content,
  Toast,
  Text
} from 'native-base';
import {
  getOrdersByUserId
} from '../actions';
import Order from '../components/Order';
import orderService from '../services/orderService';
import {
  ORDER_WAIT,
  ORDER_DISPATCHING,
  ORDER_FINISH,
  ORDER_REFUNDING,
  ORDER_REFUND_SUCCESS,
  ORDER_REFUNDING_FAILURE
} from '../constants';

@connect(
  state => ({
    isAuthorized: state.auth.isAuthorized,
    userId: state.auth.user.userId,
    token: state.auth.user.token,
    orders: state.orders.orders
  }),
  dispatch => ({
    loadOrders: (userId, token, status) => dispatch(getOrdersByUserId(userId, token, status))
  })
)
export default class OrderList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Order center',
    tabBarComponent: null
  })

  constructor(props) {
    super(props)
    this.status = new Map([
      [ORDER_WAIT, 'to be delivered'],
      [ORDER_DISPATCHING, 'In distribution'],
      [ORDER_FINISH, 'completed'],
      [ORDER_REFUNDING, 'Refunding'],
      [ORDER_REFUND_SUCCESS, 'Refund successfully'],
      [ORDER_REFUNDING_FAILURE, 'Refund failed']
    ])
  }

  componentWillMount() {
    if (!this.props.isAuthorized) {
      this._showToast('please log in first', 'danger')
      this.props.navigation.navigate('Signin', { from: 'Cart'} )
    } else {
      if (this.props.navigation.state.params && this.props.navigation.state.params.status !== null) {
        this.fetchOrders(this.props.navigation.state.params.status)
      } else {
        this.fetchOrders()
      }
    }
  }

  _showToast = (text, type = "warning") => {
    Toast.show({
      text,
      type,
      position: 'top'
    })
  }

  handleRefund = async (orderId) => {
    const {
      userId,
      token
    } = this.props

    await orderService.remove(userId, token, orderId)

    await this.fetchOrders()
  }

  fetchOrders = async (status) => {
    const {
      userId,
      token,
      loadOrders
    } = this.props

    await loadOrders(userId, token, status)
  }

  renderRow = (rowData, sectionId, rowId) => {
    return (
      <Order
        key={rowData.orderId}
        order={rowData}
        handleRefund={this.handleRefund}
      />
    )
  }

  render() {
    const {
      orders,
    } = this.props

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.orderId != r2.orderId
    })

    return (
      <Content>
        <ListView
          initialListSize={2}
          dataSource={ds.cloneWithRows(orders)}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />
      </Content>
    )
  }
}
