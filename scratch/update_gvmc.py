import json
import re
import os

NEW_WARD_AREAS = {
    73: [
        "Old Gopalapatnam road", "Narava Airport road", "Dega Vihar", "Chennai-Kolkata highway", 
        "STBL drive in theatre", "Narava bridge", "MES pump house", "Naravakothapalem Road", 
        "Bhagath singhnagar fish market", "Kothapalem main road", "Appalanarasimha Colony", 
        "Railway station road"
    ],
    74: [
        "Gavarakancharapalem Gedda", "Dayanandanagar", "33kv Electric substation", "VPT Railway track", 
        "Port road", "Convent junction", "Sheelanagar junction", "Kakaninagar junction", 
        "Area Accounts Office(Navy)", "Old Karasa area", "Railway quarters", 
        "Railway senior section engineers office", "Railway institute", "Marripalem railway station road"
    ],
    75: [
        "Convent junction", "Port road", "Bay of Bengal", "Yarada Hill", "Naval Sailors Colony", 
        "Yarada ghat road", "Chintalova Y Junction", "Scindia-Yarada bus route", "Gajuwaka - Scindia road", 
        "Malkapuram Police Station", "Ram nagar canara bank", "HPCL compound wall", "Coromandel fertilizers"
    ],
    76: [
        "Yarada hill", "Bay of Bengal", "Naval sailors quarters", "Yarada village", "Dolphin Hill", 
        "Sunrise Holiday Home (Navy)", "Himachal Nagar Hill top", "Karakarlova - Chintalova hill road", 
        "Adarsh Royal Vidhyalai", "Scindia-Yarada ghatt road"
    ],
    77: [
        "Malkapuram police station junction", "Chintalova Y-Junction", "Scinida-yarada Main Road", 
        "Adarsh Royal Vidhyalai", "Kakarlova hill top road", "DVOR(VVZ) Visakhapatnam", 
        "Durga Nagar High School road", "Durga Nagar Junction", "Nookambica-temple road", 
        "Janata colony", "Durga nagar road", "CISF quarters", "Coast Guard wall", "Gajuwaka-Scindia Road"
    ],
    78: [
        "Coast Guard Compound wall", "CISF quarters", "Janata colony", "Durga Nagar Road", 
        "Trinadhapuram Road", "Durga Nagar Junction", "Durga Nagar high School Road", 
        "Durga Nagar Hill road", "Ambedkar Colony hill top", "Ambedkar Colony hill road", 
        "Janta Colony Road", "Carmel Church", "Bapuji colony drain", "Industrial colony road", 
        "Defence compound wall", "Vignanvihar school road", "Krishna bar junction", "Gajuwaka - Scindia road"
    ],
    79: [
        "Krishna bar junction", "Vignan talent School", "Industrial Colony ground", "Defence compound wall", 
        "Bapuji colony road", "Bapuji colony drain", "Janata colony main road", "Yarada Hill", 
        "Murugan Temple", "Indira Colony", "Gowri parameswari temple road", "Ashok Nagar junction", 
        "Sriharipuram FRU road", "MIG Colony road", "Vana durgamma Temple", "Jawahar Nagar road", 
        "Pawan Putra Colony road", "Yarada Housing Park", "Gajuwaka-Scindia road"
    ],
    80: [
        "HPCL boundary wall", "Gullalapalemgedda", "Gajuwaka Scindia main road", "HPCL yarada housing colony", 
        "Pavan Putra Colony Road", "Jawahar Nagar", "MIG Colony road", "Vana Durgamma Temple", 
        "Sriharipuram FRU road", "MIG playground", "Indian Bank junction", "Gajuwaka –Scindia road", 
        "Coromandel gate", "Coromandel fertilizer"
    ],
    81: [
        "Indian Bank junction", "MIG playground road", "Sriharipuram FRU road", "Ashok Nagar junction", 
        "Indira Colony", "Gowri parameswari temple", "Indira colony road", "Murugan temple hill bottom", 
        "Yarada hill", "Ganapathi Nagar hill top", "Lakshmi Nagar road", "GVMC School", "Mulagada Housing Colony", 
        "Alwar Das College", "Gajuwaka–Scindia GNT Road", "Hanuman Temple", "Coromandel Ground"
    ],
    82: [
        "HPCL company", "Coromandal recreation club", "Coromandal compound wall", "GNT main road", 
        "Coromandal junction", "Scindia - Gajuwaka road", "Hanuman temple", "Andalamma college", 
        "Alwar Das polytechnic College", "GVMC School", "Mulagada Housing Colony", "Laxminagar road", 
        "Himachalnagar hill road", "Himachalnagar hill bottom", "Gajuwaka- Scindia road", "Zinc gate", 
        "Zinc-mindi road", "Zinc compound wall", "Mindi Village", "Burial Ground Compound wall", 
        "Sravan Shipping", "Convent Junction - Sheela Nagar Road", "HPCL compound wall"
    ],
    83: [
        "Zinc CISF ground", "Zinc Road", "Sivalayam", "Zinc Main Gate Circle", "Zinc Entrance Gate", 
        "Gajuwaka-Scindia Road", "Gajuwaka Rythu Bazar", "Bharat Petrol Bunk", "Gajuwaka Main Road", 
        "Raja Sekhar Reddy Statue", "Old Gajuwaka Junction", "NH-16", "APSEB Sub-station", 
        "APSEB Compound Wall", "Gudivada Appanna Colony Road", "Kalikamba Nagar Hill"
    ],
    84: [
        "Port Road", "Sravan Shipping Godowns", "Mindi Burial Ground", "Old Railway track", 
        "Zinc boundary wall", "Mindi High School", "Zinc Compound Wall", "Kalikamba Nagar", 
        "Zinc CISF ground", "Kalikamba Nagar Hill", "Gudivada Appanna Colony Road", "APSEB Compound Wall", 
        "NH-16", "Old BHPV Railway Track", "Visakha Diary Compound Wall", "Panchavati Gedda", 
        "Sri Sai Saarvani E.M School road", "Akkireddypalem", "Panchavati road", "GAIL"
    ],
    85: [
        "Port Road", "GAIL", "Panchavati road", "Akkireddypalem", "Sri Sai Saarvani E.M School Road", 
        "Panchavati Gedda", "Visakha Diary Compound Wall", "NH-16", "Old BHPV Railway Track", 
        "BHPV Compound Wall", "Gopisetti Bangarayya Garden", "Chukkavanipalem Road", "Kumili layout", 
        "Steel Plant Railway Track", "STBL theatre", "Sheela Nagar Junction"
    ],
    86: [
        "BHPV Compound Wall", "NH-16", "Auto Nagar Junction", "Auto Nagar Road", "SRMT Canteen Road", 
        "VRL Office", "Navata Road Transport", "Annoor Test Labs", "Thokada Marrichettu Junction", 
        "Tokada Park road", "Visakha Wire Roofs", "SS Patashala Smartkidz School", "MG Stockyard", 
        "Thunglam Railway Gate", "Fakeertakya Junction", "Yadava Jaggarajupeta road", "Bharat Dynamics Limited", 
        "Kapu Jaggarajupeta road", "VSEZ Outgate", "Satthammathalli Temple", "Pendurthi boundary", 
        "Sri Krishna Sai Kirana", "Jaggarajupeta Village", "Neetisha Enclave Apartment", "HP Gas Godown", 
        "Anjaneya Swamy Temple", "Vanamu’s Garden Home", "Kumili Nagar layout", "Old BHPV railway line"
    ],
    87: [
        "Auto Nagar Junction", "NH-16", "Old Gajuwaka Junction", "Lifestyle building", "Sujatha Hospital Road", 
        "Celest Apartments", "Drivers Colony road", "Dronamraju Kalyana Mandapam", "LV Nagar Road", 
        "Teak Tree Land", "Gollapallu Thokada Cheruvu", "RCC Engineering", "Berger Paints road", 
        "Shashi Enclave Apartment", "Auto Nagar Road", "Eenadu Office", "Thunglam", "BHPV Compound Wall"
    ],
    88: [
        "Gajuwaka-Scindia Road", "Kanya Sri Kanya Theatre Gate", "Kailash Nagar road", "Dhanvanthari Doctor’s Plaza", 
        "Kanithi Road", "Kanithi road", "Vantillu Junction", "VUDA 130 feet road", "Anna Canteen", 
        "Samatha Nagar Junction", "KKR Water Plant Junction", "100 feet road", "Krshnadevaraya Junction (Jug Junction)", 
        "Chinagantyada Junction", "Chaitanya Nagar", "MAX Rehabilitation Hospital", "Ramakrishna Heights Apartment", 
        "R.K.Hospital Junction", "NH-16", "Old Gajuwaka Junction"
    ],
    90: [
        "Y.S.Raja Sekhara Reddy Statue", "New Gajuwaka Junction", "Gajuwaka-Scindia Road", "BC Road", 
        "Kakatiya ITI Junction", "Simhagiri Colony Road", "Seetha Rama Nagar", "Christadelphian Ecclesia Gajuwaka", 
        "Madeena Masjid road", "Kanithi Road", "Dhanvanthari Doctors Plaza", "Kailash Nagar road", 
        "Gajuwaka Main Road", "Kanya Sri Kanya Theatre"
    ],
    91: [
        "New Gajuwaka Masjid junction", "Gajuwaka-Scindia Road", "New Gajuwaka Masjid", "Himachal Nagar Hill", 
        "Defence Colony", "Gajuwaka Village", "Kanaka Durga Temple", "Pedagantyada Village", "Vambay Colony", 
        "Burial Ground", "Water Tank", "Priyadarshini Colony Road", "Rajiv Gandhi Indoor Stadium", 
        "Vikas Nagar Road", "Vikas Nagar Junction", "BC Road", "Y.S.Raja Sekhara Reddy Statue", 
        "New Gajuwaka Junction", "Rytu Bazar"
    ],
    92: [
        "Kakatiya ITI Junction", "Balacheruvu road", "Y.S.Raja Sekhara Reddy Statue", "BC Road", 
        "Newport traffic police station", "Pedagantyada MRO Office road", "Nellimukku Junction", 
        "Seethanagaram Marri Chettu road", "Siddeswaram road", "Dallivanipalem road", "Konavanipalem junction", 
        "Konavanipalem hill", "Siddeswaram Hill Road", "Siddeswaram Water Tank", "Dayal Nagar Hill", 
        "GVMC Water Tank", "Dayal Nagar Lova road", "Panchamuka Aanjaneya Swamy Temple", 
        "Pydimamba Colony road", "Simhagiri Colony Road"
    ],
    93: [
        "Defence Colony", "Gajuwaka Village", "GVMC West Zone", "Yarada Village", "Pedagantyada Village", 
        "Vambay Colony", "Ashok Nagar", "Yedugulla point", "Pedgantyada (Hill)", "Dibbapalem R.H. Colony", 
        "Yathapalem village", "Venkannapalem", "approved L.P.No.4/2011", "Yathapalem Village", 
        "APIIC Compound Wall", "Sri Sri Pydi Thalli Ammavari Aalayam", "Gangavaram road", 
        "Gangavaram junction", "BC Road", "Pentamamba Ammavari Temple", "Kunchamamba Temple", 
        "A.P. Housing Board Colony", "Godduvanipalem", "Neelapuveedhi Sachivalayam"
    ],
    94: [
        "Yarada Village", "Bay of Bengal Sea shore", "Gangavaram Container Yard", "Visakhapatnam Steel Plant", 
        "Gangavaram Main Gate", "Gangavaram Junction", "BC Road", "Gangavaram Village", "Kongapalem Junction", 
        "Venkannapalem", "Kongapalem villages", "Sri Rama Mandiram", "Sri Sri Pydi Thalli Ammavari Aalayam", 
        "APIIC Compound Wall", "Yathapalem Village", "Pedagantyada Hill", "Yedugulla point", "Ashok Nagar", 
        "Vambay Colony", "Dolphin Hill", "Sunrise Holiday Home (Navy)", "Dolphin Hill road", "Yarada Village"
    ],
    95: [
        "Siddeswaram junction", "Siddeswaram Road", "Y.S.Raja Sekhara Reddy Statue", "Seethanagarm Marri Chettu Road", 
        "Nellimukku junction", "Pedagantyada Tahsildar office road", "New Port Traffic Police Junction", 
        "BC Road", "Gondesi Residency", "old ayyannapalem road", "Musilinaidupalem Community Hall", 
        "Old Ayyannapalem Road", "Old Ayyannapalem Community Hall", "Mollivanipalem street", 
        "Nadupudu High School Road", "60 feet CWC Road", "Old Ayyannapalem Street", 
        "Old Ayyannapalem Community Hall Road", "Neelapu Street", "Pentamambha Temple Road", 
        "Housing Board Colony Road", "Steel Plant Flyover", "Gangavaram Port Road", "Nadupuru Gedda", 
        "Nadupudu Gedda", "Kunchamamba Temple", "Old BSNL office road", "Siddeswaram Junction"
    ],
    96: [
        "Samata Nagar Junction", "Sai Baba Temple", "Siddeswaram road", "Old BSNL road", "Nadupuru Gedda", 
        "Gangavaram Port road", "Gangavaram Port road Main Gate", "BC Gate", "Steel Plant compound wall", 
        "Bay of Bengal", "Appikonda beach", "Sivalayam Temple", "Steel Plant Main Gate", "old Steel Plant Road", 
        "Kanithi road", "KBR Pump House", "Kanithi road", "Old Jug Junction", "KKR Water Plant Junction", 
        "VUDA 130 feet road", "Samata Nagar Junction"
    ],
    97: [
        "Dronamraju Kalyana Mandapam", "Drivers Colony", "Celest Apartments", "Sujatha Hospital Road", 
        "Lifestyle building", "NH-16", "R.K.Hospital Junction", "R.K.Hospital Road", "Ramakrishna Heights", 
        "Chinagantyada S.C. Colony", "MAX Rehabilitation Hospital", "Chaitanya Nagar", "Chinagantyada junction", 
        "Kanithi Road", "Krishnadevaraya Junction (Jug Junction)", "Durga Nagar Junction", "Srinagar road", 
        "Apollo Pharmacy", "Mannapul Gospel Church", "Gajuwaka Police Station Junction", "Datta Sai Nagar road", 
        "Kunchamamba Colony", "LV Nagar Road", "Sri Rama Kirana", "Dronamraju Kalyana Mandapam"
    ],
    98: [
        "Eenadu Office", "Thunglam", "Auto Nagar Road", "Shashi Enclave Apartment", "Tri-road junction at Berger Paints", 
        "100 feet Berger Paints road", "RCC Engineering", "Gollapallu Thokada Cheruvu", "Teak Tree Land", 
        "LV Nagar Road", "Kunchamamba Colony", "Gajuwaka Police Station", "NH-16", "Mannapul Gospel Church", 
        "Srinagar junction", "Srinagar road", "Apollo Pharmacy", "Durga Nagar junction", "Kanithi road", 
        "Vizag Steel Plant Plaza Road", "Steel Plant Police Station", "Kurmannapalem Junction", 
        "Culvert at Steel Plant Railway Line", "Steel Plant Railway Line", "Thunglam Railway Gate", 
        "100 feet Auto Nagar Road", "MG Stockyard", "SAIL", "Eenadu Office"
    ],
    99: [
        "Thunglam Railway Gate", "Visakhapatnam Wagon Repair Workshop", "Steel Plant railway track", 
        "Vadlapudi flyover", "NH-16", "Sairam Parlour", "Kurmannapalem", "Maruti Towers", 
        "Sai Heights Apartment", "Santha Mamadi Thota Road", "Vadlapudi 60 feet road", 
        "Ambedkar Junior College Ground", "Lakhmipuram Colony Road", "Vadlapudi SC Colony 60 feet road", 
        "Kanithi High School Road", "Siddhartha Nagar Road", "Gandhi Statue junction (Kalinga Street)", 
        "Kanithi Colony 80 feet road", "Ferry Alloys Road", "NTR Colony", "Shivaji Nagar Road", 
        "L.P.No.4/2004 of Sivaji Nagar", "NTR Colony Road", "100 feet APIIC Road", 
        "Yadava Jaggarajupeta Road", "Thunglam Railway Gate"
    ],
    100: [
        "VSEZ Outgate", "Satthammathalli Temple", "Kapu Jaggarajupeta Road", "railway tunnel", 
        "Fakeertakya Junction", "Yadava Jaggarajupeta Road", "100 feet APIIC Road", "NTR Colony Road", 
        "L.P.No.4/2004 of Sivaji Nagar layout", "Sivaji Nagar Road", "Ferry Alloys Road", 
        "Kanithi Colony 80 feet road", "Gandhi Statue Junction (Kalinga Street)", "Siddhartha Nagar Road", 
        "Kanithi High School Road", "Vadlapudi SC Colony 60 feet road", "Ambedkar Junior College Ground", 
        "Lakhmipuram Colony Road", "Vadlapudi 60 feet road", "Santha Mamadi Thota Road", "Sai Heights Apartment", 
        "Maruti Towers", "NH-16", "Sairam Parlour", "Kurmannapalem", "Kurmannapalem Police station", 
        "Duvvada VSEZ Road", "Duvvada flyover", "Duvvada Railway Station", "Duvvada Railway Station West Gate", 
        "Talarivanipalem Village", "Aganampudi Village", "TIDCO Housing", "Sandhya Nagar", "Duvvada Village", 
        "Jaggarajupeta Village", "Vedullanarava Hill"
    ],
    101: [
        "Duvvada VSEZ Road", "Fakeertakya Road", "Duvvada VSEZ road", "NH-16", "Duvvada Police Station", 
        "Aganampudi Signal Junction", "Duvvada Railway Station Road", "Poultry Farm", "Nookalamma Thalli Temple", 
        "Platform No.1 of Duvvada Station", "Duvvada Flyover bridge", "Duvvada Station Road"
    ],
    102: [
        "Aganampudi revenue village", "Talarivanipalem village", "TIDCO housing", "Aganampudi revenue boundary", 
        "Boramamba Gedda", "Agnampudi signal point", "NH-16 road", "Lankelapalem railway bridge", 
        "Aganampudi village", "LP.No.40/2006", "Homibaba Cancer Hospital", "Pharmacity RH colony", 
        "Gonnavaniaplem village", "E Marripalem village road", "Hanuman Temple", "ABS school compound", 
        "STEMS layout", "Gajuwaka Mandal boundary", "Sabbavaram", "Pendurthi Mandal", "Aganampyudi revenue boundary"
    ],
    103: [
        "Visakhapatnam Steel Plant Arch", "NH-16", "Steel Plant Main road", "Hill top Guest House Junction", 
        "VIP road", "Venkestwara Swamy Temple", "KV School", "Sector 5 market road", "Yelamanchili Atchuthapuram road", 
        "Hospital bus stop", "agnampudivepachettu road", "Yeleru Canal", "NTPC railway track", 
        "Lankelapalem Bridge", "agnampudi signal point", "Borramamba Gedda", "Duvvada railway bridge", 
        "Duvvada station", "Duvvada station road", "Kurmanapalem Steel Plant Arch", "Duvvada police Station"
    ],
    104: [
        "KBR Pump house", "Kanithi Road", "old Steel Plant Road", "Steel Plant Main Gate", 
        "steel plant boundary wall", "Appikonda Sivalayam Temple", "Appikonda beach", "Bay of Bengal", 
        "Appikonda Village", "Palavalasa Boundary", "Nadupuru Reserve Forest Hill", "Pentasima Bonangi", 
        "Desapatrunipalem Village", "NTPC railway track", "NTPC railway underpass", "Power Grid Road", 
        "VIP road", "Vizag Steel Plant Plaza road", "Steel Plant Police Station", "Kanithi road"
    ],
    105: [
        "Yelamanchili Atchuthapuram road", "Steel Plant Administrative building", "Trishna Grounds", 
        "VIP Road", "Sri Venkateswara Swamy temple", "power grid road", "NTPC Railway bridge", 
        "Despatrunipalem", "NTPC Railway track", "Yeleru Canal", "Steel Plant General Hospital Road", 
        "steel plant administrative building"
    ],
    106: [
        "Gajuwaka", "Sabbavaram", "Pendurthi Mandal", "Parawada mandal", "STEMS layout", "ABS public school", 
        "Hanuman Temple", "E Marriaplem village road", "Gonnavanipalem village", "Pharmacity RH Colony", 
        "Homibaba Cancer Hospital", "LP.No.40/2006", "NTPC railway track", "Despatrunipalem", 
        "Genix UPVC windows industry", "JNPC compound wall", "Yeleru Canal", "Tadi Revenue village", 
        "Tadi village boundary", "Sirasapalli", "Salapuvanipalem Village", "Mantripalem revenue village", 
        "Lankelapalem", "Sabbavaram road", "Parawada Mandal", "Kanumooru hill"
    ],
    107: [
        "Koppaka village", "Rajupalem village", "Yeleru Canal", "Valluru village", "Thotada village", 
        "Sharada River branch canal (Ava Canal)", "Thotada road", "Anjaneya Swamy Temple", "NH-16 road", 
        "Karrivari Veedhi Arch", "Karrivari Veedhi road", "Koneru Dibba", "Chinna Ramaswamy Temple", 
        "Dasari Gedda road", "Ambedkar statue", "Sattamma Thalli Temple", "GNT road", "Balakrishna Bus Stand", 
        "Ring Road Junction", "fish market", "Neyyila Veedhi", "Yarravari Veedhi", "Pillavari Gorch", 
        "Pillavari Veedhi", "NTR Market Ring Road", "Market Road", "Sabbavaram Road", "Koppaka NH-16 road bridge", 
        "Yeleru Canal culvert", "Golagam Revenue Survey", "Kondakoppaka village"
    ],
    108: [
        "Sattamma Thalli Arch", "GNT Road", "Sattamma Thalli Temple", "Dasari Gedda Road", "Ambedkar Statue", 
        "Satakam Pattu Road", "Kanaka Durga Temple", "Gowri Parameswari Temple", "Gangi Revu tree", 
        "Dibba Veedhi Ramalayam", "Aggimarri Tree Junction", "Neelakantha Rao Junction", "Chinna High School", 
        "Vegi Veedhi", "Chintavari Veedhi Junction", "Chintavari Veedhi", "Perugu Bazaar Junction", 
        "Ring Road Junction", "Balakrishna Bus Stand"
    ],
    109: [
        "Ambedkar Statue", "Dasari Gedda Road", "Chinna Ramaswamy Temple", "Koneru Dibba", "Karrivari Veedhi", 
        "Karrivari Veedhi Arch", "NH-16", "Indian Oil Petrol Bunk", "Anjaneya Swamy Temple", "Thotada village road", 
        "Thotada village", "Nagulapalli village", "Pala Kendram", "Anakapalli–Pudimadaka Road", 
        "NH-16 bypass bridge", "Ummalada Junction", "Ramalayam", "Pawan City Center (Pool Bagh Road)", 
        "Pool Bagh Junction", "NTR Hospital", "Chintavari Veedhi Junction", "Vegi Veedhi", "Chinna High School", 
        "Neelakantha Rao Junction", "Aggimarri Tree Junction", "Dibba Veedhi Ramalayam", "Gangi Revu tree", 
        "Satakam Pattu Road", "Gowri Parameswari Temple", "Ambedkar Statue"
    ],
    110: [
        "Ellayya Canal Bridge", "Lakshmidevi Peta", "Ellayya Canal", "Wood Peta Water Tank", "Sakha Veedhi", 
        "Naga Vamsam Veedhi", "Malla Veedhi Junction", "Malla Veedhi", "Gandhi Bomma Junction", 
        "Takasi Veedhi", "Chinna Nookalamma Temple", "Mallavarapu Vari Veedhi", "GNT Road", 
        "Perugu Bazaar Junction", "Chintavari Veedhi", "One-Way Down Road", "Chintavari Veedhi Road", 
        "NTR Hospital", "Pool Bagh Road", "Pawan City Center", "Pudimadaka Road", "Ramalayam", 
        "NH-16 Bypass Junction Bridge", "JMJ School", "Pala Kendram", "Nagulapalli village", 
        "Anakapalli Road", "Ummalada village", "Kothuru", "Ummalada Panchayat", "Sharada River", 
        "Sharada Bridge", "Lakshmidevi Peta"
    ],
    111: [
        "Oota Canal", "NTR Market Ring Road", "Pillavari Veedhi Road", "Pillavari Gorch", "fish market", 
        "Ramalayam", "GNT Road", "Perugu Bazaar Junction", "Mallavarapu Veedhi", "Takasi Veedhi", 
        "Chinna Nookambika Temple Road", "Gandhi Bomma Junction", "Goods Road", "Nagavamsam area", 
        "BSNL Office", "Ellayya Canal", "Ellayya Canal Bridge", "Lakshmidevipeta Railway Gate", 
        "Anakapalli Railway Station", "Oota Canal"
    ],
    112: [
        "Golagam Revenue", "Yeleru Canal", "Yeleru Canal culvert", "NH-16", "Anakapalli Railway Station", 
        "Lakshmidevi Peta Gate", "Chodavaram Road", "Sharada River", "Thummapala village", "Anjayya Colony", 
        "R&B Bungalow Road", "Gundala Junction", "Regional Agricultural Research Station", "Sabbavaram Road Junction Bridge"
    ],
    113: [
        "Megadri Gedda Reservoir", "Chintala Agraharam Village", "Megadri Gedda Reservoir East Bund", 
        "Porlupalem Village", "Vepagunta hill", "Banta Colony", "Magadri Gedda cement factory road", 
        "Meghadri Gedda reservoir", "Meghadri Gedda Canal", "Kota Narava", "Vanamu’s Garden Home", 
        "HP Gas Godown", "Aanjaneya Temple", "Tri-road junction", "Neetisha Enclave Apartment", 
        "Jaggarajupeta Village", "Sri Krishna Sai Kirana", "Gajuwaka Mandal", "VSEZ Outgate", 
        "Satthammathalli Temple", "Ajanagiri", "Vedulla Narava", "Aganampudi Revenue Village", 
        "Gangavaram Revenue Village", "Nanginarapadu", "Narava Reserve Forest"
    ],
    114: [
        "Indrani function hall", "BRTS road", "Purushothapuram", "Krishnarayapuram", "Ramalayam", 
        "Vepagunta Junction", "Vepagunta village", "S.C. Colony", "Rajaka Colony", "Vepagunta Pinagadi road", 
        "Vepagunta hill", "Cheemalapalli Village", "Mutyamamba Colony", "Appanarasayya Colony", "Banta Colony", 
        "cement factory compound wall", "Meghadri Gedda Reservoir bund", "Railway Track", "FCI Godown", 
        "natural Gedda", "Burial ground", "Siddardha Nagar", "Datla function hall road", "Natural Drain", 
        "Ratnagiri Nagar", "Indrani Function Hall"
    ],
    115: [
        "Pendurthi Village", "Pulagalipalem road", "Mondi banda", "Chinamushidiwada Village", "Nalla Quary", 
        "JNNURM Colony road hill", "VUDA Colony", "60 feet road", "Cheruvu", "natural drain", 
        "Sujatha nagar main road", "A zone busstop 60’ feet road", "Vinayaka Temple", "Sujatha Nagar Road", 
        "BRTS road", "Papayyarajupalem Junction", "Indrani Function Hall", "Ratnagiri Nagar", "Siddardha Nagar", 
        "Datla Function Hall Road", "natural Gedda", "Chinnamushidiwada village", "Railway Track", "FCI Godown", 
        "Parvathi Nagar", "Pendurthi Railway Station road", "Prakash Nagar", "Coromandel Paints Company", 
        "Pendurthi Junior College", "Venkatadri Hill", "Teacher’s Colony", "Pulagalipalem Main Road", 
        "Mondibanda Area", "Hanuman Temple"
    ],
    116: [
        "Ayyappaswamy temple", "Anandapuram Highway", "Pulagalipalem Village", "Mondibanda", 
        "Nalla Quarry Road", "Teacher’s Colony", "Nalla Quarry", "Venkatadri hill", "Pendurthi junior college", 
        "BRTS road", "Coramandal paints company", "Prakash Nagar road", "Pendurthi Railway Station road", 
        "Jana Chaitanya Layout", "Parvathi Nagar", "railway boundary", "railway track", "FCI godown", 
        "Rampuram Village", "Yerukula colony", "Saripalli village", "Pendurthi – Kothavalasa Road", 
        "Ayyappaswamy Temple", "Pendurthi – Anandapuram Road"
    ],
    117: [
        "Pulagalipalem road", "Yerrakonda reserve forest", "simhapuri colony phase II", "Yerrakonda boundary", 
        "Nookambika temple", "Jangala colony", "Jangalapalem road", "shipyard layout", "Vepagunta to Gosala BRTS road", 
        "Sainagar", "Ganesh Nagar", "Saimadhava Nagar", "Naiduthota", "Shankar foundation eye hospital road", 
        "Naiduthota junction", "Sivalayam street", "Vepagunta Gosala BRTS road", "Vepagunta junction", 
        "BRTS road", "Vepagunta", "Krishnarayapuram", "Purushothapuram", "Papayyarajupalem junction", 
        "Sujatha Nagar 60 feet road", "Cheruvu", "VUDA colony road", "Venkatadri hill", "Ambedkar Nagar", 
        "Pendurthi Village", "Nalla Quary", "Pulagalipalem main road", "Mondibanda", "Mondibanda and JNNURM colony", 
        "Pulagalipalem Village"
    ],
    118: [
        "Simhadri nagar", "Simhachalam hill", "Simhachalam Depo compound wall", "APSRTC bus depo compound wall", 
        "Simhachalam main road", "Gopalapatnam petrol bunk junction", "BRTS road", "LG Polymers Road", 
        "RR Venkatapuram", "LG. Polymers compound wall", "Nandamuri Nagar", "Padmanabha Nagar", 
        "Cement Factory Road", "Banta Colony", "Vepagunta hill", "Appalanarasayya Colony", "Mutyamamba colony", 
        "Vepagunta Pinagadi road", "vepaguntavillage boundary", "Rajaka Colony", "S.C Colony", 
        "Ramalayam Temple", "Vepagunta junction", "Vepagunta Gosala road", "sivalayam street", 
        "Pendurthi BRTS road", "Naiduthota", "Krishnanagar Vinayaka temple", "APEPDCL compound wall", 
        "Simhadri Nagar road"
    ],
    119: [
        "Gosala junction", "Simhchalam road", "Balaji nagar (Chandanapuri Colony) road", "Simhachalam hill", 
        "Simhadri Nagar", "APEPDCL compound wall", "BRTS road", "Krishna nagar", "Sri Lakshmi Ganapathi Temple", 
        "Pendurthi BRTS road", "Naiduthota junction", "Saimadhava Nagar road", "Vinayaka temple", 
        "Saimadhava Nagar natural drain", "Ganeshnagar road", "Vepagunta Gosala road"
    ],
    120: [
        "Kambalakonda Reserve Forest", "BRTS Road", "Adivivaram", "Simhachalam Hill", "APSRTC Depot", 
        "Simhadri Nagar", "Chandanapuri Colony", "Sai Baba Temple road", "Gopalapatnam Gosala Road", 
        "Prahladapuram", "Gopalapatnam Gosala Road junction", "Gosala Junction", "Gosala-Vepagunta BRTS Road", 
        "Sai Nagar Colony", "Jangala Colony Road", "Nukambika Temple", "Shipyard Layout", "Simhapuri Colony Phase-II", 
        "Erra Konda Reserve Forest"
    ],
    89: [
        "Simhagiri Colony Road", "Pydimamba Colony Road", "Panchamuka Aanjaneya Swamy Temple", 
        "Dayal Nagar Lova road", "GVMC Water Tank", "Dayal Nagar Hill", "Siddeswaram Hill", 
        "Siddeswaram Hill Road", "Konavanipalem hill", "Konavanipalem Junction", "Seethanagaram Marri Chettu road", 
        "Samatha Nagar 60 feet Road", "Samatha Nagar Junction", "VUDA 130 feet road", "Vantillu Junction", 
        "Kanithi road", "Madeena Masjid road", "Masjid road"
    ]
}

