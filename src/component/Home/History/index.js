import React, { Component } from 'react';
import {Route,NavLink,Redirect} from 'react-router-dom';
import {Menu,Affix,DatePicker,Space, Button} from 'antd';
import {DatabaseFilled, DatabaseOutlined,} from '@ant-design/icons';
import '../../../css/antd.css';
import axios from 'axios';
import '../../../mockjs/mymock';
import '../../../properties/abbr';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import MyChart from './ChartAndForm/MyChart';
import MyForm from './ChartAndForm/MyForm';
import abbr from '../../../properties/abbr';

const {RangePicker}=DatePicker;

class HistoryPage extends Component {
  constructor(props){
    super(props);
    this.state={
      id:props.id,
      data:[],//存储格式是{时间：时间值，数据项1：值1，数据项2：值2...},按照时间先后顺序排序
    }
  }

  componentWillMount(){}

  componentDidMount(){
    // axios.post().then((data)=>{
    //   for(var key in data)
    // })
  }

  render() {
    return (
      <div className="container">
        <div className="i-title"><h2>历史数据</h2></div>
        <div className="menue-bar">
          <Menu mode="horizontal">
            {abbr.map((item)=>{
              return (
                <Menu.Item key={item.ab} icon={<DatabaseFilled />}>
                  <NavLink to={"/htp/"+item.ab} activeClassName="menue-btn-clicked">{item.name}</NavLink>
                </Menu.Item>
              )
            })}

            {/* <Menu.Item key="load" icon={<DatabaseFilled />}>
              <NavLink to="/htp/load" activeClassName="menue-btn-clicked">负载</NavLink>
            </Menu.Item>
            <Menu.Item key="fwt" icon={<DatabaseFilled />}>
              <NavLink to="/htp/fwt" activeClassName="menue-btn-clicked">给水温度</NavLink>
            </Menu.Item>
            <Menu.Item key="fp" icon={<DatabaseFilled />}>
              <NavLink to="/htp/fp" activeClassName="menue-btn-clicked">炉膛负压</NavLink>
            </Menu.Item>
            <Menu.Item key="mgp" icon={<DatabaseFilled />}>
              <NavLink to="/htp/mgp" activeClassName="menue-btn-clicked">主汽压力</NavLink>
            </Menu.Item>
            <Menu.Item key="mgt" icon={<DatabaseFilled />}>
            <NavLink to="/htp/mgt" activeClassName="menue-btn-clicked">主汽温度</NavLink>
            </Menu.Item>
            <Menu.Item key="mgf" icon={<DatabaseFilled />}>
            <NavLink to="/htp/mgf" activeClassName="menue-btn-clicked">主汽流量</NavLink>
            </Menu.Item>
            <Menu.Item key="wc" icon={<DatabaseFilled />}>
            <NavLink to="/htp/wc" activeClassName="menue-btn-clicked">水煤比</NavLink>
            </Menu.Item>
            <Menu.Item key="oh" icon={<DatabaseFilled />}>
            <NavLink to="/htp/oh" activeClassName="menue-btn-clicked">过热度</NavLink>
            </Menu.Item>
            <Menu.Item key="fpr" icon={<DatabaseFilled />}>
            <NavLink to="/htp/fpr" activeClassName="menue-btn-clicked">高压缸第一压力</NavLink>
            </Menu.Item>
            <Menu.Item key="tc" icon={<DatabaseFilled />}>
            <NavLink to="/htp/tc" activeClassName="menue-btn-clicked">总给煤量</NavLink>
            </Menu.Item> */}
          </Menu>
        </div>
        {abbr.map((item)=>{
          return <Route path={"/htp/"+item.ab}><ChartAndForm/></Route>
        })}
        <Redirect exact from="/htp/" to="/htp/load"/>
{/*         
        <Route path="/htp/load"><ChartAndForm/></Route>
        <Route path="/htp/fwt"><ChartAndForm/></Route>
        <Route path="/htp/fp"><ChartAndForm/></Route>
        <Route path="/htp/mgp"><ChartAndForm/></Route>
        <Route path="/htp/mgt"><ChartAndForm/></Route>
        <Route path="/htp/mgf"><ChartAndForm/></Route>
        <Route path="/htp/wc"><ChartAndForm/></Route>
        <Route path="/htp/oh"><ChartAndForm/></Route>
        <Route path="/htp/fpr"><ChartAndForm/></Route>
        <Route path="/htp/tc"><ChartAndForm/></Route> */}
      </div>
    );
  }
}

