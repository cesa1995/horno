import React,{useEffect, useState, useRef}from 'react'
import {StyleSheet, View, Animated, ShadowPropTypesIOS} from 'react-native'
import Svg, {Circle, Rect, Line, Text} from 'react-native-svg'

const scalar=1.3

const grados=360/59;
const size=40;
const barSize=155;
const max={
    grade:1500,
    px:30
}
const min={
    grade:1,
    px:185
}

const thermometer=[
    {
        type:1,
        color:"#ffffff",
        width:70*scalar,
        height:200*scalar,
        radius:30,
        cx:35,
        cy:5,
        strokeWidth:2
    },
    {
        type:1,
        color:"#b3b3b3",
        cx:75,
        cy:10,
        width:10*scalar,
        height:150*scalar,
        strokeWidth:2,
        radius:10,
    },
    {
        type:1,
        color:"#f72653",
        cx:75,
        cy:185,
        width:10*scalar,
        height:10,
        strokeWidth:2,
        radius:1,
    },
    {
        type:0,
        color:"#ffffff",
        cx:80,
        cy:250,
        r:50*scalar,
        width:1
    },
    {
        type:0,
        color:"#FF7F00",
        cx:80,
        cy:250,
        r:40*scalar,
        width:1
    },
    {
        type:2,
        x:80,
        y:250,
        x1:0,
        y1:0,
        x2:0,
        y2:0,
        color:'#ffffff',
        width:4
    },
    {
        type:2,
        x:50,
        y:30,
        x1:0,
        x2:20,
        y1:0,
        y2:0,
        color:'#000000',
        width:2
    },
    {
        type:2,
        x:50,
        y:112,
        x1:0,
        y1:0,
        x2:20,
        y2:0,
        color:'#000000',
        width:2
    },
    {
        type:2,
        x:50,
        y:174,
        x1:0,
        x2:20,
        y1:0,
        y2:0,
        color:'#000000',
        width:2
    },
    {
        type:3,
        x:40,
        y:40,
        color:"#000000",
        size:10,
        text:"1500°C"
    },
    {
        type:3,
        x:40,
        y:122,
        color:"#000000",
        size:10,
        text:"700°C"
    },
    {
        type:3,
        x:40,
        y:185,
        color:"#000000",
        size:10,
        text:"100°C"
    },
    {
        type:3,
        x:75,
        y:195,
        color:"#000000",
        size:10,
        text:"60"
    },
    {
        type:3,
        x:134,
        y:255,
        color:"#000000",
        size:10,
        text:"15"
    },
    {
        type:3,
        x:16,
        y:255,
        color:"#000000",
        size:10,
        text:"45"
    },
    {
        type:3,
        x:75,
        y:313,
        color:"#000000",
        size:10,
        text:"30"
    },
    

];

const ThermometerDraw=(props)=>{

    useInterval(() => {   
        props.setDateNow(new Date());
        let second=(grados*(props.dateNow.getSeconds()+1))-90;
        thermometer[5]['x2']=size*Math.cos(second*Math.PI/180);
        thermometer[5]['y2']=size*Math.sin(second*Math.PI/180);
    }, 1000);

    useInterval(()=>{
        props.setTemperature(Math.floor(Math.random()*1500));
    }, 10000)

    useEffect(()=>{
        thermometer[2]['height']=((props.temperature*barSize)/max.grade);
        thermometer[2]['cy']=Math.floor((min.px-((props.temperature*barSize)/max.grade)));
    },[props.temperature])

    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
    }

    return(
        <View style={style.thermometer}>
            <Svg style={style.svg}>
                {
                   thermometer.map((obj,key)=>{
                        switch (obj.type) {
                            case 0:
                                return(
                                    <Circle 
                                        cx={obj.cx}
                                        cy={obj.cy}
                                        stroke={obj.color}
                                        strokeWidth={obj.width}
                                        r={obj.r}
                                        key={key}
                                        fill={obj.color}
                                    />)
                            case 1:
                                return(
                                    <Rect
                                        width={obj.width}
                                        height={obj.height}
                                        rx={obj.radius}
                                        ry={obj.radius}
                                        fill={obj.color}
                                        strokeWidth={obj.strokeWidth}
                                        stroke={obj.color}
                                        x={obj.cx}
                                        y={obj.cy}
                                        key={key}
                                    />
                                )
                            case 2:
                                return(
                                    <Line 
                                        x1={obj.x1}
                                        x2={obj.x2}
                                        y1={obj.y1}
                                        y2={obj.y2}
                                        key={key}
                                        stroke={obj.color}
                                        strokeWidth={obj.width}
                                        x={obj.x}
                                        y={obj.y}
                                    />
                                )
                            case 3:
                                return(
                                    <Text
                                        x={obj.x}
                                        y={obj.y}
                                        fill={obj.color}
                                        fontSize={obj.size}
                                        key={key}
                                    >
                                        {obj.text}
                                    </Text>
                                )
                                    
                        }
                        
                    })
                }
            </Svg>
        </View>
    )
}

const style=StyleSheet.create(
    {
        thermometer:{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
        },
        svg:{
            flex:.5,
            justifyContent:'center',
            alignItems:'center',
            maxHeight:350,
        },
    }
)

export default ThermometerDraw