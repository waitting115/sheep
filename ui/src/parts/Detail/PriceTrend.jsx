import { jsx, Canvas, Chart, Line, Axis, Tooltip } from "@antv/f2";

/**
 * 商品详情页的价格走势图
 * @param {object} param0 图表数据
 */
function PriceTrend({ chartData }) {
  const context = document.getElementById("container").getContext("2d");
  const LineChart = (
    <Canvas context={context} pixelRatio={window.devicePixelRatio}>
      <Chart data={chartData}>
        <Axis
          field="date"
          tickCount={3}
          style={{
            label: { align: "between" },
          }}
        />
        <Axis field="value" tickCount={5} />
        <Line x="date" y="value" />
        <Tooltip />
      </Chart>
    </Canvas>
  );

  const chart = new Canvas(LineChart.props);
  chart.render();

  return (
    <>
      <div id="container"></div>
    </>
  );
}

export default PriceTrend;
