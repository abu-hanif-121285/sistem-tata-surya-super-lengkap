export type Crater = { x: number; y: number; r: number; o?: number };

export type VisualSpec = {
  kind: "sun" | "rocky" | "earth" | "banded" | "ice" | "moon" | "comet" | "asteroid";
  /** Warna utama (gradasi) */
  colors: string[];
  /** Frekuensi noise tekstur */
  freq?: number;
  /** Kekuatan pelengkungan pita (banded) */
  disp?: number;
  craters?: Crater[];
  /** Warna cahaya atmosfer / korona */
  glow?: string;
  ring?: boolean;
  bands?: string[];
  spot?: { x: number; y: number; rx: number; ry: number; color: string; ring?: string };
  cap?: boolean;
};

export type CelestialBody = {
  id: string;
  name: string;
  latin?: string;
  type: string;
  group: "bintang" | "planet-dalam" | "planet-luar" | "satelit" | "katai" | "kecil";
  order?: number;
  tagline: string;
  symbol?: string;
  facts: { label: string; value: string }[];
  desc: string[];
  highlights: string[];
  visual: VisualSpec;
  /** ukuran relatif untuk simulasi (px) */
  simSize: number;
  orbit?: { a: number; period: number };
};

/* ------------------------------------------------------------------ */
/*  MATAHARI                                                           */
/* ------------------------------------------------------------------ */
export const matahari: CelestialBody = {
  id: "matahari",
  name: "Matahari",
  latin: "Sun / Sol",
  type: "Bintang",
  group: "bintang",
  tagline: "Bintang induk dan pusat Tata Surya kita",
  symbol: "☀",
  facts: [
    { label: "Jenis benda langit", value: "Bintang (bintang deret utama tipe G2V)" },
    { label: "Diameter", value: "± 1.392.700 km (± 109 × diameter Bumi)" },
    { label: "Massa", value: "± 1.989 × 10³⁰ kg (333.000 × massa Bumi)" },
    { label: "Volume", value: "± 1,3 juta × volume Bumi" },
    { label: "Suhu permukaan (fotosfer)", value: "± 5.500 °C" },
    { label: "Suhu inti", value: "± 15.000.000 °C" },
    { label: "Suhu korona", value: "± 1 – 3 juta °C" },
    { label: "Jarak ke Bumi", value: "± 149.600.000 km (1 SA / 8 menit 20 detik cahaya)" },
    { label: "Komposisi gas", value: "± 73% hidrogen, ± 25% helium, sisanya unsur berat" },
    { label: "Periode rotasi", value: "± 25 hari (ekuator) – 35 hari (kutub)" },
    { label: "Usia", value: "± 4,6 miliar tahun" },
    { label: "Sumber energi", value: "Reaksi fusi nuklir: hidrogen → helium" },
  ],
  desc: [
    "Matahari adalah bintang, yaitu benda langit yang menghasilkan cahaya dan panasnya sendiri. Sebanyak 99,8% massa seluruh Tata Surya terkumpul di Matahari, sehingga gaya gravitasinya sangat besar dan mampu menahan planet-planet agar tetap mengelilinginya pada orbitnya masing-masing.",
    "Energi Matahari lahir dari intinya. Pada inti yang suhunya mencapai 15 juta derajat Celsius dan tekanannya sangat luar biasa, atom-atom hidrogen melebur menjadi helium (reaksi fusi nuklir). Sebagian massa yang hilang berubah menjadi energi yang merambat keluar dan akhirnya dipancarkan sebagai cahaya serta panas.",
    "Cahaya Matahari menempuh waktu ± 8 menit 20 detik untuk sampai ke Bumi. Artinya, cahaya yang kita lihat sekarang sebenarnya ditinggalkan Matahari lebih dari 8 menit yang lalu.",
  ],
  highlights: [
    "Lapisan dalam: inti (core), zona radiatif, dan zona konvektif.",
    "Lapisan atmosfer: fotosfer (permukaan yang tampak, ± 500 km tebal), kromosfer, dan korona (selubung cahaya tampak saat gerhana total).",
    "Bintik matahari (sunspot): daerah yang lebih gelap karena suhunya lebih rendah (± 3.800 °C).",
    "Prominensa: semburan gas panas berbentuk lengkungan raksasa dari fotosfer.",
    "Lonjakan matahari (flare): peledakan energi mendadak yang melempar partikel kecepatan tinggi.",
    "Angin matahari: aliran partikel bermuatan yang menyebabkan terjadinya aurora di daerah kutub.",
    "Manfaat bagi Bumi: sumber cahaya dan panas, penggerak siklus air dan angin, penguat fotosintesis, sumber energi terbarukan (panel surya), dan penentu waktu (siang–malam).",
  ],
  visual: {
    kind: "sun",
    colors: ["#fffbe8", "#ffe38a", "#ffb03a", "#ff7a18", "#e8480d"],
    freq: 0.05,
    glow: "#ffb43c",
  },
  simSize: 46,
};

