import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');
const Styles = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

};
Styles.Common = {
    ColumnCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
}
export default Styles;