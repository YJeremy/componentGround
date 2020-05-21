import React from 'react';
import './indexContainer.css';//全局css
import './indexContainer2.css';//影响全局css
import useMoudle from './indexContainer2.css';//css module
import {inlineRed} from './css.js';// inline 内联样式

const mystyle = {
    margin: '20px',
}

const CssContainer = () => {
    return (
        <>
        <section id="container">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div style={inlineRed}>hi~</div>
            <div className='item1'></div>
            <div className='item2'></div>
            <div className='item3'></div>
            <div className='item4'></div>
            <div className='item5'>warn</div>
            <div className={useMoudle.item5}>aaa</div>
        </section>

        <p>CSS 自定义属性</p>
        <div className='one'>
        'one'
            <div className='two'>
            'two'
                <div className='three'>'three'
                </div>
                <div className='four'>'four'</div>
            </div>
        </div>

        <h1>CSS flex 响应式布局</h1>
        <div>
            <div className="outer">
            <div className="inner">内部盒子</div>
            </div>
        </div>

       {/*  <div className='floadbox'>
            浮动
        </div> */}

        <div style={{margin:'20px'}}>
        </div>
        </>
    )
}
export default CssContainer
