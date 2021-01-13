import React from 'react'

// NOTE: React Testing Library works well with React Hooks and classes.
// Your tests will be the same regardless of how you write your components.
// 这里export 该函数组件，方便单独提取做单元测试
// 注意，这是也是 reactDom 的参数props属性 {}， children字段名字是特有的api， hi却不是特有属性
export function HiddenMessage({children} ) {
  const [showMessage, setShowMessage] = React.useState(false)
  return (
    <div>
      <label htmlFor="toggle">Show Message</label>
      <input
        id="toggle"
        type="checkbox"
        onChange={e => setShowMessage(e.target.checked)}
        checked={showMessage}
      />
     {showMessage ? children : null}
    </div>
  )
}

//类似上面的函数,直接渲染childrend
function Child(props) {
  console.log(props)
  return (
    <>
      <p>我是child组件</p>
      {props.children}
    </>
  )
}

//业务组件，这里单元测试涉及不到这个单个的例子
const Myuse = ()=>{
    let a = <HiddenMessage>2</HiddenMessage>
    console.log('打印',HiddenMessage,a)
    console.log('打印2',a)
    return (
        <>
   <div>{`这里触发一个，打钩后，显示内容的一个函数组件`}</div>
   <div>{'还有关于children的认知'}</div>
    <HiddenMessage>{`hi~ ,打钩显示~`}</HiddenMessage>
        </>
    )
}

export default Myuse
