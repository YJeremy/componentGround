import { Form, Input, Button, Checkbox } from 'antd';

const MinForm = () =>{
    return(

<form action="/api/post" method="post">
  username: <input name="username" />
  password: <input name="password" />
  <button type="submit">submit</button>
</form>
    )
}

export default MinForm
