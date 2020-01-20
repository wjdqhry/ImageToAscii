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

class Inputs extends Component {
    state = {
        clicked: false,
        path: ""
    }
    onClick = () => {
        this.setState({
            clicked: true,
            path: window.document.getElementById('path').value
        });
    }
    onLoad = (e) => {
        const canvas = window.document.getElementById('canvas')
        canvas.width = e.target.width;
        canvas.height = e.target.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(e.target, 0, 0);

        const pixels = ctx.getImageData(0, 0,canvas.width, canvas.height);
        
        for (var i = 0; i < pixels.data.length; i += 4) {
            pixels.data[i] = 255 - pixels.data[i];
            pixels.data[i+1] = 255 - pixels.data[i+1];
            pixels.data[i+2] = 255 - pixels.data[i+2];
            pixels.data[i+3] = 255;
        }
        ctx.putImageData(pixels, 0, 0);
    }

    render(){
        if(this.state.clicked){
            return(
                <>
                    <img src={'https://cors-anywhere.herokuapp.com/' + this.state.path} alt="description" onLoad={this.onLoad} crossOrigin="Anonymous"/>
                    <canvas id="canvas">Your browser does not support the HTML5 canvas tag</canvas>
                    <InputArea>
                        <Texts>이미지 url입력:</Texts>
                        <TextField id="path"></TextField>
                        <Button onClick={this.onClick}>불러오기</Button>
                        <Button>변환</Button>
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
