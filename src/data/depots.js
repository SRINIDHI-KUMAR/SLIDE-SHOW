export const INITIAL_DEPOTS = [
  {
    id: 1,
    name: "Chennai Central Hub",
    region: "Tamil Nadu East Coast",
    code: "CHE-01-CENT",
    stockUnits: 48500,
    stockSkus: 1240,
    salesRevenue: 142800,
    salesVolume: 3840,
    dispatchUnits: 3790,
    fulfillmentRate: 98.7,
    pendingOrders: 50,
    urgentOrders: 12,
    stockDays: 12.6,
    otd: 98.4,
    stockPie: [58, 32, 10],
    hourlySales: [120, 190, 310, 480, 520, 450, 390, 410, 340, 260, 180, 190],
    hourlyDispatch: [100, 170, 290, 460, 510, 440, 380, 400, 330, 260, 170, 180],
    topSkus: [
      { name: "High-Grade Industrial Gear Oil 5L", sold: 840, stock: 4200, status: "Healthy" },
      { name: "Automotive Synthetic Coolant 1L", sold: 650, stock: 3100, status: "Healthy" },
      { name: "Heavy Duty Air Filter AF-90", sold: 420, stock: 1800, status: "Healthy" },
      { name: "Precision Ball Bearing 6204-2RS", sold: 390, stock: 950, status: "Attention" }
    ],
    orders: [
      { id: "DSP-8821", client: "Ashok Leyland Ennore", qty: "450 Units", val: "$14,200", status: "Dispatched", bay: "Bay A-02" },
      { id: "DSP-8822", client: "Hyundai Ancillary Org", qty: "320 Units", val: "$9,800", status: "Loading", bay: "Bay B-01" },
      { id: "DSP-8823", client: "TVS Motor Co Hosur", qty: "600 Units", val: "$22,400", status: "Ready to Ship", bay: "Bay A-04" },
      { id: "DSP-8824", client: "MRF Tyres Ambattur", qty: "180 Units", val: "$5,600", status: "Picking", bay: "Bay C-02" }
    ]
  },
  {
    id: 2,
    name: "Coimbatore Logistics Base",
    region: "Tamil Nadu Western Corridor",
    code: "CBE-02-WEST",
    stockUnits: 39200,
    stockSkus: 980,
    salesRevenue: 118400,
    salesVolume: 2950,
    dispatchUnits: 2910,
    fulfillmentRate: 98.6,
    pendingOrders: 40,
    urgentOrders: 8,
    stockDays: 13.2,
    otd: 97.9,
    stockPie: [52, 36, 12],
    hourlySales: [95, 140, 260, 390, 420, 380, 330, 340, 280, 210, 150, 155],
    hourlyDispatch: [90, 135, 250, 380, 415, 375, 320, 335, 275, 205, 145, 150],
    topSkus: [
      { name: "Textile Motor Belt 44-T", sold: 720, stock: 3600, status: "Healthy" },
      { name: "Pumping Shaft Assembly 2-HP", sold: 510, stock: 2400, status: "Healthy" },
      { name: "Foundry Mold Release Spray", sold: 340, stock: 1500, status: "Healthy" },
      { name: "CNC Tooling Inserts Box-10", sold: 290, stock: 780, status: "Attention" }
    ],
    orders: [
      { id: "DSP-8831", client: "LMW Textile Division", qty: "520 Units", val: "$18,500", status: "Dispatched", bay: "Bay A-01" },
      { id: "DSP-8832", client: "Pricol Automotive Unit", qty: "290 Units", val: "$8,900", status: "Dispatched", bay: "Bay B-03" },
      { id: "DSP-8833", client: "CRI Pumps Ganapathy", qty: "410 Units", val: "$13,400", status: "Loading", bay: "Bay A-03" },
      { id: "DSP-8834", client: "Texmo Industries", qty: "220 Units", val: "$7,200", status: "Picking", bay: "Bay C-01" }
    ]
  },
  {
    id: 3,
    name: "Hubli Junction Terminal",
    region: "North Karnataka Hub",
    code: "HBL-03-JUNCT",
    stockUnits: 34500,
    stockSkus: 890,
    salesRevenue: 98700,
    salesVolume: 2410,
    dispatchUnits: 2360,
    fulfillmentRate: 97.9,
    pendingOrders: 35,
    urgentOrders: 6,
    stockDays: 14.3,
    otd: 97.5,
    stockPie: [48, 38, 14],
    hourlySales: [80, 120, 210, 310, 350, 320, 280, 290, 240, 180, 120, 110],
    hourlyDispatch: [75, 115, 200, 305, 340, 310, 275, 285, 235, 175, 115, 105],
    topSkus: [
      { name: "Agri Tractor Engine Oil 15W40", sold: 610, stock: 2900, status: "Healthy" },
      { name: "Harvester Blade Assembly Std", sold: 380, stock: 1600, status: "Healthy" },
      { name: "High Pressure Hydraulic Hose", sold: 290, stock: 1100, status: "Healthy" },
      { name: "Rotavator Gear Set Heavy", sold: 180, stock: 450, status: "Attention" }
    ],
    orders: [
      { id: "DSP-8841", client: "TATA Hitachi Dharwad", qty: "380 Units", val: "$12,400", status: "Dispatched", bay: "Bay A-02" },
      { id: "DSP-8842", client: "Belgaum Hydraulics Ltd", qty: "240 Units", val: "$7,800", status: "Dispatched", bay: "Bay B-02" },
      { id: "DSP-8843", client: "South Western Rly Hubli", qty: "450 Units", val: "$16,200", status: "Loading", bay: "Bay A-01" },
      { id: "DSP-8844", client: "Kirloskar Ferrous", qty: "190 Units", val: "$6,100", status: "Ready to Ship", bay: "Bay C-03" }
    ]
  },
  {
    id: 4,
    name: "Cochin Maritime Depot",
    region: "Kerala Coastal Zone",
    code: "COK-04-MARI",
    stockUnits: 42000,
    stockSkus: 1100,
    salesRevenue: 136200,
    salesVolume: 3200,
    dispatchUnits: 3150,
    fulfillmentRate: 98.4,
    pendingOrders: 44,
    urgentOrders: 9,
    stockDays: 13.1,
    otd: 98.2,
    stockPie: [55, 33, 12],
    hourlySales: [100, 160, 280, 420, 460, 410, 360, 370, 310, 240, 160, 170],
    hourlyDispatch: [95, 150, 270, 410, 450, 400, 350, 360, 300, 235, 155, 165],
    topSkus: [
      { name: "Marine Anti-Corrosive Primer 20L", sold: 780, stock: 3800, status: "Healthy" },
      { name: "Synthetic Marine Grease Waterproof", sold: 590, stock: 2700, status: "Healthy" },
      { name: "Stainless Steel Fasteners Set M12", sold: 410, stock: 1700, status: "Healthy" },
      { name: "Cold Storage Insulation Sealant", sold: 310, stock: 820, status: "Attention" }
    ],
    orders: [
      { id: "DSP-8851", client: "Cochin Shipyard Dock", qty: "490 Units", val: "$16,800", status: "Dispatched", bay: "Bay A-01" },
      { id: "DSP-8852", client: "Vallarpadam ICTT Port", qty: "340 Units", val: "$11,200", status: "Dispatched", bay: "Bay B-01" },
      { id: "DSP-8853", client: "BPCL Kochi Refinery", qty: "580 Units", val: "$21,500", status: "Loading", bay: "Bay A-04" },
      { id: "DSP-8854", client: "SeaFood Exporters Corp", qty: "210 Units", val: "$6,900", status: "Ready to Ship", bay: "Bay C-02" }
    ]
  },
  {
    id: 5,
    name: "Vijayawada Transit Hub",
    region: "Andhra Coastal Corridor",
    code: "VJA-05-CORR",
    stockUnits: 36800,
    stockSkus: 940,
    salesRevenue: 104500,
    salesVolume: 2600,
    dispatchUnits: 2540,
    fulfillmentRate: 97.7,
    pendingOrders: 38,
    urgentOrders: 7,
    stockDays: 14.1,
    otd: 97.6,
    stockPie: [50, 36, 14],
    hourlySales: [85, 130, 230, 340, 370, 330, 290, 300, 250, 190, 130, 125],
    hourlyDispatch: [80, 125, 220, 330, 360, 320, 280, 290, 245, 185, 125, 120],
    topSkus: [
      { name: "Aqua Farm Aerator Motor 3HP", sold: 640, stock: 3100, status: "Healthy" },
      { name: "Commercial Fertilizer Spray Pkg", sold: 450, stock: 2100, status: "Healthy" },
      { name: "Heavy Duty PVC Drainage Valve", sold: 320, stock: 1400, status: "Healthy" },
      { name: "Diesel Genset Filter Kit 50KVA", sold: 240, stock: 620, status: "Attention" }
    ],
    orders: [
      { id: "DSP-8861", client: "APCRDA Logistics Center", qty: "410 Units", val: "$13,500", status: "Dispatched", bay: "Bay A-02" },
      { id: "DSP-8862", client: "Machilipatnam Port Supply", qty: "270 Units", val: "$8,600", status: "Dispatched", bay: "Bay B-02" },
      { id: "DSP-8863", client: "Guntur Tobacco Traders", qty: "360 Units", val: "$11,900", status: "Loading", bay: "Bay A-03" },
      { id: "DSP-8864", client: "Krishna Delta Agri Units", qty: "190 Units", val: "$5,800", status: "Picking", bay: "Bay C-01" }
    ]
  },
  {
    id: 6,
    name: "Hyderabad Mega Dispatch",
    region: "Telangana Capital Region",
    code: "HYD-06-MEGA",
    stockUnits: 51200,
    stockSkus: 1350,
    salesRevenue: 156300,
    salesVolume: 4100,
    dispatchUnits: 4050,
    fulfillmentRate: 98.8,
    pendingOrders: 56,
    urgentOrders: 14,
    stockDays: 12.4,
    otd: 98.6,
    stockPie: [62, 28, 10],
    hourlySales: [130, 210, 340, 520, 580, 490, 430, 450, 380, 290, 200, 210],
    hourlyDispatch: [120, 200, 325, 500, 565, 475, 420, 440, 370, 280, 195, 205],
    topSkus: [
      { name: "Pharma Cleanroom Gloves Sterile", sold: 920, stock: 4800, status: "Healthy" },
      { name: "Bio-Storage Sealed Container 50L", sold: 710, stock: 3500, status: "Healthy" },
      { name: "Electronics Grade Solder Flux", sold: 480, stock: 2200, status: "Healthy" },
      { name: "Aerospace Titanium Fastener Kit", sold: 360, stock: 920, status: "Attention" }
    ],
    orders: [
      { id: "DSP-8871", client: "Dr Reddy's Pharma Hub", qty: "540 Units", val: "$19,800", status: "Dispatched", bay: "Bay A-01" },
      { id: "DSP-8872", client: "Genome Valley Bio Center", qty: "380 Units", val: "$13,200", status: "Dispatched", bay: "Bay B-01" },
      { id: "DSP-8873", client: "HITEC City Data Center", qty: "620 Units", val: "$24,500", status: "Loading", bay: "Bay A-04" },
      { id: "DSP-8874", client: "Bharat Biotech Bollaram", qty: "250 Units", val: "$8,400", status: "Ready to Ship", bay: "Bay C-02" }
    ]
  },
  {
    id: 7,
    name: "Bangalore Express Terminal",
    region: "Karnataka Tech & Aero Corridor",
    code: "BLR-07-EXPR",
    stockUnits: 46800,
    stockSkus: 1290,
    salesRevenue: 148900,
    salesVolume: 3900,
    dispatchUnits: 3850,
    fulfillmentRate: 98.7,
    pendingOrders: 48,
    urgentOrders: 11,
    stockDays: 12.0,
    otd: 98.5,
    stockPie: [60, 30, 10],
    hourlySales: [125, 195, 320, 490, 540, 470, 410, 425, 360, 275, 190, 195],
    hourlyDispatch: [115, 185, 305, 475, 525, 455, 395, 415, 350, 265, 180, 190],
    topSkus: [
      { name: "Robotics Precision Servo Motor 400W", sold: 860, stock: 4400, status: "Healthy" },
      { name: "Aerospace Sealant High Temp 1L", sold: 670, stock: 3300, status: "Healthy" },
      { name: "Automated Conveyor Roller Set", sold: 440, stock: 1950, status: "Healthy" },
      { name: "Laser Optical Sensor Module", sold: 330, stock: 870, status: "Attention" }
    ],
    orders: [
      { id: "DSP-8881", client: "HAL Aerospace Division", qty: "510 Units", val: "$18,900", status: "Dispatched", bay: "Bay A-02" },
      { id: "DSP-8882", client: "Electronic City Tech Org", qty: "350 Units", val: "$11,800", status: "Dispatched", bay: "Bay B-03" },
      { id: "DSP-8883", client: "Peenya Industrial Tooling", qty: "590 Units", val: "$22,800", status: "Loading", bay: "Bay A-01" },
      { id: "DSP-8884", client: "BEML Defense Unit", qty: "230 Units", val: "$7,600", status: "Ready to Ship", bay: "Bay C-01" }
    ]
  }
];

