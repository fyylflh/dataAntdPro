import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';

const SalesCard = React.lazy(() => import('./components/SalesCard'));

class DashboardAnalysis extends Component {
  state = {
    rangePickerValue: getTimeDistance('year'),
  };

  reqRef = 0;

  timeoutId = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboardAnalysis/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAnalysis/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }


  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });
    dispatch({
      type: 'dashboardAnalysis/fetchSalesData',
    });
  };

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });
    dispatch({
      type: 'dashboardAnalysis/fetchSalesData',
    });
  };

  isActive = type => {
    const { rangePickerValue } = this.state;

    if (!rangePickerValue) {
      return '';
    }

    const value = getTimeDistance(type);

    if (!value) {
      return '';
    }

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }

    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }

    return '';
  };

  render() {
    const { rangePickerValue } = this.state;
    const { dashboardAnalysis, loading } = this.props;
    const {
      salesData,
    } = dashboardAnalysis;


    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={null}>
            <SalesCard
              rangePickerValue={rangePickerValue}
              salesData={salesData}
              isActive={this.isActive}
              handleRangePickerChange={this.handleRangePickerChange}
              loading={loading}
              selectDate={this.selectDate}
            />
          </Suspense>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(({ dashboardAnalysis, loading }) => ({
  dashboardAnalysis,
  loading: loading.effects['dashboardAnalysis/fetch'],
}))(DashboardAnalysis);
