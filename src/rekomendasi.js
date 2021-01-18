var InputPertanyaan = /** @class */ (function () {
    function InputPertanyaan(pertanyaan, name, idHTML, value) {
        this.pertanyaan = pertanyaan;
        this.name = name;
        this.idHtml = idHTML;
        this.name = name;
        this.value = value;
    }
    InputPertanyaan.prototype.tampil = function () {
        return "<label><b>" + this.pertanyaan + "</b></label><br>\n                    <input type=\"radio\" name=\"" + this.name + "\" id=\"" + this.idHtml + "\" value=\"" + this.value + "\"> Ya\n                    <input type=\"radio\" name=\"" + this.name + "\" id=\"tidak\" value=\"null\"> Tidak\n                    ";
    };
    InputPertanyaan.prototype.getValue = function () {
        var booleanChoice = document.getElementById(this.idHtml).checked;
        if (booleanChoice) {
            this.valueInput = true;
            return this.valueInput;
        }
        else {
            this.valueInput = false;
            return this.valueInput;
        }
    };
    return InputPertanyaan;
}());
var InputNumber = /** @class */ (function () {
    function InputNumber(id, idHTML) {
        this.id = id;
        this.idHTML = idHTML;
    }
    InputNumber.prototype.getValue = function () {
        this.valueInput = parseInt(document.getElementById(this.idHTML).value);
        return this.valueInput;
    };
    InputNumber.prototype.tampil = function () {
        return "<b>" + this.id + "</b><br><input type=\"number\" style=\"width: 30px;\" id=\"" + this.idHTML + "\" value = 0 min = 0>";
    };
    InputNumber.prototype.reset = function () {
        document.getElementById(this.idHTML).value = "0";
    };
    return InputNumber;
}());
var Rekomendasi = /** @class */ (function () {
    function Rekomendasi() {
        this.listMenu = [];
        this.arrayRekomendasi = [];
    }
    Rekomendasi.prototype.getValue = function () {
        this.choiceTelur = pertanyaanTelurRadio.getValue();
        this.choiceManis = pertanyaanManisRadio.getValue();
        this.choiceSoft = pertanyaanSoftRadio.getValue();
        this.choiceHarga15 = pertanyaanHargaRadio.getValue();
    };
    Rekomendasi.prototype.getRekomendasi = function () {
        this.getValue();
        var listMenu = rekomendasi.listMenu;
        for (var i = 0; i < listMenu.length; i++) {
            if ((listMenu[i].telur === this.choiceTelur) && (listMenu[i].manis === this.choiceManis) &&
                (listMenu[i].soft === this.choiceSoft) && (listMenu[i].harga15 === this.choiceHarga15)) {
                this.arrayRekomendasi.push(listMenu[i]);
            }
        }
        var tampil = "";
        var rekomendasiArray = this.arrayRekomendasi;
        for (var i = 0; i < rekomendasiArray.length; i++) {
            tampil += "<td><img src=\"img/" + rekomendasiArray[i].linkGambar + "\" width=\"150px\" height=\"150px\" border=\"2px\"><br>\n                        <br>" + rekomendasiArray[i].inputNumber.tampil() + "<br>\n                        <label>Rp. " + rekomendasiArray[i].harga + "</label></td>";
        }
        document.getElementById("rekomendasi").innerHTML = tampil;
        pesananCustomer.arrayTempRekomendasi = this.arrayRekomendasi;
        this.arrayRekomendasi = [];
        return tampil;
    };
    return Rekomendasi;
}());
var Menu = /** @class */ (function () {
    function Menu(nama, linkGambar, telur, manis, soft, harga15, harga, inputNumber) {
        this.nama = nama;
        this.linkGambar = linkGambar;
        this.telur = telur;
        this.manis = manis;
        this.soft = soft;
        this.harga15 = harga15;
        this.harga = harga;
        this.inputNumber = inputNumber;
        this.qtyArray = [];
        this.subTotalArray = [];
    }
    Menu.prototype.addQty = function () {
        this.qtyArray.push(this.inputNumber.getValue());
    };
    Menu.prototype.addSubTotal = function () {
        for (var i = 0; i < this.qtyArray.length; i++) {
            this.subTotalArray[i] = this.harga * this.qtyArray[i];
        }
    };
    Menu.prototype.hitungQtyTotalSemua = function () {
        var total = 0;
        for (var i = 0; i < this.qtyArray.length; i++) {
            total += this.qtyArray[i];
        }
        this.qtySemua = total;
    };
    Menu.prototype.hitungSubTotalSemua = function () {
        var total = 0;
        for (var i = 0; i < this.subTotalArray.length; i++) {
            total += this.subTotalArray[i];
        }
        this.subTotalSemua = total;
    };
    Menu.prototype.addToArray = function () {
        if (this.qtySemua > 0) {
            for (var i = (-1); i < pesananCustomer.arrayPesanan.length; i++) {
                if (pesananCustomer.arrayPesanan.indexOf(this) === -1) {
                    pesananCustomer.arrayPesanan.push(this);
                }
            }
        }
    };
    Menu.prototype.hitungSemua = function () {
        this.addQty();
        this.addSubTotal();
        this.hitungQtyTotalSemua();
        this.hitungSubTotalSemua();
        this.addToArray();
    };
    Menu.prototype.tampil = function () {
        return "<img src=\"img/" + this.linkGambar + "\" width=\"200px\" height=\"200px\" border=\"2px\"><br>\n                <label style=\"font-size: 25px;\">" + this.nama + "</label>";
    };
    ;
    return Menu;
}());
var Pemesanan = /** @class */ (function () {
    function Pemesanan() {
        this.arrayPesanan = [];
        this.arrayTempRekomendasi = [];
    }
    Pemesanan.prototype.hitungTotalHarga = function () {
        var total = 0;
        for (var i = 0; i < this.arrayPesanan.length; i++) {
            total += this.arrayPesanan[i].subTotalSemua;
        }
        this.totalHarga = total;
    };
    Pemesanan.prototype.tampil = function () {
        var teks = '';
        for (var i = 0; i < this.arrayPesanan.length; i++) {
            teks += "<tr>\n                    <td>" + [i + 1] + "</td>\n                    <td>" + this.arrayPesanan[i].nama + "</td>\n                    <td>" + this.arrayPesanan[i].qtySemua + "</td>\n                    <td>" + this.arrayPesanan[i].subTotalSemua + "</td>\n                    </tr>";
        }
        document.getElementById('tabelNota').innerHTML = teks;
        document.getElementById('totalHarga').innerHTML = this.totalHarga.toString();
    };
    Pemesanan.prototype.setArray = function () {
        var r = this.arrayTempRekomendasi;
        for (var i = 0; i < r.length; i++) {
            r[i].hitungSemua();
        }
    };
    Pemesanan.prototype.resetAll = function () {
        for (var i = 0; i < this.arrayTempRekomendasi.length; i++) {
            this.arrayTempRekomendasi[i].inputNumber.reset();
        }
    };
    return Pemesanan;
}());
//Deklarasi Rekomendasi dan Pesanan
var rekomendasi = new Rekomendasi();
var pesananCustomer = new Pemesanan();
var Button = /** @class */ (function () {
    function Button(id, functionOnClick, padding, buttonName) {
        this.id = id;
        this.padding = padding;
        this.functionOnClick = functionOnClick;
        this.buttonName = buttonName;
    }
    Button.prototype.tampil = function () {
        return "<button id=\"" + this.id + "\" onclick=\"" + this.functionOnClick + "\" style='padding:" + this.padding + "px;'>" + this.buttonName + "</button><br><br>";
    };
    Button.prototype.hide = function () {
        document.getElementById(this.id).style.visibility = "hidden";
    };
    Button.prototype.show = function () {
        document.getElementById(this.id).style.visibility = "visible";
    };
    return Button;
}());
//Deklarasi Button
var buttonMenu = new Button("buttonMenu", "location.href='index.html';", "15", "Go To Menu");
var buttonPesan = new Button("buttonPesan", "Pesan()", "15", "Pesan");
document.getElementById("buttonPesan").innerHTML = buttonPesan.tampil();
buttonPesan.hide();
document.getElementById("tabelNota").style.visibility = "hidden";
//Deklarasi Pertanyaan
var pertanyaanTelurRadio = new InputPertanyaan("Apakah Anda Menyukai Makanan yang Mengandung Telur?", "mengandungTelur", "qstTelur", "telur");
var pertanyaanManisRadio = new InputPertanyaan("Apakah Anda Menyukai Makanan Manis?", "mengandungManis", "qstManis", "manis");
var pertanyaanSoftRadio = new InputPertanyaan("Apakah Anda Menyukai Makanan yang Bertekstur Soft?", "mengandungSoft", "qstSoft", "soft");
var pertanyaanHargaRadio = new InputPertanyaan("Apakah Anda Menginginkan Makanan Dengan Harga Kurang dari Rp. 15.000?", "mengandungHarga", "qstHarga15", "harga15");
//Penampilan
document.getElementById("pertanyaanTelur").innerHTML = pertanyaanTelurRadio.tampil();
document.getElementById("pertanyaanManis").innerHTML = pertanyaanManisRadio.tampil();
document.getElementById("pertanyaanSoft").innerHTML = pertanyaanSoftRadio.tampil();
document.getElementById("pertanyaanHarga").innerHTML = pertanyaanHargaRadio.tampil();
document.getElementById("buttonMenu").innerHTML = buttonMenu.tampil();
//Deklarasi Class Input Sweet
var inputNumberMuffin = new InputNumber("Muffin", "qtyMuffin");
var inputNumberFruitCrepes = new InputNumber("Fruit Crepes", "qtyFruitCrepes");
var inputNumberKueBalok = new InputNumber("Kue Balok", "qtyKueBalok");
var inputNumberBrownies = new InputNumber("Brownies", "qtyBrownies");
var inputNumberDonat = new InputNumber("Donat", "qtyDonat");
var inputNumberKlemben = new InputNumber("Klemben", "qtyKlemben");
var inputNumberCinnamonRoll = new InputNumber("Cinnamon Roll", "qtyCinnamonRoll");
var inputNumberKueLapis = new InputNumber("Kue Lapis", "qtyKueLapis");
var inputNumberKueCucur = new InputNumber("Kue Cucur", "qtyKueCucur");
var inputNumberEgglessCake = new InputNumber("Eggless Cake", "qtyEglessCake");
var inputNumberGoodTime = new InputNumber('Good Time Cookies', "qtyGoodTime");
var inputNumberKembangGoyang = new InputNumber('Kembang Goyang', "qtyKembangGoyang");
var inputNumberOatMeal = new InputNumber("Oat Meal Cookies", "qtyOatMeal");
//Deklarasi Class Input Savory
var inputNumberRotiAbon = new InputNumber("Roti Abon", "qtyRotiAbon");
var inputNumberPizza = new InputNumber("Pizza", "qtyPizza");
var inputNumberGarlicBread = new InputNumber("Garlic Bread", "qtyGarlicBread");
var inputNumberCroissant = new InputNumber("Croissant", "qtyCroissant");
var inputNumberRotiJagung = new InputNumber("Roti Jagung", "qtyRotiJagung");
var inputNumberVeggieCrepes = new InputNumber("Veggie Crepes", "qtyVeggieCrepes");
var inputNumberKueCantik = new InputNumber("Kue Cantik", "qtyKueCantik");
var inputNumberLumpiaBasah = new InputNumber("Lumpia Basah", "qtyLumpiaBasah");
var inputNumberKueBawang = new InputNumber("Kue Bawang", "qtyKueBawang");
var inputNumberPotatoChips = new InputNumber("Potato Chips", "qtyPotatoChips");
//Sweet Treats
var muffin = new Menu("Muffin", "muffin.jpg", true, true, true, true, 10000, inputNumberMuffin);
var kueBalok = new Menu("Kue Balok", "kueBalok.jpg", true, true, true, true, 14000, inputNumberKueBalok);
var brownies = new Menu("Brownies", "brownies.jpg", true, true, true, false, 18000, inputNumberBrownies);
var donat = new Menu("Donat", "donat.jpg", true, true, true, false, 16000, inputNumberDonat);
var cinnamonRoll = new Menu("Cinnamon Roll", "cinnamonRoll.jpg", true, true, true, false, 18000, inputNumberCinnamonRoll);
var klemben = new Menu("Klemben", "klemben.png", true, true, false, true, 10000, inputNumberKlemben);
var fruitCrepes = new Menu("Fruit Crepes", "fruitCrepes.jpg", true, true, false, false, 15000, inputNumberFruitCrepes);
var kueLapis = new Menu("Kue Lapis", "kueLapis.jpg", false, true, true, true, 10000, inputNumberKueLapis);
var kueCucur = new Menu("Kue Cucur", "kueCucur.jpeg", false, true, true, true, 8000, inputNumberKueCucur);
var egglessCake = new Menu("Eggless Cake", "eglessSpongeCake.jpg", false, true, true, false, 20000, inputNumberEgglessCake);
var goodTime = new Menu("Good Time Cookies", "goodTimeCookies.jpg", false, true, false, true, 10000, inputNumberGoodTime);
var kembangGoyang = new Menu("Kembang Goyang", "kembangGoyang.jpg", false, true, false, true, 7000, inputNumberKembangGoyang);
var oatMeal = new Menu("Oat Meal Cookies", "oatMealCookies.jpg", false, true, false, false, 17000, inputNumberOatMeal);
///Savory
var pizzaSlice = new Menu("Pizza Slice", "pizzaSlice.jpg", true, false, true, true, 13000, inputNumberPizza);
var veggieCrepes = new Menu("Veggie Crepes", "savoryCrepes.jpg", true, false, false, false, 16000, inputNumberVeggieCrepes);
var rotiAbon = new Menu("Roti Abon", "rotiAbon.jpg", true, false, true, false, 17000, inputNumberRotiAbon);
var rotiJagung = new Menu("Roti Jagung", "rotiJagung.jpeg", true, false, true, false, 16000, inputNumberRotiJagung);
var croissant = new Menu("Croissant", "croissant.jpeg", true, false, false, true, 14000, inputNumberCroissant);
var garlicBread = new Menu("Garlic Bread", "garlicBread.jpg", true, false, false, false, 17000, inputNumberGarlicBread);
var kueCantik = new Menu("Kue Cantik", "kueCantik.jpg", false, false, true, true, 8000, inputNumberKueCantik);
var lumpiaBasah = new Menu("Lumpia Basah", "lumpiaBasah.jpg", false, false, true, false, 20000, inputNumberLumpiaBasah);
var kueBawang = new Menu("Kue Bawang", "kueBawang.jpg", false, false, false, true, 7000, inputNumberKueBawang);
var potatoChips = new Menu("Potato Chips", "potatoChips.jpg", false, false, false, false, 16000, inputNumberPotatoChips);
rekomendasi.listMenu.push(muffin, kueBalok, brownies, donat, cinnamonRoll, klemben, fruitCrepes, kueLapis, kueCucur, egglessCake, goodTime, kembangGoyang, oatMeal, pizzaSlice, veggieCrepes, rotiAbon, rotiJagung, croissant, garlicBread, kueCantik, lumpiaBasah, kueBawang, potatoChips);
function Pesan() {
    document.getElementById("tabelNota").style.visibility = "visible";
    pesananCustomer.setArray();
    pesananCustomer.hitungTotalHarga();
    pesananCustomer.tampil();
    pesananCustomer.resetAll();
}
function TampilkanRekomendasi() {
    rekomendasi.getRekomendasi();
    buttonPesan.show();
}
