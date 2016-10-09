import React, { Component } from 'react'
import API from '../src/api.js'
import {
  AsyncStorage,
  ActivityIndicator,
  Text,
  StyleSheet,
  ListView,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native'

class PodcastList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: 'Anansi',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      podcasts: {},
      loaded: false
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_item}>
            <Text style={styles.header_text}>{this.state.title}</Text>
          </View>
          <View style={styles.header_item}>
          {  !this.state.loaded &&
            <ActivityIndicator animating={true} style={[styles.centering, {height: 80}]} size="large" />
          }
          </View>
        </View>
          <View style={styles.body}>
          <ScrollView ref="scrollView">
          {
            this.state.loaded &&
            <ListView initialListSize={1} dataSource={this.state.podcasts} renderRow={this.renderItems}></ListView>
          }
          </ScrollView>
          </View>
      </View>
    );

  }

  renderItems(pod) {
    return (
      <TouchableHighlight underlayColor={"#E8E8E8"} style={styles.button}>
      <View style={styles.podcast_item}>
          <Text style={styles.podcast_item_text}>{pod.name}</Text>
      </View>
      </TouchableHighlight>
    );
  }

  componentDidMount() {
    AsyncStorage.getItem('podcast_list').then((items_str) => {

      const new_items = JSON.parse(items_str)

      if(new_items !== null) {
        this.updateItemsUI(new_items);
      } else {
        this.getItems();
      }

    }).done();
  }

  getItems() {

    let items = []
    API.PodcastList().then((podcasts) => {
      items = podcasts
      this.updateItemsUI(items);
      this.updateItemsDB(items);
    })

  }

  updateItemsUI(items) {
    this.setState({
      'podcasts': this.state.dataSource.cloneWithRows(items),
      'loaded': true
    })
  }

  updateItemsDB(items) {
    AsyncStorage.setItem('podcast_list', JSON.stringify(items))
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#bee368',
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  body: {
    flex: 9,
    backgroundColor: '#F6F6EF'
  },
  header_item: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center'
  },
  header_text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  },
  button: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  podcast_item: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 5
  },
  podcast_item_text: {
    color: '#575757',
    fontSize: 18
  }
});

export default PodcastList
