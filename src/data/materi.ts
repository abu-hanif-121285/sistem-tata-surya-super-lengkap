export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "list"; items: string[] }
  | { t: "num"; items: string[] }
  | { t: "facts"; items: { label: string; value: string }[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "note"; kind: "info" | "tips" | "warn"; title: string; text: string };

export type Topic = {
  id: string;
  title: string;
  short: string;
  icon: string;
  blurb: string;
  keywords: string[];
  blocks: Block[];
};

/* ------------------------------------------------------------------ */
export const pengantar: Topic = {
  id: "pengantar",
  title: "Tata Surya & Alam Semesta",
  short: "Tata Surya",
  icon: "🌌",
  blurb: "Susunan tata surya, satuan astronomi, dan objek-objek di dalamnya.",
  keywords: ["Tata Surya", "SA", "Orbit", "Gravitasi"],
  blocks: [
    {
      t: "p",
      text: "Tata Surya (solar system) adalah kumpulan benda langit yang terdiri atas Matahari sebagai pusatnya serta semua benda yang bergerak di sekelilingnya. Anggota tata surya meliputi 8 planet, satelit, planet katai, asteroid, meteoroid, dan komet. Semuanya terikat oleh gaya gravitasi Matahari yang sangat besar.",
    },
    {
      t: "p",
      text: "Tata Surya terbentuk sekitar 4,6 miliar tahun lalu dari awan gas dan debu raksasa yang berputar lalu memadat. Bagian tengahnya menjadi Matahari, sedangkan sisa materi yang mengelilinginya menggumpal menjadi planet-planet.",
    },
    { t: "h", text: "Susunan Planet Menurut Jarak dari Matahari" },
    {
      t: "num",
      items: [
        "Merkurius — planet terkecil dan terdekat dengan Matahari.",
        "Venus — planet terpanas, dijuluki Bintang Kejora.",
        "Bumi — planet tempat hidup kita.",
        "Mars — Planet Merah.",
        "Jupiter — planet terbesar.",
        "Saturnus — planet bercincin terindah.",
        "Uranus — planet yang berputar miring.",
        "Neptunus — planet terjauh dari Matahari.",
      ],
    },
    {
      t: "note",
      kind: "tips",
      title: "Jembatan Keledai",
      text: "Me-Ve-Br-Ma-Ju-Sa-Ur-Nep. Planet ke-1 sampai ke-4 adalah planet dalam (batuan), sedangkan planet ke-5 sampai ke-8 adalah planet luar (raksasa gas dan es). Di antara Mars dan Jupiter terdapat sabuk asteroid.",
    },
    { t: "h", text: "Pembagian Planet" },
    {
      t: "table",
      head: ["Aspek", "Planet Dalam", "Planet Luar"],
      rows: [
        ["Anggota", "Merkurius, Venus, Bumi, Mars", "Jupiter, Saturnus, Uranus, Neptunus"],
        ["Letak", "Di dalam sabuk asteroid", "Di luar sabuk asteroid"],
        ["Ukuran", "Relatif kecil", "Sangat besar"],
        ["Penyusun", "Batuan dan logam", "Gas dan es"],
        ["Jarak ke Matahari", "Dekat, periode revolusi singkat", "Jauh, periode revolusi panjang"],
        ["Jumlah satelit", "Sedikit (0–2)", "Banyak (belasan sampai ratusan)"],
        ["Kecepatan rotasi", "Lambat", "Sangat cepat"],
      ],
    },
    { t: "h", text: "Satuan Jarak di Antariksa" },
    {
      t: "facts",
      items: [
        { label: "SA (Satuan Astronomi)", value: "Jarak rata-rata Bumi–Matahari = ± 149,6 juta km" },
        { label: "Tahun cahaya", value: "Jarak yang ditempuh cahaya selama 1 tahun = ± 9,46 triliun km" },
        { label: "Orbit", value: "Lintasan berbentuk elips yang dilalui planet mengelilingi Matahari" },
        { label: "Hukum Kepler", value: "Orbit planet berbentuk elips dengan Matahari di salah satu fokusnya" },
      ],
    },
    {
      t: "p",
      text: "Karena jaraknya sangat jauh, para ilmuwan menggunakan satuan SA untuk jarak di dalam tata surya dan tahun cahaya untuk jarak antarbintang. Sebagai gambaran, cahaya Matahari hanya butuh 8 menit 20 detik ke Bumi, tetapi butuh lebih dari 4 tahun untuk mencapai bintang terdekat berikutnya.",
    },
    {
      t: "note",
      kind: "info",
      title: "Mengapa planet tidak jatuh atau melayang menjauh?",
      text: "Karena ada keseimbangan dua gaya: gaya gravitasi Matahari menarik planet ke dalam, sedangkan gaya sentrifugal akibat gerak planet mendorongnya keluar. Keseimbangan ini membuat planet tetap bergerak pada orbitnya.",
    },
  ],
};

/* ------------------------------------------------------------------ */
export const faseBulan: Topic = {
  id: "fase-bulan",
  title: "Fase-Fase Bulan",
  short: "Fase Bulan",
  icon: "🌙",
  blurb: "Perubahan bentuk tampak Bulan selama 29,5 hari dan manfaatnya.",
  keywords: ["Bulan baru", "Purnama", "Kuartal", "Sabit", "Sinodis"],
  blocks: [
    {
      t: "p",
      text: "Bulan tidak memancarkan cahaya sendiri, tetapi memantulkan cahaya Matahari. Hanya separuh bagian Bulan yang menghadap Matahari yang terang, sedangkan separuh lainnya gelap. Ketika Bulan berputar mengelilingi Bumi, bagian yang terang itu dilihat dari Bumi tampak berubah-ubah bentuknya. Perubahan bentuk tampak Bulan itulah yang disebut fase Bulan.",
    },
    {
      t: "p",
      text: "Waktu yang diperlukan Bulan untuk kembali ke fase yang sama adalah 29,5 hari dan disebut periode sinodis (bulan sinodis). Sedangkan waktu yang diperlukan untuk sekali mengelilingi Bumi adalah 27,3 hari, disebut periode sideris. Selisih ini terjadi karena selama Bulan mengelilingi Bumi, Bumi juga ikut bergerak mengelilingi Matahari.",
    },
    { t: "h", text: "Urutan Delapan Fase Bulan" },
    {
      t: "table",
      head: ["No", "Fase", "Waktu (hari ke-)", "Tampakan"],
      rows: [
        ["1", "Bulan baru (new moon)", "1", "Tidak terlihat, sisi terang menghadap Matahari"],
        ["2", "Sabit muda (waxing crescent)", "3 – 4", "Berbentuk sabit tipis, terlihat sore hari di barat"],
        ["3", "Kuartal pertama (setengah awal)", "7 – 8", "Setengah lingkaran terang, terbenam tengah malam"],
        ["4", "Gibbous awal (membesar)", "11 – 12", "Lebih dari setengah terang"],
        ["5", "Bulan purnama (full moon)", "15", "Bulat penuh terang, terbit saat matahari terbenam"],
        ["6", "Gibbous akus (mengecil)", "19 – 20", "Lebih dari setengah, mulai mengecil"],
        ["7", "Kuartal ketiga (setengah akhir)", "22 – 23", "Setengah lingkaran terang, terbit tengah malam"],
        ["8", "Sabit tua (waning crescent)", "26 – 27", "Sabit tipis, terlihat subuh di timur"],
      ],
    },
    {
      t: "note",
      kind: "info",
      title: "Mengapa bisa terjadi?",
      text: "Fase Bulan terjadi karena dua hal: (1) cahaya Matahari hanya menerangi separuh permukaan Bulan, dan (2) posisi Bulan relatif terhadap Matahari dan Bumi terus berubah saat Bulan berrevolusi.",
    },
    { t: "h", text: "Manfaat Penentuan Fase Bulan" },
    {
      t: "list",
      items: [
        "Menentukan awal bulan dalam penanggalan Hijriah (1 Muharram, 1 Ramadhan, 1 Syawal).",
        "Menentukan hari raya Idulfitri dan Iduladha lewat rukyatul hilal (melihat bulan sabit muda).",
        "Membantu nelayan dan petani menentukan waktu melaut dan menanam.",
        "Menandai waktu pasang surut air laut yang kuat (purnama dan bulan baru).",
        "Menentukan arah kiblat pada malam hari menggunakan posisi bulan sabit.",
      ],
    },
    {
      t: "note",
      kind: "tips",
      title: "Cara mudah mengingat",
      text: "Jika Bulan terlihat seperti huruf C di langit, biasanya sedang menuju purnama (membesar) di belahan Bumi utara; jika seperti huruf D, sedang mengecil. Di Indonesia (dekat ekuator) sabit cenderung tampak seperti 'senyum' karena Bulan berada hampir tegak di atas kepala.",
    },
  ],
};

/* ------------------------------------------------------------------ */
export const gerhana: Topic = {
  id: "gerhana",
  title: "Gerhana Matahari & Gerhana Bulan",
  short: "Gerhana",
  icon: "🌘",
  blurb: "Peristiwa tertutupnya cahaya akibat posisi Matahari, Bulan, dan Bumi.",
  keywords: ["Gerhana matahari", "Gerhana bulan", "Umbrá", "Penumbra"],
  blocks: [
    {
      t: "p",
      text: "Gerhana adalah peristiwa tertutupnya atau tertelanjasnya cahaya dari suatu benda langit oleh benda langit lain. Gerhana terjadi karena cahaya merambat lurus, sehingga jika ada benda yang menghalangi, di belakangnya akan terbentuk daerah bayangan.",
    },
    {
      t: "facts",
      items: [
        { label: "Umbrá", value: "Bayangan inti, daerah paling gelap, tidak ada cahaya sama sekali" },
        { label: "Penumbra", value: "Bayangan kabur, masih ada sebagian cahaya yang masuk" },
        { label: "Antumbra", value: "Daerah bayangan di ujung umbrá, penyebab gerhana matahari cincin" },
      ],
    },
    { t: "h", text: "Gerhana Matahari (Gerhana Surya)" },
    {
      t: "p",
      text: "Gerhana matahari terjadi ketika Bulan berada di antara Matahari dan Bumi dalam satu garis lurus, sehingga bayangan Bulan jatuh ke permukaan Bumi. Peristiwa ini hanya dapat terjadi pada waktu fase bulan baru (pada siang hari). Wilayah yang mengalami gerhana total sangat sempit, hanya beberapa ratus kilometer.",
    },
    {
      t: "table",
      head: ["Jenis", "Kejadian", "Terlihat dari"],
      rows: [
        ["Gerhana matahari total", "Seluruh cakram Matahari tertutup Bulan (Bumi berada di daerah umbrá)", "Daerah sempit, hanya beberapa menit"],
        ["Gerhana matahari cincin", "Bulan tidak mampu menutup seluruh Matahari sehingga tampak cincin terang (Bumi di daerah antumbra)", "Terjadi saat Bulan jauh (di titik apogee)"],
        ["Gerhana matahari sebagian", "Hanya sebagian Matahari yang tertutup (daerah penumbra)", "Wilayah yang lebih luas"],
      ],
    },
    {
      t: "note",
      kind: "warn",
      title: "Keselamatan!",
      text: "Gerhana matahari TIDAK BOLEH dilihat langsung dengan mata telanjang karena sinar ultravioletnya dapat merusak retina dan menyebabkan buta permanen. Gunakan khusus gerhana viewer bersertifikat ISO, kacamata gerhana khusus, atau proyeksi pinhole. Gerhana bulan justru aman dilihat dengan mata telanjang.",
    },
    { t: "h", text: "Gerhana Bulan" },
    {
      t: "p",
      text: "Gerhana bulan terjadi ketika Bumi berada di antara Matahari dan Bulan sehingga bayangan Bumi jatuh ke permukaan Bulan. Peristiwa ini hanya dapat terjadi pada waktu fase bulan purnama dan pada malam hari. Gerhana bulan dapat dilihat dari seluruh belahan Bumi yang sedang malam, sehingga lebih sering terlihat daripada gerhana matahari.",
    },
    {
      t: "table",
      head: ["Jenis", "Kejadian"],
      rows: [
        ["Gerhana bulan total", "Seluruh Bulan masuk ke daerah umbrá Bumi; Bulan tampak kemerahan (Blood Moon) karena pembiasan atmosfer Bumi"],
        ["Gerhana bulan sebagian", "Hanya sebagian Bulan yang masuk ke daerah umbrá"],
        ["Gerhana bulan penumbra", "Bulan hanya melewati bayangan kabur sehingga perubahannya samar"],
      ],
    },
    { t: "h", text: "Perbandingan Gerhana Matahari dan Gerhana Bulan" },
    {
      t: "table",
      head: ["Aspek", "Gerhana Matahari", "Gerhana Bulan"],
      rows: [
        ["Urutan benda", "Matahari – Bulan – Bumi", "Matahari – Bumi – Bulan"],
        ["Benda yang tertutup", "Matahari tertutup oleh Bulan", "Bulan masuk ke bayangan Bumi"],
        ["Waktu", "Siang hari, saat bulan baru", "Malam hari, saat bulan purnama"],
        ["Lama kejadian", "Hanya beberapa menit", "Bisa lebih dari 1 jam"],
        ["Wilayah pengamatan", "Sempit (satu jalur)", "Luas (seluruh sisi malam Bumi)"],
        ["Bahaya melihat", "Berbahaya, wajib pakai alat", "Aman dengan mata telanjang"],
        ["Frekuensi dari satu tempat", "Sangat jarang", "Lebih sering"],
      ],
    },
    {
      t: "note",
      kind: "info",
      title: "Mengapa tidak setiap bulan terjadi gerhana?",
      text: "Karena bidang orbit Bulan (ecliptic) miring sekitar 5° terhadap bidang orbit Bumi. Gerhana hanya terjadi jika Matahari, Bulan, dan Bumi berada tepat dalam satu garis lurus, yaitu saat musim gerhana (dua kali setahun).",
    },
  ],
};

/* ------------------------------------------------------------------ */
export const rotasi: Topic = {
  id: "rotasi",
  title: "Rotasi Bumi dan Akibatnya",
  short: "Rotasi Bumi",
  icon: "🔄",
  blurb: "Perputaran Bumi pada porosnya selama 24 jam dan akibat-akibatnya.",
  keywords: ["Rotasi", "Siang malam", "Gerak semu harian", "Perbedaan waktu"],
  blocks: [
    {
      t: "p",
      text: "Rotasi adalah perputaran Bumi pada porosnya (garis imajiner yang menghubungkan kutub utara dan kutub selatan). Bumi berputar dari barat ke timur (berlawanan arah jarum jam jika dilihat dari kutub utara) dengan periode satu hari, yaitu 24 jam. Secara tepat, satu rotasi adalah 23 jam 56 menit 4 detik dan disebut hari sideris.",
    },
    { t: "h", text: "Akibat Rotasi Bumi" },
    {
      t: "num",
      items: [
        "Terjadinya pergantian siang dan malam (hari dan waktu). Bagian Bumi yang menghadap Matahari mengalami siang, bagian yang membelakangi mengalami malam.",
        "Gerak semu harian Matahari, yaitu Matahari tampak terbit di timur dan terbenam di barat, padahal yang bergerak adalah Bumi.",
        "Perbedaan waktu di berbagai tempat di Bumi. Setiap 15° lintang bujur = selisih 1 jam. Indonesia terbagi menjadi tiga zona waktu.",
        "Pembelokan arah angin dan arus laut (efek Coriolis): membelok ke kanan di belahan Bumi utara dan ke kiri di belahan Bumi selatan.",
        "Perbedaan percepatan gravitasi Bumi; gravitasi lebih kecil di ekuator karena gerak rotasi.",
      ],
    },
    { t: "h", text: "Zona Waktu di Indonesia" },
    {
      t: "table",
      head: ["Zona", "Singkatan", "Selisih dengan UTC", "Wilayah"],
      rows: [
        ["Waktu Indonesia Bagian Barat", "WIB", "UTC + 7", "Sumatra, Jawa, Jawa Barat/Tengah/Timur, Kalimantan Barat & Tengah"],
        ["Waktu Indonesia Bagian Tengah", "WITA", "UTC + 8", "Bali, Nusa Tenggara, Kalimantan Selatan/Timur/Utara, Sulawesi"],
        ["Waktu Indonesia Bagian Timur", "WIT", "UTC + 9", "Maluku dan Papua"],
      ],
    },
    {
      t: "note",
      kind: "tips",
      title: "Cara menghitung perbedaan waktu",
      text: "Ke arah timur waktu bertambah (ditambah), ke arah barat waktu berkurang (dikurangi). Contoh: pukul 07.00 WIB di Jakarta = pukul 08.00 WITA di Bali = pukul 09.00 WIT di Jayapura.",
    },
    {
      t: "note",
      kind: "info",
      title: "Bukti bahwa Bumi berotasi",
      text: "Bandul Foucault yang arah ayunannya perlahan berputar, perbedaan waktu di berbagai tempat, bentuk Bumi yang memipih di kutub, serta pengamatan dari satelit dan stasiun luar angkasa.",
    },
  ],
};

/* ------------------------------------------------------------------ */
export const revolusi: Topic = {
  id: "revolusi",
  title: "Revolusi Bumi dan Akibatnya",
  short: "Revolusi Bumi",
  icon: "🌍",
  blurb: "Perjalanan Bumi mengelilingi Matahari selama 365¼ hari.",
  keywords: ["Revolusi", "Musim", "Titik balik", "Ekuinoks"],
  blocks: [
    {
      t: "p",
      text: "Revolusi adalah gerakan Bumi mengelilingi Matahari dengan lintasan berbentuk elips (orbit). Satu kali revolusi memerlukan waktu 365 hari 5 jam 48 menit 46 detik (365¼ hari) atau satu tahun. Kecepatan Bumi berrevolusi mencapai ± 30 km/detik atau ± 107.000 km/jam.",
    },
    {
      t: "p",
      text: "Poros Bumi tidak berdiri tegak lurus terhadap bidang orbitnya, tetapi miring 23,5° dan selalu mengarah ke arah yang sama (Bintang Kutub Utara). Kemiringan inilah yang menjadi penyebab utama terjadinya pergantian musim, bukan perbedaan jarak Bumi ke Matahari.",
    },
    { t: "h", text: "Akibat Revolusi Bumi" },
    {
      t: "num",
      items: [
        "Pergantian musim. Di belahan Bumi utara dan selatan terdapat 4 musim: musim semi, panas, gugur, dan dingin. Di daerah beriklim tropis seperti Indonesia hanya ada 2 musim: musim hujan dan musim kemarau.",
        "Perbedaan lamanya siang dan malam. Di ekuator siang dan malam hampir sama panjang sepanjang tahun, sedangkan di kutub ada waktu siang/malam yang berlangsung berbulan-bulan.",
        "Perbedaan rupa langit atau rupa bintang pada musim yang berbeda.",
        "Gerak semu tahunan Matahari, yaitu tampaknya Matahari bergeser ke utara dan ke selatan sepanjang tahun.",
        "Terjadinya titik balik matahari (solstis) dan ekuinoks (titik lintang sama).",
      ],
    },
    { t: "h", text: "Empat Posisi Penting Bumi" },
    {
      t: "table",
      head: ["Tanggal", "Peristiwa", "Keadaan"],
      rows: [
        ["21 Maret", "Ekuinoks vernal (musim semi)", "Matahari tepat di atas ekuator; siang = malam di seluruh Bumi"],
        ["21 Juni", "Solstis (titik balik utara)", "Matahari tepat di atas garis balik utara (23,5° LU); musim panas di belahan utara, dingin di selatan"],
        ["23 September", "Ekuinoks autumnal (musim gugur)", "Matahari kembali tepat di atas ekuator; siang = malam"],
        ["22 Desember", "Solstis (titik balik selatan)", "Matahari tepat di atas garis balik selatan (23,5° LS); musim dingin di belahan utara, panas di selatan"],
      ],
    },
    { t: "h", text: "Musim di Indonesia" },
    {
      t: "table",
      head: ["Musim", "Kurang lebih", "Penyebab"],
      rows: [
        ["Musim hujan", "Oktober – April", "Matahari berada di belahan Bumi selatan; angin musim barat membawa banyak uap air dari lautan"],
        ["Musim kemarau", "April – Oktober", "Matahari berada di belahan Bumi utara; angin musim timat berasal dari benua Australia yang kering"],
      ],
    },
    {
      t: "note",
      kind: "info",
      title: "Mitos yang perlu diluruskan",
      text: "Pergantian musim TIDAK disebabkan oleh perubahan jarak Bumi ke Matahari. Faktanya, Bumi justru berada paling dekat dengan Matahari (perihelion) sekitar bulan Januari, saat belahan Bumi utara sedang musim dingin. Penyebab musim yang sebenarnya adalah kemiringan poros Bumi 23,5°.",
    },
  ],
};

/* ------------------------------------------------------------------ */
export const gerakBulan: Topic = {
  id: "gerak-bulan",
  title: "Gerakan Bulan dan Pasang Surut",
  short: "Gerak Bulan",
  icon: "🌊",
  blurb: "Rotasi, revolusi, dan pengaruh gravitasi Bulan bagi Bumi.",
  keywords: ["Rotasi terkunci", "Pasang surut", "Sideris"],
  blocks: [
    {
      t: "p",
      text: "Bulan melakukan dua gerakan sekaligus: rotasi pada porosnya dan revolusi mengelilingi Bumi. Kedua periode tersebut sama-sama 27,3 hari sehingga Bulan selalu menampakkan sisi yang sama kepada Bumi. Gejala ini disebut rotasi tersinkron (tidal locking).",
    },
    {
      t: "facts",
      items: [
        { label: "Periode sideris", value: "27,3 hari — Bulan kembali ke posisi yang sama terhadap bintang" },
        { label: "Periode sinodis", value: "29,5 hari — Bulan kembali ke fase yang sama (dasar penanggalan Hijriah)" },
        { label: "Jarak rata-rata", value: "± 384.400 km dari Bumi" },
        { label: "Gravitasi Bulan", value: "1/6 gravitasi Bumi" },
      ],
    },
    { t: "h", text: "Akibat Gerakan Bulan bagi Bumi" },
    {
      t: "list",
      items: [
        "Pasang surut air laut. Gravitasi Bulan menarik air laut sehingga permukaan air naik (pasang) pada sisi yang menghadap Bulan dan di sisi berlawanan.",
        "Fase Bulan yang berubah setiap malam selama periode 29,5 hari.",
        "Terjadinya gerhana matahari dan gerhana bulan.",
        "Perlambatan rotasi Bumi secara perlahan (hari di Bumi memanjang sekitar 1,7 milidetik per abad).",
      ],
    },
    {
      t: "note",
      kind: "tips",
      title: "Manfaat pasang surut",
      text: "Nelayan menggunakan informasi pasang surut untuk berlayar dan menarik perahu, pembangunan tambak dan pelabuhan disesuaikan dengan pasang surut, dan air pasang dimanfaatkan sebagai energi listrik (PLTA gelombang/pasang surut).",
    },
  ],
};

export const ringkasan: Topic = {
  id: "ringkasan",
  title: "Rangkuman & Kamus Istilah",
  short: "Rangkuman",
  icon: "📚",
  blurb: "Poin-poin penting dan kamus istilah antariksa.",
  keywords: ["Rangkuman", "Kamus", "Istilah"],
  blocks: [
    { t: "h", text: "Poin Paling Penting" },
    {
      t: "list",
      items: [
        "Matahari adalah bintang, pusat tata surya, dan sumber energi utama bagi kehidupan di Bumi.",
        "Terdapat 8 planet: 4 planet dalam (batuan) dan 4 planet luar (raksasa gas dan es).",
        "Bulan adalah satelit alam Bumi yang fase-fasenya berulang setiap 29,5 hari.",
        "Fase Bulan terjadi karena Bulan memantulkan cahaya Matahari dan posisinya terus berubah.",
        "Gerhana matahari: Matahari–Bulan–Bumi, terjadi saat bulan baru, pada siang hari.",
        "Gerhana bulan: Matahari–Bumi–Bulan, terjadi saat bulan purnama, pada malam hari.",
        "Rotasi Bumi (24 jam) menimbulkan siang–malam, gerak semu harian, dan perbedaan waktu.",
        "Revolusi Bumi (365¼ hari) menimbulkan pergantian musim dan perbedaan lamanya siang–malam.",
        "Kemiringan poros Bumi 23,5° adalah penyebab utama pergantian musim.",
        "Benda angkasa lainnya: planet katai, asteroid, meteoroid/meteor/meteorit, komet, bintang, rasi bintang, dan galaksi.",
      ],
    },
    { t: "h", text: "Kamus Istilah" },
    {
      t: "table",
      head: ["Istilah", "Arti"],
      rows: [
        ["Rotasi", "Perputaran benda langit pada porosnya"],
        ["Revolusi", "Pergerakan benda langit mengelilingi benda langit lain"],
        ["Orbit", "Lintasan elips perjalanan planet mengelilingi Matahari"],
        ["SA (Satuan Astronomi)", "Jarak Bumi ke Matahari, ± 149,6 juta km"],
        ["Tahun cahaya", "Jarak yang ditempuh cahaya selama satu tahun"],
        ["Sideris", "Periode berdasarkan posisi terhadap bintang (27,3 hari bagi Bulan)"],
        ["Sinodis", "Periode berdasarkan fase yang sama (29,5 hari bagi Bulan)"],
        ["Umbrá", "Bayangan inti yang paling gelap"],
        ["Penumbra", "Bayangan kabur/luar yang masih disinari sebagian"],
        ["Antumbra", "Daerah bayangan di ujung umbrá, penyebab gerhana cincin"],
        ["Solstis", "Titik balik matahari (21 Juni dan 22 Desember)"],
        ["Ekuinoks", "Waktu siang dan malam sama panjang (21 Maret dan 23 September)"],
        ["Efek Coriolis", "Pembelokan arah angin akibat rotasi Bumi"],
        ["Planet katai", "Benda bulat yang mengelilingi Matahari tetapi belum membersihkan orbitnya"],
        ["Perihelion", "Titik orbit ketika planet paling dekat dengan Matahari"],
        ["Aphelion", "Titik orbit ketika planet paling jauh dari Matahari"],
      ],
    },
  ],
};

export const topics: Topic[] = [
  pengantar,
  faseBulan,
  gerhana,
  rotasi,
  revolusi,
  gerakBulan,
  ringkasan,
];
