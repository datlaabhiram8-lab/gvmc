const fs = require('fs');
const path = require('path');

// Mock a simple DOM environment
const dom = {};
const elements = {
  searchInput: { value: 'MVP Colony' },
  searchBtn: { addEventListener: (event, handler) => { dom.searchBtnClick = handler; } },
  searchResult: { classList: { remove: (cls) => {}, add: (cls) => {} } },
  noResult: { classList: { remove: (cls) => {}, add: (cls) => {} } },
  rWardNum: { textContent: '' },
  rAreaName: { textContent: '' },
  rPop: { textContent: '' },
  rWomen: { textContent: '' },
  rSC: { textContent: '' },
  dashBtn: { href: '' },
  searchedTerm: { textContent: '' },
  navbar: { classList: { toggle: () => {} }, contains: () => false, addEventListener: () => {} },
  hamburgerBtn: { classList: { toggle: () => {}, remove: () => {} }, addEventListener: () => {} },
  mobileNav: { classList: { toggle: () => {}, remove: () => {} }, contains: () => false, addEventListener: () => {} }
};

global.document = {
  getElementById: (id) => {
    if (elements[id]) return elements[id];
    return { addEventListener: () => {} };
  },
  addEventListener: (event, handler) => {
    if (event === 'click') dom.documentClick = handler;
  }
};
global.window = {
  addEventListener: (event, handler) => {}
};

// Load dependencies
eval(fs.readFileSync(path.join(__dirname, '..', 'js', 'ward_data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '..', 'js', 'demographics.js'), 'utf8'));

// Extract and run inline script from ward-search.html
const html = fs.readFileSync(path.join(__dirname, '..', 'ward-search.html'), 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (scriptMatch) {
  const scriptContent = scriptMatch[1];
  try {
    eval(scriptContent);
    console.log('Script evaluated successfully.');
    
    // Simulate click on search
    if (dom.searchBtnClick) {
      console.log('Simulating search click...');
      dom.searchBtnClick();
      console.log('Results populated:');
      console.log('rWardNum:', elements.rWardNum.textContent);
      console.log('rAreaName:', elements.rAreaName.textContent);
      console.log('rPop:', elements.rPop.textContent);
      console.log('rWomen:', elements.rWomen.textContent);
      console.log('rSC:', elements.rSC.textContent);
      console.log('dashBtn.href:', elements.dashBtn.href);
    } else {
      console.log('searchBtn click listener not found!');
    }
  } catch (e) {
    console.error('Runtime error in script:', e);
  }
} else {
  console.log('Inline script not found.');
}
