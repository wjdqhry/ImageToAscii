import React, { Component } from 'react';
import styled from 'styled-components';

const InputArea = styled.div`
    position: absolute;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:0;
    top:50%;
    left:50%;
    width:700px;
    height:80px;
    background-color:#ffcccc;
    transform: translate(-50%, -50%);
    border-radius: 20px;
`
const TextField = styled.input`
    width:200px;
    height:27px;
    margin-left: 10px;
    margin-right: 20px;
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
    border-radius:3px;
`

const Image = styled.img`
`

const AsciiDisplay = styled.pre`
    font-Family: "Courier, monospace";
    line-height: 6px;
    font-size: 11px;
    display: inline-block;
`

class Inputs extends Component {
    state = {
        clicked: false,
        path: "",
        ascii: ""
    }
    onClick = () => {
        this.setState({
            clicked: true,
            path: window.document.getElementById('path').value,
            ascii: ""
        });
    }
    onChangeClick = () => {
        this.setState({
            ascii: this.string
        });
    }
    onLoadAndChange = (e) => {
        const canvas = window.document.getElementById('canvas')
        canvas.width = e.target.width;
        canvas.height = e.target.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(e.target, 0, 0);

        canvas.style.visibility = "hidden";
        const pixels = ctx.getImageData(0, 0,canvas.width, canvas.height);
        console.log(pixels);
        
        this.getAscii(pixels, 0, canvas.width);
        console.log(this.string);
        // this.getReverse(pixels);
        // ctx.putImageData(pixels, 0, 0);
    }

    
    string="";
    alphabet = {
        0: ["@","%","#","*","+","=","-",":","."," "],
        1: ["$","@","B","%","8","&","W","M","#","*","o","a","h","k","b","d","p","q","w","m","Z","O",
                "0","Q","L","C","J","U","Y","X","z","c","v","u","n","x","r","j","f","t","/","\\","|","(",
                ")","1","{","}","[","]","?","-","_","+","~","\<","\>","i","!","l","I",";",":",",","\"","^",
                "`","'","."," "]
    };
    getAscii = (pixels, charType, width) => {
        this.string = "";
        let grayStep = Math.ceil( 255 / this.alphabet[charType].length );
        for(let i = 0; i < pixels.data.length; i+=4){
            for(let j = 0; j < this.alphabet[charType].length; j++){
                let r = pixels.data[i];
                let g = pixels.data[i+1];
                let b = pixels.data[i+2];
                if( (r * 0.2126) + (g * 0.7152) + (b * 0.0722) < (j+1) * grayStep ){
                    this.string += this.alphabet[charType][j];
                    break;	
                }
            }
            if( !((i/4+1) % width) ){
                this.string += "\n";
            }
        }
    }
    getReverse = (pixels) => {
        for (var i = 0; i < pixels.data.length; i += 4) {
            pixels.data[i] = 255 - pixels.data[i];
            pixels.data[i+1] = 255 - pixels.data[i+1];
            pixels.data[i+2] = 255 - pixels.data[i+2];
            pixels.data[i+3] = 255;
        }
    }

    render(){
        if(this.state.clicked){
            return(
                <>
                    <img src={'https://cors-anywhere.herokuapp.com/' + this.state.path} alt="description" onLoad={this.onLoadAndChange} onChange={this.onLoadAndChange} crossOrigin="Anonymous"/>
                    <canvas id="canvas">Your browser does not support the HTML5 canvas tag</canvas>
                    <AsciiDisplay>{this.state.ascii}</AsciiDisplay>
                    <InputArea>
                        <Texts>이미지 url입력:</Texts>
                        <TextField id="path"></TextField>
                        <Button onClick={this.onClick}>불러오기</Button>
                        <Button onClick={this.onChangeClick}>변환</Button>
                    </InputArea>
                </>
            );
        }
        else{
            return (
                <InputArea>
                    <Texts>이미지 url입력:</Texts>
                    <TextField id="path"></TextField>
                    <Button onClick={this.onClick}>불러오기</Button>
                </InputArea>
            );
        }
    }
}

export default Inputs;
