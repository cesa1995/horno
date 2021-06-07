import React,{useRef, useState, useEffect} from 'react'
import {StyleSheet,View, TouchableOpacity, Dimensions,Text, TextInput, Animated} from 'react-native'
import Termometro from './components/termometro'
import Bar from './components/bar'
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from './components/slider'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

const app=()=>{
  const [showTemperature, setShowTemperature] =useState(false);
  const [showTemperatureTypeInput, setShowTemperatureTypeInput]=useState(true);
  const [showTime, setShowTime]=useState(false);
  const [date, setDate]=useState(new Date());
  const [temperature, setTemperature]=useState(0);
  const [angle, setAngle]=useState(359*Math.PI/180);
  const animation=useRef(new Animated.Value(height-(48*height/100))).current;
  const [display, setDisplay]=useState('flex');

  const animate=()=>{
    setDisplay('none')
    if(showTemperatureTypeInput==true){
      Animated.timing(
        animation,
        {
          toValue:height-(60*height/100),
          duration:200,
          useNativeDriver:false
        }
      ).start();
    }else{
      Animated.timing(
        animation,
        {
          toValue:height-(48*height/100),
          duration:200,
          useNativeDriver:false
        }
      ).start(
        (end)=>{
          if(end){
            setDisplay('flex');
          }
        }
      );
    }
    showTemperatureTypeInput?setShowTemperatureTypeInput(false):setShowTemperatureTypeInput(true);
  }

  return(
    <View style={style.main}>
      <View style={style.info}>
        <Termometro date={date} setDate={setDate}/>
        <Bar 
          showTimePicker={
            ()=>{
              setShowTime(true);
            }
          }
          showTemperaturePicker={
            ()=>{
              setShowTemperature(true);
            }
          }
          />
      </View>
      {
          showTime && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'time'}
            is24Hour={false}
            display="clock" 
            onChange={(e,datePicker)=>{
              if(e.type==='dismissed'){
                setShowTime(false);
              }else{
                setShowTime(false);
                setDate(datePicker);
              }
            }}
            
          />
          )
        }
      {
          !showTime && showTemperature &&(
                <View style={style.fire}>
                <View style={style.fireBackground} onStartShouldSetResponder={()=>{setShowTemperature(false)}}/>
                <Animated.View style={{
                  position:'absolute',
                  height:animation,
                  width:width-(26*width/100),
                  marginLeft:(13*width/100),
                  marginTop:(24*height/100),
                  backgroundColor:'#ffffff',
                  borderRadius:2,}
                }>
                    <View style={style.header}>
                      <Text style={style.temperature}>{`${temperature}`}</Text>
                      <Text style={style.simbol}>°C</Text>
                    </View>
                    <View style={style.elements}>
                    {
                      !showTemperatureTypeInput&& (
                        <View>
                          <Text style={style.title}>Ingrese Temperatura</Text>
                          <TextInput style={style.input} defaultValue={`${temperature}`} keyboardType={"numeric"} onChangeText={(value)=>{
                            setTemperature(value);
                            setAngle(((parseInt(value,10)*360)/1000)*Math.PI/180);
                          }}/>
                        </View>
                      )
                    }  
                    {
                      
                      showTemperatureTypeInput && (
                        <Slider display={display} angle={angle} setAngle={setAngle} updateValue={(value)=>{setTemperature(Math.round((value*1000)/(360*Math.PI/180)))}}/>
                      )
                    }
                    </View>                  
                    <View style={style.elementsButton}>
                      <TouchableOpacity onPress={()=>{
                        animate();   
                      }}>
                        {
                          showTemperatureTypeInput &&(
                            <MaterialCommunityIcons name={'keyboard'} color={'#797979'} size={25}/>
                          )
                        }
                        {
                          !showTemperatureTypeInput &&(
                            <MaterialCommunityIcons name={'circle-slice-3'} color={'#797979'} size={25}/>
                          )
                        }
                        
                      </TouchableOpacity>
                      <View style={style.decitionsButton}>
                        <TouchableOpacity onPress={()=>{setShowTemperature(false)}}>
                          <Text style={style.textDecitionButtons}>CANCELAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <Text style={style.textDecitionButtons} onPress={()=>{}}>ACEPTAR</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                </Animated.View>
              </View>
        )
        }
    </View>
  )
}

const style=StyleSheet.create(
  {
    title:{
      fontWeight:'bold',
      fontSize:15
    },
    input:{
      borderBottomWidth:2
    },
    temperature:{
      color:'white',
      fontSize:55,
      marginTop:20,
      marginLeft:50
    },
    simbol:{
      fontSize:20,
      color:'white',
      marginTop:30,
      marginLeft:10,
      fontWeight:'bold'
    },
    header:{
      flex:0.5,
      backgroundColor:'#009988',
      justifyContent:'center',
      alignItems:'flex-start',
      flexDirection:'row',
      borderRadius:2
    },
    elements:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'    
    },
    decitionsButton:{
      flex:0.7,
      flexDirection:'row',
      alignContent:'center',
      justifyContent:'space-between',
      marginRight:10
    },
    elementsButton:{
      flex:0.2,
      justifyContent:'space-between',
      alignContent:'center',
      flexDirection:'row',
      marginRight:10,
      marginLeft:10,
      fontWeight:'600',
    },
    textDecitionButtons:{
      fontSize:14,
    },  
    info:{
      zIndex:1000,
      elevation:0,
      position:'relative',
      width:width,
      height:height,
      top:0,
      left:0
    },
    main:{
      flex:1,
    },
    fireBackground:{
      position:'absolute',
      width:width,
      height:height,
      backgroundColor:'rgba(0,0,0,.5)',
    },
    fire:{
      position:'absolute',
      width:width,
      height:height,
      elevation:3,
      zIndex:2000,
    }
  }
) 

 export default app 