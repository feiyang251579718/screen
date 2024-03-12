import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as echarts from 'echarts';

interface IProps {}

const colorArr = ['#8DFFD9', '#8DDBFF', '#CB8DFF', '#D31AFC', '#FFE58D'];

const PieChart: React.FC<IProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [charts, setCharts] = useState<echarts.ECharts>();
  useEffect(() => {
    if (ref.current) {
      const myChart = echarts.init(ref.current);
      setCharts(myChart);
    }
  }, []);

  const options: echarts.EChartsOption = useMemo(
    () => ({
      tooltip: {
        trigger: 'item',
      },
      title: {
        text: '攻击类型分析',
        left: 'center',
        top: 'middle',
        textStyle: {
          color: '#fff',
          fontSize: 14,
          width: 60,
          overflow: 'breakAll',
        },
      },
      color: colorArr,
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['55%', '77%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 0,
            borderColor: '#091946',
            borderWidth: 2,
            shadowBlur: 5,
          },
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
        },
      ],
    }),
    [],
  );

  useEffect(() => {
    if (charts) {
      charts.setOption(options);
    }
  }, [charts, options]);
  return <div ref={ref} style={{ height: '100%', width: '100%' }} />;
};

export default PieChart;
