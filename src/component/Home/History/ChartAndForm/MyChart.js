import React, { Component } from 'react';
import echarts from 'echarts';


class MyChart extends Component {
    state = {};

    chart = null;

    componentDidMount() {
        const { chartId, option } = this.props;   //继承父级传递的值
        console.log(chartId,option);
        const chartIdDiv = document.getElementById(chartId);   
        if (chartIdDiv) {
            this.chart = echarts.init(chartIdDiv);  //实例化echats画布
            if (this.chart) {
                this.renderChart(this.chart, option);  //加载数据
            }
        }
        window.addEventListener('resize', this.handleResize, false);  //监听改变画布大小
    }

    componentDidUpdate(prevProps) {
      const { option } = this.props;
      if (prevProps.option !== option && this.chart) {
          this.renderChart(this.chart, option);
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

    renderChart = (chart, option) => {
      const { handleClick } = this.props;
      chart.clear();
      chart.setOption(option);
      chart.off('click'); // 要是不加上这行，事件会重复n次
      chart.on('click', params => {
          if (handleClick) {
              handleClick(params);
          }
      });
    };

  render() {
    const { chartId } = this.props;
    return (
      <div id={chartId} className="chart-h" style={{ width: '100%', height: '100%' }}></div>
    );
  }
}

export default MyChart;