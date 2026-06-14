// Simple test script to verify ward search logic & demographics data
const fs = require('fs');
const path = require('path');

// Mock browser globals
global.window = {};

// Load demographics data
let demographicsContent = fs.readFileSync(path.join(__dirname, 'js', 'demographics.js'), 'utf8');
// Convert const/let to global to expose them in Node.js top-level
demographicsContent = demographicsContent.replace(/const WARD_DEMOGRAPHICS/g, 'global.WARD_DEMOGRAPHICS');
demographicsContent = demographicsContent.replace(/const GVMC_SUMMARY/g, 'global.GVMC_SUMMARY');
eval(demographicsContent); // sets global.WARD_DEMOGRAPHICS & global.GVMC_SUMMARY

// Load ward area data
let wardDataContent = fs.readFileSync(path.join(__dirname, 'js', 'ward_data.js'), 'utf8');
wardDataContent = wardDataContent.replace(/const WARD_AREAS/g, 'global.WARD_AREAS');
wardDataContent = wardDataContent.replace(/const AREA_TO_WARD/g, 'global.AREA_TO_WARD');
wardDataContent = wardDataContent.replace(/function findWardByArea/g, 'global.findWardByArea = function');
wardDataContent = wardDataContent.replace(/function getAreasForWard/g, 'global.getAreasForWard = function');
eval(wardDataContent); // sets global.WARD_AREAS, global.AREA_TO_WARD, etc.

// Test queries for search
const testQueries = ['Sagarnagar', 'MVP Colony', 'Maddilapalem', 'Arilova', 'Gajuwaka', 'invalid_colony_name'];

console.log('--- TESTING SEARCH LOGIC ---');

function runSearch(query) {
  if (!query) return null;
  let ward = null;
  let matchedArea = query;

  const q = query.toLowerCase().trim();

  // 1. Try AREA_TO_WARD lookup
  if (typeof global.findWardByArea === 'function') {
    const wardNum = global.findWardByArea(query);
    if (wardNum !== null && wardNum !== undefined) {
      if (typeof global.AREA_TO_WARD !== 'undefined') {
        for (const [area, wn] of Object.entries(global.AREA_TO_WARD)) {
          if (wn === wardNum && (area.includes(q) || q.includes(area))) {
            matchedArea = area.replace(/\b\w/g, c => c.toUpperCase());
            break;
          }
        }
      }
      if (typeof global.WARD_DEMOGRAPHICS !== 'undefined' && global.WARD_DEMOGRAPHICS[wardNum]) {
        ward = { wardNo: wardNum, ...global.WARD_DEMOGRAPHICS[wardNum] };
      } else {
        ward = { wardNo: wardNum, name: matchedArea };
      }
    }
  }

  // 2. Fallback: search WARD_AREAS
  if (!ward && typeof global.WARD_AREAS !== 'undefined') {
    for (const [wardKey, areas] of Object.entries(global.WARD_AREAS)) {
      const hit = areas.find(a => a.toLowerCase().includes(q) || q.includes(a.toLowerCase()));
      if (hit) {
        matchedArea = hit;
        const demog = (typeof global.WARD_DEMOGRAPHICS !== 'undefined') ? global.WARD_DEMOGRAPHICS[wardKey] : null;
        ward = demog ? { wardNo: wardKey, ...demog } : { wardNo: wardKey, name: hit };
        break;
      }
    }
  }

  // 3. Fallback: match ward names in WARD_DEMOGRAPHICS
  if (!ward && typeof global.WARD_DEMOGRAPHICS !== 'undefined') {
    for (const [key, val] of Object.entries(global.WARD_DEMOGRAPHICS)) {
      const name = (val.name || '').toLowerCase();
      if (name.includes(q)) {
        ward = { wardNo: key, ...val };
        matchedArea = val.name;
        break;
      }
    }
  }

  return ward ? { ward, matchedArea } : null;
}

testQueries.forEach(q => {
  const result = runSearch(q);
  if (result) {
    console.log(`Query: "${q}" -> Found Ward: ${result.ward.wardNo}, Name: "${result.ward.name}", Pop: ${result.ward.population || 'Data pending'}`);
  } else {
    console.log(`Query: "${q}" -> Not Found`);
  }
});

console.log('\n--- TESTING COMPARISON LOGIC ---');
// Simulating comparison for two wards
function simulateComparison(valA, valB) {
  if (typeof global.WARD_DEMOGRAPHICS === 'undefined') {
    console.log('WARD_DEMOGRAPHICS undefined');
    return;
  }
  const wardA = global.WARD_DEMOGRAPHICS[valA];
  const wardB = global.WARD_DEMOGRAPHICS[valB];

  if (!wardA || !wardB) {
    console.log(`Wards A (${valA}) or B (${valB}) not found in demographics.`);
    return;
  }

  const areasA = (typeof global.WARD_AREAS !== 'undefined' && global.WARD_AREAS[valA]) ? global.WARD_AREAS[valA] : (wardA.areas || []);
  const areasB = (typeof global.WARD_AREAS !== 'undefined' && global.WARD_AREAS[valB]) ? global.WARD_AREAS[valB] : (wardB.areas || []);

  const popA = wardA.population || 0;
  const popB = wardB.population || 0;

  const womenA = (wardA.womenPct !== undefined) ? wardA.womenPct : (wardA.women_pct || 0);
  const womenB = (wardB.womenPct !== undefined) ? wardB.womenPct : (wardB.women_pct || 0);

  const scA = wardA.sc || wardA.sc_population || 0;
  const scB = wardB.sc || wardB.sc_population || 0;

  console.log(`Comparing Ward ${valA} (${wardA.name}) vs Ward ${valB} (${wardB.name}):`);
  console.log(`- Localities: ${areasA.length} vs ${areasB.length}`);
  console.log(`- Population: ${popA} vs ${popB}`);
  console.log(`- Women %: ${womenA.toFixed(2)}% vs ${womenB.toFixed(2)}%`);
  console.log(`- SC Pop: ${scA} vs ${scB}`);
}

simulateComparison('8', '17');
