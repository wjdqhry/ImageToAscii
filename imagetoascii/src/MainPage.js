import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Converter from './converter';

const InputArea = styled.div`   
    display:flex;
    align-items:center;
    justify-content:center;
    margin:0;
    width:700px;
    height:80px;
    background-color:#ffcccc;   
    border-radius: 20px;
`
const BeforeInputArea = styled(InputArea)`
    position: absolute;
    transform: translate(-50%, -50%);
    top:50%;
    left:50%;
`

const AfterInputArea = styled(InputArea)`
    margin: auto;
`

const TextField = styled.input`
    width:200px;
    height:27px;
    margin-left: 10px;
    margin-right: 20px;
    border-radius: 3px;
    border: 0.5px solid silver;
`
const Texts = styled.a`
    font-family: Georgia, "Malgun Gothic", serif;
    font-size:25px;
`
const Button = styled.button`
    background-color: #555555;
    border: none;
    color: white;
    padding: 8px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius:5px;
`

const AsciiDisplay = styled.pre`
    font-Family: "Courier, monospace";
    line-height: 6px;
    font-size: 8px;
    border: 5px solid black;
`

const Image = styled.img`
    display:block;
    width:150;
    margin: auto;
`

function MainPage() {
    const [clicked, setClicked] = useState(false);
    const [path, setPath] = useState("");
    const [ascii, setAscii] = useState("");

    const pathField = useRef();
    const canvasTag = useRef();

    let convertedString="";
    const converter = new Converter();

    const onClick = () => {
        let isnull = false;
        let value = pathField.current.value;
        if(value !== "")
            isnull = true;

        setClicked(isnull);
        setPath(value)
    }

    const onChangeClick = () => {
        setAscii(convertedString);
        convertedString = "";
    }

    const onLoadOrChange = (e) => {
        e.target.height = 150
        const canvas = canvasTag.current;
        canvas.width = e.target.width;
        canvas.height = e.target.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(e.target, 0, 0, e.target.width, e.target.height);

        canvas.crossOrigin = "Anonymous";
        const pixels = ctx.getImageData(0, 0,canvas.width, canvas.height);
        
        convertedString = converter.getAscii(pixels, 0, canvas.width);
        console.log(convertedString);
        // this.getReverse(pixels);
        // ctx.putImageData(pixels, 0, 0);
    }
    
    if(clicked){
        return(
            <>
                <Image src={'https://cors-anywhere.herokuapp.com/' + path} alt="description" onLoad={onLoadOrChange} onChange={onLoadOrChange} crossOrigin="Anonymous"/>
                <canvas ref={canvasTag} style={{display:'block', margin:'auto'}} id="canvas">Your browser does not support the HTML5 canvas tag</canvas>
                <AsciiDisplay>{ascii}</AsciiDisplay>
                <div>
                    <AfterInputArea>
                        <Texts>이미지 url입력:</Texts>
                        <TextField ref={pathField}></TextField>
                        <Button onClick={onClick}>불러오기</Button>
                        <Button onClick={onChangeClick}>변환</Button>
                    </AfterInputArea>
                </div>
            </>
        );
    }
    else{
        return (
            <BeforeInputArea>
                <Texts>이미지 url입력:</Texts>
                <TextField ref={pathField}></TextField>
                <Button onClick={onClick}>불러오기</Button>
            </BeforeInputArea>
        );
    }
}

export default MainPage;
