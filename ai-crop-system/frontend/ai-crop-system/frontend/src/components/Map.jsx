import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map({ geojson }) {
  const mapRef = useRef(null);
  useEffect(()=>{
    if (!mapRef.current) {
      mapRef.current = L.map('mapid').setView([20.5937,78.9629], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '' }).addTo(mapRef.current);
    }
    if (geojson) {
      const layer = L.geoJSON(geojson).addTo(mapRef.current);
      mapRef.current.fitBounds(layer.getBounds());
      return ()=> mapRef.current.removeLayer(layer);
    }
  },[geojson]);
  return <div id="mapid" style={{ height: 400 }} />;
}
