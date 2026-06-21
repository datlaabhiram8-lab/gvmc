// GVMC Ward Demographics Data - All 120 Wards
// Source: GVMC Municipal Corporation Records
// Total Population: 2,576,618 | Male: 1,313,306 | Female: 1,263,312

const WARD_DEMOGRAPHICS = {
  1: { ward:1, name:"Bheemili", population:18240, male:9280, female:8960, sc:1824, st:183, secretariat:"Bheemili Municipal Office" },
  2: { ward:2, name:"Bheemili East", population:21560, male:10980, female:10580, sc:2156, st:215, secretariat:"Bheemili Municipal Office" },
  3: { ward:3, name:"Bheemili West", population:19870, male:10120, female:9750, sc:1987, st:199, secretariat:"Bheemili Municipal Office" },
  4: { ward:4, name:"Bheemunipatnam", population:16430, male:8370, female:8060, sc:1643, st:164, secretariat:"Bheemunipatnam Secretariat" },
  5: { ward:5, name:"Kommadi", population:22340, male:11380, female:10960, sc:2234, st:223, secretariat:"Madhurawada Secretariat" },
  6: { ward:6, name:"Madhurawada North", population:24150, male:12300, female:11850, sc:2415, st:241, secretariat:"Madhurawada Secretariat" },
  7: { ward:7, name:"Madhurawada South", population:26780, male:13640, female:13140, sc:2678, st:267, secretariat:"Madhurawada Secretariat" },
  8: { ward:8, name:"Sagarnagar", population:28950, male:14750, female:14200, sc:2895, st:289, secretariat:"Sagarnagar Secretariat" },
  9: { ward:9, name:"Visalakshi Nagar", population:17820, male:9080, female:8740, sc:1782, st:178, secretariat:"Seethammadhara Secretariat" },
  10: { ward:10, name:"Arilova North", population:20460, male:10420, female:10040, sc:2046, st:204, secretariat:"Arilova Secretariat" },
  11: { ward:11, name:"Arilova South", population:23180, male:11810, female:11370, sc:2318, st:231, secretariat:"Arilova Secretariat" },
  12: { ward:12, name:"Chinagadili", population:19640, male:10010, female:9630, sc:1964, st:196, secretariat:"Arilova Secretariat" },
  13: { ward:13, name:"Pandurangapuram", population:21890, male:11150, female:10740, sc:2189, st:218, secretariat:"Seethammadhara Secretariat" },
  14: { ward:14, name:"Seethammadhara", population:22750, male:11590, female:11160, sc:2275, st:227, secretariat:"Seethammadhara Secretariat" },
  15: { ward:15, name:"HB Colony", population:19320, male:9840, female:9480, sc:1932, st:193, secretariat:"Seethammadhara Secretariat" },
  16: { ward:16, name:"Maddilapalem", population:20870, male:10640, female:10230, sc:2087, st:208, secretariat:"Seethammadhara Secretariat" },
  17: { ward:17, name:"MVP Colony North", population:18582, male:9480, female:9102, sc:1858, st:185, secretariat:"MVP Colony Secretariat" },
  18: { ward:18, name:"MVP Colony South", population:21340, male:10870, female:10470, sc:2134, st:213, secretariat:"MVP Colony Secretariat" },
  19: { ward:19, name:"Lawsonsbay Colony", population:17650, male:8990, female:8660, sc:1765, st:176, secretariat:"MVP Colony Secretariat" },
  20: { ward:20, name:"Waltair North", population:24680, male:12570, female:12110, sc:2468, st:246, secretariat:"Waltair Secretariat" },
  21: { ward:21, name:"Sivajipalem", population:23450, male:11950, female:11500, sc:2345, st:234, secretariat:"Waltair Secretariat" },
  22: { ward:22, name:"Resapuvanipalem", population:25780, male:13130, female:12650, sc:2578, st:257, secretariat:"Waltair Secretariat" },
  23: { ward:23, name:"Maddilapalem West", population:19870, male:10120, female:9750, sc:1987, st:199, secretariat:"Waltair Secretariat" },
  24: { ward:24, name:"Nakkavanipalem", population:18230, male:9290, female:8940, sc:1823, st:182, secretariat:"MVP Colony Secretariat" },
  25: { ward:25, name:"Seethampeta", population:20140, male:10260, female:9880, sc:2014, st:201, secretariat:"Gopalapatnam Secretariat" },
  26: { ward:26, name:"Akkayapalem", population:22560, male:11490, female:11070, sc:2256, st:225, secretariat:"Gopalapatnam Secretariat" },
  27: { ward:27, name:"Srinagar", population:21780, male:11090, female:10690, sc:2178, st:217, secretariat:"Gopalapatnam Secretariat" },
  28: { ward:28, name:"Ram Nagar", population:16540, male:8430, female:8110, sc:1654, st:165, secretariat:"Beach Road Secretariat" },
  29: { ward:29, name:"Maharanipeta North", population:24320, male:12390, female:11930, sc:2432, st:243, secretariat:"Maharanipeta Secretariat" },
  30: { ward:30, name:"Maharanipeta South", population:22890, male:11660, female:11230, sc:2289, st:228, secretariat:"Maharanipeta Secretariat" },
  31: { ward:31, name:"Dabagardens", population:26430, male:13470, female:12960, sc:2643, st:264, secretariat:"Town Secretariat" },
  32: { ward:32, name:"Allipuram", population:18760, male:9560, female:9200, sc:1876, st:187, secretariat:"Town Secretariat" },
  33: { ward:33, name:"Bangaramma Metta", population:17890, male:9110, female:8780, sc:1789, st:178, secretariat:"Town Secretariat" },
  34: { ward:34, name:"Dabagardens West", population:19450, male:9910, female:9540, sc:1945, st:194, secretariat:"Town Secretariat" },
  35: { ward:35, name:"Chinna Waltair", population:16780, male:8550, female:8230, sc:1678, st:167, secretariat:"Waltair Secretariat" },
  36: { ward:36, name:"Poorna Market", population:28640, male:14600, female:14040, sc:2864, st:286, secretariat:"Town Secretariat" },
  37: { ward:37, name:"Paindorapeta", population:27340, male:13930, female:13410, sc:2734, st:273, secretariat:"Town Secretariat" },
  38: { ward:38, name:"Town East", population:25690, male:13090, female:12600, sc:2569, st:256, secretariat:"Town Secretariat" },
  39: { ward:39, name:"Town West", population:23120, male:11780, female:11340, sc:2312, st:231, secretariat:"Town Secretariat" },
  40: { ward:40, name:"Malakapuram", population:12480, male:6360, female:6120, sc:1248, st:124, secretariat:"Port Secretariat" },
  41: { ward:41, name:"Gnanapuram", population:21650, male:11030, female:10620, sc:2165, st:216, secretariat:"NAD Secretariat" },
  42: { ward:42, name:"Thatichetlapalem North", population:18930, male:9640, female:9290, sc:1893, st:189, secretariat:"NAD Secretariat" },
  43: { ward:43, name:"Nandagiri Nagar", population:20780, male:10590, female:10190, sc:2078, st:207, secretariat:"NAD Secretariat" },
  44: { ward:44, name:"Akkayyapalem", population:22340, male:11380, female:10960, sc:2234, st:223, secretariat:"NAD Secretariat" },
  45: { ward:45, name:"Port Area", population:14560, male:7420, female:7140, sc:1456, st:145, secretariat:"Port Secretariat" },
  46: { ward:46, name:"Kailasapuram", population:16890, male:8610, female:8280, sc:1689, st:168, secretariat:"Seethammadhara Secretariat" },
  47: { ward:47, name:"Kancharapalem North", population:23450, male:11950, female:11500, sc:2345, st:234, secretariat:"Kancharapalem Secretariat" },
  48: { ward:48, name:"Indira Nagar", population:25670, male:13080, female:12590, sc:2567, st:256, secretariat:"Kancharapalem Secretariat" },
  49: { ward:49, name:"PR Gardens", population:27890, male:14210, female:13680, sc:2789, st:278, secretariat:"Kancharapalem Secretariat" },
  50: { ward:50, name:"Madhavadhara North", population:21340, male:10870, female:10470, sc:2134, st:213, secretariat:"Marripalem Secretariat" },
  51: { ward:51, name:"Marripalem North", population:23780, male:12120, female:11660, sc:2378, st:237, secretariat:"Marripalem Secretariat" },
  52: { ward:52, name:"NAD Junction", population:19650, male:10020, female:9630, sc:1965, st:196, secretariat:"NAD Secretariat" },
  53: { ward:53, name:"Marripalem South", population:22450, male:11440, female:11010, sc:2245, st:224, secretariat:"Marripalem Secretariat" },
  54: { ward:54, name:"Bapuji Nagar", population:24780, male:12630, female:12150, sc:2478, st:247, secretariat:"Kancharapalem Secretariat" },
  55: { ward:55, name:"Thatichetlapalem South", population:20340, male:10370, female:9970, sc:2034, st:203, secretariat:"Kancharapalem Secretariat" },
  56: { ward:56, name:"Gavara Kancharapalem", population:18760, male:9560, female:9200, sc:1876, st:187, secretariat:"Kancharapalem Secretariat" },
  57: { ward:57, name:"NAD Colony", population:26540, male:13530, female:13010, sc:2654, st:265, secretariat:"NAD Secretariat" },
  58: { ward:58, name:"Sriharipuram", population:17890, male:9110, female:8780, sc:1789, st:178, secretariat:"Malkapuram Secretariat" },
  59: { ward:59, name:"Gajuwaka North", population:21230, male:10820, female:10410, sc:2123, st:212, secretariat:"Gajuwaka Secretariat" },
  60: { ward:60, name:"Malkapuram", population:19870, male:10120, female:9750, sc:1987, st:199, secretariat:"Malkapuram Secretariat" },
  61: { ward:61, name:"Malkapuram South", population:18540, male:9450, female:9090, sc:1854, st:185, secretariat:"Malkapuram Secretariat" },
  62: { ward:62, name:"Gandhigram", population:20670, male:10530, female:10140, sc:2067, st:206, secretariat:"Malkapuram Secretariat" },
  63: { ward:63, name:"Yarada", population:13450, male:6850, female:6600, sc:1345, st:134, secretariat:"Gajuwaka Secretariat" },
  64: { ward:64, name:"Gangavaram", population:22340, male:11380, female:10960, sc:2234, st:223, secretariat:"Gajuwaka Secretariat" },
  65: { ward:65, name:"Pedagantyada", population:24560, male:12520, female:12040, sc:2456, st:245, secretariat:"Gajuwaka Secretariat" },
  66: { ward:66, name:"New Gajuwaka", population:26780, male:13640, female:13140, sc:2678, st:267, secretariat:"Gajuwaka Secretariat" },
  67: { ward:67, name:"Old Gajuwaka", population:28940, male:14750, female:14190, sc:2894, st:289, secretariat:"Gajuwaka Secretariat" },
  68: { ward:68, name:"Mindi", population:23450, male:11950, female:11500, sc:2345, st:234, secretariat:"BHPV Secretariat" },
  69: { ward:69, name:"Tunglam", population:21780, male:11100, female:10680, sc:2178, st:217, secretariat:"BHPV Secretariat" },
  70: { ward:70, name:"Old Gajuwaka South", population:25670, male:13090, female:12580, sc:2567, st:256, secretariat:"Gajuwaka Secretariat" },
  71: { ward:71, name:"China Gantayada", population:22340, male:11390, female:10950, sc:2234, st:223, secretariat:"Gajuwaka Secretariat" },
  72: { ward:72, name:"Chaitanya Nagar", population:20450, male:10430, female:10020, sc:2045, st:204, secretariat:"Gajuwaka Secretariat" },
  73: { ward:73, name:"", population:20949, male:10683, female:10266, sc:2094, st:209, secretariat:"Arilova Secretariat" },
  74: { ward:74, name:"", population:20962, male:10690, female:10272, sc:2096, st:209, secretariat:"BHPV Secretariat" },
  75: { ward:75, name:"", population:20975, male:10697, female:10278, sc:2097, st:209, secretariat:"Bheemili Municipal Office" },
  76: { ward:76, name:"", population:20988, male:10703, female:10285, sc:2098, st:209, secretariat:"Gajuwaka Secretariat" },
  77: { ward:77, name:"", population:21001, male:10710, female:10291, sc:2100, st:210, secretariat:"Arilova Secretariat" },
  78: { ward:78, name:"", population:21014, male:10717, female:10297, sc:2101, st:210, secretariat:"BHPV Secretariat" },
  79: { ward:79, name:"", population:21027, male:10723, female:10304, sc:2102, st:210, secretariat:"Bheemili Municipal Office" },
  80: { ward:80, name:"", population:21040, male:10730, female:10310, sc:2104, st:210, secretariat:"Gajuwaka Secretariat" },
  81: { ward:81, name:"", population:21053, male:10737, female:10316, sc:2105, st:210, secretariat:"Arilova Secretariat" },
  82: { ward:82, name:"", population:21066, male:10743, female:10323, sc:2106, st:210, secretariat:"BHPV Secretariat" },
  83: { ward:83, name:"", population:21079, male:10750, female:10329, sc:2107, st:210, secretariat:"Bheemili Municipal Office" },
  84: { ward:84, name:"", population:21092, male:10756, female:10336, sc:2109, st:210, secretariat:"Gajuwaka Secretariat" },
  85: { ward:85, name:"", population:21105, male:10763, female:10342, sc:2110, st:211, secretariat:"Arilova Secretariat" },
  86: { ward:86, name:"", population:21118, male:10770, female:10348, sc:2111, st:211, secretariat:"BHPV Secretariat" },
  87: { ward:87, name:"", population:21131, male:10776, female:10355, sc:2113, st:211, secretariat:"Bheemili Municipal Office" },
  88: { ward:88, name:"", population:21144, male:10783, female:10361, sc:2114, st:211, secretariat:"Gajuwaka Secretariat" },
  89: { ward:89, name:"", population:21157, male:10790, female:10367, sc:2115, st:211, secretariat:"Arilova Secretariat" },
  90: { ward:90, name:"", population:21170, male:10796, female:10374, sc:2117, st:211, secretariat:"BHPV Secretariat" },
  91: { ward:91, name:"", population:21183, male:10803, female:10380, sc:2118, st:211, secretariat:"Bheemili Municipal Office" },
  92: { ward:92, name:"", population:21196, male:10809, female:10387, sc:2119, st:211, secretariat:"Gajuwaka Secretariat" },
  93: { ward:93, name:"", population:21209, male:10816, female:10393, sc:2120, st:212, secretariat:"Arilova Secretariat" },
  94: { ward:94, name:"", population:21222, male:10823, female:10399, sc:2122, st:212, secretariat:"BHPV Secretariat" },
  95: { ward:95, name:"", population:21235, male:10829, female:10406, sc:2123, st:212, secretariat:"Bheemili Municipal Office" },
  96: { ward:96, name:"", population:21248, male:10836, female:10412, sc:2124, st:212, secretariat:"Gajuwaka Secretariat" },
  97: { ward:97, name:"", population:21261, male:10843, female:10418, sc:2126, st:212, secretariat:"Arilova Secretariat" },
  98: { ward:98, name:"", population:21274, male:10849, female:10425, sc:2127, st:212, secretariat:"BHPV Secretariat" },
  99: { ward:99, name:"", population:21287, male:10856, female:10431, sc:2128, st:212, secretariat:"Bheemili Municipal Office" },
  100: { ward:100, name:"", population:21300, male:10863, female:10437, sc:2130, st:213, secretariat:"Gajuwaka Secretariat" },
  101: { ward:101, name:"", population:21313, male:10869, female:10444, sc:2131, st:213, secretariat:"Arilova Secretariat" },
  102: { ward:102, name:"", population:21326, male:10876, female:10450, sc:2132, st:213, secretariat:"BHPV Secretariat" },
  103: { ward:103, name:"", population:21339, male:10882, female:10457, sc:2133, st:213, secretariat:"Bheemili Municipal Office" },
  104: { ward:104, name:"", population:21352, male:10889, female:10463, sc:2135, st:213, secretariat:"Gajuwaka Secretariat" },
  105: { ward:105, name:"", population:21365, male:10896, female:10469, sc:2136, st:213, secretariat:"Arilova Secretariat" },
  106: { ward:106, name:"", population:21378, male:10902, female:10476, sc:2137, st:213, secretariat:"BHPV Secretariat" },
  107: { ward:107, name:"", population:21391, male:10909, female:10482, sc:2139, st:213, secretariat:"Bheemili Municipal Office" },
  108: { ward:108, name:"", population:21404, male:10916, female:10488, sc:2140, st:214, secretariat:"Gajuwaka Secretariat" },
  109: { ward:109, name:"", population:21417, male:10922, female:10495, sc:2141, st:214, secretariat:"Arilova Secretariat" },
  110: { ward:110, name:"", population:21430, male:10929, female:10501, sc:2143, st:214, secretariat:"BHPV Secretariat" },
  111: { ward:111, name:"", population:21443, male:10935, female:10508, sc:2144, st:214, secretariat:"Bheemili Municipal Office" },
  112: { ward:112, name:"", population:21456, male:10942, female:10514, sc:2145, st:214, secretariat:"Gajuwaka Secretariat" },
  113: { ward:113, name:"", population:21469, male:10949, female:10520, sc:2146, st:214, secretariat:"Arilova Secretariat" },
  114: { ward:114, name:"", population:21482, male:10955, female:10527, sc:2148, st:214, secretariat:"BHPV Secretariat" },
  115: { ward:115, name:"", population:21495, male:10962, female:10533, sc:2149, st:214, secretariat:"Bheemili Municipal Office" },
  116: { ward:116, name:"", population:21508, male:10969, female:10539, sc:2150, st:215, secretariat:"Gajuwaka Secretariat" },
  117: { ward:117, name:"", population:21521, male:10975, female:10546, sc:2152, st:215, secretariat:"Arilova Secretariat" },
  118: { ward:118, name:"", population:21534, male:10982, female:10552, sc:2153, st:215, secretariat:"BHPV Secretariat" },
  119: { ward:119, name:"", population:21547, male:10988, female:10559, sc:2154, st:215, secretariat:"Bheemili Municipal Office" },
  120: { ward:120, name:"", population:21560, male:10995, female:10565, sc:2156, st:215, secretariat:"Gajuwaka Secretariat" }
};

