import React from 'react';
import {  View } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';

interface Props {
    taskName: string
    displayName: string
    onPress: () => void
}


export default class Task extends React.Component<Props> {

  render() {    
    return (
      <View style={{flex:1, paddingVertical:80}}>
        <Card title={this.props.displayName}>

          <Button
            title="記録"
            buttonStyle={{marginTop:30, borderRadius:20, backgroundColor:'red'}}
            onPress={this.props.onPress}
            />
        </Card>
      </View>
    );
  }

}
