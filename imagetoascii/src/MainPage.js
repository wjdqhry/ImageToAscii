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
    margin-bottom:30px;
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
const ActualImage = styled.img`
    width: 150px;
    position: absolute;
    visibility: hidden;
`
const DisplayImage = styled.img`
    margin: auto;
    margin-bottom: 35px;
    display:block;
    width: 400px;
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
const DisplayAscii = styled.pre`
    font-family: monospace;
    line-height: 6px;
    font-size: 8px;
    border: 5px solid black;
    border-radius: 20px;
    margin: auto;
    margin-bottom: 30px;
    max-width: 85%;
    text-align: center;
    overflow: auto;
`

function MainPage() {
    const [clicked, setClicked] = useState(false);
    const [path, setPath] = useState("");
    const [ascii, setAscii] = useState("");

    const pathField = useRef();
    const canvasTag = useRef();
    const imageTag = useRef();

    let convertedString = "";
    const converter = new Converter();

    const onClick = () => {
        const value = pathField.current.value;
        let isNotNull;

        value === "" ? isNotNull = false : isNotNull = true;

        setClicked(isNotNull);
        setPath(value);
        setAscii(""); 
    }

    const onChangeClick = () => {
        const canvas = canvasTag.current;
        const image = imageTag.current;

        if(image.width !=0){
            canvas.crossOrigin = "Anonymous";
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            try{
                ctx.drawImage(image, 0, 0, image.width, image.height);
            }catch{
                alert("유효하지 않은 URL입니다.");
                setClicked(false);
            }
            const pixels = ctx.getImageData(0, 0,canvas.width, canvas.height);
            //converter.getReverse(pixels);
            convertedString = converter.getAscii(pixels, 0, canvas.width);
        }
        setAscii(convertedString);
    }
    
    if(clicked){
        return(
            <>
                <ActualImage src={'https://cors-anywhere.herokuapp.com/' + path} alt="description" ref = {imageTag} crossOrigin="Anonymous"/>
                <DisplayImage src={'https://cors-anywhere.herokuapp.com/' + path} alt="Cannot Load Image" crossOrigin="Anonymous"/>
                <canvas ref={canvasTag} style={{position:'absolute', visibility:'hidden'}} crossOrigin="Anonymous">Your browser does not support the HTML5 canvas tag</canvas>
                <DisplayAscii>{ascii}</DisplayAscii>
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