/* ------------------------------------------------------------------ */
/*  PLANET                                                             */
/* ------------------------------------------------------------------ */
export const planets: CelestialBody[] = [
  {
    id: "merkurius",
    name: "Merkurius",
    latin: "Mercury",
    type: "Planet dalam (planet batuan)",
    group: "planet-dalam",
    order: 1,
    tagline: "Planet terkecil, tercepat, dan paling dekat dengan Matahari",
    symbol: "☿",
    facts: [
      { label: "Urutan dari Matahari", value: "Planet ke-1" },
      { label: "Diameter", value: "± 4.879 km (planet terkecil)" },
      { label: "Jarak dari Matahari", value: "± 57,9 juta km (0,39 SA)" },
      { label: "Periode revolusi", value: "88 hari Bumi" },
      { label: "Periode rotasi", value: "± 59 hari Bumi" },
      { label: "Suhu", value: "-180 °C (malam) sampai 430 °C (siang)" },
      { label: "Atmosfer", value: "Hampir tidak memiliki atmosfer (eksosfer sangat tipis)" },
      { label: "Satelit alam", value: "Tidak memiliki" },
      { label: "Ciri khas", value: "Permukaan penuh kawah seperti Bulan" },
    ],
    desc: [
      "Merkurius adalah planet terkecil sekaligus planet yang paling dekat dengan Matahari. Karena jaraknya yang dekat dan periode revolusinya singkat, Merkurius hanya memerlukan 88 hari untuk sekali mengelilingi Matahari. Nama planet ini diambil dari dewa Romawi yang berlari cepat.",
      "Merkurius hampir tidak memiliki atmosfer, sehingga tidak ada lapisan yang menahan panas. Akibatnya perbedaan suhu siang dan malamnya sangat ekstrem, bisa mencapai lebih dari 600 derajat Celsius. Permukaannya dipenuhi kawah akibat tumbukan benda angkasa karena tidak ada atmosfer yang melindungi.",
    ],
    highlights: [
      "Tidak punya atmosfer sehingga tidak dapat menahan panas dan tidak punya cuaca.",
      "Permukaannya berwarna abu-abu kecokelatan dan dipenuhi kawah besar.",
      "Tidak memiliki satelit alam maupun cincin.",
      "Hanya dikunjungi dua wahana antariksa: Mariner 10 dan MESSENGER, lalu BepiColombo.",
    ],
    visual: {
      kind: "rocky",
      colors: ["#b8b0a6", "#8e857b", "#6b6259", "#4a423c"],
      freq: 0.09,
      craters: [
        { x: 62, y: 42, r: 11, o: 0.45 },
        { x: 130, y: 78, r: 16, o: 0.4 },
        { x: 96, y: 128, r: 9, o: 0.5 },
        { x: 44, y: 104, r: 7, o: 0.35 },
        { x: 152, y: 130, r: 12, o: 0.3 },
        { x: 108, y: 30, r: 6, o: 0.4 },
        { x: 76, y: 158, r: 8, o: 0.35 },
      ],
    },
    simSize: 7,
    orbit: { a: 62, period: 88 },
  },
  {
    id: "venus",
    name: "Venus",
    latin: "Venus",
    type: "Planet dalam (planet batuan)",
    group: "planet-dalam",
    order: 2,
    tagline: "Planet terpanas yang dijuluki Bintang Kejora",
    symbol: "♀",
    facts: [
      { label: "Urutan dari Matahari", value: "Planet ke-2" },
      { label: "Diameter", value: "± 12.104 km (hampir sama dengan Bumi)" },
      { label: "Jarak dari Matahari", value: "± 108,2 juta km (0,72 SA)" },
      { label: "Periode revolusi", value: "± 225 hari Bumi" },
      { label: "Periode rotasi", value: "± 243 hari Bumi (berlawanan arah / retrograde)" },
      { label: "Suhu", value: "± 465 °C (planet terpanas)" },
      { label: "Atmosfer", value: "Sangat tebal, 96% karbon dioksida (CO₂)" },
      { label: "Satelit alam", value: "Tidak memiliki" },
      { label: "Ciri khas", value: "Efek rumah kaca ekstrem, tersinar paling terang di langit malam" },
    ],
    desc: [
      "Meskipun Merkurius lebih dekat dengan Matahari, planet terpanas justru Venus. Hal ini karena Venus memiliki atmosfer yang sangat tebal dan dipenuhi karbon dioksida. Gas tersebut menjebak panas sehingga suhunya bisa mencapai 465 °C, cukup untuk melelehkan timbal. Gejala ini disebut efek rumah kaca (greenhouse effect).",
      "Venus berotasi sangat lambat dan berlawanan arah dengan planet lain. Akibatnya, satu hari di Venus lebih lama daripada satu tahunnya, dan Matahari terbit dari barat. Di langit senja atau subuh, Venus tampak sebagai benda paling terang sehingga disebut Bintang Kejora (Venus bintang, bukan bintang sejati).",
    ],
    highlights: [
      "Atmosfer tebal menyebabkan tekanan udara di permukaan ± 90 kali tekanan di Bumi.",
      "Awan Venus tersusun dari tetesan asam sulfat yang memantulkan cahaya Matahari.",
      "Berotasi retrograde (dari timur ke barat).",
      "Dijuluki Morning Star dan Evening Star.",
      "Sudah dikunjungi Wahana Venera (Uni Soviet) dan Magellan (NASA).",
    ],
    visual: {
      kind: "banded",
      colors: ["#f6e3b8", "#e8c88f", "#d8ab6a", "#c4925a", "#e6cf9c"],
      bands: ["#fbeed0", "#e9c98e", "#d9ae72", "#f2ddad", "#c99a5f", "#efd6a3"],
      freq: 0.035,
      disp: 26,
      glow: "#f6dfae",
    },
    simSize: 11,
    orbit: { a: 86, period: 225 },
  },
  {
    id: "bumi",
    name: "Bumi",
    latin: "Earth",
    type: "Planet dalam (planet batuan)",
    group: "planet-dalam",
    order: 3,
    tagline: "Planet biru, satu-satunya planet yang dihuni makhluk hidup",
    symbol: "⊕",
    facts: [
      { label: "Urutan dari Matahari", value: "Planet ke-3" },
      { label: "Diameter", value: "± 12.742 km" },
      { label: "Jarak dari Matahari", value: "± 149,6 juta km (1 SA)" },
      { label: "Periode revolusi", value: "365¼ hari (365 hari 5 jam 48 menit 46 detik)" },
      { label: "Periode rotasi", value: "24 jam (23 jam 56 menit 4 detik)" },
      { label: "Suhu rata-rata", value: "± 15 °C (sangat ideal bagi kehidupan)" },
      { label: "Atmosfer", value: "78% nitrogen, 21% oksigen, argon, CO₂, uap air" },
      { label: "Satelit alam", value: "1, yaitu Bulan" },
      { label: "Kemiringan poros", value: "23,5° (penyebab pergantian musim)" },
      { label: "Permukaan", value: "± 71% air (samudra), ± 29% daratan" },
    ],
    desc: [
      "Bumi adalah satu-satunya planet yang diketahui memiliki kehidupan. Kehidupan dapat berlangsung karena Bumi memiliki air dalam bentuk cair, atmosfer yang mengandung oksigen, suhu yang tepat, dan lapisan ozon yang melindungi dari radiasi berbahaya sinar ultraviolet.",
      "Bumi berbentuk bulat pepat (geoid), yaitu bulat dengan bagian ekuator sedikit menonjol. Bumi memiliki lapisan dalam yaitu kerak bumi, selubung (mantel), dan inti (core). Di luar kerak terdapat atmosfer yang terbagi menjadi lapisan troposfer, stratosfer, mesosfer, termosfer, dan eksosfer.",
      "Bumi melakukan dua gerakan sekaligus, yaitu rotasi (perputaran pada porosnya selama 24 jam) dan revolusi (mengelilingi Matahari selama 365¼ hari). Kedua gerakan ini menimbulkan berbagai akibat penting bagi kehidupan, seperti siang–malam dan pergantian musim.",
    ],
    highlights: [
      "Satu-satunya planet dengan air cair dalam jumlah besar di permukaannya.",
      "Memiliki medan magnet yang melindungi dari angin matahari.",
      "Kemiringan poros 23,5° menyebabkan terjadinya pergantian musim.",
      "Memiliki 1 satelit alam, yaitu Bulan, yang menimbulkan pasang surut air laut.",
      "Dijuluki Blue Planet karena tampak biru dari angkasa.",
    ],
    visual: {
      kind: "earth",
      colors: ["#8fd3ff", "#2b7fd4", "#12488f", "#0a2a5e"],
      freq: 0.022,
      glow: "#7fc4ff",
      cap: true,
    },
    simSize: 12,
    orbit: { a: 114, period: 365 },
  },
  {
    id: "mars",
    name: "Mars",
    latin: "Mars",
    type: "Planet dalam (planet batuan)",
    group: "planet-dalam",
    order: 4,
    tagline: "Planet Merah, target utama misi penjelajahan manusia",
    symbol: "♂",
    facts: [
      { label: "Urutan dari Matahari", value: "Planet ke-4" },
      { label: "Diameter", value: "± 6.779 km (sekitar setengah Bumi)" },
      { label: "Jarak dari Matahari", value: "± 227,9 juta km (1,52 SA)" },
      { label: "Periode revolusi", value: "687 hari Bumi (± 1,88 tahun Bumi)" },
      { label: "Periode rotasi", value: "24 jam 37 menit" },
      { label: "Suhu", value: "-140 °C sampai 20 °C (rata-rata -63 °C)" },
      { label: "Atmosfer", value: "Sangat tipis, ± 95% karbon dioksida" },
      { label: "Satelit alam", value: "2, yaitu Phobos dan Deimos" },
      { label: "Ciri khas", value: "Berppermukaan merah karat karena tanah kaya besi oksida" },
    ],
    desc: [
      "Mars dikenal sebagai Planet Merah karena permukaannya mengandung banyak besi oksida (karat). Mars memiliki gunung tertinggi di Tata Surya bernama Olympus Mons yang tingginya mencapai 22 km, hampir tiga kali gunung Everest, dan ngarai raksasa Valles Marineris sepanjang 4.000 km.",
      "Mars memiliki atmosfer yang sangat tipis sehingga panas mudah lepas ke angkasa. Di kutubnya terdapat lapisan es air dan es karbon dioksida yang besarnya berubah-ubah mengikuti musim. Banyak bukti menunjukkan air pernah mengalir di Mars pada masa lalu, sehingga Mars menjadi target pencarian jejak kehidupan.",
    ],
    highlights: [
      "Memiliki 2 satelit alam berbentuk tidak beraturan: Phobos dan Deimos.",
      "Olympus Mons, gunung api tertinggi di Tata Surya (± 22 km).",
      "Angin badai debu kadang menutupi seluruh planet berbulan-bulan.",
      "Dijelajahi wahana Spirit, Opportunity, Curiosity, dan Perseverance.",
      "Periode rotasinya mirip Bumi, sehingga memiliki siang dan malam hampir sama panjang.",
    ],
    visual: {
      kind: "rocky",
      colors: ["#e8a273", "#cf7a4a", "#a8542f", "#6e3520"],
      freq: 0.04,
      craters: [
        { x: 70, y: 60, r: 14, o: 0.28 },
        { x: 132, y: 100, r: 20, o: 0.3 },
        { x: 92, y: 146, r: 10, o: 0.25 },
        { x: 46, y: 120, r: 8, o: 0.22 },
        { x: 110, y: 36, r: 9, o: 0.2 },
      ],
      cap: true,
    },
    simSize: 9,
    orbit: { a: 142, period: 687 },
  },
  {
    id: "jupiter",
    name: "Jupiter",
    latin: "Jupiter",
    type: "Planet luar (raksasa gas)",
    group: "planet-luar",
    order: 5,
    tagline: "Planet terbesar dengan Bintik Merah Raksasa",
    symbol: "♃",
    facts: [
      { label: "Urutan dari Matahari", value: "Planet ke-5" },
      { label: "Diameter", value: "± 139.820 km (11 × diameter Bumi)" },
      { label: "Jarak dari Matahari", value: "± 778,5 juta km (5,20 SA)" },
      { label: "Periode revolusi", value: "± 11,86 tahun Bumi" },
      { label: "Periode rotasi", value: "± 9 jam 56 menit (tercepat)" },
      { label: "Suhu", value: "± -145 °C di puncak awan" },
      { label: "Atmosfer", value: "Hidrogen dan helium (sama seperti Matahari)" },
      { label: "Satelit alam", value: "± 95 satelit, terkenal: Io, Europa, Ganymede, Callisto" },
      { label: "Ciri khas", value: "Planet terbesar dan Bintik Merah Raksasa (badai raksasa)" },
    ],
    desc: [
      "Jupiter adalah planet terbesar di Tata Surya. Massanya 2,5 kali gabungan massa seluruh planet lain. Jupiter termasuk planet raksasa gas yang tidak memiliki permukaan padat seperti Bumi; tubuhnya tersusun dari gas hidrogen dan helium yang makin padat ke dalam.",
      "Pita-pita warna pada Jupiter terbentuk dari awan yang bergerak sangat cepat ke arah berbeda. Bintik Merah Raksasa (Great Red Spot) adalah badai raksasa yang lebarnya lebih besar daripada Bumi dan telah berputar ratusan tahun. Karena rotasinya sangat cepat, Jupiter menjadi planet yang paling memipih (paling tidak bulat).",
    ],
    highlights: [
      "Empat satelit besar: Io (paling vulkanik), Europa (berlapis es, diduga ada lautan), Ganymede (satelit terbesar), dan Callisto.",
      "Ganymede lebih besar daripada planet Merkurius.",
      "Memiliki cincin yang sangat tipis dan samar.",
      "Berfungsi sebagai 'penyapu' komet dan asteroid karena gravitasinya sangat kuat.",
      "Dikunjungi wahana Voyager, Galileo, dan Juno.",
    ],
    visual: {
      kind: "banded",
      colors: ["#f4e0c1", "#d9b48a", "#b98a5c", "#e6cfae", "#a97a4e"],
      bands: [
        "#f7e8cd",
        "#d8b185",
        "#c49a6c",
        "#f0d9b4",
        "#a8733f",
        "#e8cda4",
        "#bd8f5f",
        "#f3e2c6",
        "#9c6a3c",
        "#dfc09a",
      ],
      freq: 0.02,
      disp: 22,
      spot: { x: 66, y: 128, rx: 26, ry: 13, color: "#b8492f", ring: "#e08a63" },
      glow: "#e6cba6",
    },
    simSize: 26,
    orbit: { a: 190, period: 4333 },
  },
  {
    id: "saturnus",
    name: "Saturnus",
    latin: "Saturn",
    type: "Planet luar (raksasa gas)",
    group: "planet-luar",
    order: 6,
    tagline: "Planet bercincin paling indah di Tata Surya",
    symbol: "♄",
    facts: [
      { label: "Urutan dari Matahari", value: "Planet ke-6" },
      { label: "Diameter", value: "± 116.460 km" },
      { label: "Jarak dari Matahari", value: "± 1.434 juta km (9,58 SA)" },
      { label: "Periode revolusi", value: "± 29,4 tahun Bumi" },
      { label: "Periode rotasi", value: "± 10 jam 42 menit" },
      { label: "Suhu", value: "± -178 °C" },
      { label: "Atmosfer", value: "Hidrogen dan helium" },
      { label: "Satelit alam", value: "± 146 satelit, terbesar: Titan dan Enceladus" },
      { label: "Ciri khas", value: "Cincin (ring) dari es dan batuan; massa jenis lebih kecil daripada air" },
    ],
    desc: [
      "Saturnus terkenal karena memiliki cincin (ring) yang sangat indah. Cincin itu tersusun dari miliaran bongkahan es dan batuan dengan ukuran dari sebutir pasir sampai sebesar sebuah rumah. Cincin tersebut sebenarnya sangat tipis, tebalnya hanya puluhan meter sampai beberapa kilometer.",
      "Saturnus adalah planet dengan massa jenis paling kecil, yaitu 0,7 g/cm³. Jika ada kolam yang cukup besar, Saturnus akan terapung di air. Satelit terbesarnya, Titan, memiliki atmosfer tebal dan danau metana cair, sedangkan Enceladus menyemburkan air dari bawah permukaan esnya.",
    ],
    highlights: [
      "Cincin utama dinamai A, B, C, D, E, F, dan G.",
      "Titan adalah satelit terbesar kedua di Tata Surya setelah Ganymede.",
      "Massa jenisnya lebih kecil daripada air (0,7 g/cm³).",
      "Wahana Cassini-Huygens meneliti Saturnus selama 13 tahun (2004–2017).",
      "Saturnus juga memiliki badai heksagonal (segi enam) di kutub utaranya.",
    ],
    visual: {
      kind: "banded",
      colors: ["#f7e6bb", "#e6cf9a", "#d3b578", "#efe0b6", "#c9a866"],
      bands: ["#f9edd0", "#e4cd96", "#d5b877", "#f2e3bb", "#c6a25f", "#eddcab", "#d0b573"],
      freq: 0.018,
      disp: 14,
      ring: true,
      glow: "#eddfae",
    },
    simSize: 22,
    orbit: { a: 240, period: 10759 },
  },
  {
    id: "uranus",
    name: "Uranus",
    latin: "Uranus",
    type: "Planet luar (raksasa es)",
    group: "planet-luar",
    order: 7,
    tagline: "Planet yang berputar miring seperti bola menggelinding",
    symbol: "♅",
    facts: [
      { label: "Urutan dari Matahari", value: "Planet ke-7" },
      { label: "Diameter", value: "± 50.724 km" },
      { label: "Jarak dari Matahari", value: "± 2.871 juta km (19,2 SA)" },
      { label: "Periode revolusi", value: "± 84 tahun Bumi" },
      { label: "Periode rotasi", value: "± 17 jam 14 menit (retrograde)" },
      { label: "Suhu", value: "± -224 °C (atmosfer terdingin)" },
      { label: "Atmosfer", value: "Hidrogen, helium, dan metana (pemberi warna biru kehijauan)" },
      { label: "Satelit alam", value: "± 28 satelit: Titania, Oberon, Miranda, Ariel, Umbriel" },
      { label: "Ciri khas", value: "Porosnya miring 98° sehingga tampak menggelinding" },
    ],
    desc: [
      "Uranus memiliki keunikan pada arah porosnya. Porosnya miring hampir 98 derajat, sehingga Uranus tampak berputar seperti bola yang menggelinding mengelilingi Matahari. Akibatnya, setiap kutub Uranus mengalami siang selama 42 tahun dan malam selama 42 tahun berikutnya.",
      "Warna biru kehijauan Uranus berasal dari gas metana di atmosfernya yang menyerap cahaya merah dan memantulkan cahaya biru-hijau. Uranus termasuk planet raksasa es karena di dalamnya terdapat banyak zat 'es' seperti air, amonia, dan metana di atas inti batuan.",
    ],
    highlights: [
      "Planet pertama yang ditemukan dengan teleskop (William Herschel, 1781).",
      "Memiliki 13 cincin yang tipis dan gelap.",
      "Atmosfer terdingin di Tata Surya, mencapai -224 °C.",
      "Berotasi retrograde dan hampir tidur terlentang.",
      "Hanya pernah dikunjungi satu wahana, yaitu Voyager 2 (1986).",
    ],
    visual: {
      kind: "ice",
      colors: ["#cdf3ee", "#9fe0dc", "#6fc7c9", "#4aa5b0"],
      freq: 0.012,
      disp: 8,
      ring: true,
      glow: "#a7e6e4",
    },
    simSize: 17,
    orbit: { a: 288, period: 30687 },
  },
  {
    id: "neptunus",
    name: "Neptunus",
    latin: "Neptune",
    type: "Planet luar (raksasa es)",
    group: "planet-luar",
    order: 8,
    tagline: "Planet terjauh dengan angin tercepat di Tata Surya",
    symbol: "♆",
    facts: [
      { label: "Urutan dari Matahari", value: "Planet ke-8" },
      { label: "Diameter", value: "± 49.244 km" },
      { label: "Jarak dari Matahari", value: "± 4.495 juta km (30,1 SA)" },
      { label: "Periode revolusi", value: "± 165 tahun Bumi" },
      { label: "Periode rotasi", value: "± 16 jam 6 menit" },
      { label: "Suhu", value: "± -214 °C" },
      { label: "Atmosfer", value: "Hidrogen, helium, metana (biru pekat)" },
      { label: "Satelit alam", value: "± 16 satelit, terbesar: Triton" },
      { label: "Ciri khas", value: "Angin tercepat, mencapai 2.100 km/jam" },
    ],
    desc: [
      "Neptunus adalah planet terjauh dari Matahari. Karena jaraknya sangat jauh, satu tahun di Neptunus setara dengan 165 tahun Bumi. Sejak ditemukan pada tahun 1846, Neptunus baru menyelesaikan satu kali revolusi pada tahun 2011.",
      "Neptunus dikenal karena anginnya yang paling kencang di Tata Surya, mencapai 2.100 km/jam, jauh lebih cepat daripada badai apa pun di Bumi. Neptunus ditemukan lewat perhitungan matematika sebelum benar-benar diamati, karena para ilmuwan melihat gangguan pada orbit Uranus.",
    ],
    highlights: [
      "Ditemukan pada tahun 1846 melalui perhitungan orbit (planet 'ditemukan dengan ujung pena').",
      "Triton mengorbit berlawanan arah dan diduga planet katai yang tertangkap gravitasi Neptunus.",
      "Memiliki Badai Besar Gelap yang pernah teramati Voyager 2 tahun 1989.",
      "Memiliki 6 cincin yang samar.",
      "Satu tahun di Neptunus = 165 tahun Bumi; satu hari hanya 16 jam.",
    ],
    visual: {
      kind: "ice",
      colors: ["#8fc0ff", "#4d86e8", "#2a5cc4", "#173a8f"],
      freq: 0.02,
      disp: 16,
      bands: ["#a6caff", "#4d86e8", "#2f63cf", "#5b93f0", "#1e48a8"],
      spot: { x: 74, y: 104, rx: 20, ry: 11, color: "#12306e" },
      glow: "#6fa0f5",
    },
    simSize: 16,
    orbit: { a: 336, period: 60190 },
  },
];

