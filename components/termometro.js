import React, {useState, useRef, useEffect} from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ThermometerDraw from './termometerDraw'
import Info from './info'

const Termometro=(props)=>{
  let [dateNow, setDateNow] = useState(new Date());
  let [temperature, setTemperature]=useState(null);

  return(
    <View style={style.main}>
      <View style={style.section}>
        <ThermometerDraw  
          date={props.date} 
          setDate={props.setDate} 
          dateNow={dateNow}
          setDateNow={setDateNow}
          temperature={temperature} 
          setTemperature={setTemperature}
        />
        <Info 
          dateNow={dateNow}
          date={props.date} 
          setDate={props.setDate} 
          temperature={temperature}
        />
        <TouchableOpacity style={style.button} onPress={()=>{setTemperature(Math.floor(Math.random()*1500));}}>
          <MaterialCommunityIcons name="refresh" color={"#ffffff"} size={45}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style=StyleSheet.create(
  {
    title:{
      color:'#ffffff',
      fontSize:40,
      textAlign:'center'
    },  
    main:{
      padding:10,
      flex:2,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#a8006d',
      marginLeft:25,
      marginBottom:100,
      marginRight:25,
      marginTop:100,
      borderRadius:20,
      shadowColor: "#a8006d",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.59,
      shadowRadius: 2,
      elevation: 20,
    },
    section:{
      flex:2,
      padding:0,
      flexDirection:'row',
    },
    button:{
      backgroundColor:'#a8006d',
      height:80,
      width:80,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:100,
      position:'absolute',
      end:10,
      bottom:10,
      borderColor:'#000000',
      borderWidth:2,
      shadowColor:'#000000',
      shadowOpacity:0.2,
      shadowOffset:{width:0,height:-20},
      shadowRadius:20,
      elevation:20,
    }
  }
)
export default Termometro