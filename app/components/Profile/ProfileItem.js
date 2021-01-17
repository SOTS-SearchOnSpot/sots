import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './styles';
import { Color, Icons, Languages } from '@common';

class ProfileItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    setText = (id) => {
        switch(id){
            case 1: 
                return(<Text style={styles.itemName}>{Languages.Settings}</Text>);
            case 2: 
                return(
                    <View>
                        <Text style={styles.itemName}>{Languages.Support}</Text>
                        <Text style={styles.itemNameSupport}>{Languages.SupportAdmin}</Text>
                    </View>
                );
            case 3: 
                return(<Text style={styles.itemName}>{Languages.Favourites}</Text>);
            case 4: 
                return(<Text style={styles.itemName}>{Languages.Share}</Text>);
            case 5: 
                return(<Text style={styles.itemName}>{Languages.ChangePassword}</Text>);
            case 6: 
                return(<Text style={styles.itemName}>{Languages.Policy}</Text>);
        }
    }

    render(){
        const { item, onItemPress } = this.props;
        return(            
            <TouchableOpacity onPress={() => {
                onItemPress(item);
            }}
            style={styles.item}>
                <View style={styles.itemView}>
                    {this.setText(item.id)}
                    <View style={styles.rightIcon}>
                        <Icon name={Icons.Entypo.Right} color={Color.cancelButton} size={24}/>
                    </View>                   
                </View>
                <View style={styles.bottomView}/>
            </TouchableOpacity>         
        );
    }
}
export default ProfileItem;