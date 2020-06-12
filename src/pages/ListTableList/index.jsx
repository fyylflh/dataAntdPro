import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryData } from './service';



const TableList = () => {
  const [sorter, setSorter] = useState('');
  const actionRef = useRef();
  const columns = [
    {
      title: 'TID',
      dataIndex: 'tid',
      rules: [
        {
          required: true,
          message: 'tid为必填项',
        },
      ],
    },
    {
      title: 'ReceivedTime',
      dataIndex: 'receivedTime',
      sorter: true,
      valueType: 'dateTime',
      // hideInForm: true,
      // renderFormItem: (item, { defaultRender, ...rest }, form) => {
      //   const status = form.getFieldValue('status');

      //   if (`${status}` === '0') {
      //     return false;
      //   }

      //   if (`${status}` === '3') {
      //     return <Input {...rest} placeholder="请输入异常原因！" />;
      //   }

      //   return defaultRender(item);
      // },
    }
    // ,
    // {
    //   title: '描述',
    //   dataIndex: 'requestJsonParams',
    //   valueType: 'textarea',
    // }
  ];
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter;
          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        params={{
          sorter,
        }}
        request={params => queryData(params)}
        columns={columns}
          expandable={{
            expandedRowRender: record => <p style={{ margin: 0 }}>{record.requestJsonParams}</p>,
          }}
        rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
