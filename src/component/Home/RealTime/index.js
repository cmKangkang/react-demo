import React, { Component} from 'react';
import{Route,NavLink,Redirect} from 'react-router-dom';
import{TableOutlined,PieChartOutlined,ArrowDownOutlined,ArrowUpOutlined} from '@ant-design/icons';
import '../../../css/antd.css';
// import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Statistic,Table,Tag,Card,Row,Col,Button,Menu } from 'antd';
import axios from 'axios';
import '../../../mockjs/mymock';
import Gauge from './Gauge';
// import abbr from '../../../properties/abbr';

class RealTimePage extends Component {
  constructor() {
    super();
    this.state={
      //状态
      //id:props.id,//管理员id
      data:[],//数据，存储请求得到的数据列表，存放的格式是对象封装而成的json，其中可添加前一小时内的平均值、方差等数据。
    }
  }

  componentWillMount(){
    // axios从服务器取得数据
    axios.get("/test/rt1").then((data)=>{
      // console.log(data);
      var datas=[];
      data.data.forEach(e => {
        datas.push(e);
        // console.log(e.key);
      });
      // var d=data.data.data;
      // for(var key in d) console.log(key,d[key]);

      // 输出key，和键值
      // var d0=d[0];
      // for(var key in d0){
      //   console.log(key,d0[key]);
      // }
      this.setState({data:datas});
    })
  }

  render() {
    return (
      <div className="container">
        {/* 一级标题 */}
        <div className="i-title"><h2>实时数据</h2></div>
        {/* <div className="menue-bar-r"> */}
        <div className="menue-bar">
        <Menu onClick={this.handleClick} mode="horizontal">
          <Menu.Item key="chart" icon={<PieChartOutlined />}>
          <NavLink to="/rtp/chart" activeClassName="menue-btn-clicked">图表</NavLink>
          </Menu.Item>
          <Menu.Item key="table" icon={<TableOutlined />}>
          <NavLink to="/rtp/form" activeClassName="menue-btn-clicked">表格</NavLink>
          </Menu.Item>
        </Menu>
        </div>
        
        
        
        {/* </div> */}

        <Route path="/rtp/chart">
        <div className="disp-area">
        {/* {this.state.data.map((key,index,item)=>{
            return <ChartItem key={key+index} index={index}/>
          })} */}
          {/* <ChartItem name={"负载"} current={500} critical={1000} average={600} /> */}
          {this.state.data.map((item,idx)=>{
            return (<Card title={item.name+"   "+item.time} bordered={false} style={{ width: '33.3%',height:310 }}>
              <Gauge data={item} chartId={"chart"+idx}/>
              </Card>)
          })}
        </div>
        </Route>
        <Route path="/rtp/form" >
        <div className="disp-area">
          <FormItem data={this.state.data}/>
        </div>
        </Route>
        <Redirect exact from="/rtp/" to="/rtp/chart"/>
      </div>
    );
  }
}


//图表项
class ChartItem extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',//数据名
      current:0,//当前数据
      average:0,//前几个小时的平均
      critical:0,//临界值
      date:'',
    }
  }
  render() {
    var ps=this.props;
    var isCrt=false,overCut=false;//判断是否超过临界值
    if(ps.current>ps.critical) isCrt=true;
    if(ps.current>ps.average) overCut=true;
    var percent=(ps.current-ps.average)/ps.average;
    return (
      <div className="chart-item" >
        {/* 数据缩略，点击可以出现对话框或抽屉显示详情 */}
        {/* 抽屉可现实前几小时平均值，与波动 */}
        {/* 相较临界值用扇形图，平均值用另外的 */}
        
        <Row gutter={6}>
        <Col span={4}>
          <Statistic title={ps.name} value={ps.current} precision={2} />
          <Button style={{ marginTop: 16 }} type="primary">
            Detail
          </Button>
        </Col>
        <Col sapn={4}>
          <Statistic
            title="相较历史平均值"
            value={percent}
            precision={2}
            valueStyle={overCut?{color:'#cf1322'}:{ color: '#3f8600' }}
            prefix={overCut?<ArrowDownOutlined/>:<ArrowUpOutlined />}
            suffix="%"
          />
        </Col>
        </Row>
        </div>
    );
  }

}

class FormItem extends Component {
  render() {
    const columns = [
      {
        title: '数据名',
        dataIndex: 'name',
        key: 'name',
        // render: text => <a>{text}</a>,
      },
      {
        title: '时刻',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '数值',
        dataIndex: 'val',
        key: 'val',
      },
      {
        title:'平均值',
        dataIndex:'avg',
        key:'anc',
      },
      {
        title:'临界值',
        dataIndex:'crt',
        key:'crt',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => <Tag color={tags.length<=4?'green' : 'red'} key={tags}>{tags.toUpperCase()}</Tag>
      },
    ];

    var ds=this.props.data;
    var data=ds.map((item)=>{
      let tmp=item;
      if(item.val>=item.crt) tmp.tags="beyond critical value";
      else tmp.tags="work";
      return tmp;
    })

    return (
      <div className="form-item">
        <Table columns={columns} dataSource={data} />
      </div>);
  }
}



export default RealTimePage;