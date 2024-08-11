document.getElementById('navKriteria').addEventListener('click', function() {
  document.getElementById('formInputKriteria').style.display = "block";
  document.getElementById('formInput').style.display = "none";
  document.getElementById('laptopTable').style.visibility = "hidden";
  
  this.classList.add("active");
  let navLaptop = document.getElementById('navLaptop');
  navLaptop.classList.remove("active");
  let navPerengkingan = document.getElementById('navPerengkingan');
  navPerengkingan.classList.remove("active");
});

document.getElementById('navLaptop').addEventListener('click', function(e) {
  document.getElementById('formInputKriteria').style.display = "none";
  document.getElementById('formInput').style.display = "block";
  document.getElementById('laptopTable').style.visibility = "visible";
  // document.getElementById('laptopTableRangking').style.visibility = "hidden";
  tableLaptop(itemLaptop);
  var laptopTable = document.getElementById('laptopTable');
  laptopTable.classList.remove('table-primary');
  laptopTable.classList.add('table-dark');

  this.classList.add("active");
  let navKriteria = document.getElementById('navKriteria');
  navKriteria.classList.remove("active");
  let navPerengkingan = document.getElementById('navPerengkingan');
  navPerengkingan.classList.remove("active");
});


document.getElementById('navPerengkingan').addEventListener('click', function() {
  document.getElementById('formInputKriteria').style.display = "none";
  document.getElementById('formInput').style.display = "none";
  // document.getElementById('laptopTableRangking').style.visibility = "visible";
  tableLaptop(rangkingLaptop);
  var laptopTable = document.getElementById('laptopTable');
  laptopTable.classList.remove('table-dark');
  laptopTable.classList.add('table-primary');

  this.classList.add("active");
  let navKriteria = document.getElementById('navKriteria');
  navKriteria.classList.remove("active");
  let navLaptop = document.getElementById('navLaptop');
  navLaptop.classList.remove("active");
});



let bobotLaptop = [];
let itemLaptop = [];
let perbaikanBobot = [];
let vectorS = [];
let perengkingan = [];
let rangkingLaptop = []

// Tingkat 1: VGA Integrated atau Terintegrasi (misalnya: Intel HD Graphics)
// Tingkat 2: VGA Entry-level (misalnya: Nvidia GT 1030, AMD Radeon RX 550)
// Tingkat 3: VGA Mid-range (misalnya: Nvidia GTX 1660, AMD Radeon RX 580)
// Tingkat 4: VGA High-end (misalnya: Nvidia RTX 3080, AMD Radeon RX 6800 XT)
// Tingkat 5: VGA Enthusiast/Professional (misalnya: Nvidia RTX 3090, AMD Radeon RX 6900 XT)

// Tingkat 1: Prosesor Entry-level (Misalnya: Intel Celeron, AMD Athlon)
// Tingkat 2: Prosesor Mainstream (Misalnya: Intel Core i3, AMD Ryzen 3)
// Tingkat 3: Prosesor Mid-range (Misalnya: Intel Core i5, AMD Ryzen 5)
// Tingkat 4: Prosesor High-end (Misalnya: Intel Core i7, AMD Ryzen 7)
// Tingkat 5: Prosesor Enthusiast/Professional (Misalnya: Intel Core i9, AMD Ryzen 7)

function bobotHarga(harga) {
  if (harga >= 2500000 && harga < 5000000) {
      return 5;
  } else if (harga >= 5000000 && harga < 7500000) {
      return 4;
  } else if (harga >= 7500000 && harga < 10000000) {
      return 3;
  } else if (harga >= 10000000 && harga < 12500000) {
      return 2;
  } else if (harga >= 12500000) {
      return 1;
  } else {
      return "Harga tidak valid";
  }
}

function hitungVectorS(vectorS){
  let index = 0;
  itemLaptop.forEach(function(laptop) {

    let convBobot = [laptop.bobotHarga, laptop.bobotRam, laptop.bobotHarddisk, laptop.bobotProcessor, laptop.bobotVGA];
    let arrayVectorS = [];

    for (let i = 0; i < convBobot.length; i++) {
      arrayVectorS[i] = Math.pow(convBobot[i], perbaikanBobot[i]);
    }

    let kaliVectorS = 1;
    for (let i = 0; i < arrayVectorS.length; i++) {
      kaliVectorS *= arrayVectorS[i];
    }
    vectorS[index] = kaliVectorS;
    index++;
  });

  console.log("ini vectorS " + vectorS);
}

