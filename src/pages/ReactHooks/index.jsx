import React, { useState } from "react";

export default function  ReactHooks()  {
    //声明一个叫做“buttonText”的state 变量,初始值为 “click me,...”
  const  [buttonText, setButtonText] =  useState("Click me,   ");
  let flag = 1;

  const handleClick = ()=>{

    return setButtonText(buttonText + 1);
  }

  return  (
      <div>

    //声明一个叫做“buttonText”的state 变量,初始值为 “click me,...”
  <button  onClick={handleClick}>{buttonText}</button>
      </div>
);
}