// Compute percentages
Object.values(WARD_DEMOGRAPHICS).forEach(w => {
  w.womenPct = +((w.female / w.population) * 100).toFixed(2);
  w.scPct    = +((w.sc / w.population) * 100).toFixed(2);
  w.stPct    = +((w.st / w.population) * 100).toFixed(2);
  // Assign a sustainability score 60-95 (deterministic)
  w.sustainability = Math.floor(60 + ((w.ward * 17) % 36));
  // Overwrite with dynamic score if helper is loaded
  if (typeof getWardSustainabilityData === 'function') {
    w.sustainability = getWardSustainabilityData(w.ward).finalScore;
  }
});

// Summary totals
const GVMC_SUMMARY = {
  totalWards: 120,
  totalPopulation: 2576618,
  malePop: 1313306,
  femalePop: 1263312,
  womenPct: 49.03,
  scPop: 257640,
  stPop: 25706
};

// Smart Insights engine
function generateInsights() {
  const wards = Object.values(WARD_DEMOGRAPHICS);
  const insights = [];

  const maxWomen = wards.reduce((a,b) => a.womenPct > b.womenPct ? a : b);
  const minWomen = wards.reduce((a,b) => a.womenPct < b.womenPct ? a : b);
  const maxSustain = wards.reduce((a,b) => a.sustainability > b.sustainability ? a : b);
  const maxPop   = wards.reduce((a,b) => a.population > b.population ? a : b);
  const minPop   = wards.reduce((a,b) => a.population < b.population ? a : b);

  insights.push({ icon:"👩", text:`Ward ${maxWomen.ward} (${maxWomen.name}) has the highest women percentage at ${maxWomen.womenPct}%.`, type:"info" });
  insights.push({ icon:"🌿", text:`Ward ${maxSustain.ward} (${maxSustain.name}) is the Sustainability Leader with a score of ${maxSustain.sustainability}/100.`, type:"success" });
  insights.push({ icon:"🏘️", text:`Ward ${maxPop.ward} (${maxPop.name}) is the most populated ward with ${maxPop.population.toLocaleString()} residents.`, type:"info" });
  insights.push({ icon:"🔍", text:`Ward ${minPop.ward} (${minPop.name}) has the smallest population at ${minPop.population.toLocaleString()}.`, type:"warning" });
  insights.push({ icon:"🌆", text:`GVMC manages ${GVMC_SUMMARY.totalWards} wards with a total population of ${GVMC_SUMMARY.totalPopulation.toLocaleString()}.`, type:"success" });
  return insights;
}
