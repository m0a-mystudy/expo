import React from 'react';
import {  View } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


const  recordTime = async ({userId, taskName,startAt,endAt}:{userId:string, taskName:string,startAt:string, endAt:string}) => {
    let db = firebase.firestore();
  
    try {
      const docRef = await db.collection("times").add({
        userId,
        taskName,
        startAt,
        endAt,
      })
  
      console.log({docrefId:docRef.id});
    } catch(e) {
      console.error(`Error adding document:taskName=${taskName}, time=${startAt} - ${endAt} `, e);
    }
  }


interface Props {
    taskName: string
    OnStop:()=>void
}

interface State {
  intervalId: number| undefined;
  startAt: string | undefined;
  endAt:string | undefined;
}

export default class Counter extends React.Component<Props, State> {


  //stateを定義
  state: State = {
    intervalId:undefined,
    startAt : undefined,
    endAt:undefined,
  }

  timerStart = () => {
    this.setState({startAt:Date()})
    const id = setInterval(() => {
        this.setState({endAt:Date()})
    })
    this.setState({intervalId: id})
  }

  timerStop = async () => {
    clearInterval(this.state.intervalId)
    this.setState({intervalId:undefined})
    await recordTime({userId:'dummy001', ...this.props, ...this.state})
    this.props.OnStop()
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
    const t = ((new Date(this.state.endAt)).getTime() - (new Date(this.state.startAt)).getTime())/1000.0
    return (
      <View style={{flex:1, paddingVertical:80}}>
        <Card title="カウンタ">
        <Text  style={{marginTop:30, marginLeft:30}}>
            開始時間:{this.state.startAt}
          </Text>
          <Text h4 style={{marginTop:30, marginLeft:30}}>
            {`${t || 0 }`}
          </Text>
          {button}
        </Card>
      </View>
    );
  }

}
