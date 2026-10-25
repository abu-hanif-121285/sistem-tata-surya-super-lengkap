export type QuizQ = {
  q: string;
  options: string[];
  answer: number;
  explain: string;
  topic: string;
};

export const quizBank: QuizQ[] = [
  {
    q: "Benda langit berikut yang memancarkan cahaya sendiri adalah ...",
    options: ["Bulan", "Mars", "Matahari", "Venus"],
    answer: 2,
    explain:
      "Matahari adalah bintang, yaitu benda langit yang menghasilkan cahaya dan panas sendiri melalui reaksi fusi nuklir. Bulan, Mars, dan Venus hanya memantulkan cahaya Matahari.",
    topic: "Matahari",
  },
  {
    q: "Sumber energi pada Matahari berasal dari ...",
    options: [
      "Pembakaran gas oksigen",
      "Reaksi fusi nuklir hidrogen menjadi helium",
      "Ledakan gunung api di permukaannya",
      "Gesekan dengan angin matahari",
    ],
    answer: 1,
    explain:
      "Pada inti Matahari yang suhunya 15 juta °C, atom hidrogen melebur (fusi) menjadi helium dan melepaskan energi yang sangat besar.",
    topic: "Matahari",
  },
  {
    q: "Lapisan Matahari yang tampak sebagai permukaannya dan bersuhu ± 5.500 °C disebut ...",
    options: ["Korona", "Kromosfer", "Fotosfer", "Inti"],
    answer: 2,
    explain:
      "Fotosfer adalah lapisan terendah atmosfer Matahari yang tampak sebagai permukaan. Kromosfer berada di atasnya dan korona adalah selubung cahaya terluar.",
    topic: "Matahari",
  },
  {
    q: "Planet terbesar dan planet terpanas di Tata Surya berturut-turut adalah ...",
    options: [
      "Jupiter dan Venus",
      "Jupiter dan Merkurius",
      "Saturnus dan Venus",
      "Neptunus dan Merkurius",
    ],
    answer: 0,
    explain:
      "Jupiter adalah planet terbesar (diameter ± 139.820 km). Venus adalah planet terpanas (± 465 °C) karena efek rumah kaca atmosfer karbon dioksida yang sangat tebal, meskipun Merkurius lebih dekat dengan Matahari.",
    topic: "Planet",
  },
  {
    q: "Planet yang dijuluki Planet Merah karena permukaannya banyak mengandung besi oksida adalah ...",
    options: ["Venus", "Mars", "Jupiter", "Uranus"],
    answer: 1,
    explain:
      "Mars tampak merah karat karena tanahnya kaya besi oksida (karat). Mars memiliki gunung tertinggi Olympus Mons dan 2 satelit yaitu Phobos dan Deimos.",
    topic: "Planet",
  },
  {
    q: "Planet Saturnus dapat terapung jika ditambahkan ke dalam air. Hal ini karena ...",
    options: [
      "Saturnus memiliki cincin yang sangat besar",
      "Massa jenis Saturnus lebih kecil daripada massa jenis air",
      "Saturnus tersusun dari es murni",
      "Saturnus sangat jauh dari Matahari",
    ],
    answer: 1,
    explain:
      "Massa jenis Saturnus hanya sekitar 0,7 g/cm³, lebih kecil daripada massa jenis air (1 g/cm³), sehingga secara teori Saturnus akan mengapung.",
    topic: "Planet",
  },
  {
    q: "Planet yang porosnya miring hampir 98° sehingga tampak menggelinding saat berrevolusi adalah ...",
    options: ["Neptunus", "Saturnus", "Uranus", "Merkurius"],
    answer: 2,
    explain:
      "Poros Uranus miring sekitar 98°, sehingga kutubnya mengalami siang selama 42 tahun dan malam selama 42 tahun berikutnya.",
    topic: "Planet",
  },
  {
    q: "Planet yang tidak memiliki satelit alam adalah ...",
    options: ["Merkurius dan Venus", "Bumi dan Mars", "Jupiter dan Saturnus", "Uranus dan Neptunus"],
    answer: 0,
    explain:
      "Merkurius dan Venus sama-sama tidak memiliki satelit alam. Bumi punya 1 (Bulan), Mars punya 2, sedangkan planet luar memiliki puluhan sampai ratusan satelit.",
    topic: "Planet",
  },
  {
    q: "Waktu yang diperlukan Bulan untuk kembali ke fase yang sama (periode sinodis) adalah ...",
    options: ["27,3 hari", "29,5 hari", "365 hari", "88 hari"],
    answer: 1,
    explain:
      "Periode sinodis Bulan adalah 29,5 hari dan menjadi dasar perhitungan penanggalan Hijriah. Periode sideris (sekali mengelilingi Bumi) adalah 27,3 hari.",
    topic: "Fase Bulan",
  },
  {
    q: "Fase Bulan yang terjadi pada hari ke-15 dan tampak bulat penuh disebut ...",
    options: ["Bulan baru", "Kuartal pertama", "Bulan purnama", "Sabit tua"],
    answer: 2,
    explain:
      "Pada fase purnama, Bumi berada di antara Matahari dan Bulan sehingga seluruh sisi Bulan yang menghadap Bumi terlihat terang.",
    topic: "Fase Bulan",
  },
  {
    q: "Gerhana matahari hanya dapat terjadi pada waktu ...",
    options: [
      "Bulan purnama, pada malam hari",
      "Bulan baru, pada siang hari",
      "Kuartal pertama, pada pagi hari",
      "Bulan sabit, pada malam hari",
    ],
    answer: 1,
    explain:
      "Gerhana matahari terjadi saat Bulan berada di antara Matahari dan Bumi, yaitu pada fase bulan baru, sehingga peristiwanya terjadi pada siang hari.",
    topic: "Gerhana",
  },
  {
    q: "Urutan benda langit yang menyebabkan terjadinya gerhana bulan adalah ...",
    options: [
      "Matahari – Bulan – Bumi",
      "Matahari – Bumi – Bulan",
      "Bumi – Matahari – Bulan",
      "Bulan – Bumi – Matahari",
    ],
    answer: 1,
    explain:
      "Pada gerhana bulan, Bumi berada di antara Matahari dan Bulan sehingga bayangan Bumi jatuh ke permukaan Bulan. Peristiwa ini terjadi saat bulan purnama.",
    topic: "Gerhana",
  },
  {
    q: "Bayangan inti yang paling gelap dan tidak ditembus cahaya sama sekali disebut ...",
    options: ["Penumbra", "Antumbra", "Umbrá", "Koma"],
    answer: 2,
    explain:
      "Umbrá adalah bayangan inti yang paling gelap. Penumbra adalah bayangan kabur, dan antumbra adalah daerah di ujung umbrá penyebab gerhana matahari cincin.",
    topic: "Gerhana",
  },
  {
    q: "Gerhana bulan total membuat Bulan tampak kemerahan (Blood Moon) karena ...",
    options: [
      "Bulan sedang dekat dengan Mars",
      "Cahaya Matahari dibiaskan atmosfer Bumi",
      "Bulan mengalami kebakaran permukaan",
      "Debu komet menutupi Bulan",
    ],
    answer: 1,
    explain:
      "Sebagian cahaya Matahari dibiaskan oleh atmosfer Bumi. Cahaya merah paling banyak sampai ke Bulan sehingga Bulan tampak kemerahan tembaga.",
    topic: "Gerhana",
  },
  {
    q: "Peristiwa terbitnya Matahari di timur dan terbenamnya di barat sebenarnya disebabkan oleh ...",
    options: [
      "Rotasi Bumi dari barat ke timur",
      "Revolusi Bumi mengelilingi Matahari",
      "Rotasi Matahari pada porosnya",
      "Peredaran Bulan mengelilingi Bumi",
    ],
    answer: 0,
    explain:
      "Itu adalah gerak semu harian Matahari. Yang sebenarnya bergerak adalah Bumi yang berotasi dari barat ke timur selama 24 jam.",
    topic: "Rotasi",
  },
  {
    q: "Berikut ini yang BUKAN akibat rotasi Bumi adalah ...",
    options: [
      "Pergantian siang dan malam",
      "Perbedaan waktu di berbagai tempat",
      "Pergantian musim",
      "Pembelokan arah angin (efek Coriolis)",
    ],
    answer: 2,
    explain:
      "Pergantian musim adalah akibat revolusi Bumi bersama kemiringan poros 23,5°, bukan akibat rotasi.",
    topic: "Rotasi",
  },
  {
    q: "Pada pukul 07.00 WIB di Jakarta, waktu di Jayapura (WIT) adalah ...",
    options: ["05.00", "08.00", "09.00", "10.00"],
    answer: 2,
    explain:
      "WIT = UTC + 9, sedangkan WIB = UTC + 7. Selisihnya 2 jam, dan Jayapura berada di timur sehingga waktunya lebih cepat: 07.00 + 2 = 09.00.",
    topic: "Rotasi",
  },
  {
    q: "Pergantian musim di Bumi terutama disebabkan oleh ...",
    options: [
      "Perubahan jarak Bumi ke Matahari",
      "Revolusi Bumi dan kemiringan poros 23,5°",
      "Rotasi Bulan mengelilingi Bumi",
      "Banyaknya bintik matahari",
    ],
    answer: 1,
    explain:
      "Kemiringan poros Bumi 23,5° menyebabkan sudut datang sinar Matahari berubah sepanjang tahun, sehingga menimbulkan pergantian musim. Bukan karena jarak.",
    topic: "Revolusi",
  },
  {
    q: "Peristiwa ketika Matahari tepat berada di atas garis khatulistiwa sehingga siang dan malam sama panjang disebut ...",
    options: ["Solstis", "Ekuinoks", "Perihelion", "Aphelion"],
    answer: 1,
    explain:
      "Ekuinoks terjadi sekitar 21 Maret dan 23 September. Solstis adalah titik balik matahari pada 21 Juni dan 22 Desember.",
    topic: "Revolusi",
  },
  {
    q: "Satu kali revolusi Bumi memerlukan waktu ...",
    options: [
      "24 jam tepat",
      "27,3 hari",
      "365 hari 5 jam 48 menit 46 detik",
      "29,5 hari",
    ],
    answer: 2,
    explain:
      "Revolusi Bumi = 365¼ hari. Kekurangan ¼ hari inilah yang ditambalkan setiap 4 tahun menjadi 366 hari, disebut tahun kabisat.",
    topic: "Revolusi",
  },
  {
    q: "Benda langit yang tersusun dari es, debu, dan gas serta memiliki ekor yang selalu mengarah menjauhi Matahari adalah ...",
    options: ["Asteroid", "Meteor", "Komet", "Planet katai"],
    answer: 2,
    explain:
      "Ekor komet dibentuk saat esnya menyublim karena panas Matahari, lalu didorong oleh angin matahari sehingga selalu menjauhi Matahari.",
    topic: "Benda Angkasa",
  },
  {
    q: "Meteoroid yang berhasil sampai ke permukaan Bumi disebut ...",
    options: ["Meteor", "Meteorit", "Asteroid", "Komet"],
    answer: 1,
    explain:
      "Meteoroid = masih di angkasa; meteor = sedang terbakar di atmosfer (bintang jatuh); meteorit = sisa yang sampai ke permukaan Bumi.",
    topic: "Benda Angkasa",
  },
  {
    q: "Pluto tidak lagi disebut planet karena ...",
    options: [
      "Pluto terlalu jauh dari Matahari",
      "Pluto tidak memiliki satelit",
      "Pluto belum membersihkan lingkungan orbitnya",
      "Pluto tidak mengelilingi Matahari",
    ],
    answer: 2,
    explain:
      "Menurut IAU (2006), planet harus (1) mengelilingi Matahari, (2) berbentuk bulat, dan (3) membersihkan orbitnya. Pluto tidak memenuhi syarat ketiga sehingga menjadi planet katai.",
    topic: "Benda Angkasa",
  },
  {
    q: "Sabuk asteroid utama di Tata Surya berada di antara orbit ...",
    options: [
      "Bumi dan Mars",
      "Mars dan Jupiter",
      "Jupiter dan Saturnus",
      "Saturnus dan Uranus",
    ],
    answer: 1,
    explain:
      "Sabuk asteroid berada di antara orbit Mars dan Jupiter. Asteroid terbesarnya adalah Ceres yang juga digolongkan sebagai planet katai.",
    topic: "Benda Angkasa",
  },
];

