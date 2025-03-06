import React, { useState } from "react";
import {
    Dimensions,
    StyleSheet,
    View,
    TouchableHighlight,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { ThemedText } from "./ThemedText";

// Calculate window size
const width = Dimensions.get('window').width

// Declare components
const StoreBar = () => {

    return (
        <>
            <View style={styles.header}>
                <View style={styles.header_inner}>
                    <View>
                        <ThemedText style={styles.logo}>Store</ThemedText>
                    </View>
                    <View>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor={'#ccd0d5'}
                            style={styles.search_icon_box}
                        >
                            <Icon name="search" size={22} color={'#000000'} />
                        </TouchableHighlight>

                    </View>
                </View>
            </View>
        </>
    );
}

export default StoreBar;
const styles = StyleSheet.create(
    {
        header_safe_area: {
            zIndex: 1000,
        },
        header: {
            height: 50,
            paddingHorizontal: 16,
            borderBottomWidth: 0.5
        },
        logo: {
            fontSize: 22,
            fontWeight: "bold"
        },
        header_inner: {
            flex: 1,
            overflow: 'hidden',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative'
        },
        search_icon_box: {
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: '#e4e6eb',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        input_box: {
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'white',
            width: width - 32
        },
        back_icon_box: {
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: '#e4e6eb',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5
        },
        input: {
            flex: 1,
            height: 40,
            backgroundColor: '#e4e6eb',
            borderRadius: 16,
            paddingHorizontal: 16,
            fontSize: 15
        },
    }
)