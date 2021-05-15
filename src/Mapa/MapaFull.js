import React, { memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const ColorMax = (color) => {
  if (color === 'blue') {
    return ['#80b9ff', '#0000a0'];
  } else if (color == 'green') {
    return ['#76ff5e', '#00aa00'];
  } else if (color == 'purple') {
    return ['#ff80ff', '#800080'];
  } else if (color == 'orange') {
    return ['#ffc164', '#f93f00'];
  }else if (color == 'red') {
    return ['#ff8080', '#e60000'];
  } else {
    return ['#bebebe', '#000000'];
  }
};

const MapChart = ({ setTooltipContent, data, color ,titulo}) => {
  const customScale = scaleLinear()
    .domain([
      1,
      //Math.min(...data.map((i) => i.val)),
      Math.max(...data.map((i) => i.val)),
    ])
    .range(ColorMax(color));

  return (
    <div>
      <h1 style={{textAlign:"center"}}>{titulo}</h1>
      <ComposableMap data-tip='' projectionConfig={{ scale: 200 }}>
        <Graticule stroke='#66d3fd' />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const country = data.find((d) => d.id === geo.properties.ISO_A2);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    if (country) {
                      setTooltipContent(`${NAME} — ${country.val}`);
                    } else {
                      setTooltipContent(`${NAME} — ${0}`);
                    }
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('');
                  }}
                  style={{
                    default: {
                      stroke: '#6b6b6b',
                      fill: country ? customScale(country.val) : 'white',
                    },
                    hover: {
                      fill: '#66d3fd',
                      stroke: 'black',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
