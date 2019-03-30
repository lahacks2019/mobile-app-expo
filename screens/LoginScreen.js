import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from  'react-native'
import { Alert } from 'expo';
import { Text, Button, Block } from 'galio-framework'
import * as Config from "../env";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.props = props;
    }

    _showMoreApp = () => {
    this.props.navigation.navigate('SignUp');
    };

    signInWithFacebook = async () => {
        const appId = Config.FACEBOOK_APP_ID;
        const permissions = ['public_profile', 'email'];  // Permissions required, consult Facebook docs
        
        const { type, token} = await Expo.Facebook.logInWithReadPermissionsAsync( appId, {permissions});
      
        switch (type) {
          case 'success': {
            this.props.navigation.navigate('SignUp');
            const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);
           console.log(await response.json());

            return Promise.resolve({type: 'success'});
          }
          case 'cancel': {
            return Promise.reject({type: 'cancel'});
          }
        }
      }

    render() {
        return (
          <Block  style={styles.container}>
            <KeyboardAvoidingView></KeyboardAvoidingView>
            <Text p muted>Hi, I'm a Galio component</Text>
            <Button onPress={this.signInWithFacebook}>
                Continue with facebook
            </Button>
          </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        // paddingTop: theme.SIZES.BASE * 0.3,
        // paddingHorizontal: theme.SIZES.BASE,
        // backgroundColor: theme.COLORS.WHITE,
    },
});