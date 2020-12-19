import React, { Component } from 'react';
import {Table, TimePicker} from 'antd';

class MyForm extends Component {
  // 接收传来的数据
  render() {
    const data=this.props.data;
    const columns = [
      {
        title: '时刻',
        dataIndex: 'time',
      },
      {
        title: '编号',
        dataIndex: 'id',
        sorter: {
          compare: (a, b) => a.id - b.id,
          multiple: 2,
        },
      },
      {
        title: '数值',
        dataIndex: 'val',
        sorter: {
          compare: (a, b) => a.val - b.val,
          multiple: 1,
        },
      },
    ];
    var list = data.map((item,idx)=>{
      // console.log(idx,item);
      let tmp=item;
      // console.log(tmp);
      tmp.id=idx;
      return tmp;
    });

    return (
      <Table columns={columns} dataSource={list}/>
    );
  }
}

export default MyForm;