import { FC, useEffect, useRef } from "react";
import * as echarts from "echarts";

import "./index.less";

const Dashboard: FC = () => {
  const domRef = useRef<HTMLDivElement>(null);

  const echartInit = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current!);
    // 绘制图表
    myChart.setOption({
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  };

  useEffect(() => {
    echartInit();
  }, []);

  return (
    <>
      <div ref={domRef} className="echart-main"></div>
    </>
  );
};

export default Dashboard;
