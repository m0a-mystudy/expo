import * as firebase from 'firebase/app';
import 'firebase/firestore';
import React from 'react';
import { View } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { createAppContainer, NavigationContainerProps } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Counter from './components/counter'

const firebaseConfig = {
  apiKey: "AIzaSyCnBdsJIB-GmjUF4nlh705VohOANLzsmIE",
  authDomain: "react-native-d221b.firebaseapp.com",
  databaseURL: "https://react-native-d221b.firebaseio.com",
  projectId: "react-native-d221b",
  storageBucket: "",
  messagingSenderId: "230949532994",
  appId: "1:230949532994:web:6e11c9519e7bd841"
};
firebase.initializeApp(firebaseConfig);

class HomeScreen extends React.Component<NavigationContainerProps> {

  state = {
    list:[]
  }
  async init() {
    let db = firebase.firestore();
    try {
      const snap = await db.collection("tasks").get()
      snap.forEach(doc => {
        this.setState({list: [...this.state.list, doc.data()]})
      })      
    } catch(e) {
      console.error("Error reading document: ", e);
    }
  }
   constructor(props) {
    super(props)
    this.state = {
      list:[]
    };
    this.init()
    
  }
  render() {
    return (
      <Card
        title='タスクリスト'
      >
        {
          this.state.list.map(task => {
            console.log({task});
            return (
            <Card key={task.taskName}>
              <Text style={{marginBottom: 10}}>
                {task.displayName}
              </Text>
              <Button 
                title="記録する"
                onPress={
                  ()=>this.props.navigation.push('Details', {taskName:task.taskName})
                } 
              />
            </Card>);
          })
        }
      </Card>
    );
  }
}
class DetailsScreen extends React.Component<NavigationContainerProps> {
  
  render() {
    const taskName = this.props.navigation.getParam('taskName')
    return (
      <Counter taskName={taskName} OnStop={()=> this.props.navigation.goBack()}/>
    );
  }
}


const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);

