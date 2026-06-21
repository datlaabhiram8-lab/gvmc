/**
 * Smart Ward Connect – Ward Boundary Polygons (Wards 73–120)
 *
 * Each entry is an array of {lat, lng} points forming a closed polygon
 * approximating the ward boundary. Coordinates are derived from:
 *   – Official ward centre coordinates (WARD_COORDINATES)
 *   – Known area/locality landmarks listed in the delimitation data
 *   – GVMC ward extent data (avg ward ~1–2 km²)
 *
 * Red stroke polygons are drawn on the ward location map for wards 73–120.
 */
const WARD_BOUNDARIES = {

  // ── WARD 73 – China Nadupuru / Gonthinavanipalem / Kailash Nagar ──
  73: [
    { lat: 17.762, lng: 83.218 },
    { lat: 17.764, lng: 83.228 },
    { lat: 17.759, lng: 83.235 },
    { lat: 17.752, lng: 83.233 },
    { lat: 17.748, lng: 83.225 },
    { lat: 17.751, lng: 83.216 },
    { lat: 17.757, lng: 83.213 },
    { lat: 17.762, lng: 83.218 }
  ],

  // ── WARD 74 – Dallivanipalem / Konavanipalem / Dayal Nagar ──
  74: [
    { lat: 17.731, lng: 83.239 },
    { lat: 17.734, lng: 83.249 },
    { lat: 17.729, lng: 83.254 },
    { lat: 17.722, lng: 83.251 },
    { lat: 17.719, lng: 83.242 },
    { lat: 17.723, lng: 83.236 },
    { lat: 17.728, lng: 83.235 },
    { lat: 17.731, lng: 83.239 }
  ],

  // ── WARD 75 – Pedagantyada / Patha Ayyannapalem / Neelapuvedhi ──
  75: [
    { lat: 17.692, lng: 83.259 },
    { lat: 17.695, lng: 83.269 },
    { lat: 17.689, lng: 83.274 },
    { lat: 17.681, lng: 83.271 },
    { lat: 17.678, lng: 83.262 },
    { lat: 17.682, lng: 83.254 },
    { lat: 17.688, lng: 83.252 },
    { lat: 17.692, lng: 83.259 }
  ],

  // ── WARD 76 – Bala Cheruvu / Korada / APHB Colony ──
  76: [
    { lat: 17.661, lng: 83.269 },
    { lat: 17.664, lng: 83.279 },
    { lat: 17.658, lng: 83.284 },
    { lat: 17.650, lng: 83.281 },
    { lat: 17.647, lng: 83.272 },
    { lat: 17.651, lng: 83.265 },
    { lat: 17.657, lng: 83.263 },
    { lat: 17.661, lng: 83.269 }
  ],

  // ── WARD 77 – Goruduvanipalem / Palikala Doddi / Nammi Doddi ──
  77: [
    { lat: 17.688, lng: 83.239 },
    { lat: 17.691, lng: 83.249 },
    { lat: 17.686, lng: 83.254 },
    { lat: 17.678, lng: 83.251 },
    { lat: 17.675, lng: 83.242 },
    { lat: 17.679, lng: 83.235 },
    { lat: 17.684, lng: 83.234 },
    { lat: 17.688, lng: 83.239 }
  ],

  // ── WARD 78 – Coast Guard Compound / CISF Quarters / Janata Colony ──
  78: [
    { lat: 17.691, lng: 83.229 },
    { lat: 17.694, lng: 83.238 },
    { lat: 17.689, lng: 83.243 },
    { lat: 17.681, lng: 83.240 },
    { lat: 17.678, lng: 83.231 },
    { lat: 17.682, lng: 83.223 },
    { lat: 17.688, lng: 83.222 },
    { lat: 17.691, lng: 83.229 }
  ],

  // ── WARD 79 – Sivaji Nagar / Gallavanipalem / Old Aganampudi ──
  79: [
    { lat: 17.696, lng: 83.224 },
    { lat: 17.699, lng: 83.234 },
    { lat: 17.694, lng: 83.239 },
    { lat: 17.686, lng: 83.236 },
    { lat: 17.683, lng: 83.227 },
    { lat: 17.687, lng: 83.219 },
    { lat: 17.693, lng: 83.218 },
    { lat: 17.696, lng: 83.224 }
  ],

  // ── WARD 80 – Tadi / Rajupalem / Gavarapalem ──
  80: [
    { lat: 17.702, lng: 83.229 },
    { lat: 17.705, lng: 83.239 },
    { lat: 17.700, lng: 83.244 },
    { lat: 17.692, lng: 83.241 },
    { lat: 17.689, lng: 83.232 },
    { lat: 17.693, lng: 83.224 },
    { lat: 17.699, lng: 83.223 },
    { lat: 17.702, lng: 83.229 }
  ],

  // ── WARD 81 – GNT Road / Masjid Road / Kaspa Veedhi ──
  81: [
    { lat: 17.696, lng: 83.214 },
    { lat: 17.699, lng: 83.224 },
    { lat: 17.694, lng: 83.229 },
    { lat: 17.686, lng: 83.226 },
    { lat: 17.683, lng: 83.217 },
    { lat: 17.687, lng: 83.209 },
    { lat: 17.693, lng: 83.208 },
    { lat: 17.696, lng: 83.214 }
  ],

  // ── WARD 82 – Gandhi Nagar / Anjayya Colony / Income Tax St. ──
  82: [
    { lat: 17.701, lng: 83.204 },
    { lat: 17.704, lng: 83.214 },
    { lat: 17.699, lng: 83.219 },
    { lat: 17.691, lng: 83.216 },
    { lat: 17.688, lng: 83.207 },
    { lat: 17.692, lng: 83.199 },
    { lat: 17.698, lng: 83.198 },
    { lat: 17.701, lng: 83.204 }
  ],

  // ── WARD 83 – Mirayala Colony / ARC Quarters / Lakshmideipeta ──
  83: [
    { lat: 17.698, lng: 83.209 },
    { lat: 17.701, lng: 83.219 },
    { lat: 17.696, lng: 83.224 },
    { lat: 17.688, lng: 83.221 },
    { lat: 17.685, lng: 83.212 },
    { lat: 17.689, lng: 83.204 },
    { lat: 17.695, lng: 83.203 },
    { lat: 17.698, lng: 83.209 }
  ],

  // ── WARD 84 – Takasi Veedhi / Mallimadugula Vari Veedhi / Nagavamsam ──
  84: [
    { lat: 17.691, lng: 83.189 },
    { lat: 17.694, lng: 83.199 },
    { lat: 17.689, lng: 83.204 },
    { lat: 17.681, lng: 83.201 },
    { lat: 17.678, lng: 83.192 },
    { lat: 17.682, lng: 83.184 },
    { lat: 17.688, lng: 83.183 },
    { lat: 17.691, lng: 83.189 }
  ],

  // ── WARD 85 – Pharmacity Colony / Lemarthy Agraharam / Dibbapalem ──
  85: [
    { lat: 17.721, lng: 83.229 },
    { lat: 17.724, lng: 83.239 },
    { lat: 17.719, lng: 83.244 },
    { lat: 17.711, lng: 83.241 },
    { lat: 17.708, lng: 83.232 },
    { lat: 17.712, lng: 83.224 },
    { lat: 17.718, lng: 83.223 },
    { lat: 17.721, lng: 83.229 }
  ],

  // ── WARD 86 – Kurmannapalem / Vadlapudi / Uppara Colony ──
  86: [
    { lat: 17.686, lng: 83.179 },
    { lat: 17.689, lng: 83.189 },
    { lat: 17.684, lng: 83.194 },
    { lat: 17.676, lng: 83.191 },
    { lat: 17.673, lng: 83.182 },
    { lat: 17.677, lng: 83.174 },
    { lat: 17.683, lng: 83.173 },
    { lat: 17.686, lng: 83.179 }
  ],

  // ── WARD 87 – Vadlapudi (Post) / Kurmannapalem Part ──
  87: [
    { lat: 17.691, lng: 83.199 },
    { lat: 17.694, lng: 83.209 },
    { lat: 17.689, lng: 83.214 },
    { lat: 17.681, lng: 83.211 },
    { lat: 17.678, lng: 83.202 },
    { lat: 17.682, lng: 83.194 },
    { lat: 17.688, lng: 83.193 },
    { lat: 17.691, lng: 83.199 }
  ],

  // ── WARD 88 – Jaggarajupeta / Kapu Jaggarajupeta / Attavanipalem ──
  88: [
    { lat: 17.681, lng: 83.189 },
    { lat: 17.684, lng: 83.199 },
    { lat: 17.679, lng: 83.204 },
    { lat: 17.671, lng: 83.201 },
    { lat: 17.668, lng: 83.192 },
    { lat: 17.672, lng: 83.184 },
    { lat: 17.678, lng: 83.183 },
    { lat: 17.681, lng: 83.189 }
  ],

  // ── WARD 89 – Chandra Nagar / Adarsha Nagar / Surya Nagar ──
  89: [
    { lat: 17.676, lng: 83.199 },
    { lat: 17.679, lng: 83.209 },
    { lat: 17.674, lng: 83.214 },
    { lat: 17.666, lng: 83.211 },
    { lat: 17.663, lng: 83.202 },
    { lat: 17.667, lng: 83.194 },
    { lat: 17.673, lng: 83.193 },
    { lat: 17.676, lng: 83.199 }
  ],

  // ── WARD 90 – APSEB Colony / Butchiraijupalem / Enclave ──
  90: [
    { lat: 17.686, lng: 83.209 },
    { lat: 17.689, lng: 83.219 },
    { lat: 17.684, lng: 83.224 },
    { lat: 17.676, lng: 83.221 },
    { lat: 17.673, lng: 83.212 },
    { lat: 17.677, lng: 83.204 },
    { lat: 17.683, lng: 83.203 },
    { lat: 17.686, lng: 83.209 }
  ],

  // ── WARD 91 – Lakshmi Nagar (C & D Blocks) ──
  91: [
    { lat: 17.681, lng: 83.219 },
    { lat: 17.684, lng: 83.229 },
    { lat: 17.679, lng: 83.234 },
    { lat: 17.671, lng: 83.231 },
    { lat: 17.668, lng: 83.222 },
    { lat: 17.672, lng: 83.214 },
    { lat: 17.678, lng: 83.213 },
    { lat: 17.681, lng: 83.219 }
  ],

  // ── WARD 92 – Siva Devi / R.R.V.Puram / DO No. 14-7 ──
  92: [
    { lat: 17.671, lng: 83.209 },
    { lat: 17.674, lng: 83.219 },
    { lat: 17.669, lng: 83.224 },
    { lat: 17.661, lng: 83.221 },
    { lat: 17.658, lng: 83.212 },
    { lat: 17.662, lng: 83.204 },
    { lat: 17.668, lng: 83.203 },
    { lat: 17.671, lng: 83.209 }
  ],

  // ── WARD 93 – Naidu Thota / Vepagunta Post ──
  93: [
    { lat: 17.661, lng: 83.219 },
    { lat: 17.664, lng: 83.229 },
    { lat: 17.659, lng: 83.234 },
    { lat: 17.651, lng: 83.231 },
    { lat: 17.648, lng: 83.222 },
    { lat: 17.652, lng: 83.214 },
    { lat: 17.658, lng: 83.213 },
    { lat: 17.661, lng: 83.219 }
  ],

  // ── WARD 94 – Gangiredla Colony / Anjaneyulu Nagar / Appalanarasimham Colony ──
  94: [
    { lat: 17.651, lng: 83.229 },
    { lat: 17.654, lng: 83.239 },
    { lat: 17.649, lng: 83.244 },
    { lat: 17.641, lng: 83.241 },
    { lat: 17.638, lng: 83.232 },
    { lat: 17.642, lng: 83.224 },
    { lat: 17.648, lng: 83.223 },
    { lat: 17.651, lng: 83.229 }
  ],

  // ── WARD 95 – Chinnamusidiwada / Pendurthi / MES Layout ──
  95: [
    { lat: 17.671, lng: 83.199 },
    { lat: 17.674, lng: 83.209 },
    { lat: 17.669, lng: 83.214 },
    { lat: 17.661, lng: 83.211 },
    { lat: 17.658, lng: 83.202 },
    { lat: 17.662, lng: 83.194 },
    { lat: 17.668, lng: 83.193 },
    { lat: 17.671, lng: 83.199 }
  ],

  // ── WARD 96 – Pendurthi Old Village / Telakalaveedhi / Z.P. HS area ──
  96: [
    { lat: 17.651, lng: 83.189 },
    { lat: 17.654, lng: 83.199 },
    { lat: 17.649, lng: 83.204 },
    { lat: 17.641, lng: 83.201 },
    { lat: 17.638, lng: 83.192 },
    { lat: 17.642, lng: 83.184 },
    { lat: 17.648, lng: 83.183 },
    { lat: 17.651, lng: 83.189 }
  ],

  // ── WARD 97 – Chinnamusidiwada / Kranthi Nagar ──
  97: [
    { lat: 17.691, lng: 83.199 },
    { lat: 17.694, lng: 83.209 },
    { lat: 17.689, lng: 83.214 },
    { lat: 17.681, lng: 83.211 },
    { lat: 17.678, lng: 83.202 },
    { lat: 17.682, lng: 83.194 },
    { lat: 17.688, lng: 83.193 },
    { lat: 17.691, lng: 83.199 }
  ],

  // ── WARD 98 – Simhachalam / Appannapalem / Varam ──
  98: [
    { lat: 17.681, lng: 83.169 },
    { lat: 17.684, lng: 83.179 },
    { lat: 17.679, lng: 83.184 },
    { lat: 17.671, lng: 83.181 },
    { lat: 17.668, lng: 83.172 },
    { lat: 17.672, lng: 83.164 },
    { lat: 17.678, lng: 83.163 },
    { lat: 17.681, lng: 83.169 }
  ],

  // ── WARD 99 – Thunglam Railway Gate / Wagon Repair Workshop / Steel Plant track ──
  99: [
    { lat: 17.681, lng: 83.149 },
    { lat: 17.684, lng: 83.159 },
    { lat: 17.679, lng: 83.164 },
    { lat: 17.671, lng: 83.161 },
    { lat: 17.668, lng: 83.152 },
    { lat: 17.672, lng: 83.144 },
    { lat: 17.678, lng: 83.143 },
    { lat: 17.681, lng: 83.149 }
  ],

  // ── WARD 100 – VSEZ Outgate / Satthammathalli Temple / Kapu Jaggarajupeta Road ──
  100: [
    { lat: 17.701, lng: 83.139 },
    { lat: 17.704, lng: 83.149 },
    { lat: 17.699, lng: 83.154 },
    { lat: 17.691, lng: 83.151 },
    { lat: 17.688, lng: 83.142 },
    { lat: 17.692, lng: 83.134 },
    { lat: 17.698, lng: 83.133 },
    { lat: 17.701, lng: 83.139 }
  ],

  // ── WARD 101 – Duvvada VSEZ Road / Fakeertakya Road ──
  101: [
    { lat: 17.691, lng: 83.129 },
    { lat: 17.694, lng: 83.139 },
    { lat: 17.689, lng: 83.144 },
    { lat: 17.681, lng: 83.141 },
    { lat: 17.678, lng: 83.132 },
    { lat: 17.682, lng: 83.124 },
    { lat: 17.688, lng: 83.123 },
    { lat: 17.691, lng: 83.129 }
  ],

  // ── WARD 102 – Aganampudi Revenue Village / Talarivanipalem / TIDCO ──
  102: [
    { lat: 17.688, lng: 83.109 },
    { lat: 17.691, lng: 83.119 },
    { lat: 17.686, lng: 83.124 },
    { lat: 17.678, lng: 83.121 },
    { lat: 17.675, lng: 83.112 },
    { lat: 17.679, lng: 83.104 },
    { lat: 17.685, lng: 83.103 },
    { lat: 17.688, lng: 83.109 }
  ],

  // ── WARD 103 – Visakhapatnam Steel Plant Arch / NH-16 / Steel Plant Main Road ──
  103: [
    { lat: 17.671, lng: 83.129 },
    { lat: 17.674, lng: 83.139 },
    { lat: 17.669, lng: 83.144 },
    { lat: 17.661, lng: 83.141 },
    { lat: 17.658, lng: 83.132 },
    { lat: 17.662, lng: 83.124 },
    { lat: 17.668, lng: 83.123 },
    { lat: 17.671, lng: 83.129 }
  ],

  // ── WARD 104 – KBR Pump House / Kanithi Road / Old Steel Plant Road ──
  104: [
    { lat: 17.631, lng: 83.159 },
    { lat: 17.634, lng: 83.169 },
    { lat: 17.629, lng: 83.174 },
    { lat: 17.621, lng: 83.171 },
    { lat: 17.618, lng: 83.162 },
    { lat: 17.622, lng: 83.154 },
    { lat: 17.628, lng: 83.153 },
    { lat: 17.631, lng: 83.159 }
  ],

  // ── WARD 105 – Yelamanchili Road / Steel Plant Admin / Trishna Grounds ──
  105: [
    { lat: 17.661, lng: 83.149 },
    { lat: 17.664, lng: 83.159 },
    { lat: 17.659, lng: 83.164 },
    { lat: 17.651, lng: 83.161 },
    { lat: 17.648, lng: 83.152 },
    { lat: 17.652, lng: 83.144 },
    { lat: 17.658, lng: 83.143 },
    { lat: 17.661, lng: 83.149 }
  ],

  // ── WARD 106 – Gajuwaka / Sabbavaram / Pendurthi Mandal ──
  106: [
    { lat: 17.671, lng: 83.089 },
    { lat: 17.674, lng: 83.099 },
    { lat: 17.669, lng: 83.104 },
    { lat: 17.661, lng: 83.101 },
    { lat: 17.658, lng: 83.092 },
    { lat: 17.662, lng: 83.084 },
    { lat: 17.668, lng: 83.083 },
    { lat: 17.671, lng: 83.089 }
  ],

  // ── WARD 107 – Koppaka Village / Rajupalem / Yeleru Canal ──
  107: [
    { lat: 17.701, lng: 83.019 },
    { lat: 17.704, lng: 83.029 },
    { lat: 17.699, lng: 83.034 },
    { lat: 17.691, lng: 83.031 },
    { lat: 17.688, lng: 83.022 },
    { lat: 17.692, lng: 83.014 },
    { lat: 17.698, lng: 83.013 },
    { lat: 17.701, lng: 83.019 }
  ],

  // ── WARD 108 – Sattamma Thalli Arch / GNT Road ──
  108: [
    { lat: 17.698, lng: 83.009 },
    { lat: 17.701, lng: 83.019 },
    { lat: 17.696, lng: 83.024 },
    { lat: 17.688, lng: 83.021 },
    { lat: 17.685, lng: 83.012 },
    { lat: 17.689, lng: 83.004 },
    { lat: 17.695, lng: 83.003 },
    { lat: 17.698, lng: 83.009 }
  ],

  // ── WARD 109 – Ambedkar Statue / Dasari Gedda Road / Chinna Ramaswamy Temple ──
  109: [
    { lat: 17.691, lng: 83.009 },
    { lat: 17.694, lng: 83.019 },
    { lat: 17.689, lng: 83.024 },
    { lat: 17.681, lng: 83.021 },
    { lat: 17.678, lng: 83.012 },
    { lat: 17.682, lng: 83.004 },
    { lat: 17.688, lng: 83.003 },
    { lat: 17.691, lng: 83.009 }
  ],

  // ── WARD 110 – Ellayya Canal Bridge / Lakshmidevi Peta / Ellayya Canal ──
  110: [
    { lat: 17.687, lng: 82.999 },
    { lat: 17.690, lng: 83.009 },
    { lat: 17.685, lng: 83.014 },
    { lat: 17.677, lng: 83.011 },
    { lat: 17.674, lng: 83.002 },
    { lat: 17.678, lng: 82.994 },
    { lat: 17.684, lng: 82.993 },
    { lat: 17.687, lng: 82.999 }
  ],

  // ── WARD 111 – Oota Canal / NTR Market Ring Road / Pillavari Veedhi ──
  111: [
    { lat: 17.697, lng: 83.006 },
    { lat: 17.700, lng: 83.016 },
    { lat: 17.695, lng: 83.021 },
    { lat: 17.687, lng: 83.018 },
    { lat: 17.684, lng: 83.009 },
    { lat: 17.688, lng: 83.001 },
    { lat: 17.694, lng: 83.000 },
    { lat: 17.697, lng: 83.006 }
  ],

  // ── WARD 112 – Golagam Revenue / Yeleru Canal / Yeleru Canal Culvert ──
  112: [
    { lat: 17.718, lng: 83.009 },
    { lat: 17.721, lng: 83.019 },
    { lat: 17.716, lng: 83.024 },
    { lat: 17.708, lng: 83.021 },
    { lat: 17.705, lng: 83.012 },
    { lat: 17.709, lng: 83.004 },
    { lat: 17.715, lng: 83.003 },
    { lat: 17.718, lng: 83.009 }
  ],

  // ── WARD 113 – Megadri Gedda Reservoir / Chintala Agraharam ──
  113: [
    { lat: 17.761, lng: 83.189 },
    { lat: 17.764, lng: 83.199 },
    { lat: 17.759, lng: 83.204 },
    { lat: 17.751, lng: 83.201 },
    { lat: 17.748, lng: 83.192 },
    { lat: 17.752, lng: 83.184 },
    { lat: 17.758, lng: 83.183 },
    { lat: 17.761, lng: 83.189 }
  ],

  // ── WARD 114 – Indrani Function Hall / BRTS Road / Purushothapuram ──
  114: [
    { lat: 17.781, lng: 83.209 },
    { lat: 17.784, lng: 83.219 },
    { lat: 17.779, lng: 83.224 },
    { lat: 17.771, lng: 83.221 },
    { lat: 17.768, lng: 83.212 },
    { lat: 17.772, lng: 83.204 },
    { lat: 17.778, lng: 83.203 },
    { lat: 17.781, lng: 83.209 }
  ],

  // ── WARD 115 – Pendurthi Village / Pulagalipalem Road / Mondi Banda ──
  115: [
    { lat: 17.801, lng: 83.199 },
    { lat: 17.804, lng: 83.209 },
    { lat: 17.799, lng: 83.214 },
    { lat: 17.791, lng: 83.211 },
    { lat: 17.788, lng: 83.202 },
    { lat: 17.792, lng: 83.194 },
    { lat: 17.798, lng: 83.193 },
    { lat: 17.801, lng: 83.199 }
  ],

  // ── WARD 116 – Ayyappaswamy Temple / Anandapuram Highway / Pulagalipalem Village ──
  116: [
    { lat: 17.811, lng: 83.189 },
    { lat: 17.814, lng: 83.199 },
    { lat: 17.809, lng: 83.204 },
    { lat: 17.801, lng: 83.201 },
    { lat: 17.798, lng: 83.192 },
    { lat: 17.802, lng: 83.184 },
    { lat: 17.808, lng: 83.183 },
    { lat: 17.811, lng: 83.189 }
  ],

  // ── WARD 117 – Pulagalipalem Road / Yerrakonda Reserve Forest / Simhapuri Colony ──
  117: [
    { lat: 17.791, lng: 83.189 },
    { lat: 17.794, lng: 83.199 },
    { lat: 17.789, lng: 83.204 },
    { lat: 17.781, lng: 83.201 },
    { lat: 17.778, lng: 83.192 },
    { lat: 17.782, lng: 83.184 },
    { lat: 17.788, lng: 83.183 },
    { lat: 17.791, lng: 83.189 }
  ],

  // ── WARD 118 – Simhadri Nagar / Simhachalam Hill / Simhachalam Depo ──
  118: [
    { lat: 17.771, lng: 83.199 },
    { lat: 17.774, lng: 83.209 },
    { lat: 17.769, lng: 83.214 },
    { lat: 17.761, lng: 83.211 },
    { lat: 17.758, lng: 83.202 },
    { lat: 17.762, lng: 83.194 },
    { lat: 17.768, lng: 83.193 },
    { lat: 17.771, lng: 83.199 }
  ],

  // ── WARD 119 – Gosala Junction / Simhachalam Road / Balaji Nagar ──
  119: [
    { lat: 17.761, lng: 83.199 },
    { lat: 17.764, lng: 83.209 },
    { lat: 17.759, lng: 83.214 },
    { lat: 17.751, lng: 83.211 },
    { lat: 17.748, lng: 83.202 },
    { lat: 17.752, lng: 83.194 },
    { lat: 17.758, lng: 83.193 },
    { lat: 17.761, lng: 83.199 }
  ],

  // ── WARD 120 – Kambalakonda Reserve Forest / BRTS Road / Adivivaram ──
  120: [
    { lat: 17.791, lng: 83.219 },
    { lat: 17.794, lng: 83.229 },
    { lat: 17.789, lng: 83.234 },
    { lat: 17.781, lng: 83.231 },
    { lat: 17.778, lng: 83.222 },
    { lat: 17.782, lng: 83.214 },
    { lat: 17.788, lng: 83.213 },
    { lat: 17.791, lng: 83.219 }
  ]

};
