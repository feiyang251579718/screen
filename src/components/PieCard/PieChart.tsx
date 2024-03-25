import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { AlarmStatic } from '@/types';
import * as echarts from 'echarts';

interface IProps {
  data: AlarmStatic[];
}

const colorArr = ['#8DFFD9', '#8DDBFF', '#CB8DFF', '#D31AFC', '#FFE58D'];

const PieChart: React.FC<IProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [charts, setCharts] = useState<echarts.ECharts>();
  useEffect(() => {
    if (ref.current) {
      const myChart = echarts.init(ref.current);
      setCharts(myChart);
    }
  }, []);

  const getColor = useCallback((index: number) => {
    return colorArr[index % (colorArr.length - 1)];
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
          data: data.map((item, index) => ({
            value: item.countStatistic,
            name: item.infoSecurityName,
            itemStyle: {
              color: getColor(index),
              shadowColor: getColor(index),
            },
          })),
        },
      ],
    }),
    [data],
  );

  useEffect(() => {
    if (charts) {
      charts.setOption(options);
    }
  }, [charts, options]);
  return <div ref={ref} style={{ height: '100%', width: '100%' }} />;
};

export default PieChart;
