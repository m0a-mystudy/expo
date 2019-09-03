import React from 'react';
import {  View } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


const  recordTime = async (taskId:string,time:number) => {
    let db = firebase.firestore();
  
    try {
      const docRef = await db.collection("aaa").add({
        taskId,
        time,
      })
  
      console.log({docrefId:docRef.id});
    } catch(e) {
      console.error(`Error adding document:taskId=${taskId}, time=${time} `, e);
    }
  }


interface Props {
    taskName: string
}

interface State {
  intervalId: number| undefined;
  counter: number;
}

export default class Counter extends React.Component<Props, State> {


  //stateを定義
  state: State = {
    intervalId:undefined,
    counter : 0
  }

  timerStart = () => {
    const id = setInterval(() => {
      this.setState({counter:this.state.counter+1})
    })
    this.setState({intervalId: id})
  }

  timerStop = () => {
    clearInterval(this.state.intervalId)
    this.setState({intervalId:undefined})
    recordTime(this.props.taskName, this.state.counter)
  }

  render() {
    let button = <Button
      title="StartTime"
      buttonStyle={{marginTop:30, borderRadius:20}}
      onPress={this.timerStart}
    />
    
    if (this.state.intervalId) {
      button = <Button
        title="StopTime"
        buttonStyle={{marginTop:30, borderRadius:20, backgroundColor:'red'}}
        onPress={this.timerStop}
      />
    }
    return (
      <View style={{flex:1, paddingVertical:80}}>
        <Card title="カウンタ">
          <Text h4 style={{marginTop:30, marginLeft:30}}>
            {`${this.state.counter/100}`}
          </Text>
          {button}
        </Card>
      </View>
    );
  }

}
