/* GVMC Portal – Ward location map (Google Maps, all 72 wards) */

function initWardGoogleMap(options) {
  const wardNum = parseInt(options.wardNum, 10) || 17;
  const wardName = options.wardName || GVMC_MAP.getWardName(wardNum);
  const demographics = options.demographics || null;
  const containerId = options.containerId || 'wardMap';
  const container = document.getElementById(containerId);
  const openLink = document.getElementById('openGoogleMapsLink');
  const subtitle = document.getElementById('mapWardSubtitle');

  if (!container) return;

  window.__gvmcMapWardNum = wardNum;
  window.__gvmcMapWardName = wardName;

  const coords = GVMC_MAP.getWardCoords(wardNum);
  if (openLink) {
    openLink.href = GVMC_MAP.getGoogleMapsUrl(wardNum, wardName);
  }
  if (subtitle) {
    subtitle.textContent = `Ward ${wardNum} · ${wardName} · ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;
  }

  const showAllBtn = document.getElementById('mapShowAllBtn');
  if (showAllBtn) {
    showAllBtn.onclick = () => {
      if (window.__gvmcActiveMap) {
        fitMapToAllWards(window.__gvmcActiveMap);
        return;
      }
      const b = GVMC_MAP.getBoundsForAllWards();
      const lat = ((b.minLat + b.maxLat) / 2).toFixed(6);
      const lng = ((b.minLng + b.maxLng) / 2).toFixed(6);
      window.open(`https://www.google.com/maps/@${lat},${lng},11z`, '_blank', 'noopener');
    };
  }

  if (GVMC_MAP.apiKey) {
    loadGoogleMapsApi(() => renderInteractiveMap(container, wardNum, wardName, demographics, coords));
  } else {
    window.__gvmcActiveMap = null;
    renderEmbedMap(container, wardNum, wardName);
  }
}

function loadGoogleMapsApi(callback) {
  if (window.google && window.google.maps) {
    callback();
    return;
  }

  window.__gvmcMapsReady = callback;
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(GVMC_MAP.apiKey)}&callback=__gvmcMapsReady`;
  script.async = true;
  script.defer = true;
  script.onerror = () => {
    const container = document.getElementById('wardMap');
    if (container) renderEmbedMap(container, window.__gvmcMapWardNum || 17, window.__gvmcMapWardName || 'Ward');
  };
  document.head.appendChild(script);
}

function renderEmbedMap(container, wardNum, wardName) {
  container.innerHTML = `
    <iframe
      title="Google Maps – Ward ${wardNum} location"
      src="${GVMC_MAP.getEmbedUrl(wardNum, wardName)}"
      width="100%"
      height="420"
      style="border:0;display:block;"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen>
    </iframe>`;
}

function renderInteractiveMap(container, wardNum, wardName, demographics, coords) {
  container.innerHTML = '';

  const map = new google.maps.Map(container, {
    center: coords,
    zoom: GVMC_MAP.defaultZoom,
    styles: GVMC_MAP.darkStyles,
    mapTypeControl: false,
    streetViewControl: true,
    fullscreenControl: true,
    gestureHandling: 'cooperative'
  });

  window.__gvmcActiveMap = map;
  renderAllWardMarkers(map, wardNum);

  const activeMarker = new google.maps.Marker({
    map,
    position: coords,
    title: `Ward ${wardNum} – ${wardName}`,
    animation: google.maps.Animation.DROP,
    zIndex: 1000,
    label: {
      text: String(wardNum),
      color: '#ffffff',
      fontWeight: '700',
      fontSize: '12px'
    },
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 18,
      fillColor: '#1a56db',
      fillOpacity: 1,
      strokeColor: '#06b6d4',
      strokeWeight: 2,
      labelOrigin: new google.maps.Point(0, 0)
    }
  });

  let infoHtml = buildInfoWindowHtml(wardNum, wardName, demographics);
  const infoWindow = new google.maps.InfoWindow({ content: infoHtml, maxWidth: 280 });
  infoWindow.open({ anchor: activeMarker, map });
  activeMarker.addListener('click', () => infoWindow.open({ anchor: activeMarker, map }));
}

function renderAllWardMarkers(map, activeWardNum) {
  GVMC_MAP.getAllWardCoords().forEach(w => {
    if (w.wardNum === activeWardNum) return;

    const marker = new google.maps.Marker({
      map,
      position: { lat: w.lat, lng: w.lng },
      title: `Ward ${w.wardNum} – ${w.name}`,
      zIndex: w.wardNum,
      label: {
        text: String(w.wardNum),
        color: '#cbd5e1',
        fontWeight: '600',
        fontSize: '9px'
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#334155',
        fillOpacity: 0.85,
        strokeColor: '#64748b',
        strokeWeight: 1,
        labelOrigin: new google.maps.Point(0, 0)
      }
    });

    marker.addListener('click', () => {
      window.location.href = `ward-dashboard.html?ward=${w.wardNum}`;
    });
  });
}

function fitMapToAllWards(map) {
  const bounds = new google.maps.LatLngBounds();
  GVMC_MAP.getAllWardCoords().forEach(w => bounds.extend({ lat: w.lat, lng: w.lng }));
  map.fitBounds(bounds, 48);
}

function buildInfoWindowHtml(wardNum, wardName, demographics) {
  let html = `<div style="font-family:Inter,sans-serif;min-width:180px;padding:2px 0;">
    <div style="font-weight:700;font-size:0.95rem;margin-bottom:4px;color:#1e293b;">Ward ${wardNum} – ${wardName}</div>`;

  if (demographics) {
    html += `
      <div style="font-size:0.8rem;color:#64748b;">Population: ${demographics.population.toLocaleString('en-IN')}</div>
      <div style="font-size:0.8rem;color:#64748b;">Sustainability: ${demographics.sustainability}/100</div>`;
    if (demographics.secretariat) {
      html += `<div style="font-size:0.8rem;color:#64748b;">Secretariat: ${demographics.secretariat}</div>`;
    }
  }

  html += `
    <div style="margin-top:8px;font-size:0.78rem;">
      <a href="${GVMC_MAP.getGoogleMapsUrl(wardNum, wardName)}" target="_blank" rel="noopener" style="color:#1a56db;font-weight:600;text-decoration:none;">
        Open in Google Maps →
      </a>
    </div>
  </div>`;
  return html;
}