/* ------------------------------------------------------------------ */
/*  BENDA LANGIT LAINNYA                                               */
/* ------------------------------------------------------------------ */
export const bulan: CelestialBody = {
  id: "bulan",
  name: "Bulan",
  latin: "Moon",
  type: "Satelit alam Bumi",
  group: "satelit",
  tagline: "Satelit alam satu-satunya milik Bumi",
  symbol: "☾",
  facts: [
    { label: "Jenis", value: "Satelit alam" },
    { label: "Diameter", value: "± 3.474 km (¼ diameter Bumi)" },
    { label: "Jarak dari Bumi", value: "± 384.400 km" },
    { label: "Periode revolusi", value: "27,3 hari (mengelilingi Bumi)" },
    { label: "Periode rotasi", value: "27,3 hari (sama dengan revolusinya)" },
    { label: "Periode sinodis (fase)", value: "29,5 hari" },
    { label: "Suhu", value: "-173 °C (malam) sampai 127 °C (siang)" },
    { label: "Atmosfer", value: "Tidak memiliki atmosfer" },
    { label: "Gravitasi", value: "1/6 gravitasi Bumi" },
  ],
  desc: [
    "Bulan adalah satelit alam Bumi, yaitu benda langit yang mengelilingi planetnya. Bulan tidak memancarkan cahaya sendiri; cahaya Bulan yang kita lihat sebenarnya adalah pantulan cahaya Matahari.",
    "Periode rotasi dan revolusi Bulan sama-sama 27,3 hari. Karena itu sisi Bulan yang menghadap Bumi selalu sama (rotasi tersinkron). Sisi belakang Bulan tidak pernah terlihat dari Bumi. Waktu yang diperlukan Bulan untuk kembali ke fase yang sama adalah 29,5 hari, disebut periode sinodis dan menjadi dasar perhitungan penanggalan Hijriah.",
    "Karena tidak punya atmosfer, permukaan Bulan dipenuhi kawah dan suhunya ekstrem. Gravitasi Bulan hanya 1/6 gravitasi Bumi sehingga astronaut melompat lebih tinggi di sana. Tarikan gravitasi Bulan juga menimbulkan pasang surut air laut di Bumi.",
  ],
  highlights: [
    "Lautan bulan (mare): dataran gelap dari lava Beku, contohnya Mare Tranquillitatis.",
    "Terra: dataran tinggi yang lebih terang dan penuh kawah.",
    "Mare Tycho: kawah besar dengan sinar terang yang memancar.",
    "Manusia pertama mendarat di Bulan: Neil Armstrong dan Buzz Aldrin (Apollo 11, 20 Juli 1969).",
    "Bulan menjauh dari Bumi sekitar 3,8 cm setiap tahun.",
  ],
  visual: {
    kind: "moon",
    colors: ["#e9e7e2", "#c9c6bf", "#a5a19a", "#7c7873"],
    freq: 0.05,
    craters: [
      { x: 66, y: 52, r: 12, o: 0.3 },
      { x: 128, y: 88, r: 18, o: 0.28 },
      { x: 84, y: 132, r: 10, o: 0.32 },
      { x: 148, y: 140, r: 9, o: 0.25 },
      { x: 46, y: 110, r: 14, o: 0.22 },
      { x: 108, y: 34, r: 7, o: 0.3 },
      { x: 120, y: 160, r: 8, o: 0.24 },
      { x: 34, y: 66, r: 6, o: 0.28 },
    ],
    glow: "#dfe6ef",
  },
  simSize: 8,
  orbit: { a: 26, period: 27 },
};

