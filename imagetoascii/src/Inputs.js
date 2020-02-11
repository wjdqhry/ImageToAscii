import React, { Component } from 'react';
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
    display: inline-block;
    border: 5px solid black;
`

class Inputs extends Component {
    state = {
        clicked: false,
        path: "",
        ascii: ""
    }
    string="";
    converter = new Converter();

    onClick = () => {
        const value = window.document.getElementById('path').value;
        let isnull = false;
        if(value !== "")
            isnull = true;
            
        this.setState({
            clicked: isnull,
            path: value,
            ascii: ""
        });
    }
    onChangeClick = () => {
        this.setState({
            ascii: this.string
        });
    }
    onLoadAndChange = (e) => {
        const canvas = window.document.getElementById('canvas');
        canvas.width = e.target.width;
        canvas.height = e.target.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(e.target, 0, 0);

        const pixels = ctx.getImageData(0, 0,canvas.width, canvas.height);
        console.log(pixels);
        
        this.string = this.converter.getAscii(pixels, 0, canvas.width);
        console.log(this.string);
        
        e.target.height = 0;
        // this.getReverse(pixels);
        // ctx.putImageData(pixels, 0, 0);
    }

    render(){
        if(this.state.clicked){
            return(
                <>
                    <img style={{display:'block'}} src={'https://cors-anywhere.herokuapp.com/' + this.state.path} alt="description" onLoad={this.onLoadAndChange} onChange={this.onLoadAndChange} crossOrigin="Anonymous"/>
                    <canvas style={{display:'block', margin:'auto'}} id="canvas">Your browser does not support the HTML5 canvas tag</canvas>
                    <AsciiDisplay>{this.state.ascii}</AsciiDisplay>
                    <div>
                        <AfterInputArea>
                            <Texts>이미지 url입력:</Texts>
                            <TextField id="path"></TextField>
                            <Button onClick={this.onClick}>불러오기</Button>
                            <Button onClick={this.onChangeClick}>변환</Button>
                        </AfterInputArea>
                    </div>
                </>
            );
        }
        else{
            return (
                <BeforeInputArea>
                    <Texts>이미지 url입력:</Texts>
                    <TextField id="path"></TextField>
                    <Button onClick={this.onClick}>불러오기</Button>
                </BeforeInputArea>
            );
        }
    }
}

export default Inputs;
