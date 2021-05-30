import React,{useState, useRef, useEffect} from 'react'
import {View, StyleSheet, Animated, PanResponder, Dimensions} from 'react-native'
import Svg,{Circle,G,Path, Text} from 'react-native-svg'

const app=(props)=>{
    const value=useState(new Animated.ValueXY())[0];

    const {height, width}=Dimensions.get("window");

    const centerY=useState(height/2)[0];
    const centerX=useState(width/2)[0];
    const radius=useState(110)[0];

    const [startAngle, setStartAngle]=useState(0*Math.PI/180);
    const [fromXLine, setFromXLine]=useState(0);
    const [fromYLine, setFromYLine]=useState(0);
    const [toXLine, setToXLine]=useState(0);
    const [toYLine, setToYLine]=useState(0);
    const [halfAngle, setHalfAngle]=useState(0);

    const [toXCircle, setToXCircle]=useState(0);
    const [toYCircle, setToYCircle]=useState(0);


    const panResponse = useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            value.setOffset({
                x: value.x._value,
                y: value.y._value
            }); 
        },
        onPanResponderMove:(event,{moveX, moveY})=>{
            let angle=Math.atan2(moveY-centerY,moveX-centerX)+Math.PI/2;
            let length=(angle-startAngle)%(2*Math.PI);
            if(length<0){
                length+=2*Math.PI;
            }
            props.setAngle(length);            
        },
        onPanResponderRelease: () => {
            value.flattenOffset();
        }
    })).current;

    const getXYpoint=()=>{
        setFromXLine(getTo(radius, "X", startAngle));
        setFromYLine(getTo(radius, "Y", startAngle));
        setToXLine(getTo(radius, "X", props.angle));
        setToYLine(getTo(radius, "Y", props.angle));
        setToXCircle(getTo(radius-20, "X", props.angle));
        setToYCircle(getTo(radius-20, "Y", props.angle));
        props.angle>1*Math.PI?setHalfAngle(1):setHalfAngle(0);
        props.updateValue(props.angle);
    }

    const getTo=(radius, axis, angle)=>{
      let to=axis=='X'?radius*Math.sin(angle):-radius*Math.cos(angle);
      return to;
    }


    useEffect(()=>{
        getXYpoint();
    },[props.angle])

    return(
        <View style={style.view}>
            <Svg    
                width={(radius*2)+25} 
                height={(radius*2)+25} 
                style={{backgroundColor:'#ffffff'}} 
            >
              
              <Circle r={radius} fill={'#eeeeee'} cy={radius+11} cx={radius+11}/>    
              <Text x={radius} y={radius-55} fill={'#000000'} fontSize={15}>999</Text>
              <Text x={radius-65} y={radius+15} fill={'#000000'} fontSize={15}>750</Text>
              <Text x={radius+65} y={radius+15} fill={'#000000'} fontSize={15}>250</Text>
              <Text x={radius} y={radius+90} fill={'#000000'} fontSize={15}>500</Text>         
              <G
                  {...panResponse.panHandlers}
                  transform={{translate:`${radius+11}, ${radius+11}`}}
              >   
                    
                        <Path 
                               d={
                                   `M${fromXLine} ${fromYLine}
                                   A${radius} ${radius} 0 ${halfAngle} 1  
                                     ${toXLine} ${toYLine}`} 
                               key={1}
                               strokeWidth={10}
                               stroke={"#009988"}
                               fill="transparent"/>
                    <Circle r={10} fill={'#009988'} cx={toXCircle} cy={toYCircle}/>
                </G>
                
            </Svg>          
        </View>
    )
}

const style=StyleSheet.create(
    {
        view:{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        }
    }
)

export default app