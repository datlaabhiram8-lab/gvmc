/* Smart Ward Connect – Ward location map (Google Maps, all 120 wards)
   Renders red boundary polygons for wards 73-120 based on WARD_BOUNDARIES data. */

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
    // Overlay boundary on fallback iframe for wards 73-120
    renderBoundaryOverlay(container, wardNum);
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

/**
 * Renders an SVG boundary overlay badge for wards 73-120 when using the embed (no-API) fallback.
 * Shows a visual indicator that boundary data is available.
 */
function renderBoundaryOverlay(container, wardNum) {
  if (wardNum < 73 || wardNum > 120) return;
  if (typeof WARD_BOUNDARIES === 'undefined' || !WARD_BOUNDARIES[wardNum]) return;

  const badge = document.createElement('div');
  badge.style.cssText = `
    position:absolute; bottom:12px; left:12px; z-index:10;
    background:rgba(15,23,42,0.85); border:1.5px solid #ef4444;
    border-radius:8px; padding:6px 12px;
    font-family:'Inter',sans-serif; font-size:0.75rem;
    color:#fca5a5; display:flex; align-items:center; gap:6px;
    pointer-events:none;
  `;
  badge.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <polygon points="7,1 13,5 13,9 7,13 1,9 1,5" stroke="#ef4444" stroke-width="1.5" fill="rgba(239,68,68,0.15)"/>
    </svg>
    Ward ${wardNum} boundary active`;

  // Wrap container to allow positioning
  const wrapper = container.parentElement;
  if (wrapper) {
    wrapper.style.position = 'relative';
    wrapper.appendChild(badge);
  }
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

  // ── Draw red boundary polygon for wards 73-120 ──
  if (wardNum >= 73 && wardNum <= 120) {
    renderWardBoundary(map, wardNum, wardName, true /* isActive */);
  }

  // Draw boundaries for nearby wards 73-120 that are visible on the map
  renderNearbyBoundaries(map, wardNum);

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

/**
 * Draws the red boundary polygon for a ward on the Google Map.
 * @param {google.maps.Map} map
 * @param {number} wardNum
 * @param {string} wardName
 * @param {boolean} isActive – true = bright red (current ward), false = dimmer red (nearby)
 */
function renderWardBoundary(map, wardNum, wardName, isActive) {
  if (typeof WARD_BOUNDARIES === 'undefined' || !WARD_BOUNDARIES[wardNum]) return;

  const paths = WARD_BOUNDARIES[wardNum];

  const polygon = new google.maps.Polygon({
    paths,
    map,
    strokeColor:   isActive ? '#ef4444' : '#f87171',
    strokeOpacity: isActive ? 1.0       : 0.55,
    strokeWeight:  isActive ? 2.5       : 1.5,
    fillColor:     isActive ? '#ef4444' : '#f87171',
    fillOpacity:   isActive ? 0.10      : 0.04,
    zIndex:        isActive ? 5         : 2
  });

  // Info window on boundary click
  const infoWindow = new google.maps.InfoWindow();
  polygon.addListener('click', (e) => {
    infoWindow.setContent(
      `<div style="font-family:Inter,sans-serif;padding:4px;">
        <b style="color:#1e293b;">Ward ${wardNum}</b>
        ${wardName !== `Ward ${wardNum}` ? `<span style="color:#64748b;font-size:0.8rem;"> – ${wardName}</span>` : ''}
        <div style="margin-top:4px;font-size:0.78rem;color:#64748b;">
          <span style="color:#ef4444;">⬡</span> Ward boundary
        </div>
      </div>`
    );
    infoWindow.setPosition(e.latLng);
    infoWindow.open(map);
  });

  return polygon;
}

/**
 * Draws faint boundary outlines for nearby wards 73-120 around the current ward.
 */
function renderNearbyBoundaries(map, activeWardNum) {
  if (typeof WARD_BOUNDARIES === 'undefined') return;

  for (let w = 73; w <= 120; w++) {
    if (w === activeWardNum) continue;
    if (!WARD_BOUNDARIES[w]) continue;

    const center = GVMC_MAP.getWardCoords(w);
    const active = GVMC_MAP.getWardCoords(activeWardNum);

    // Only draw wards within ~0.05° (~5 km) of the active ward
    const dist = Math.sqrt(
      Math.pow(center.lat - active.lat, 2) +
      Math.pow(center.lng - active.lng, 2)
    );
    if (dist > 0.05) continue;

    renderWardBoundary(map, w, GVMC_MAP.getWardName(w), false);
  }
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

  if (wardNum >= 73 && wardNum <= 120) {
    html += `<div style="font-size:0.75rem;color:#ef4444;margin-bottom:4px;">⬡ Boundary mapped</div>`;
  }

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
