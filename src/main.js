var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//Deklarasi Class dan Array
var Pemesanan = /** @class */ (function () {
    function Pemesanan() {
        this.arrayPesanan = [];
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
        //Get Value Sweet and SubTotal and AddToArray Sweet
        muffin.hitungSemua(inputNumberMuffin.getValue());
        fruitCrepes.hitungSemua(inputNumberFruitCrepes.getValue());
        kueBalok.hitungSemua(inputNumberKueBalok.getValue());
        brownies.hitungSemua(inputNumberBrownies.getValue());
        donat.hitungSemua(inputNumberDonat.getValue());
        klemben.hitungSemua(inputNumberKlemben.getValue());
        kueLapis.hitungSemua(inputNumberKueLapis.getValue());
        kueCucur.hitungSemua(inputNumberKueCucur.getValue());
        eglessCake.hitungSemua(inputNumberEgglessCake.getValue());
        goodTime.hitungSemua(inputNumberGoodTime.getValue());
        kembangGoyang.hitungSemua(inputNumberKembangGoyang.getValue());
        oatMeal.hitungSemua(inputNumberOatMeal.getValue());
        //Savory
        rotiAbon.hitungSemua(inputNumberRotiAbon.getValue());
        pizza.hitungSemua(inputNumberPizza.getValue());
        garlicBread.hitungSemua(inputNumberGarlicBread.getValue());
        croissant.hitungSemua(inputNumberCroissant.getValue());
        rotiJagung.hitungSemua(inputNumberRotiJagung.getValue());
        veggieCrepes.hitungSemua(inputNumberVeggieCrepes.getValue());
        kueCantik.hitungSemua(inputNumberKueCantik.getValue());
        lumpiaBasah.hitungSemua(inputNumberLumpiaBasah.getValue());
        kueBawang.hitungSemua(inputNumberKueBawang.getValue());
        potatoChips.hitungSemua(inputNumberPotatoChips.getValue());
        //Minuman
        matcha.hitungSemua(inputNumberMatcha.getValue());
        chocolate.hitungSemua(inputNumberChocolate.getValue());
        lemonTea.hitungSemua(inputNumberLemonTea.getValue());
        coffee.hitungSemua(inputNumberCoffee.getValue());
        milkTea.hitungSemua(inputNumberMilkTea.getValue());
    };
    Pemesanan.prototype.resetAll = function () {
        inputNumberMuffin.reset();
        inputNumberFruitCrepes.reset();
        inputNumberKueBalok.reset();
        inputNumberBrownies.reset();
        inputNumberDonat.reset();
        inputNumberKlemben.reset();
        inputNumberCinnamonRoll.reset();
        inputNumberKueLapis.reset();
        inputNumberKueCucur.reset();
        inputNumberEgglessCake.reset();
        inputNumberGoodTime.reset();
        inputNumberKembangGoyang.reset();
        inputNumberOatMeal.reset();
        //Savory
        inputNumberRotiAbon.reset();
        inputNumberPizza.reset();
        inputNumberGarlicBread.reset();
        inputNumberCroissant.reset();
        inputNumberRotiJagung.reset();
        inputNumberVeggieCrepes.reset();
        inputNumberKueCantik.reset();
        inputNumberLumpiaBasah.reset();
        inputNumberKueBawang.reset();
        inputNumberPotatoChips.reset();
        //Drinks
        inputNumberMatcha.reset();
        inputNumberChocolate.reset();
        inputNumberLemonTea.reset();
        inputNumberCoffee.reset();
        inputNumberMilkTea.reset();
    };
    return Pemesanan;
}());
//Array Pemesanan
var pesananCustomer = new Pemesanan();
var Input = /** @class */ (function () {
    function Input(type) {
        this.type = type;
    }
    return Input;
}());
var InputNumber = /** @class */ (function (_super) {
    __extends(InputNumber, _super);
    function InputNumber(id, idHTML) {
        var _this = _super.call(this, "number") || this;
        _this.id = id;
        _this.idHTML = idHTML;
        return _this;
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
}(Input));
var Menu = /** @class */ (function () {
    function Menu(nama, harga) {
        this.nama = nama;
        this.harga = harga;
        this.subTotalArray = [];
        this.qtyArray = [];
    }
    Menu.prototype.addQty = function (numberParam) {
        this.qtyArray.push(numberParam);
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
    Menu.prototype.hitungSemua = function (qtyParam) {
        this.addQty(qtyParam);
        this.addSubTotal();
        this.hitungQtyTotalSemua();
        this.hitungSubTotalSemua();
        this.addToArray();
    };
    return Menu;
}());
var Button = /** @class */ (function () {
    function Button(id, functionOnClick, padding) {
        this.id = id;
        this.padding = padding;
        this.functionOnClick = functionOnClick;
    }
    Button.prototype.tampil = function () {
        return " <button onclick=\"" + this.functionOnClick + "\" style=\"padding:" + this.padding + "px;\"> " + this.id + " </button> ";
    };
    return Button;
}());
//Deklarasi Tanggal
var date = new Date();
var text = "Tanggal : " + date.getDate() + " - " + ((date.getMonth()) + 1) + " - " + date.getFullYear();
document.getElementById("tanggal").innerHTML = text;
//Deklarasi Class Button
var buttonGo = new Button('Go Rekomendasi', "location.href='rekomendasi.html';", '15');
var buttonCetakNota = new Button("Pesan", 'CetakNota()', '25');
//Penampilan Button
document.getElementById('buttonCetakNota').innerHTML = buttonCetakNota.tampil();
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
//Penampilan Class Input Sweet
document.getElementById("muffin").innerHTML = inputNumberMuffin.tampil();
document.getElementById("fruitCrepes").innerHTML = inputNumberFruitCrepes.tampil();
document.getElementById("kueBalok").innerHTML = inputNumberKueBalok.tampil();
document.getElementById("brownies").innerHTML = inputNumberBrownies.tampil();
document.getElementById("donat").innerHTML = inputNumberDonat.tampil();
document.getElementById("klemben").innerHTML = inputNumberKlemben.tampil();
document.getElementById('cinnamonRoll').innerHTML = inputNumberCinnamonRoll.tampil();
document.getElementById('kueLapis').innerHTML = inputNumberKueLapis.tampil();
document.getElementById('kueCucur').innerHTML = inputNumberKueCucur.tampil();
document.getElementById('egglessCake').innerHTML = inputNumberEgglessCake.tampil();
document.getElementById('goodTimeCookies').innerHTML = inputNumberGoodTime.tampil();
document.getElementById('kembangGoyang').innerHTML = inputNumberKembangGoyang.tampil();
document.getElementById('oatMeal').innerHTML = inputNumberOatMeal.tampil();
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
//Penampilan Class Input Savory
document.getElementById("rotiAbon").innerHTML = inputNumberRotiAbon.tampil();
document.getElementById("pizza").innerHTML = inputNumberPizza.tampil();
document.getElementById("garlicBread").innerHTML = inputNumberGarlicBread.tampil();
document.getElementById("croissant").innerHTML = inputNumberCroissant.tampil();
document.getElementById("rotiJagung").innerHTML = inputNumberRotiJagung.tampil();
document.getElementById("veggieCrepes").innerHTML = inputNumberVeggieCrepes.tampil();
document.getElementById("kueCantik").innerHTML = inputNumberKueCantik.tampil();
document.getElementById("lumpiaBasah").innerHTML = inputNumberLumpiaBasah.tampil();
document.getElementById("kueBawang").innerHTML = inputNumberKueBawang.tampil();
document.getElementById("potatoChips").innerHTML = inputNumberPotatoChips.tampil();
//Deklarasi Class Input Minuman
var inputNumberMatcha = new InputNumber("Matcha", "qtyMatcha");
var inputNumberChocolate = new InputNumber("Chocolate", "qtyChocolate");
var inputNumberLemonTea = new InputNumber("Lemon Tea", "qtyLemonTea");
var inputNumberCoffee = new InputNumber("Coffee", "qtyCoffee");
var inputNumberMilkTea = new InputNumber("Milk Tea", "qtyMilkTea");
//Penampilan Class Input Minuman
document.getElementById("matcha").innerHTML = inputNumberMatcha.tampil();
document.getElementById("chocolate").innerHTML = inputNumberChocolate.tampil();
document.getElementById("lemonTea").innerHTML = inputNumberLemonTea.tampil();
document.getElementById("coffee").innerHTML = inputNumberCoffee.tampil();
document.getElementById("milkTea").innerHTML = inputNumberMilkTea.tampil();
//Deklrasi Rasa dan Tekstur , Button Go
document.getElementById("buttonGo").innerHTML = buttonGo.tampil();
//Deklarasi Class Menu Sweet Treats
var muffin = new Menu("Muffin", 10000);
var fruitCrepes = new Menu("Fruit Crepes", 15000);
var kueBalok = new Menu("Kue Balok", 14000);
var brownies = new Menu("Brownies", 18000);
var donat = new Menu("Donat", 16000);
var klemben = new Menu("Klemben", 10000);
var cinnamonRoll = new Menu("Cinnamon Roll", 18000);
var kueLapis = new Menu("Kue Lapis", 10000);
var kueCucur = new Menu("Kue Cucur", 8000);
var eglessCake = new Menu("Egless Cake", 20000);
var goodTime = new Menu("Good Time Cookies", 10000);
var kembangGoyang = new Menu("Kembang Goyang", 7000);
var oatMeal = new Menu("Oat Meal Cookies", 17000);
//Deklarasi Class Menu Savory Treats
var rotiAbon = new Menu("Roti Abon", 17000);
var pizza = new Menu("Pizza", 13000);
var garlicBread = new Menu("Garlic Bread", 17000);
var croissant = new Menu("Croissant", 14000);
var rotiJagung = new Menu("Roti Jagung", 16000);
var veggieCrepes = new Menu("Veggie Crepes", 16000);
var kueCantik = new Menu("Kue Cantik", 8000);
var lumpiaBasah = new Menu("Lumpia Basah", 20000);
var kueBawang = new Menu("Kue Bawang", 7000);
var potatoChips = new Menu("Potato Chips", 16000);
//Deklarasi Class Menu Minuman
var matcha = new Menu("Matcha", 15000);
var chocolate = new Menu("Chocolate", 15000);
var lemonTea = new Menu("Lemon Tea", 17000);
var coffee = new Menu("Coffee", 12000);
var milkTea = new Menu("Milk Tea", 20000);
function CetakNota() {
    pesananCustomer.setArray();
    pesananCustomer.hitungTotalHarga();
    pesananCustomer.tampil();
    pesananCustomer.resetAll();
}