export const bendaLain: CelestialBody[] = [
  {
    id: "planet-katai",
    name: "Planet Katai (Dwarf Planet)",
    type: "Planet katai",
    group: "katai",
    tagline: "Pluto, Ceres, Eris, Makemake, dan Haumea",
    facts: [
      { label: "Contoh", value: "Pluto, Ceres, Eris, Makemake, Haumea" },
      { label: "Jarak Pluto", value: "± 5,9 miliar km (39 SA) dari Matahari" },
      { label: "Periode revolusi Pluto", value: "248 tahun Bumi" },
      { label: "Ciri", value: "Berbentuk bulat, tetapi belum membersihkan orbitnya" },
    ],
    desc: [
      "Pada tahun 2006, Persatuan Astronomi Internasional (IAU) menetapkan syarat sebuah planet: (1) mengelilingi Matahari, (2) berbentuk bulat karena gravitasinya sendiri, dan (3) telah membersihkan lingkungan orbitnya dari benda lain. Pluto tidak memenuhi syarat ketiga, sehingga statusnya diturunkan menjadi planet katai (dwarf planet).",
      "Ceres berada di sabuk asteroid antara Mars dan Jupiter, sedangkan Pluto, Eris, Makemake, dan Haumea berada di daerah Sabuk Kuiper yang jauh melampaui Neptunus. Pluto dilengkapi satelit besar bernama Charon dan telah dikunjungi wahana New Horizons pada tahun 2015.",
    ],
    highlights: [
      "Pluto sempat disebut planet ke-9 sejak ditemukan tahun 1930.",
      "Bentuk orbit Pluto lonjong dan miring sehingga kadang lebih dekat dari Neptunus.",
      "Ceres adalah benda terbesar di sabuk asteroid (diameter ± 940 km).",
      "Eris hampir sama besar dengan Pluto dan menyebabkan definisi planet diubah.",
    ],
    visual: {
      kind: "rocky",
      colors: ["#d9cfc4", "#b3a598", "#8b7d71", "#5d534b"],
      freq: 0.05,
      craters: [
        { x: 76, y: 62, r: 14, o: 0.25 },
        { x: 130, y: 116, r: 16, o: 0.28 },
        { x: 90, y: 148, r: 9, o: 0.22 },
      ],
    },
    simSize: 7,
  },
  {
    id: "asteroid",
    name: "Asteroid (Planetoid)",
    type: "Benda langit kecil",
    group: "kecil",
    tagline: "Batuan angkasa di sabuk antara Mars dan Jupiter",
    facts: [
      { label: "Lokasi utama", value: "Sabuk asteroid, antara orbit Mars dan Jupiter" },
      { label: "Benda terbesar", value: "Ceres (± 940 km)" },
      { label: "Bentuk", value: "Umumnya tidak beraturan, seperti kentang" },
      { label: "Jumlah", value: "Lebih dari 1 juta asteroid yang sudah tercatat" },
    ],
    desc: [
      "Asteroid atau planetoid adalah benda langit yang tersusun dari batuan dan logam, berukuran lebih kecil daripada planet, dan mengelilingi Matahari. Kebanyakan asteroid berkumpul di sabuk asteroid yang berada di antara orbit Mars dan Jupiter.",
      "Asteroid diduga berasal dari planet yang gagal terbentuk karena tarikan gravitasi Jupiter yang sangat kuat sehingga bahan-bahannya tidak pernah menyatu. Beberapa asteroid memiliki satelit sendiri, dan orbitnya dapat berbentuk lonjong.",
    ],
    highlights: [
      "Dulu disebut bintang kecil (asteroid = seperti bintang) karena tampak berkilau.",
      "Vesta dan Pallas adalah asteroid besar lainnya.",
      "Wahana Dawn sempat mengorbit Vesta dan Ceres.",
      "Asteroid yang mengarah ke Bumi disebut Near-Earth Objects (NEO).",
    ],
    visual: {
      kind: "asteroid",
      colors: ["#9c9288", "#6f665e", "#4b443e"],
      freq: 0.12,
      craters: [
        { x: 72, y: 70, r: 16, o: 0.4 },
        { x: 132, y: 108, r: 13, o: 0.35 },
        { x: 96, y: 148, r: 10, o: 0.3 },
      ],
    },
    simSize: 5,
  },
  {
    id: "meteor",
    name: "Meteoroid, Meteor, Meteorit",
    type: "Benda langit kecil",
    group: "kecil",
    tagline: "Batuan kecil yang terbakar di atmosfer Bumi",
    facts: [
      { label: "Meteoroid", value: "Batu/besi kecil yang masih berada di angkasa" },
      { label: "Meteor", value: "Meteoroid yang terbakar di atmosfer Bumi (bintang jatuh)" },
      { label: "Meteorit", value: "Sisa meteor yang berhasil sampai ke permukaan Bumi" },
      { label: "Kecepatan", value: "11 – 72 km/detik saat memasuki atmosfer" },
    ],
    desc: [
      "Meteoroid adalah batuan atau serpihan logam kecil yang melayang di angkasa. Ketika meteoroid masuk ke atmosfer Bumi, gesekan dengan udara membuatnya terbakar dan mengeluarkan garis cahaya. Cahaya itulah yang disebut meteor, sering dijuluki bintang jatuh, padahal bukan bintang.",
      "Jika meteoroidnya cukup besar dan tidak habis terbakar, sisanya dapat jatuh sampai ke permukaan Bumi dan disebut meteorit. Hujan meteor terjadi ketika Bumi melewati jejak debu yang ditinggalkan sebuah komet, misalnya hujan meteor Perseid dan Geminid.",
    ],
    highlights: [
      "Meteor besar dapat menimbulkan kawah, contohnya Kawah Barringer di Arizona.",
      "Hujan meteor Perseid puncaknya sekitar pertengahan Agustus.",
      "Meteorit dapat berisi mineral dari masa awal Tata Surya (4,6 miliar tahun).",
      "Ratusan ton serpihan angkasa jatuh ke Bumi setiap hari, kebanyakan sekecil pasir.",
    ],
    visual: {
      kind: "asteroid",
      colors: ["#7d746c", "#544d47", "#332f2c"],
      freq: 0.14,
      craters: [
        { x: 84, y: 88, r: 18, o: 0.4 },
        { x: 130, y: 140, r: 11, o: 0.35 },
      ],
    },
    simSize: 5,
  },
  {
    id: "komet",
    name: "Komet",
    type: "Benda langit kecil",
    group: "kecil",
    tagline: "Bintang berekor yang tersusun dari es, debu, dan gas",
    facts: [
      { label: "Julukan", value: "Bintang berekor (bukan bintang sejati)" },
      { label: "Penyusun", value: "Es, debu, gas beku, dan batuan (seperti 'bola salju kotor')" },
      { label: "Bagian", value: "Inti (nucleus), koma, ekor gas (ion), dan ekor debu" },
      { label: "Periode Komet Halley", value: "± 76 tahun (muncul 1986, diperkirakan 2061)" },
    ],
    desc: [
      "Komet adalah benda langit yang tersusun dari es, debu, dan gas beku. Ketika mendekati Matahari, es di permukaannya menyublim dan membentuk selubung gas bercahaya yang disebut koma, serta ekor yang sangat panjang dan dapat mencapai jutaan kilometer.",
      "Ekor komet selalu menjauhi Matahari, bukan mengikuti arah geraknya. Hal ini karena ekor komet didorong oleh angin matahari dan tekanan radiasi Matahari. Oleh karena itu, saat komet menjauh dari Matahari, ekornya berada di depan perjalanannya. Kebanyakan komet berasal dari Sabuk Kuiper dan Awan Oort.",
    ],
    highlights: [
      "Komet Halley terlihat dari Bumi setiap ± 76 tahun (terakhir 1986).",
      "Komet Hale-Bopp (1997) dan NEOWISE (2020) tampak sangat terang.",
      "Wahana Rosetta berhasil mendaratkan modul Philae pada Komet 67P (2014).",
      "Ekor komet selalu mengarah menjauhi Matahari.",
    ],
    visual: {
      kind: "comet",
      colors: ["#eaf6ff", "#bfe2ff", "#7fb6e8"],
      freq: 0.06,
      glow: "#9fd4ff",
    },
    simSize: 6,
  },
  {
    id: "bintang",
    name: "Bintang & Rasi Bintang",
    type: "Bintang",
    group: "bintang",
    tagline: "Benda langit yang memancarkan cahaya sendiri",
    facts: [
      { label: "Sumber cahaya", value: "Reaksi fusi nuklir di intinya" },
      { label: "Bintang terdekat", value: "Matahari; berikutnya Proxima Centauri (4,2 tahun cahaya)" },
      { label: "Satuan jarak", value: "Tahun cahaya (± 9,46 triliun km)" },
      { label: "Contoh rasi", value: "Orion (Waluku), Ursa Major (Beruang Besar/Biduk), Scorpio, Crux (Layaran)" },
    ],
    desc: [
      "Bintang adalah benda langit yang dapat memancarkan cahaya sendiri. Cahaya bintang berasal dari reaksi fusi nuklir di intinya, sama seperti Matahari. Matahari adalah bintang terdekat dari Bumi; bintang tetangga terdekat berikutnya adalah Proxima Centauri yang jaraknya 4,2 tahun cahaya.",
      "Kelompok bintang yang tersusun membentuk pola tertentu disebut rasi bintang (constellation). Rasi bintang dahulu digunakan pelaut dan petani sebagai penunjuk arah dan penanda musim. Contohnya Rasi Biduk (Ursa Major) yang membantu menemukan Bintang Kutub Utara (Polaris), serta Rasi Orion yang menandai musim kemarau di Indonesia.",
      "Bintang-bintang yang kita lihat pada suatu rasi sebenarnya tidak saling berdekatan; mereka hanya tampak berkelompok dari arah Bumi. Warna bintang menunjukkan suhunya: biru paling panas, kemudian putih, kuning, dan merah paling dingin.",
    ],
    highlights: [
      "Rasi Orion memiliki Bintang Betelgeuse (merah) dan Rigel (biru).",
      "Bintang Kutub Utara (Polaris) hampir tidak bergerak, berguna untuk navigasi arah utara.",
      "Kelahiran bintang terjadi di awan gas raksasa yang disebut nebula.",
      "Bintang yang meledak hebat di akhir hidupnya disebut supernova.",
    ],
    visual: {
      kind: "sun",
      colors: ["#ffffff", "#cfe4ff", "#8fb8ff"],
      freq: 0.08,
      glow: "#bcd8ff",
    },
    simSize: 6,
  },
  {
    id: "galaksi",
    name: "Galaksi & Bima Sakti",
    type: "Kumpulan bintang",
    group: "bintang",
    tagline: "Rumah Tata Surya kita di alam semesta",
    facts: [
      { label: "Nama galaksi kita", value: "Galaksi Bima Sakti (Milky Way)" },
      { label: "Bentuk", value: "Spiral berbatang (barred spiral)" },
      { label: "Jumlah bintang", value: "± 100 – 400 miliar bintang" },
      { label: "Diameter", value: "± 100.000 tahun cahaya" },
      { label: "Tata Surya", value: "Berada di lengan Orion, ± 26.000 tahun cahaya dari pusat galaksi" },
    ],
    desc: [
      "Galaksi adalah kumpulan miliaran bintang, gas, debu, dan benda langit lain yang terikat gravitasi. Tata Surya kita berada di dalam sebuah galaksi spiral bernama Bima Sakti (Milky Way). Pada malam yang sangat gelap, Bima Sakti tampak seperti pita cahaya samar yang membentang di langit.",
      "Di pusat galaksi terdapat lubang hitam supermasif bernama Sagittarius A*. Selain Bima Sakti, terdapat ratusan miliar galaksi lain di alam semesta, misalnya Galaksi Andromeda yang akan bertemu dengan Bima Sakti miliaran tahun lagi.",
    ],
    highlights: [
      "Lubang hitam (black hole) adalah daerah dengan gravitasi sangat kuat sehingga cahaya pun tidak dapat lolos.",
      "Nebula adalah awan gas dan debu tempat bintang baru lahir.",
      "Galaksi terdekat yang besar: Andromeda (M31).",
      "Cahaya dari pusat galaksi butuh 26.000 tahun untuk sampai ke Bumi.",
    ],
    visual: {
      kind: "sun",
      colors: ["#ffffff", "#c9b8ff", "#7d8cff"],
      freq: 0.07,
      glow: "#b9a8ff",
    },
    simSize: 6,
  },
];

export const allBodies: CelestialBody[] = [matahari, ...planets, bulan, ...bendaLain];

export function getBody(id: string): CelestialBody | undefined {
  return allBodies.find((b) => b.id === id);
}