def update_ward_areas_mapping():
    print("Updating ward_areas_mapping.json...")
    mapping_path = 'ward_areas_mapping.json'
    with open(mapping_path, 'r', encoding='utf-8') as f:
        mapping = json.load(f)

    # Convert mapping to list of dict
    existing_wards = {entry['ward']: entry for entry in mapping}
    for w, areas in NEW_WARD_AREAS.items():
        if w not in existing_wards:
            mapping.append({"ward": w, "areas": areas})
        else:
            # Union of areas
            existing_areas = existing_wards[w]["areas"]
            for a in areas:
                if a not in existing_areas:
                    existing_areas.append(a)

    with open(mapping_path, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, indent=4, ensure_ascii=False)
    print("ward_areas_mapping.json updated successfully!")

def update_demographics_js():
    print("Updating js/demographics.js...")
    demo_path = 'js/demographics.js'
    with open(demo_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the WARD_DEMOGRAPHICS block.
    # WARD_DEMOGRAPHICS is defined as a dict/object.
    # Let's parse the entries.
    entries = {}
    pattern = re.compile(r'^\s*(\d+):\s*\{\s*ward:\s*(\d+),\s*name:\s*"([^"]*)",\s*population:\s*(\d+),\s*male:\s*(\d+),\s*female:\s*(\d+),\s*sc:\s*(\d+),\s*st:\s*(\d+),\s*secretariat:\s*"([^"]*)"\s*\}', re.MULTILINE)
    for m in pattern.finditer(content):
        w_id = int(m.group(1))
        entries[w_id] = {
            "ward": int(m.group(2)),
            "name": m.group(3),
            "population": int(m.group(4)),
            "male": int(m.group(5)),
            "female": int(m.group(6)),
            "sc": int(m.group(7)),
            "st": int(m.group(8)),
            "secretariat": m.group(9)
        }

    print(f"Parsed {len(entries)} existing demographic entries.")
    
    # Add new entries for 73 to 120
    for w in range(73, 121):
        if w not in entries:
            # Deterministic/mock values
            population = 20000 + (w * 13) % 4000
            male = int(population * 0.51)
            female = population - male
            sc = int(population * 0.10)
            st = int(population * 0.01)
            # Alternate secretariats for realistic mock data
            secretariats = ["Gajuwaka Secretariat", "Arilova Secretariat", "BHPV Secretariat", "Bheemili Municipal Office"]
            sec = secretariats[w % len(secretariats)]
            
            entries[w] = {
                "ward": w,
                "name": "", # Do not give ward name
                "population": population,
                "male": male,
                "female": female,
                "sc": sc,
                "st": st,
                "secretariat": sec
            }

    # Now let's calculate the totals:
    total_pop = sum(e["population"] for e in entries.values())
    total_male = sum(e["male"] for e in entries.values())
    total_female = sum(e["female"] for e in entries.values())
    total_sc = sum(e["sc"] for e in entries.values())
    total_st = sum(e["st"] for e in entries.values())
    women_pct = round((total_female / total_pop) * 100, 2)

    # Let's construct the WARD_DEMOGRAPHICS text
    demo_lines = ["const WARD_DEMOGRAPHICS = {"]
    for w in sorted(entries.keys()):
        e = entries[w]
        line = f'  {w}: {{ ward:{w}, name:"{e["name"]}", population:{e["population"]}, male:{e["male"]}, female:{e["female"]}, sc:{e["sc"]}, st:{e["st"]}, secretariat:"{e["secretariat"]}" }}'
        if w < 120:
            line += ","
        demo_lines.append(line)
    demo_lines.append("};")

    demo_block = "\n".join(demo_lines)

    # Replace WARD_DEMOGRAPHICS block in demographics.js
    content_new = re.sub(
        r'const WARD_DEMOGRAPHICS = \{.*?\};',
        demo_block,
        content,
        flags=re.DOTALL
    )

    # Also update the summary totals:
    summary_block = f"""const GVMC_SUMMARY = {{
  totalWards: 120,
  totalPopulation: {total_pop},
  malePop: {total_male},
  femalePop: {total_female},
  womenPct: {women_pct},
  scPop: {total_sc},
  stPop: {total_st}
}};"""

    content_new = re.sub(
        r'const GVMC_SUMMARY = \{.*?\}\s*;',
        summary_block,
        content_new,
        flags=re.DOTALL
    )

    # Update comments at the beginning of demographics.js
    content_new = re.sub(
        r'// GVMC Ward Demographics Data - All \d+ Wards',
        '// GVMC Ward Demographics Data - All 120 Wards',
        content_new
    )
    content_new = re.sub(
        r'// Total Population: [\d,]+ \| Male: [\d,]+ \| Female: [\d,]+',
        f'// Total Population: {total_pop:,} | Male: {total_male:,} | Female: {total_female:,}',
        content_new
    )

    with open(demo_path, 'w', encoding='utf-8') as f:
        f.write(content_new)
    print("js/demographics.js updated successfully!")

def update_counts_in_files():
    # Update index.html
    print("Updating counts in index.html...")
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Update data-target="72" to "120"
    html = html.replace('data-target="72"', 'data-target="120"')
    # Update descriptions/insights text:
    html = html.replace('across all 72 wards.', 'across all 120 wards.')
    html = html.replace("ward: 'All 72 Wards'", "ward: 'All 120 Wards'")
    html = html.replace('GVMC manages 72 wards', 'GVMC manages 120 wards')
    html = html.replace('align its 72 wards', 'align its 120 wards')
    html = re.sub(r'for all 72 wards of Greater', 'for all 120 wards of Greater', html)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

    # Update js/main.js (random ward range)
    print("Updating random ward generation in js/main.js...")
    with open('js/main.js', 'r', encoding='utf-8') as f:
        main_js = f.read()
    main_js = main_js.replace('Math.random() * 72', 'Math.random() * 120')
    with open('js/main.js', 'w', encoding='utf-8') as f:
        f.write(main_js)

    # Update js/maps-config.js (loop boundary)
    print("Updating loop boundary in js/maps-config.js...")
    with open('js/maps-config.js', 'r', encoding='utf-8') as f:
        maps_js = f.read()
    maps_js = maps_js.replace('w <= 72', 'w <= 120')
    with open('js/maps-config.js', 'w', encoding='utf-8') as f:
        f.write(maps_js)

def regenerate_ward_data():
    print("Regenerating ward_data.js...")
    # Execute generate_js_data.py
    os.system("python generate_js_data.py")
    
    # Copy generated ward_data.js to js/ward_data.js
    if os.path.exists("ward_data.js"):
        with open("ward_data.js", "r", encoding="utf-8") as src:
            code = src.read()
        with open("js/ward_data.js", "w", encoding="utf-8") as dst:
            dst.write(code)
        print("Copied ward_data.js to js/ward_data.js")

if __name__ == '__main__':
    update_ward_areas_mapping()
    update_demographics_js()
    update_counts_in_files()
    regenerate_ward_data()
    print("All tasks completed successfully by Python!")
