import React from 'react'
import {View, StyleSheet, TouchableOpacity, NativeModules} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const { RNOpenSettings } = NativeModules;

const Bar=(props)=>{
    return(
        <View style={style.bar}>
            <TouchableOpacity onPress={()=>{
                try{
                      RNOpenSettings.wifiSettings();
                  }catch(err){
                    console.error(err);
                  }
            }}>
            <MaterialCommunityIcons name="wifi" color={'#ffffff'} size={40}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.showTimePicker}>
            <MaterialCommunityIcons name="clock" color={'#ffffff'} size={40}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.showTemperaturePicker}>
            <MaterialCommunityIcons name="fire" color={'#ffffff'} size={40}/>
            </TouchableOpacity>
        </View>
    )
}

const style=StyleSheet.create(
    {
        bar:{
            flex:0.2,
            backgroundColor:'#a8006d',
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
            flexDirection:'row',
            justifyContent:'space-around',
            paddingTop:10,
        },
    }
)

export default Bar