/* ------------------------------------------------------------------ */
/*  LATIHAN (format beragam)                                           */
/* ------------------------------------------------------------------ */
export type Mcq = { kind: "pg"; q: string; options: string[]; answer: number; explain: string };
export type TF = { kind: "bs"; q: string; answer: boolean; explain: string };
export type Fill = { kind: "isian"; q: string; accept: string[]; explain: string };

export type Exercise = Mcq | TF | Fill;

export const exercises: Exercise[] = [
  {
    kind: "pg",
    q: "Jarak rata-rata Bumi ke Matahari dinyatakan sebagai 1 SA. Satu SA sama dengan ...",
    options: ["384.400 km", "1,496 juta km", "149,6 juta km", "9,46 triliun km"],
    answer: 2,
    explain: "1 Satuan Astronomi (SA) = ± 149,6 juta km, yaitu jarak rata-rata Bumi ke Matahari.",
  },
  {
    kind: "pg",
    q: "Bulan terlihat berbentuk sabit tipis pada sore hari di sebelah barat. Fase ini disebut ...",
    options: ["Sabit tua", "Sabit muda", "Kuartal pertama", "Gibbous akus"],
    answer: 1,
    explain:
      "Sabit muda (waxing crescent) muncul pada hari ke-3 sampai ke-4 dan terlihat di barat pada sore hari setelah matahari terbenam.",
  },
  {
    kind: "pg",
    q: "Ketika Matahari tepat berada di atas garis balik selatan (23,5° LS), di belahan Bumi utara sedang mengalami ...",
    options: ["Musim semi", "Musim panas", "Musim gugur", "Musim dingin"],
    answer: 3,
    explain:
      "Pada 22 Desember Matahari berada di garis balik selatan. Belahan Bumi selatan mengalami musim panas, sedangkan belahan Bumi utara mengalami musim dingin.",
  },
  {
    kind: "pg",
    q: "Astronaut dapat melompat jauh lebih tinggi di permukaan Bulan. Hal ini karena ...",
    options: [
      "Bulan tidak memiliki atmosfer",
      "Gravitasi Bulan hanya 1/6 gravitasi Bumi",
      "Permukaan Bulan sangat padat",
      "Bulan berotasi sangat lambat",
    ],
    answer: 1,
    explain: "Gravitasi Bulan hanya 1/6 gravitasi Bumi sehingga tarikannya jauh lebih lemah.",
  },
  {
    kind: "pg",
    q: "Wilayah Indonesia yang menggunakan Waktu Indonesia Bagian Tengah (WITA) adalah ...",
    options: ["Sumatra dan Jawa", "Bali, Sulawesi, dan Nusa Tenggara", "Maluku dan Papua", "Kalimantan Barat"],
    answer: 1,
    explain:
      "WITA (UTC + 8) mencakup Bali, Nusa Tenggara, Kalimantan Selatan/Timur/Utara, dan Sulawesi. Maluku dan Papua memakai WIT.",
  },
  {
    kind: "bs",
    q: "Venus adalah planet terpanas di Tata Surya karena atmosfernya sangat tebal dan mengandung banyak karbon dioksida.",
    answer: true,
    explain: "Benar. Efek rumah kaca ekstrem membuat suhu Venus mencapai ± 465 °C.",
  },
  {
    kind: "bs",
    q: "Gerhana bulan berbahaya bila dilihat langsung dengan mata telanjang.",
    answer: false,
    explain:
      "Salah. Yang berbahaya adalah gerhana matahari. Gerhana bulan aman dilihat langsung karena kita hanya melihat pantulan cahaya pada Bulan.",
  },
  {
    kind: "bs",
    q: "Pergantian musim di Bumi terjadi karena jarak Bumi ke Matahari berubah-ubah.",
    answer: false,
    explain:
      "Salah. Pergantian musim disebabkan oleh revolusi Bumi yang disertai kemiringan poros 23,5°. Bumi justru paling dekat dengan Matahari sekitar bulan Januari.",
  },
  {
    kind: "bs",
    q: "Ekor komet selalu menjauhi Matahari, bukan mengikuti arah gerak komet.",
    answer: true,
    explain: "Benar. Ekor komet didorong oleh angin matahari dan tekanan radiasi Matahari.",
  },
  {
    kind: "bs",
    q: "Satu hari di planet Venus lebih lama daripada satu tahun di Venus.",
    answer: true,
    explain:
      "Benar. Rotasi Venus memerlukan 243 hari, sedangkan revolusinya hanya 225 hari, dan Venus berotasi berlawanan arah (retrograde).",
  },
  {
    kind: "isian",
    q: "Gerakan Bumi pada porosnya yang memerlukan waktu 24 jam disebut ...",
    accept: ["rotasi", "rotasi bumi", "perputaran bumi"],
    explain: "Rotasi adalah perputaran Bumi pada porosnya dari barat ke timur selama 24 jam.",
  },
  {
    kind: "isian",
    q: "Satelit alam yang dimiliki Bumi bernama ...",
    accept: ["bulan", "the moon", "luna"],
    explain: "Bumi memiliki satu satelit alam, yaitu Bulan, dengan jarak ± 384.400 km.",
  },
  {
    kind: "isian",
    q: "Galaksi tempat Tata Surya kita berada bernama Galaksi ...",
    accept: ["bima sakti", "milky way", "bimasakti"],
    explain:
      "Tata Surya berada di Galaksi Bima Sakti (Milky Way), sebuah galaksi spiral berdiameter ± 100.000 tahun cahaya.",
  },
  {
    kind: "isian",
    q: "Nama gunung tertinggi di Tata Surya yang berada di planet Mars adalah ...",
    accept: ["olympus mons", "olympus", "gunung olympus"],
    explain: "Olympus Mons tingginya ± 22 km, hampir tiga kali Gunung Everest.",
  },
  {
    kind: "isian",
    q: "Komet terkenal yang muncul setiap ± 76 tahun dan akan terlihat kembali sekitar tahun 2061 adalah Komet ...",
    accept: ["halley", "komet halley", "halley's comet", "edmond halley"],
    explain: "Komet Halley terakhir terlihat tahun 1986 dan diperkirakan muncul kembali tahun 2061.",
  },
];

export const matchingPairs: { left: string; right: string }[] = [
  { left: "Rotasi Bumi", right: "Pergantian siang dan malam" },
  { left: "Revolusi Bumi", right: "Pergantian musim" },
  { left: "Gerhana matahari", right: "Matahari – Bulan – Bumi" },
  { left: "Gerhana bulan", right: "Matahari – Bumi – Bulan" },
  { left: "Bulan purnama", right: "Terjadi pada hari ke-15" },
  { left: "Ekuinoks", right: "Siang dan malam sama panjang" },
];
