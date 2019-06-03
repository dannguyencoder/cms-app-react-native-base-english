import React from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Button,
  Text,
  Header,
  Body,
  Title,
  Row,
  Col,
  View
} from 'native-base';
import {
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';
import { PRIMARY_COLOR, IMAGE_URL } from '../constants';
import HeaderSearchbar from '../components/HeaderSearchbar';
import Blocks from '../components/Blocks';
import ImageBox from '../components/ImageBox';
import categoryService from '../services/categoryService';

const styles = StyleSheet.create({
  wrapper: {
  }
})

// const categories = [{
//     id: 10000000,
//     categoryName: 'Fine fruit',
//     secondCategories: [{
//       id: 10000000,
//       categorySecondName: 'Seasonal sales',
//       image: 'http://119.29.161.228/cloudimg/categories/yingjirexiao.png'
//     }, {
//       id: 10000001,
//       categorySecondName: 'Melon',
//       image: 'http://119.29.161.228/cloudimg/categories/gualei.png'
//     }, {
//       id: 10000002,
//       categorySecondName: 'Apple pear',
//       image: 'http://119.29.161.228/cloudimg/categories/pingguoli.png'
//     }, {
//       id: 10000003,
//       categorySecondName: 'Small fruit',
//       image: 'http://119.29.161.228/cloudimg/categories/xiaoguolei.png'
//     }]
//   }, {
//     id: 10000001,
//     categoryName: 'Preferred vegetables',
//     secondCategories: [{
//       id: 10000004,
//       categorySecondName: 'Beans',
//       image: 'http://119.29.161.228/cloudimg/categories/doulei.png'
//     }, {
//       id: 10000005,
//       categorySecondName: 'Seasoning',
//       image: 'http://119.29.161.228/cloudimg/categories/tiaoweilei.png'
//     }, {
//       id: 10000006,
//       categorySecondName: 'Leafy vegetables',
//       image: 'http://119.29.161.228/cloudimg/categories/yecailei.png'
//     }]
//   }, {
//     id: 10000002,
//     categoryName: 'Poultry fish',
//     secondCategories: [{
//     id: 10000007,
//       categorySecondName: 'Chicken, duck and poultry',
//       image: 'http://119.29.161.228/cloudimg/categories/jiyaqinrou.png'
//     }, {
//       id: 10000008,
//       categorySecondName: 'Beef steak',
//       image: 'http://119.29.161.228/cloudimg/categories/niurouniupai.png'
//     }, {
//       id: 10000009,
//       categorySecondName: 'Software class',
//       image: 'http://119.29.161.228/cloudimg/categories/ruantilei.png'
//     }, {
//       id: 10000010,
//       categorySecondName: 'Shrimp',
//       image: 'http://119.29.161.228/cloudimg/categories/xialei.png'
//     }, {
//       id: 10000011,
//       categorySecondName: 'Crab shellfish',
//       image: 'http://119.29.161.228/cloudimg/categories/xieleibeilei.png'
//     }, {
//       id: 10000012,
//       categorySecondName: 'Fish',
//       image: 'http://119.29.161.228/cloudimg/categories/yulei.png'
//     }, {
//       id: 10000013,
//       categorySecondName: 'Pork',
//       image: 'http://119.29.161.228/cloudimg/categories/zhuroulei.png'
//     }]
//   }
// ]

export default class Home extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <HeaderSearchbar navigation={navigation}/>
  })

  state = {
    categories: []
  }

  componentDidMount() {
    this.fetchCategory()
  }

  fetchCategory = async () => {
    const res = await categoryService.all();
    const categories = res.data.data

    this.setState({
      categories
    })
  }

  handleGotoSearch = (categorySecondId) => {
    this.props.navigation.navigate('GoodSearch', {
      good: {
        categorySecondId: categorySecondId
      }
    })
  }

  renderCategory = () => {
    const categories = this.state.categories
    let nodes = []

    nodes = categories.map((categoryItem) => {
      const datas = categoryItem.categorySeconds
      const processedCategories = []
      let rows = []

      for (let i = 0; i < datas.length; i+=3) {
        processedCategories.push(datas.slice(i, i + 3))
      }

      rows = processedCategories.map((items, index) => {
        return (
          <Row key={index}>
            {
              items.map((item) => {
                return (
                  <Col key={item.categorySecondId} style={{width: '33.33%'}}>
                    <TouchableNativeFeedback onPress={() => this.handleGotoSearch(item.categorySecondId)}>
                    <ImageBox
                      key={item.categorySecondId}
                      image={IMAGE_URL + item.image}
                      desc={item.categoryName}
                    />
                    </TouchableNativeFeedback>
                  </Col>
                )
              })
            }
          </Row>
        )
      })

      return (
        <Blocks
          title={categoryItem.categoryName}
          key={categoryItem.categoryFirstId}
        >
          {rows}
        </Blocks>
      )
    })

    return nodes
  }

  render() {
    const {
      goods,
      inService,
      navigation
    } = this.props

    const list = this.renderCategory()

    return (
      <Content
        showsVerticalScrollIndicator={false}
      >
        {list}
      </Content>
    )
  }
}
