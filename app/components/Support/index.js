import React, { PureComponent, Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Languages, Images, Color, Styles, Validate, Icons } from '@common';
import { Container, Header, Content, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { connect } from 'react-redux'

const textwidth = ((Styles.width * 85) / 100) - 25;

class Support extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            textHeight: 50,
            prevLine: 0,
            notificationList: [
                {
                    id: 1,
                    message: 'Hi',
                    date: '14/09/2020'
                },
                {
                    id: 2,
                    message: 'Hello',
                    date: '14/09/2020'
                },
                {
                    id: 3,
                    message: 'Hi',
                    date: '14/09/2020'
                },
                {
                    id: 4,
                    message: 'Hi',
                    date: '14/09/2020'
                }
            ]
        };
        this.onMessageEditHandle = (message) => {
            // if(this.state.prevLine < Math.trunc(message.length/50)){
            //     this.setState({message, prevLine: Math.trunc(message.length/50), textHeight: this.state.textHeight + 25})
            // }else{
            //     this.setState({ message });
            // }
            this.setState({ message });            
        };
    }
    componentDidMount(){
        
    }

    onSendPressHandle = () => {
        alert(this.state.message);
    }

    renderItem = ({item}) => {
        return(
            <View style={styles.itemView}>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <View style={styles.divider}/>
            </View>
        );
    }
    render(){
        return(
            <Container style={styles.container}>               
                <Header style={styles.actionBar}>
                    <View style={styles.actionBarLeft}>
                        <TouchableOpacity 
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Icon name={Icons.MaterialCommunityIcons.Back} size={25} color={Color.cancelButton}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.actionBarMiddle}>
                    <Text style={styles.barCentertext}>{Languages.Support}</Text>
                    </View>
                    <View style={styles.actionBarRight}>                    
                    </View>
                </Header>
                <View style={styles.container}>
                    <FlatList
                        overScrollMode='never'
                        //contentContainerStyle={styles.flatlist}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.notificationList}
                        horizontal={false}                 
                        renderItem={this.renderItem}/>
                </View>
                <Footer style={styles.footer}>
                    <View style={styles.footerView}>
                        <TextInput
                            style={[styles.input, {height: 110}]}
                            //underlineColorAndroid='transpaent'
                            ref={(comp) => (this.message = comp)}
                            placeholderTextColor={Color.placeholder}
                            placeholder={Languages.Message}
                            onChangeText={this.onMessageEditHandle}
                            // onSubmitEditing={this.onSendPressHandle}
                            multiline={true}
                            value={this.state.message}
                        />
                        <View style={styles.sendView}>
                            <TouchableOpacity
                            onPress={this.onSendPressHandle}>
                                <Icon
                                    name={Icons.MaterialCommunityIcons.Send}
                                    size={25}
                                    color={Color.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Footer>
            </Container>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user,
    notification: state.user.notification
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        setNotification: (value) => dispatch(action.setNotification(value))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Support);
//export default NotificationSettings;