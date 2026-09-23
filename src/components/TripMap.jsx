import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Haversine formula to calculate distance between two coordinates in km
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Custom colored circle marker using SVG
function createCircleIcon(color, size = 20, pulseColor = null) {
  const pulse = pulseColor
    ? `<circle cx="${size}" cy="${size}" r="${size - 2}" fill="none" stroke="${pulseColor}" stroke-width="2" opacity="0.4"><animate attributeName="r" from="${size * 0.6}" to="${size * 1.4}" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite"/></circle>`
    : '';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size * 2}" height="${size * 2}" viewBox="0 0 ${size * 2} ${size * 2}">
      ${pulse}
      <circle cx="${size}" cy="${size}" r="${size * 0.45}" fill="${color}" stroke="white" stroke-width="2.5" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.25))"/>
      <circle cx="${size}" cy="${size}" r="${size * 0.18}" fill="white" opacity="0.85"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [size * 2, size * 2],
    iconAnchor: [size, size],
  });
}

// Label popup styled
function createLabel(text, color) {
  return L.divIcon({
    html: `<div style="
      background: ${color};
      color: white;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 700;
      white-space: nowrap;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      font-family: 'Inter', system-ui, sans-serif;
      letter-spacing: 0.02em;
    ">${text}</div>`,
    className: '',
    iconAnchor: [0, -14],
  });
}

export default function TripMap({ localCoords, destCoords, localName, destName }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);

  // Initialize the map once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: false,
    }).setView([20, 0], 2);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=cb1_3vji_1_de7b7266695c2863296a2a9f', {
      maxZoom: 18,
    }).addTo(map);

    // Small attribution in bottom-right
    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution('© <a href="https://carto.com" target="_blank" style="color:#888;font-size:9px">CARTO</a>')
      .addTo(map);

    layerGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers and line whenever coords change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // If we only have local coords, show just the red pin
    if (localCoords) {
      const redIcon = createCircleIcon('#EF4444', 16, '#EF4444');
      L.marker([localCoords.lat, localCoords.lon], { icon: redIcon }).addTo(layerGroup);

      // Name label for local
      if (localName) {
        L.marker([localCoords.lat, localCoords.lon], {
          icon: createLabel(localName, '#EF4444'),
          interactive: false,
        }).addTo(layerGroup);
      }
    }

    // If we have both local and destination, draw the route
    if (localCoords && destCoords) {
      const blueIcon = createCircleIcon('#3B82F6', 16, '#3B82F6');
      L.marker([destCoords.lat, destCoords.lon], { icon: blueIcon }).addTo(layerGroup);

      // Name label for destination
      if (destName) {
        L.marker([destCoords.lat, destCoords.lon], {
          icon: createLabel(destName, '#3B82F6'),
          interactive: false,
        }).addTo(layerGroup);
      }

      // Dotted blue connecting line
      const polyline = L.polyline(
        [[localCoords.lat, localCoords.lon], [destCoords.lat, destCoords.lon]],
        {
          color: '#3B82F6',
          weight: 2.5,
          dashArray: '8, 8',
          opacity: 0.7,
          lineCap: 'round',
        }
      ).addTo(layerGroup);

      // Distance label at midpoint
      const dist = haversineDistance(localCoords.lat, localCoords.lon, destCoords.lat, destCoords.lon);
      const midLat = (localCoords.lat + destCoords.lat) / 2;
      const midLon = (localCoords.lon + destCoords.lon) / 2;

      const distLabel = L.divIcon({
        html: `<div style="
          background: white;
          color: #111827;
          padding: 3px 10px;
          border-radius: 14px;
          font-size: 11px;
          font-weight: 800;
          white-space: nowrap;
          box-shadow: 0 3px 10px rgba(0,0,0,0.15);
          font-family: 'Inter', system-ui, sans-serif;
          display: flex;
          align-items: center;
          gap: 4px;
          border: 1px solid #e2e8f0;
        ">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          ${dist.toLocaleString()} km
        </div>`,
        className: '',
        iconAnchor: [40, 10],
      });
      L.marker([midLat, midLon], { icon: distLabel, interactive: false }).addTo(layerGroup);

      // Fit bounds to show both points
      const bounds = L.latLngBounds(
        [localCoords.lat, localCoords.lon],
        [destCoords.lat, destCoords.lon]
      );
      map.fitBounds(bounds, { padding: [35, 35], maxZoom: 8, animate: true, duration: 0.8 });
    } else if (localCoords) {
      map.setView([localCoords.lat, localCoords.lon], 10, { animate: true, duration: 0.8 });
    }
  }, [localCoords, destCoords, localName, destName]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-inner bg-slate-100" style={{ height: '200px' }}>
      <div ref={mapContainerRef} className="w-full h-full" />
      {/* Map Legend */}
      <div className="absolute bottom-1.5 left-1.5 z-1000 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl shadow-sm border border-slate-100" style={{ fontSize: '9px' }}>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
          <span className="text-slate-500 font-semibold">You</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
          <span className="text-slate-500 font-semibold">Destination</span>
        </span>
      </div>
    </div>
  );
}
