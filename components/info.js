import React,{useState}from 'react'
import { View, StyleSheet, Switch, Text, TouchableOpacity} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Info=(props)=>{
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <View style={style.info}>
            <Text style={style.onoff}>OFF/ON</Text>
            <Switch
                trackColor={{ false: "red", true: "green" }}
                thumbColor={isEnabled ? "white" : "white"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{
                    transform:[{ scaleX: 2 }, { scaleY: 2 }],
                    marginBottom:50,   
                }}
            />
            <View style={style.circul}>
                <View style={style.temperatureC}>
                    <Text style={style.temperature}>{props.temperature}</Text>
                    <Text style={style.UMt}>°C</Text>
                </View>
                <View style={style.timer}>
                    <Text style={style.time}>
                        {(props.dateNow.getHours()%12 || 12)}{"\n"}
                        {props.dateNow.getMinutes()}{"\n"}
                        {props.dateNow.getSeconds()}{"\n"}
                        {props.dateNow.getHours()>=12?"PM":"AM"}
                    </Text>
                </View>
            </View>
            <View style={[style.finalValue, style.fire]}>
                <TouchableOpacity style={style.icons}>
                    <MaterialCommunityIcons name="fire" size={20} color={"#000000"}/>
                </TouchableOpacity>
                <Text>1800°C</Text>
            </View>
            <View style={style.finalValue}>
                <TouchableOpacity style={style.icons}>
                    <MaterialCommunityIcons name="clock" size={20} color={"#000000"}/>
                </TouchableOpacity>
                <Text>{(props.date.getHours()%12 || 12)}:{props.date.getMinutes()}:{props.date.getSeconds()}</Text>
            </View>
            
        </View>
    )
}

const style=StyleSheet.create(
    {
        icons:{
            marginRight:10
        },  
        fire:{
            marginTop:20
        },
        finalValue:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
        },  
        onoff:{
            margin:20,
            fontSize:20
        },
        circul:{
            display:'flex',
            flexDirection:'row',
        },  
        info:{
            paddingTop:20,
            flex:1,
            alignItems:'center',
            backgroundColor:'#ffffff',
            borderRadius:50,
         
        },
        temperature:{
            marginTop:30,
            fontSize:30,
            color:'#000000'
        },
        UMt:{
            fontSize:60,
            color:'#000000'
        },
        timer:{
            marginLeft:10,
            borderLeftWidth:3,
            borderLeftColor:'#000000',
            paddingLeft:10,
            justifyContent:'center'
        },
        time:{
            fontSize:25,
        }
    }
)

export default Info