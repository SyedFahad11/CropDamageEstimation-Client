// src/components/MapComponent.jsx
import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import Draw from 'ol/interaction/Draw';
import GeoJSON from 'ol/format/GeoJSON';

const MapComponent = ({ onFinishDrawing }) => {
  const [map, setMap] = useState(null);
  const [drawSource, setDrawSource] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const map = new Map({
        target: 'map-container',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      const drawSource = new VectorSource();
      setDrawSource(drawSource);

      const drawLayer = new VectorLayer({
        source: drawSource,
      });

      map.addLayer(drawLayer);

      const draw = new Draw({
        source: drawSource,
        type: 'Polygon',
      });

      draw.on('drawend', (event) => {
        const geojsonFormat = new GeoJSON();
        const geojson = geojsonFormat.writeFeature(event.feature);
        console.log('GeoJSON:', geojson);

        // Pass the geoJSON to the parent component
        if (onFinishDrawing) {
          onFinishDrawing({
            geoJSON: geojson,
          });
        }
      });

      map.addInteraction(draw);

      setMap(map);
    };

    initMap();

    return () => {
      if (map) {
        map.setTarget(null);
      }
    };
  }, [onFinishDrawing]);

  return (
    <div>
      <div id="map-container" className="map"></div>
    </div>
  );
};

export default MapComponent;
