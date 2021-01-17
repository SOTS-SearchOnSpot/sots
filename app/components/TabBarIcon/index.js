import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Languages, Icons, Constants } from '@common'
import styles from './styles';

class TabBarIcon extends PureComponent {
    render() {
        const { label, tintColor, icon, type } = this.props;
        return(
            <View style={styles.container}>
                <View>
                    {(type == Constants.Icon.CommunityIcons )? (
                        <Icon name={icon} size={24} color={tintColor}/>
                    ) : (
                        <FontAwesome name={icon} size={24} color={tintColor}/>
                    )}                    
                </View>
                <Text style={styles.text(tintColor)}>{label}</Text>
            </View>
        );
    }
}
export default TabBarIcon;
