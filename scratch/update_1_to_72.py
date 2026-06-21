import json
import os

NEW_WARD_AREAS = {
    1: [
        "Gudivada Bridge", "Gosthani River", "Vasantha Vihara Layout", "Srinagar Colony",
        "Chittivalasa village", "Bogu Road Junction", "Bheemili-Tagarapuvalasa Road",
        "Ambedkar Junction", "Rajaveedhi Road", "Gandhi Statue Junction",
        "National Highway 16", "Kondapeta Colony"
    ],
    2: [
        "Chittivalasa Peddacheruvu", "Nammivanipeta Road", "Sangivalasa Village", "LP No. 45/2016",
        "Dekkatipalem Junction", "Mamidipalem Road", "Kummaripalem Road", "Pasi vari Ballalu",
        "Valandapeta", "Tagarapuvalasa", "Gosthani River", "NH-16", "Ramannapeta Junction",
        "Gandhi Statue Junction", "Rajaveedhi Road Junction", "Ambedkar Junction",
        "Tagarapuvalasa-Bheemili Road", "Jeerupeta Road Junction", "Sukhibhava Layout"
    ],
    3: [
        "Bheemili-Tagarapuvalasa Road", "Rayipalem", "Rajalingupeta", "Dekkatipalem Road",
        "Bank Colony", "Tagarapuvalasa", "Aishwarya Venkateswara Swamy Temple", "Gosthani River",
        "Bay of Bengal", "Lighthouse", "Beach Road", "Bheemili Bus Stand", "Commissioner's Bungalow",
        "Appikonda Secretariat Street", "Nehru Street", "Bank Road", "Pavurala Konda",
        "Kummaripalem", "Sangivalasa", "Shalom Degree College", "Dumping Yard", "Mamidipalli Road",
        "Nammivanipalem Road", "LP No. 45/2016", "Nammivanipeta Road", "Pedda Cheruvu",
        "Boggu Road-Jeerupeta junction"
    ],
    4: [
        "Lighthouse", "Bay of Bengal", "INS Kalinga", "Nidigattu Road", "Nidigattu village",
        "Kothavalasa Village", "Sangivalasa", "Kummaripalem", "Pavurala Konda", "Bank Road",
        "Nehru Street", "Appikonda Street Secretariat", "Commissioner's Quarters"
    ],
    5: [
        "INS Kalinga Road Junction", "Bay of Bengal", "Chepaluppada", "K. Nagarapalem",
        "Kapuluppada village", "Nidigattu village", "Nerellavalasa village", "Nidigattu Road",
        "INS Kalinga"
    ],
    6: [
        "Paradesipalem Village", "Kapuluppada dumping yard road", "NH-16", "Marikavalasa junction",
        "Kommadi junction", "Madhurawada junction", "Sai priya layout 100'-00\" road", "TIDCO houses",
        "PM Palem", "Housing Board Colony Road", "Kambalakonda", "Sambuvanipalem village",
        "Boyapalem village", "Boyapalem junction"
    ],
    7: [
        "Dumping Yard road", "Paradesipalem", "PP-II colony", "Gayatri Medical College",
        "YSR Colony", "Madhurawada", "Shivashakthinagar", "Sri Lakshmi nagar",
        "Ayodhya nagar water tank", "Nagarampalem Gedda", "Nagarampalem Road",
        "Swatantranagar 60’-0\" road", "bottavanipalem road", "NH-16", "kommadi", "Marikavalasa"
    ],
    8: [
        "Madhurawada Village", "Bay of Bengal", "IT Sez circle Beach Road", "Sunny Isles",
        "Adithya Ocean Heights", "infosys junction", "IT Sez road", "Midhilapuri colony",
        "Altius heights", "Vikalangula colony", "Aditya towers", "RTC Depot road",
        "Moogadharamma Temple road", "Mallayyapalem village", "Nagarampalem Road",
        "Vambay colony", "Bharathnagar", "NGGOS colony road", "Durganagar road",
        "NH-16", "Chandrampalem", "APEPDCL office", "ShivaSakthi nagar", "Bottavanipalem road",
        "Swatantranagar", "Ayodhya nagar water tank", "Sri Laxmi Nagar road"
    ],
    9: [
        "Iconica City", "Sri Bhuneela Sametha Venkateswara Swamy Temple", "Sky Lounge",
        "Madhurawada village", "Dharmapuri Colony Road", "NH 16 Road", "Durganagar",
        "NGGOS Colony Road", "Bharat Nagar", "vambay Colony road", "Nagarampalem Road",
        "Mallayyapalem Village Road", "RTC Colony Road", "Mogadharamma Temple Road",
        "RTC Depot Road", "Aditya Towers", "Midhilapuri 100 Feet Road", "Altius villas",
        "IT Junction"
    ],
    10: [
        "IT Sez junction", "Aditya ocean heights", "Sunny Isles Villas", "Panorama Hills",
        "law college road", "Yendada", "NH-16", "Zoo park", "kambalakonda Reserve forest",
        "Housing Board Colony road", "PM Palem", "TIDCO houses", "Sai Priya 100 Feet Road",
        "Dharmapuri colony Road", "Madhurawada", "Sky lounge Apartments", "Iconic City"
    ],
    11: [
        "IT Sez circle beach road", "Bay of Bengal", "Peddarushikonda", "Chinarushikonda",
        "Sagarnagar", "visakhavalley road", "NH-16", "Visakhavalley junction", "Zoo park",
        "Yendada", "Law college road", "panorama hills"
    ],
    12: [
        "Bay of Bengal", "Visakha Valley School Road", "Beach Road", "Seethakonda coast",
        "JodugullaPalem coast", "Tenneti Park coast", "Chinagadili village", "Kailasagiri hill",
        "VMRDA Buddha Vanam", "NH-16", "Kailasagiri foot over Bridge", "Dairy Farm Junction",
        "Indira Gandhi Nagar", "Sri Rama Lakshmi Residency", "Damodara Residency",
        "Kambalakonda Eco Park"
    ],
    13: [
        "Kambalakonda Eco Park", "Indira Gandhi Nagar", "Damodara Residency", "Sri Rama Lakshmi Residency",
        "NH-16", "Old Dairy Farm Junction", "Hanumanthavaka Junction", "BRTS Road", "Pedagadili Junction",
        "Thotagaruvu Road", "Arava Lakshmi Function Hall", "Ravindranagar Road", "Chinagadili Village"
    ],
    14: [
        "Kambalakonda", "Ravindranagar", "Thotagaruvu Junction", "Balaji Nagar road",
        "Durgalamma Temple", "Ambedkar Junction", "Ambedkar Nagar", "S.T. Colony", "Chinagadili village"
    ],
    15: [
        "Kambalakonda Junction", "S.T. Colony", "Ambedkar Junction", "Balaji Nagar road",
        "Thotagaruvu Junction", "Pedagadili road", "BRTS road", "Arilova Last Bus Stop",
        "Shivaji Nagar junction", "Srikant Nagar", "Lakshmi Nagar Gedda", "Kanaka Durga Nagar Gedda",
        "Arilova bus road", "Yerra Durga Nagar", "Chinagadili village"
    ],
    16: [
        "Yerra Durga Nagar", "Kambalakonda Junction", "Kanaka Durga Nagar", "Arilova bus road",
        "Lakshmi Nagar gedda", "Srikant Nagar", "Shivaji Nagar junction", "BRTS road",
        "Deendayalapuram", "Simhachalam Hill", "Adavivaram", "Mudasaralova", "Darapalem village",
        "Mudasarlova"
    ],
    17: [
        "Hanumanthavaka Junction", "NH-16", "Simhachalam Hill", "Adavivaram", "Deendayalapuram",
        "BRTS 200-feet road", "Chinagadili Junction", "Pedagadili Junction"
    ],
    18: [
        "NH-16", "Adavivaram", "Simhachalam Hill", "Venkojipalem", "GVMC Primary School",
        "HB Colony Main Road", "HB Colony Last Bus Stop", "Krishna College Road", "Bhanu Nagar Road",
        "Bible Mission Saint Devadas Church", "A.S.R. Statue", "Seethammadhara Main Road"
    ],
    19: [
        "Bible Mission Church", "KRM Colony", "Sri Lakshmi Nilayam Apartments", "NTR Statue",
        "Krishna College Road", "Automotive Junction", "NH-16", "Maddilapalem", "Maddilapalem Depot",
        "Kakatiya Function Hall", "Chaitanya Nagar Gedda", "Dumping Yard", "Kalinga Function Hall",
        "HB Colony Main Road"
    ],
    20: [
        "MVV Presidency Apartments", "HB Colony Main Road", "GVMC Primary School",
        "Vidhya Royal Palms Apartment", "Venkojipalem", "NH-16", "Kanaka Durga Ammavari Temple",
        "Automotive Junction", "Anil Apartments", "NTR Statue", "KRM Colony", "Sri Lakshmi Nilayam Apartments",
        "Bible Mission Church", "Bhanu Nagar Road", "Krishna College Road", "HB Colony Last Bus Stop"
    ],
    21: [
        "MVP Sector-6", "Shiva Temple", "MVP VUDA Nursery", "Mahatma Gandhi Cancer Hospital Junction",
        "TTD 60 Feet Road", "MVP Rythu Bazaar Circle", "Adarsh Nagar", "Ushodaya Junction",
        "Ramalakshmi Apartment", "Shivaji Park Road", "NH-16", "Isukathota Junction",
        "Venkojipalem", "Kailasagiri Foot Over Bridge", "North Star Apartment", "Medicover Hospital",
        "Anjayya Nagar", "Srividya Paradise Apartment", "MVP Sector-2"
    ],
    22: [
        "Kailasagiri Ropeway Junction", "Beach Road", "MVP Colony Double Road", "MVP Rythu Bazaar Circle",
        "MVP Cancer Hospital Junction", "VUDA Nursery", "Shiva Temple", "Venkojipalem Junction",
        "Srividya Paradise Apartment", "Anjayya Nagar", "MVP Health Arena", "Buddha Vanam"
    ],
    23: [
        "Gadiraju Palace", "Beach Road", "Kurupam Circle", "Pedawaltair Junction", "Chinmayi Marg Junction",
        "Shivaji Park", "Ramalakshmi Apartment", "Ushodaya Junction", "AS Raja Ground"
    ],
    24: [
        "Slack Line Park", "Bay of Bengal", "All Ability Park", "Beach Road", "Gadiraju Palace",
        "AS Raja Ground", "Ushodaya Junction", "Adarsh Nagar", "MVP TTD Road", "MVP Rythu Bazaar Circle",
        "MVP Double Road", "A.S.R. Circle"
    ],
    25: [
        "Kurupam Circle", "Beach Road", "Park Hotel Junction", "A.U. Out Gate Road", "Siripuram Junction",
        "Dronam Raju Circle", "Karakachettu Polamamba Temple Road", "Visakha Eye Hospital Junction",
        "Pedda Waltair Junction"
    ],
    26: [
        "Peddha Waltair Junction", "Karakachettu Polamamba Temple Road", "Three Town Police Station",
        "AU North Campus Road", "AU Olympic Ground", "Isaac Newton Hostel Road", "AU International Hostel",
        "AU Alumini Hostel Road", "Chinna Polamamba Temple", "Krishna Temple Junction", "Rajiv Nagar Road",
        "NTR Statue", "Pithapuram Colony", "Maddilapalem Junction", "NH-16", "Shivaji Palem"
    ],
    27: [
        "AU North Campus", "Karakachettu Polamamba Temple Road", "Datta Island Junction", "VIP Road Junction",
        "Sampath Vinayaka Temple Road", "Asilametta Junction", "Rama Talkies Road", "Maddilapalem Junction",
        "Pithapuram Colony Road", "NTR Statue", "Rajiv Nagar Road", "Krishna Temple Junction",
        "Chinnapolamamba Temple", "AU International Hostel", "AU Alumni Hostel", "Isaac Newton Hostel",
        "AU Olympic Ground"
    ],
    28: [
        "Datta Island", "Waltair Main Road", "Agarwal Hospital Junction", "Kannayya Peta Road",
        "Singh Hotel Junction", "Municipal Road", "Old Central Jail Road", "Asilmetta Junction",
        "Sampath Vinayaka Temple Road"
    ],
    29: [
        "Park Hotel Junction", "Beach Road", "All Ability Park", "Bay of Bengal", "Oota Gedda",
        "RK Beach Bus Stop", "Swarna Ward", "Nowroji Road", "Pandimetta Junction", "Lodge Viswa Bhavan Junction",
        "Waltair Main Road", "Agarwal Hospital Junction", "Dronamraju Circle", "Chinna Waltair",
        "Siripuram Junction"
    ],
    30: [
        "Oota Gedda", "Bay of Bengal", "Swarna ward", "Naval Canteen Junction", "Gandhi Statue",
        "Naval Quarters", "Kotha Ammavaru Arch", "Jalarupeta Road", "Ramalayam Temple",
        "AVN College Road", "Ambedkar Statue", "Relliveedhi Road", "King George Hospital",
        "Collector Office Junction", "Krishna Mandir Junction", "Gokhale Road", "Nowroji Road",
        "Oota Gedda Slum Road"
    ],
    31: [
        "Oota Gedda slum", "Oota Gedda Slum Road", "Nowroji Road", "Gokhale Road", "Krishna Mandir Junction",
        "Collector Office Junction", "KGH Down Road", "Town Main Road", "Lepakshi Junction",
        "Jagadamba Junction", "Prakasaraopeta", "District Judge Court", "Municipal Office Road",
        "Singh Hotel Junction", "Kannayapeta Road", "Waltair Main Road", "Agarwal Hospital Junction",
        "Lodge Viswabhavan Road", "Pandhimetta Junction"
    ],
    32: [
        "Collector Office Junction", "Relliveedhi Road", "Jalaripeta Junction", "AVN College Down Road",
        "Town Main Road", "Poorna Market", "Turner Choultry", "KGH Down Road", "Lepakshi Junction"
    ],
    33: [
        "Naval Canteen Junction", "Bay of Bengal", "Fishing Harbour Road", "Chengalrao Peta Bazaar Road",
        "Chengalrao Peta", "Jamia Masjid Junction", "Chengalrao Peta Main Road", "AVN College Down Road",
        "AVN College Road", "Jalaripeta Junction", "Kothammavari Arch", "Ramalayam Temple"
    ],
    34: [
        "Fishing Harbour Petrol Bunk Junction", "Fishing Harbour", "Ice Factory Jetty Road",
        "Beach Road", "Kanchara Veedhi", "Hazrat Yaseen Baba Dargah", "Gosala Hospital",
        "Panja Junction", "Town Main Road", "Town Kotha Road", "AVN College Road",
        "AVN College Down Road", "AVN College Junction", "Chengalrao Peta Road",
        "Jamia Masjid", "Challavari Street"
    ],
    35: [
        "Jetty", "Bay of Bengal", "Over Head Water Tank", "Beach Road", "Soldier Peta Road",
        "Town Main Road", "Sadikhana", "One Town Police Station", "Rajavari Veedhi",
        "MVDM High School", "Lakshmi Talkies Junction", "STP Road", "Town Kotha Road",
        "Panja Junction", "VGH Hospital", "Kanchara Veedhi", "Hazrat Yaseen Baba Dargah"
    ],
    36: [
        "Rajavari Veedhi", "Town Main Road", "I Town Police Station", "Soldier Peta Road",
        "Sadikhana", "Beach Road", "Over Head Complex", "Venkateswara Temple", "Rose Hill",
        "harbour compound", "Railway Track", "Ferry Road Slum", "Chilakapeta Junction",
        "Lakshmi Talkies Road", "STP Road", "MVDM High School"
    ],
    37: [
        "Poorna Market Junction", "Town Main Road", "Town Kotha Road", "STP Road",
        "Lakshmi Talkies Junction", "Chilakapeta Junction", "Railway Track", "Seahorse Junction",
        "Ramakrishna Rythu Bazaar Junction", "Durgalamma Thalli Temple Road"
    ],
    38: [
        "Turner Chowlatry Junction", "Town Main Road", "Durgalamma Temple Road", "Purna Market Junction",
        "Durgalamma Thalli Temple Road", "Ramakrishna Rythu Bazaar Junction", "Port Road",
        "Gangula Gedda", "Bowdara Road", "75 Feet Road", "Dolphin Junction", "Police Barracks Road"
    ],
    39: [
        "Asilmetta Junction", "Municipal Office Road", "GVMC Office", "Old Jail Road Junction",
        "Prakasaraopeta", "Jagadamba Junction", "Police Barracks Road", "Turner Chowlatry Junction",
        "Dolphin Hotel Junction", "Leelamahal Junction", "Neelamma Vepa Chettu Road",
        "Neelamma Vepa Chettu Temple", "II Town Police Station Road", "Daba Gardens Road",
        "BSNL Office", "Ambedkar Circle", "LIC backside road", "Railway Station Road", "Sangam Sarat Junction"
    ],
    40: [
        "Vignana Bharathi School Junction", "Neelamma Vepachettu Road", "MGM School",
        "Leelamahal Junction", "Dolphin Junction Road", "Dolphin Junction", "Geeth Sangeeth Road",
        "Captain Ramarao Junction", "Allipuram Main Road", "Kummari Veedhi Junction", "Sri Kashyap School"
    ],
    41: [
        "Allipuram Junction", "Allipuram Main Road", "Captain Ramarao Junction", "Geeth Sangeeth Road",
        "Dolphin Junction", "75 Feet Road", "Gangula Gedda", "Bowdara Road", "Port Road",
        "Gnanapuram Road", "Convent Junction", "Railway Station Junction", "South Jail Road"
    ],
    42: [
        "Railway Exhibition Ground", "Railway New Colony Junction", "Rail Club Road",
        "Railway Station Road", "Rail Club Junction", "Railway Station Main Entrance",
        "South Jail Road", "Railway Reservation Counter Junction", "Convent Junction Road",
        "Ambedkar Circle Junction", "Wholesale Vegetable Market", "Yerri Gedda Junction",
        "Railway Track", "Port Quarters Road", "Pydithalli Ammavari Temple", "Thatichetlapalem Road"
    ],
    43: [
        "Sangam Sarat Junction", "LIC backside Road", "Ambedkar Circle Junction", "Daba Gardens Road",
        "II Town Police Station Road", "BSNL Office", "Neelamma Vepachettu Road", "Neelamma Vepachettu Temple",
        "Vignana Bharathi Junction", "Kummari Veedhi Road", "Sri Kashyap School", "Allipuram Main Road",
        "Kummari Veedhi Junction", "South Jail Road", "Allipuram Junction", "Railway Reservation Counter Junction",
        "Railway Station road", "Railway Station Main Entrance", "Dondaparthy Junction"
    ],
    44: [
        "Rama talkies HPCL Petrol bunk", "ramatalkies road", "Rama Talkies Junction", "Railway Station Road",
        "Asilmetta Junction", "RTC Complex", "mandavaripeta road", "railway new colony road",
        "Dondaparthy Junction", "Akkayyapalem Road", "Kummari Veedhi", "Gedda", "Nehru Bazar",
        "BVK College", "Seetampeta Road", "Yerri Gedda", "Regional eye hospital", "TB hospital"
    ],
    45: [
        "Kummari Veedhi Junction", "Yerri Gedda", "Akkayyapalem Road", "Erukamamba Temple",
        "railway new colony road", "Dondaparthy Junction", "mandavaripeta road", "Railway Station Road",
        "Rail Club Junction", "Thatichetlapalem Road", "Railway New Colony Junction"
    ],
    46: [
        "Akkayyapalem 80 Feet Road", "Vijaya Krishna residency", "Srinivas nagar street",
        "Railway new colony road", "Railway new colony junction", "Tatichetlapalem VIP road",
        "Tatichetlapalem 80 feet road"
    ],
    47: [
        "Srinivas Nagar", "srinivasanagar", "nandagirinagar", "APEPDCL office", "jagannadhapuram",
        "Akkayyapalem Main Road", "yerrigedda", "Yerrigedda", "Railway New Colony Road", "thatichetlapalem"
    ],
    48: [
        "NH-16", "akkayyapalem junction", "Shirdi Sai Temple", "akkayyapalem main road",
        "Muslim thatichetlapalem burial ground", "Jaggarao bridge", "yerrigedda", "APEPDCL Office",
        "substation", "Burial ground Jagannadhapuram", "Chekkudu Rai building", "Nadagiri Nagar",
        "Nandagiri Nagar Road", "Vadlamani Residency", "Ganesh Temple Road", "Temple Arch Entrance",
        "80 feet Road", "Ramachandra Nagar Road", "Rice Depo Road", "Lalitha Nilayam", "Sadhikhana Kalyana Mandapam"
    ],
    49: [
        "NH-16 Highway", "Gurudwara junction", "Seethammapeta main road", "sankaramatam Main road",
        "drain", "Akkayyapalem main road", "maharani parlour junction", "80 feet road"
    ],
    50: [
        "NH-16 Highway", "Satyam junction", "bullaya college road", "Apepdcl compound wall",
        "Reddy hospital road", "Seethammapeta main road", "Bvk college", "sankaramatam Main road",
        "Gurudwara junction"
    ],
    51: [
        "Natukulasaikrishna home", "NH-16", "KRM colony GEDDA", "Maddilpalem junction",
        "CMR central", "resapuvanipalem road", "Swarna bharathi indoor stadium", "AP state financial corporation",
        "Bulaya college road", "Dr. Lankapallibulayya college grounds", "old TB hospital area road",
        "Satyam junction", "TPT colony", "P&T colony", "Balayyasastri layout", "Ken foundation society",
        "Health home the GYM", "Maurya majesty", "Sri varahalakshminarasimha swamy nilayam",
        "seethammadhararaithu bazar road", "Alkapuribakey", "vuda complex", "JDS hospital road"
    ],
    52: [
        "ASR nagar", "80' wide master plan road", "Alluri Seetharamaraju statue", "GVMC shopping complex",
        "GVMC solid waste management centre", "Gedda", "KRM colony", "Seethammadhara Rythu Bazar road",
        "APEPDCL office", "GVMC water supply office", "N.M.C high school", "NH-16", "4th Town Police Station",
        "Seethammdhara North Extension road", "Giri pradakshana road"
    ],
    53: [
        "Bilal Colony", "ASR nagar", "Giri pradakshana road", "Seethammadhara North Extension road",
        "4th Town Police station road", "NH-16", "Sankaramattam road junction", "New Maharani Parlour",
        "Akkayyapalem 80’ wide road", "Akkayyapalem junction", "Vidyuthnagar lane road",
        "Visakha Sadan BARC guest house", "hill top"
    ],
    54: [
        "Simhachalam Devasthanam hill", "BARC Guest House", "Royal Ruchulu Restaurant", "NH-16",
        "NAD", "Vasudeva Nagar", "Thatichetlapalem", "Laxminarayanapuram", "MES compound wall",
        "Kailasapuram Bus Stop", "Inorbit Mall Junction Road", "Sri Nookambika Alayam", "Inorbit Mall",
        "Simhagiri Colony"
    ],
    55: [
        "Simhachalam Devasthanam Hill", "Simhagiri Colony", "Inorbit Mall Road Junction",
        "Sri Nook Ambika temple", "Kailasapuram Bus stop", "MES compound wall", "Laxminarayan Puram",
        "Vasudeva Nagar", "NH-16", "Shalon church", "Sanjeevayya colony", "Kasturinagar 02",
        "Madhusudhan nagar road", "Madhusudhan nagar Bus stop"
    ],
    56: [
        "Sanjeev Colony", "Logos Church", "NH-16", "Urvasi Junction", "Nanna Cell Point",
        "Indiranagar-5", "Peddakothuru", "Suresh Ram Nagar", "Ambedkar Nagar", "Sweepers Colony", "hilltop"
    ],
    57: [
        "Madhusudhan Nagar Bus Stop", "Police Colony Road", "Ambedkar Nagar", "Suresh Ram Nagar",
        "Peddakothuru", "Jawaharlal Nagar Road", "Jawaharlal Nagar", "Indira Nagar-01",
        "Bapuji Nagar UPHC", "Jai Bharat Nagar", "Srinivas Nagar", "Madhavadhara Narasimha Nagar Road",
        "CISF Quarters"
    ],
    58: [
        "Madhusudan nagar bus stop", "narasimhanagarmadhavadhara road", "Srinivasanagar",
        "jayabharatnagar road", "bapujinagarUPHC", "NH-16", "Nanna Cell point", "Indiranagar 5",
        "Government Polytechnic College", "Surya Nagar 1", "Anjaneya Swamy temple", "PR Gardens Road",
        "NGGOs Colony bus stop", "CISF quarters", "APEPDCL substation"
    ],
    59: [
        "APEPDCL substation", "NGGO’s colony", "CISF quarters", "NGGOs colony Bus stop",
        "PR Gardens road", "Anjaneya swamy temple", "Government polytechnic college", "NH-16",
        "Surya nagar-01", "Sai ram nagar road", "Varma complex", "AI Raheem square", "Hill top"
    ],
    60: [
        "Madhavadhara Hill Top", "East Park 60 Feet Road Junction", "Madhavadhara 60 Feet Road",
        "Prestige Showroom", "NH-16 Road", "Birla Junction", "Passport Office Road",
        "Murali Nagar Sector-8", "Bhaskar Residency"
    ],
    61: [
        "Madhavadhara Hill Top", "mekas green view apartment", "East Park junction",
        "Madhavadhara 80'00 road", "Ram Sai Parlour Junction", "raiwada water tank road",
        "NH-16 Road", "Marriot Junction", "NSTL boundary wall", "Green Meadows", "Electrical Substation"
    ],
    62: [
        "NH–16", "Sharada Gardens", "Sai Nagar Street", "Maharani Veedhi Ramalayam Temple",
        "Hussain Nagar Street", "ration depot", "Railway Quarters", "Mohaddin Garden Lane",
        "Masjid burial ground", "BRTS Road", "airport authority compound wall", "Sairam Nagar gedda",
        "Sri Nookambika Temple"
    ],
    63: [
        "NH–16", "5th Town Police Station", "Old ITI Road", "Sai Ganesh Welding Works",
        "Sri Ganesh Plywood House", "DTDC Express Building", "BRTS Road", "ITI Junction",
        "BRTS Marripalem Road", "Masjid burial ground", "Mohaddin Gardens", "Railway Quarters Road",
        "Hussain Nagar road", "Sai Nagar road", "Maharani Veedhi Ramalayam Temple", "Sharada Gardens"
    ],
    64: [
        "Dharmanagar", "NH-16", "Dharmanagar Arch Road", "Kancharapalem Mettu Road",
        "Mutyammaba Temple", "Kanchrapalem", "Kancharapalem BRTS Road", "Hamsa Honda Showroom",
        "Old ITI", "DTDC Express Building", "Old ITI Road", "Fifth Town Police Station"
    ],
    65: [
        "NH-16", "Sadhikhana Kalyana Mandapam", "Madarasa Building", "Rice Depo Road",
        "Ramachandra Nagar", "80 feet road", "thatichetlapalem 80 feet road junction",
        "railway Ground Gate", "Loco shed", "mutyalamma temple", "Dharmanagar Road",
        "Sri Kodandarama Temple", "Dharmanagar Inner Road", "Ambedkar Statue"
    ],
    66: [
        "Putchaladibba colony", "Pydimamba colony", "Tidco houses", "33kv Electric substation",
        "Railway track", "Dayanand Nagar", "Gavarakancharapalem Gedda", "Subash nagar",
        "GVMC primary school", "post office road", "BRTS road", "urvashi junction",
        "Kancharapalem Junction", "Kunchumamba temple", "Netaji bridge"
    ],
    67: [
        "Urvasi junction", "Gowrinagar Post Office road", "post office road", "GVMC primary School",
        "Gedda", "Railway track", "Railway quarters", "railway station road", "Railway Institute",
        "Railway Quarters road", "Railway Senior section Engineer’s Office", "Karasa major drain",
        "Karasa street road", "BRTS"
    ],
    68: [
        "NH-16", "Nookalamma temple", "Sampath residency", "backside of Rockdale school",
        "Gedda", "Krishna Nilayam", "APEPDCL office", "Airport Quarters", "BRTS road",
        "New Karasa Saibaba temple arch road", "K.A.N.Residency", "railway track", "Jindal Bhavan"
    ],
    69: [
        "Madhavadhara Hill top", "NSTL boundary", "NH-16 road", "NAD flyover", "railway track",
        "Kakani Nagar road", "Area Account Office", "Vinodh Nagar", "Viman Nagar Road",
        "Container Corporation Limited", "INS Dega Vihar", "Butchirajupalem", "Ambedkar street",
        "Sai ram and sivalayam temple", "Narva road", "Kallupakala Area", "BRTS road",
        "Susarala Colony street", "NSTL Double Road", "NSTL Road", "NAD Hospital",
        "Vishnu Priya Function Hall", "HDFC Bank road", "Bashyam school", "HNR Arcade",
        "NSTL Boundary wall", "Simhachalam hill"
    ],
    70: [
        "NSTL", "NSTL double road", "HNR Arcade", "Bhashyam School", "HDFC bank road",
        "Vishnu Priya function hall", "NAD hospital", "ST.Teras School", "Kallupakala Area",
        "railway bridge", "BRTS road", "Srinivas nagar road", "Bangaramma Thalli temple",
        "UPHC", "modhakondamma temple", "simhachalam hill"
    ],
    71: [
        "simhachalam hill", "Modhakondamma Temple", "Kumari Kalyana Mandapam", "NSTL road",
        "Laxmi nagar", "laxminagar road", "UPHC", "Bangaramma Temple", "Laxmi Nagar",
        "srinivasnagar road", "BRTS Road", "Railway Track", "Kothapalem underpass",
        "LG Polymers boundary", "Praise Prayer Church", "Raithu Bazar Road",
        "Gopalapatnam Petrol Bunk", "Simhachalam road", "APSRTC Depot"
    ],
    72: [
        "R.R.Venkatapuram Junction", "BRTS Road", "Rythu bazar road", "50 beds CHC Hospital",
        "Bapuji nagar slum", "LG Polymers", "kothapalem", "Ganesh Nagar Junction",
        "community toilets", "Kothapalem Main Road", "Bhagatsingh Nagar Fish Market",
        "kothapalem-Narava main road", "MES Pump House", "Megadri Gedda", "ANDHRA CEMENT FACTORY",
        "Banta Colony", "Padmanab Nagar School", "LG Polymers Ground", "LG Polymers Venkatapuram Road",
        "Venkatapuram Junction"
    ]
}

