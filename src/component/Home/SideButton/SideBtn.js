import React, { Component } from 'react';
import {
  HistoryOutlined,
  FieldTimeOutlined,
  SlidersOutlined,
  HeatMapOutlined
} from '@ant-design/icons';
class HBtn extends Component {
  render() {
    return (
      <div className="sider-btn" title="历史数据">
        <HistoryOutlined />
      </div>
    );
  }
}


class RBtn extends Component {
  render() {
    return (
      <div className="sider-btn" title="实时数据">
        <FieldTimeOutlined/>
      </div>
    );
  }
}

class WBtn extends Component {
  render() {
    return (
      <div className="sider-btn" title="更多功能">
        <SlidersOutlined/>
      </div>
    );
  }
}


class LogoBtn extends Component {
  render() {
    return (
      <div className="logo-btn">
        <HeatMapOutlined/>
      </div>
    );
  }
}

export {HBtn,RBtn,WBtn,LogoBtn};