function simpanPerbaikanBobot(bobotHarga, bobotRam, bobotHarddisk, bobotProcessor, bobotVGA) {
  var bobot = [parseInt(bobotHarga) , parseInt(bobotRam), parseInt(bobotHarddisk), parseInt(bobotProcessor), parseInt(bobotVGA)];

  console.log("bobot inputan user " + bobot);
  for (var i = 0; i < bobot.length; i++) {
    let atas = bobot[i];
    let bawah = 0;
    for (var j = 0; j < bobot.length; j++) {
      bawah = bawah + bobot[j];
    }
    perbaikanBobot[i] = atas / bawah;
  }

  console.log("perbaikan bobot " + perbaikanBobot);
}

function hitungPerengkingan(vectorS) {
  for (var i = 0; i < vectorS.length; i++) {
    let atas = vectorS[i];
    let bawah = 0;
    for (var j = 0; j < vectorS.length; j++) {
      bawah = bawah + vectorS[j];
    }
    perengkingan[i] = atas / bawah;
  }

  for (let i = 0; i < perengkingan.length; i++) {
    itemLaptop[i].rangking = perengkingan[i];
  }

  rangkingLaptop = [];
  itemLaptop.forEach(function(laptop){
    tambahItemRangkingLaptop(laptop.merek, laptop.harga, laptop.ram, laptop.harddisk, laptop.processor, laptop.vga, laptop.bobotHarga, laptop.bobotRam, laptop.bobotHarddisk, laptop.bobotProcessor, laptop.bobotVGA, laptop.rangking);
  });

  rangkingLaptop.sort((a, b) =>  b.rangking - a.rangking);

  // console.log(perengkingan);
  // console.log(bobotLaptop);
  console.log(itemLaptop);
  console.log(rangkingLaptop);
}

document.getElementById('formInputKriteria').addEventListener('submit', function(e){
  e.preventDefault();
  let bobotHarga = document.getElementById('inputKepentinganHarga').value;
  let bobotRam = document.getElementById('inputKepentinganRam').value;
  let bobotHarddisk = document.getElementById('inputKepentinganHarddisk').value;
  let bobotProcessor = document.getElementById('inputKepentinganProcessor').value;
  let bobotVGA = document.getElementById('inputKepentinganVGA').value;

  simpanPerbaikanBobot(bobotHarga, bobotRam, bobotHarddisk, bobotProcessor, bobotVGA);

  document.getElementById('formInputKriteria').style.display = "none";
  document.getElementById('laptopTable').style.visibility = "visible";
  document.getElementById('formInput').style.display = "block";
  document.getElementById('navKriteria').classList.remove('active');
  document.getElementById('navLaptop').classList.add('active');
});

document.getElementById('formInput').addEventListener('submit', function(e) {
  e.preventDefault();
  let merek = document.getElementById('inputNamaLaptop').value;
  let harga = bobotHarga(document.getElementById('inputHarga').value);
  let ram = document.getElementById('inputRam').value;
  let inputHarddisk = document.getElementById('inputHarddisk').value;
  let inputProcessor = document.getElementById('inputProcessor').value;
  let inputVGA = document.getElementById('inputVGA').value;

  let ramElemen = document.getElementById('inputRam');
  let ramTeks = ramElemen.options[ramElemen.selectedIndex].text;
  let harddiskElemen = document.getElementById('inputHarddisk');
  let harddiskTeks = harddiskElemen.options[harddiskElemen.selectedIndex].text;
  let processorElemen = document.getElementById('inputProcessor');
  // let processorTeks = processorElemen.options[processorElemen.selectedIndex].text;
  let processorTeks = document.getElementById('inputNamaProcessor').value;
  let vgaElemen = document.getElementById('inputVGA');
  // let vgaTeks = vgaElemen.options[vgaElemen.selectedIndex].text;
  let vgaTeks = document.getElementById('inputNamaVGA').value;

  simpanBobot(harga.toString(), ram, inputHarddisk, inputProcessor, inputVGA);

  let hargaTeks = document.getElementById('inputHarga').value;
  tambahItemLaptop(merek, hargaTeks, ramTeks, harddiskTeks, processorTeks, vgaTeks,harga.toString(), ram, inputHarddisk, inputProcessor, inputVGA);

  tableLaptop(itemLaptop);
  hitungVectorS(vectorS);
  hitungPerengkingan(vectorS);
});

