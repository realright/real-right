<template>
    <div id="myDiv"></div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  onMounted,
  reactive,
} from "@vue/composition-api";
import axios from "axios";

// @ts-ignore
const Plotly = window.Plotly;

const IndexComponent = defineComponent({
  name: "StateCountyChart",
  setup() {
    async function drawChart() {
      const redjson = (
        await axios.get(
          "https://raw.githubusercontent.com/plotly/datasets/master/florida-red-data.json"
        )
      ).data;
      const bluejson = (
        await axios.get(
          "https://raw.githubusercontent.com/plotly/datasets/master/florida-blue-data.json"
        )
      ).data;

      Plotly.newPlot(
        "myDiv",
        [
          {
            type: "scattermapbox",
            lat: [46],
            lon: [-74],
          },
        ],
        {
          title: "Florida Counties",
          height: 600,
          width: 600,
          mapbox: {
            center: {
              lat: 28,
              lon: -84,
            },
            style: "light",
            zoom: 4.8,
            layers: [
              {
                sourcetype: "geojson",
                source: redjson,
                type: "fill",
                color: "rgba(163,22,19,0.8)",
              },
              {
                sourcetype: "geojson",
                source: bluejson,
                type: "fill",
                color: "rgba(40,0,113,0.8)",
              },
            ],
          },
        },
        {
          mapboxAccessToken:
            "pk.eyJ1IjoicmVhbC1yaWdodCIsImEiOiJjazkyNGU1dWUwNGw5M25wNDRzZzJuMHZoIn0.yEZ1cZps7fahXlawCA2KEg",
        }
      );
    }

    onMounted(async () => {
      drawChart();
    });

    return {
      drawChart,
    };
  },
});
export default IndexComponent;
</script>