// 在此处根据id查询数据，并将数据传给
class ChartAndForm extends Component {
  constructor(props){
    super(props);
    this.state={
      name:props.name,//数据项名，中文
      id:props.id,//数据id，标识数据类型
      data:[],//数据，可行的存储方式有2种
      begin:"",
      end:'',
    }
  }

  componentDidMount(){
    
  }

  componentWillMount(){
    //查询数据
    axios.post("/test/ht1",{id:'test'}).then((ret)=>{
      var data=[];
      var dataret=ret.data;
      dataret.data.forEach(e => {
        data.push(e);
      });
      this.setState({data:data});
    })
  }

  queryData=(data)=>{
    // 自定义查询数据
  }

  getChartOption=()=>{
    var datalist=this.state.data.map((item)=>{
      return item.time;
    })
    var valuelist=this.state.data.map((item)=>{
      return item.val/1000000;
    })
    //
    let option = {
      title:{
        text:'历史数据折线图',
      },
      tooltip:{   //展示数据
        trigger:'axis'
      },
      xAxis:{
        data:datalist,
      },
      yAxis:{
        splitLine:{
          show:false
        }
      },
      toolbox:{
        left: 'center',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
      },
      dataZoom:[{
        startValue:datalist[0]
      },{
        type:'inside'
      }],
      visualMap:{
        top: 10,
            right: 10,
            pieces: [{
                gt: 0,
                lte: 50,
                color: '#096'
            }, {
                gt: 50,
                lte: 100,
                color: '#ffde33'
            }, {
                gt: 100,
                lte: 150,
                color: '#ff9933'
            }, {
                gt: 150,
                lte: 200,
                color: '#cc0033'
            }, {
                gt: 200,
                lte: 300,
                color: '#660099'
            }, {
                gt: 300,
                color: '#7e0023'
            }],
            outOfRange: {
                color: '#999'
            }
      },
      series:[
        {
          name:'历史数据',
          type:'line',
          data:valuelist,
          markLine:{//分割线
            silent:true,
            data: [{
              yAxis: 50
            }, {
                yAxis: 100
            }, {
                yAxis: 150
            }, {
                yAxis: 200
            }, {
                yAxis: 300
            }]
          },
          
        }
      ]
  }
  return option;
  }

  getFormOption=()=>{
    var datalist=this.state.data.map((item)=>{
      return item.time;
    })
    var valuelist=this.state.data.map((item)=>{
      return item.val/1000000;
    })

  }

  onChange=(value,dateString)=>{
    this.setState({
      begin:dateString[0],
      end:dateString[1],
    })
  }

  onOk=(value,dateString)=>{
    console.log(dateString);
  }

  onClick=()=>{
    // 查询新时间内的数据
    if(this.state.begin=='') return;
    console.log(this.state.begin,this.state.end);
    axios.post('/ht/diy',{'begin':this.state.begin,'end':this.state.end}).then((ret)=>{
      var data=[];
      console.log(ret.data);
      ret.data.data.forEach(e=>{
        data.push(e);
      });
      this.setState({data:data});
    });
    this.setState({begin:'',end:'null'});
  }

  render() {
    return (
      <div className="disp-area">
          {/* 分左右两个区域，左边是曲线图，右边是表格 */}
          <div className="disp-area-left">
            <MyChart option={this.getChartOption()} chartId={"chart-111"}/>
            <Space>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              onChange={this.onChange}
              onOk={this.onOk}
            />
            <Button onClick={this.onClick}>查询</Button>
            </Space>
          </div>
          <div className="disp-area-right">
            <MyForm data={this.state.data}/>
          </div>
        </div>
    );
  }
}

// 历史界面默认展示前【设定】的时间内的各项数据，
// 如要查询其他数据，设定时间段查询。

export default HistoryPage;