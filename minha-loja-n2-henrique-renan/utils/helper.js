import { Alert } from 'react-native';


export function trataErroAPI(error) {
    if (error.response && error.response.data && error.response.data.erro) {
        Alert.alert(error.response.data.erro);
    }
    else {
        Alert.alert(error.toString());
    }
}
