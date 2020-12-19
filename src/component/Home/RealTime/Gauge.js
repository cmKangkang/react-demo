import React, { Component } from 'react';
import echarts from 'echarts';
import  'echarts/lib/chart/gauge';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';

class Gauge extends Component {
  state={};
  chart=null;
  componentDidMount(){
    const {chartId,data}=this.props;
    // console.log(chartId);
    const chartIdDiv = document.getElementById(chartId);   
    if (chartIdDiv) {
        this.chart = echarts.init(chartIdDiv);  //实例化echats画布
        if (this.chart) {
            this.renderChart(this.chart, data);  //加载数据
        }
    }
    window.addEventListener('resize', this.handleResize, false);  //监听改变画布大小
  }

  componentDidUpdate(prevProps) {
    const {data}=this.props;
    if (prevProps.data !== data && this.chart) {
        this.renderChart(this.chart, this.getOption());
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
    if (this.chart) {
        this.chart.dispose();
        this.chart = null;
    }
  }

  handleResize = () => {
    if (this.chart) {
        setTimeout(() => {
            this.chart.resize();
        });
    }
  };

  renderChart = (chart, data) => {
    const { handleClick } = this.props;
    chart.clear();
    chart.setOption(this.getOption());
    chart.off('click'); // 要是不加上这行，事件会重复n次
    chart.on('click', params => {
        if (handleClick) {
            handleClick(params);
        }
    });
  };

  getOption=()=>{
    // var ds=[];
    // let tmp={value:data.val,name:'单位'};
    // ds.push(tmp);
    const {data}=this.props;
    // console.log(data);
    var option = {
      tooltip: {
          formatter: "{a} <br/>{c} {b}"
      },
      series : 
          {
              name: data.time,
              type: 'gauge',
              min: 0,
              max: data.crt*1.25,
              splitNumber: 10,
              radius: '70 %',
              axisLine: {            // 坐标轴线
                  lineStyle: {       // 属性lineStyle控制线条样式
                      width: 10
                  }
              },
              axisTick: {            // 坐标轴小标记
                  length: 10,        // 属性length控制线长
                  lineStyle: {       // 属性lineStyle控制线条样式
                      color: 'auto'
                  }
              },
              splitLine: {           // 分隔线
                  length: 10,         // 属性length控制线长
                  lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                      color: 'auto'
                  }
              },
             
              title: {
                  // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontWeight: 'bolder',
                  fontSize: 10,
                  fontStyle: 'italic'
              },
              detail: {
                  // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  // formatter: function (value) {
                  //     value = (value + '').split('.');
                  //     value.length < 2 && (value.push('00'));
                  //     return ('00' + value[0]).slice(-2)
                  //         + '.' + (value[1] + '00').slice(0, 2);
                  // },
                  fontWeight: 'italic',
                  borderRadius: 3,
                  backgroundColor: '#444',
                  borderColor: '#aaa',
                  shadowBlur: 3,
                  shadowColor: '#333',
                  shadowOffsetX: 0,
                  shadowOffsetY: 3,
                  borderWidth: 2,
                  textBorderColor: '#000',
                  textBorderWidth: 2,
                  textShadowBlur: 2,
                  textShadowColor: '#fff',
                  textShadowOffsetX: 0,
                  textShadowOffsetY: 0,
                  fontFamily: 'Arial',
                  width: 50,
                  color: '#eee',
                  rich: {}
              },
              data: [{value:data.val,name:data.name}],
          }};

          return option;
  }

  render() {
    
          const { chartId } = this.props;
        //   console.log(chartId);
          return (
            <div id={chartId} className="chart-r" style={{ width: 400, height:320 }}></div>
          );
    
  }
}

export default Gauge;