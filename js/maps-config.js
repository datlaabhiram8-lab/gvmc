/* GVMC Portal – Google Maps configuration
   Set apiKey to your Google Maps JavaScript API key for the interactive map.
   Leave empty to use the Google Maps embed fallback (no key required). */
const GVMC_MAP = {
  apiKey: '',

  center: { lat: 17.6868, lng: 83.2185 },
  defaultZoom: 14,
  overviewZoom: 12,

  getWardCoords(wardNum) {
    const n = parseInt(wardNum, 10);
    if (typeof WARD_COORDINATES !== 'undefined' && WARD_COORDINATES[String(n)]) {
      const [lat, lng] = WARD_COORDINATES[String(n)];
      return { lat, lng };
    }
    const offset = (n - 36) * 0.008;
    return {
      lat: +(this.center.lat + offset * 0.3).toFixed(6),
      lng: +(this.center.lng + offset * 0.6).toFixed(6)
    };
  },

  getWardName(wardNum) {
    const n = parseInt(wardNum, 10);
    if (typeof WARD_DEMOGRAPHICS !== 'undefined' && WARD_DEMOGRAPHICS[n]) {
      return WARD_DEMOGRAPHICS[n].name;
    }
    return `Ward ${n}`;
  },

  getWardSearchQuery(wardNum, wardName) {
    const name = wardName || this.getWardName(wardNum);
    return `${name}, Visakhapatnam, Andhra Pradesh, India`;
  },

  getGoogleMapsUrl(wardNum, wardName) {
    const query = encodeURIComponent(this.getWardSearchQuery(wardNum, wardName));
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  },

  getEmbedUrl(wardNum, wardName) {
    const query = encodeURIComponent(this.getWardSearchQuery(wardNum, wardName));
    return `https://maps.google.com/maps?q=${query}&hl=en&z=${this.defaultZoom}&output=embed`;
  },

  getAllWardCoords() {
    const list = [];
    for (let w = 1; w <= 72; w++) {
      const coords = this.getWardCoords(w);
      list.push({ wardNum: w, name: this.getWardName(w), ...coords });
    }
    return list;
  },

  getBoundsForAllWards() {
    const wards = this.getAllWardCoords();
    let minLat = wards[0].lat, maxLat = wards[0].lat;
    let minLng = wards[0].lng, maxLng = wards[0].lng;
    wards.forEach(w => {
      minLat = Math.min(minLat, w.lat);
      maxLat = Math.max(maxLat, w.lat);
      minLng = Math.min(minLng, w.lng);
      maxLng = Math.max(maxLng, w.lng);
    });
    return { minLat, maxLat, minLng, maxLng };
  },

  darkStyles: [
    { elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
    { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#1e293b' }] },
    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#334155' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#334155' }] },
    { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#475569' }] },
    { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0c4a6e' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#38bdf8' }] }
  ]
};
