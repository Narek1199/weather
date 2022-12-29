import moment from "moment";
import ReactECharts from "echarts-for-react";

const ChartComponent = ({ data }) => {
  const options = {
    textStyle: {
      fontSize: 10,
      lineHeight: 13,
      fontWeight: 700,
      color: "#D7D7D7",
    },
    tooltip: {
      padding: 5,
      trigger: "axis",
      borderRadius: 10,
      textStyle: {
        lineHeight: 0,
      },
      formatter: ([{ value }]) => {
        return `<div class="flex flex-col">
								<h1 class="text-center">${moment(value[0]).format("LL")}</h1>
								<div class="flex items-center gap-2 p-3">
                  <div class="flex flex-col">
										<img 
											src="${process.env.REACT_APP_OPEN_WEATHER_IMAGE_URL}/${value[4][0].icon}@2x.png"
											alt="${value[4][0].main}"
										/>
										<div class="flex flex-col text-center">
											<h2>${value[4][0].main}</h2>
											<span>${value[4][0].description}</span>
										</div>
									</div>
									<div class="flex flex-col">
										<div class="flex items-center gap-1 justify-center">
											<span class="text-xs">High:</span>
											<span>${value[2]}&#8451;</span>
										</div>
										<div class="flex items-center gap-1 justify-center">
											<span class="text-xs">low:</span>
											<span>${value[3]}&#8451;</span>
										</div>
									</div>
	              </div>
							</div>`;
      },
    },
    xAxis: {
      type: "category",
      axisLabel: {
        formatter: (value) => {
          return moment(value).format("L");
        },
      },
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value) => {
          return `${value}`;
        },
      },
    },
    grid: {
      top: "10%",
      left: "1%",
      right: "3%",
      bottom: "15%",
      containLabel: true,
    },
    series: {
      type: "line",
      smooth: false,
      symbolSize: 5,
      symbol: "circle",
      showSymbol: false,
      data: data.map(
        ({ main: { temp, temp_max, temp_min }, dt_txt, weather }) => ({
          name: temp,
          value: [dt_txt, temp, temp_max, temp_min, weather],
        })
      ),
    },
  };

  return (
    <ReactECharts option={options} style={{ height: "16rem", width: "100%" }} />
  );
};

export default ChartComponent;