// Fungsi untuk menambahkan laptop ke dalam array
function simpanBobot(harga, ram, harddisk, processor, vga) {
    // Membuat objek laptop
    const laptop = {
        harga: parseInt(harga),
        ram: parseInt(ram),
        harddisk: parseInt(harddisk),
        processor: parseInt(processor),
        vga: parseInt(vga)
    };
    // Menambahkan laptop ke dalam array bobotLaptop
    bobotLaptop.push(laptop);
}

// Fungsi untuk menambahkan laptop ke dalam array
function tambahItemLaptop(merek, hargaTeks, ramTeks, harddiskTeks, processorTeks, vgaTeks, harga, ram, harddisk, processor, vga) {
    // Membuat objek laptop
    const laptop = {
        merek: merek,
        harga: hargaTeks,
        ram: ramTeks,
        harddisk: harddiskTeks,
        processor: processorTeks,
        vga: vgaTeks,
        bobotHarga: parseInt(harga),    
        bobotRam: parseInt(ram),
        bobotHarddisk: parseInt(harddisk),
        bobotProcessor: parseInt(processor),
        bobotVGA: parseInt(vga),
        rangking: 0,
    };
    // Menambahkan laptop ke dalam array bobotLaptop
    itemLaptop.push(laptop);
}

function tambahItemRangkingLaptop(merek, hargaTeks, ramTeks, harddiskTeks, processorTeks, vgaTeks, harga, ram, harddisk, processor, vga, rangking) {
    // Membuat objek laptop
    const laptop = {
        merek: merek,
        harga: hargaTeks,
        ram: ramTeks,
        harddisk: harddiskTeks,
        processor: processorTeks,
        vga: vgaTeks,
        bobotHarga: parseInt(harga),    
        bobotRam: parseInt(ram),
        bobotHarddisk: parseInt(harddisk),
        bobotProcessor: parseInt(processor),
        bobotVGA: parseInt(vga),
        rangking: rangking,
    };
    // Menambahkan laptop ke dalam array bobotLaptop
    rangkingLaptop.push(laptop);
}

function tableLaptop(itemLaptop) {
  var tbody = document.querySelector("#laptopTable tbody");
  tbody.innerHTML = "";
  let nomor = 1;
  itemLaptop.forEach(function(laptop){
    var row = document.createElement("tr");
    row.innerHTML = "<td>" + nomor + "</td>" +
                    "<td>" + laptop.merek + "</td>" +
                    "<td>" + laptop.harga + "</td>" +
                    "<td>" + laptop.ram + "</td>" +
                    "<td>" + laptop.harddisk + "</td>" +
                    "<td>" + laptop.processor + "</td>" +
                    "<td>" + laptop.vga + "</td>";
    tbody.appendChild(row);
    nomor++;
  });
}

function tableLaptopRangking() {
  var tbody = document.querySelector("#laptopTableRangking tbody");
  tbody.innerHTML = "";
  let nomor = 1;
  rangkingLaptop.forEach(function(laptop){
    var row = document.createElement("tr");
    row.innerHTML = "<td>" + nomor + "</td>" +
                    "<td>" + laptop.merek + "</td>" +
                    "<td>" + laptop.harga + "</td>" +
                    "<td>" + laptop.ram + "</td>" +
                    "<td>" + laptop.harddisk + "</td>" +
                    "<td>" + laptop.processor + "</td>" +
                    "<td>" + laptop.vga + "</td>";
    tbody.appendChild(row);
    nomor++;
  });
}