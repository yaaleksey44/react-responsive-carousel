import React from 'react';
import ResponsiveCarousel from "ResponsiveCarousel/ResponsiveCarousel";
import './App.css';


const data = [
  {
    name: 'aloha',
    age: 25
  },
  {
    name: 'patrick',
    age: 30
  },
  {
    name: 'johan',
    age: 63
  },
  {
    name: 'mary',
    age: 12
  },
  {
    name: 'john',
    age: 24
  },
  {
    name: 'mikel',
    age: 56
  },
  {
    name: 'alo',
    age: 15
  }
]


const ProfileImage = ({data, index}) => {
  return (
  <div style={{width: '100px', height: '200px', border: 'solid 1px red', backgroundColor: 'green'}}>
    <span>---{data.name}---</span>
    <span>---{data.age}---</span>
  </div>
  )
}

function App() {
  return (
    <div className="someContainer">
      <div className="App">
        <ResponsiveCarousel adaptiveEnd={false} slideStep="min" data={data} minWidth={200} maxWidth={300} ItemComponent={({data, index})=><ProfileImage data={data} index={index} />} />
      </div>
    </div>
  );
}

export default App;