def main():
    mapping_path = 'ward_areas_mapping.json'
    print("Reading ward_areas_mapping.json...")
    with open(mapping_path, 'r', encoding='utf-8') as f:
        mapping = json.load(f)
    
    # We want to replace/overwrite the areas for wards 1 to 72.
    # Wards 73-120 should remain untouched.
    
    # Convert mapping to list of dict
    mapping_dict = {entry['ward']: entry for entry in mapping}
    
    for w, areas in NEW_WARD_AREAS.items():
        if w in mapping_dict:
            print(f"Replacing areas for Ward {w}...")
            mapping_dict[w]["areas"] = areas
        else:
            print(f"Adding new Ward {w}...")
            mapping_dict[w] = {"ward": w, "areas": areas}
            
    # Write back
    new_mapping = list(mapping_dict.values())
    with open(mapping_path, 'w', encoding='utf-8') as f:
        json.dump(new_mapping, f, indent=4, ensure_ascii=False)
    print("ward_areas_mapping.json updated successfully!")
    
    # Run generate_js_data.py
    print("Running generate_js_data.py...")
    os.system("python generate_js_data.py")
    
    # Copy generated ward_data.js to js/ward_data.js
    if os.path.exists("ward_data.js"):
        with open("ward_data.js", "r", encoding="utf-8") as src:
            code = src.read()
        with open("js/ward_data.js", "w", encoding="utf-8") as dst:
            dst.write(code)
        print("Copied ward_data.js to js/ward_data.js")

if __name__ == '__main__':
    main()
