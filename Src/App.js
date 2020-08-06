/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, TextInput, TouchableHighlight, Text} from 'react-native';
import Base64 from 'react-native-base64';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: null,
      username: null,
      password: null,
      Login: null,
    };
  }
  render() {
    const onPress = () => {
      const user = this.state.username;
      const pwd = this.state.password;
      let header = new Headers();
      header.append('username', 'hainn');
      header.append('password', 'qwe123');
      fetch(
        'https://dev.dmsc.com.vn/CustPATC/TokenResource.svc/?username=' +
          user +
          '&password=' +
          pwd,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
        .then((response) => response.json())
        .then((_responseData) => {
          this.setState({Login: 'Đăng Nhập thành công'});
        })
        .catch((_err) => {
          this.setState({Login: 'Đăng Nhập thất bại'});
        });
    };
    const GetApi = () => {
      const user = this.state.username;
      const token = Base64.encode(
        this.state.username + ':' + this.state.password,
      );
      fetch(
        'https://dev.dmsc.com.vn/CustPATC/api/v1/Erp.BO.UserFileSvc/UserFiles(' +
          user +
          ')',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Basic ' + token,
          },
        },
      )
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({Data: responseData.Name});
        })
        .catch((_err) => {
          this.setState({Data: 'thất bại'});
        });
    };
    return (
      <View>
        <TextInput
          editable
          maxLength={100}
          onChangeText={(text) => this.setState({username: text})}
          style={{
            backgroundColor: 'yellow',
            justifyContent: 'center',
            margin: 5,
            height: 50,
            fontSize: 20,
          }}
        />
        <TextInput
          editable
          maxLength={100}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
          style={{
            backgroundColor: 'yellow',
            justifyContent: 'center',
            margin: 5,
            height: 50,
            fontSize: 20,
          }}
        />
        <TouchableHighlight
          onPress={onPress}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
            margin: 5,
            padding: 20,
          }}>
          <View>
            <Text style={{color: 'white', fontSize: 30}}>Login</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={GetApi}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
            margin: 5,
            padding: 20,
          }}>
          <View>
            <Text style={{color: 'white', fontSize: 30}}>Get</Text>
          </View>
        </TouchableHighlight>
        <View>
          <Text>{this.state.Login}</Text>
          <Text>{this.state.Data}</Text>
        </View>
      </View>
    );
  }
}