export const NODE_POSITIONS = [
  { xPct: 6.67, yPct: 65.28, svgX: 80, svgY: 235 },
  { xPct: 20.83, yPct: 34.72, svgX: 250, svgY: 125 },
  { xPct: 35.00, yPct: 65.28, svgX: 420, svgY: 235 },
  { xPct: 50.00, yPct: 34.72, svgX: 600, svgY: 125 },
  { xPct: 65.00, yPct: 65.28, svgX: 780, svgY: 235 },
  { xPct: 79.17, yPct: 34.72, svgX: 950, svgY: 125 },
  { xPct: 93.33, yPct: 65.28, svgX: 1120, svgY: 235 }
];

export const SVG_SEGMENTS = [
  { id: 0, from: 0, to: 1, d: "M 80 235 C 168.4 235, 161.6 125, 250 125" },
  { id: 1, from: 1, to: 2, d: "M 250 125 C 338.4 125, 331.6 235, 420 235" },
  { id: 2, from: 2, to: 3, d: "M 420 235 C 513.6 235, 506.4 125, 600 125" },
  { id: 3, from: 3, to: 4, d: "M 600 125 C 693.6 125, 686.4 235, 780 235" },
  { id: 4, from: 4, to: 5, d: "M 780 235 C 868.4 235, 861.6 125, 950 125" },
  { id: 5, from: 5, to: 6, d: "M 950 125 C 1038.4 125, 1031.6 235, 1120 235" }
];
