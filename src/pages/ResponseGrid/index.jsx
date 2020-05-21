import { Row, Col } from 'antd';
const styles = {
    backgroundColor:'#772'
}

const ResponseGrid = () => {
    return(
  <>
    <Row>
      <Col span={24} style={{...styles}}>col</Col>
    </Row>
    <Row>
      <Col span={12} style={{...styles}}>col-12</Col>
      <Col span={12} style={{...styles}}>col-12</Col>
    </Row>
    <Row>
      <Col span={8}>col-8</Col>
      <Col span={8} style={{...styles}}>col-8</Col>
      <Col span={8}>col-8</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row>
  </>
    )
}

export default ResponseGrid
