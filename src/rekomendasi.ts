class InputPertanyaan{
        private name : string;
        private value : string;
        private idHtml : string;
        private pertanyaan : string;
        private valueInput : boolean;
    
        constructor(pertanyaan:string, name: string, idHTML: string, value: string){
            this.pertanyaan = pertanyaan
            this.name = name
            this.idHtml = idHTML;
            this.name = name;
            this.value = value
        }
    
        tampil(){
            return `<label><b>${this.pertanyaan}</b></label><br>
                    <input type="radio" name="${this.name}" id="${this.idHtml}" value="${this.value}"> Ya
                    <input type="radio" name="${this.name}" id="tidak" value="null"> Tidak
                    `
        }
    
        getValue(){
            let booleanChoice = (<HTMLInputElement>document.getElementById(this.idHtml)).checked
            if(booleanChoice){
                this.valueInput = true
                return this.valueInput
            }else{
                this.valueInput = false
                return this.valueInput
            }
        }
}

class InputNumber{
    private id : string;
    public idHTML : string;
    private valueInput : number;
    constructor(id: string, idHTML : string){
        this.id = id
        this.idHTML = idHTML
    }

    getValue(){
        this.valueInput = parseInt((<HTMLInputElement>document.getElementById(this.idHTML)).value)
        return this.valueInput
    }

    tampil(){
        return `<b>${this.id}</b><br><input type="number" style="width: 30px;" id="${this.idHTML}" value = 0 min = 0>`
    }

    reset(){
        (<HTMLInputElement>document.getElementById(this.idHTML)).value = "0"
        
    }
}

class Rekomendasi{
    public listMenu : Array<any>;
    public choiceTelur : boolean;
    public choiceManis : boolean;
    public choiceSoft : boolean;
    public choiceHarga15 : boolean;
    public namaMenuRekomendasi : string;
    public urlGambar : string;
    public harga : string;
    public arrayRekomendasi : Array<any>
 
    
    constructor(){
        this.listMenu = []
        this.arrayRekomendasi = []
    }

    getValue(){
        this.choiceTelur = pertanyaanTelurRadio.getValue();
        this.choiceManis = pertanyaanManisRadio.getValue();
        this.choiceSoft = pertanyaanSoftRadio.getValue();
        this.choiceHarga15 = pertanyaanHargaRadio.getValue();
    }

    getRekomendasi(){
        this.getValue()
        let listMenu = rekomendasi.listMenu
        for(let i=0;i<listMenu.length;i++){
            if((listMenu[i].telur === this.choiceTelur) && (listMenu[i].manis === this.choiceManis) && 
                (listMenu[i].soft === this.choiceSoft) && (listMenu[i].harga15 === this.choiceHarga15)){
                    this.arrayRekomendasi.push(listMenu[i])    
                }
        }
        let tampil = ""
        let rekomendasiArray = this.arrayRekomendasi
        for(let i=0;i<rekomendasiArray.length;i++){
            tampil += `<td><img src="img/${rekomendasiArray[i].linkGambar}" width="150px" height="150px" border="2px"><br>
                        <br>${rekomendasiArray[i].inputNumber.tampil()}<br>
                        <label>Rp. ${rekomendasiArray[i].harga}</label></td>`
        }
        document.getElementById("rekomendasi").innerHTML = tampil
        pesananCustomer.arrayTempRekomendasi = this.arrayRekomendasi;
        this.arrayRekomendasi = []
        return tampil
    }
    
}

class Menu{
    protected nama: string;
    public linkGambar: string;
    public telur : boolean;
    public manis : boolean;
    public soft : boolean;
    public harga15 : boolean;
    public harga : number;
    public qtyArray: Array<any>;
    public qtySemua: number;
    public subTotalArray : Array<any>;
    public subTotalSemua : number;
    public inputNumber : any;

    constructor(nama : string, linkGambar: string, telur : boolean, manis : boolean, soft : boolean, harga15 : boolean, harga : number, inputNumber :object){
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

    addQty(){
        this.qtyArray.push(this.inputNumber.getValue())
    }

    addSubTotal(){
        for(let i=0;i<this.qtyArray.length;i++){
            this.subTotalArray[i] = this.harga * this.qtyArray[i]
        }
    }

    hitungQtyTotalSemua(){
        let total = 0
        for(let i=0;i<this.qtyArray.length;i++){
            total += this.qtyArray[i]
        }
        this.qtySemua = total
    }

    hitungSubTotalSemua(){
        let total = 0
        for(let i=0;i<this.subTotalArray.length;i++){
            total += this.subTotalArray[i]
        }
        this.subTotalSemua = total
    }

    addToArray(){
        if(this.qtySemua > 0){
            for(let i= (-1); i < pesananCustomer.arrayPesanan.length; i++){
                if(pesananCustomer.arrayPesanan.indexOf(this) === -1){
                    pesananCustomer.arrayPesanan.push(this)
                }
            }
        }
    }

    hitungSemua(){
        this.addQty();
        this.addSubTotal();
        this.hitungQtyTotalSemua();
        this.hitungSubTotalSemua();
        this.addToArray();
    }

    tampil(){
        return `<img src="img/${this.linkGambar}" width="200px" height="200px" border="2px"><br>
                <label style="font-size: 25px;">${this.nama}</label>`

    };

}

class Pemesanan{
    public arrayPesanan : Array<any>
    public totalHarga : number
    public arrayTempRekomendasi : Array<any>
    constructor(){
        this.arrayPesanan = [];
        this.arrayTempRekomendasi = []
    }

    hitungTotalHarga(){
        let total = 0;
        for(let i=0;i<this.arrayPesanan.length;i++){
            total += this.arrayPesanan[i].subTotalSemua
        }
        this.totalHarga = total
    }

    tampil(){
        let teks = ''
        for(let i=0; i<this.arrayPesanan.length;i++){
            teks += `<tr>
                    <td>${[i+1]}</td>
                    <td>${this.arrayPesanan[i].nama}</td>
                    <td>${this.arrayPesanan[i].qtySemua}</td>
                    <td>${this.arrayPesanan[i].subTotalSemua}</td>
                    </tr>`
        }
        document.getElementById('tabelNota').innerHTML = teks
        document.getElementById('totalHarga').innerHTML = this.totalHarga.toString()
    }

    setArray(){
        let r = this.arrayTempRekomendasi;
        for(let i = 0; i<r.length;i++){
            r[i].hitungSemua();
        }    
    }
    resetAll(){
        for(let i = 0; i<this.arrayTempRekomendasi.length;i++){
            this.arrayTempRekomendasi[i].inputNumber.reset()
        }
    }
}

//Deklarasi Rekomendasi dan Pesanan
let rekomendasi = new Rekomendasi();
let pesananCustomer = new Pemesanan();


class Button {
    private id : string;
    private functionOnClick : string;
    private padding : string;
    private buttonName : string;

    constructor(id : string, functionOnClick : string, padding: string, buttonName : string){
        this.id = id
        this.padding = padding
        this.functionOnClick = functionOnClick
        this.buttonName = buttonName
    }
    tampil(){
        return `<button id="${this.id}" onclick="${this.functionOnClick}" style='padding:${this.padding}px;'>${this.buttonName}</button><br><br>`
    }
    hide(){
        document.getElementById(this.id).style.visibility = "hidden"
    }
    show(){
        document.getElementById(this.id).style.visibility = "visible"
    }
}

//Deklarasi Button
let buttonMenu = new Button("buttonMenu", "location.href='index.html';", "15", "Go To Menu")
let buttonPesan = new Button("buttonPesan", "Pesan()", "15", "Pesan")

document.getElementById("buttonPesan").innerHTML = buttonPesan.tampil();
buttonPesan.hide();
document.getElementById("tabelNota").style.visibility = "hidden";


//Deklarasi Pertanyaan
let pertanyaanTelurRadio = new InputPertanyaan("Apakah Anda Menyukai Makanan yang Mengandung Telur?", 
                                            "mengandungTelur", "qstTelur", "telur")
let pertanyaanManisRadio = new InputPertanyaan("Apakah Anda Menyukai Makanan Manis?", 
                                            "mengandungManis", "qstManis", "manis")
let pertanyaanSoftRadio = new InputPertanyaan("Apakah Anda Menyukai Makanan yang Bertekstur Soft?", 
                                            "mengandungSoft", "qstSoft", "soft")
let pertanyaanHargaRadio = new InputPertanyaan("Apakah Anda Menginginkan Makanan Dengan Harga Kurang dari Rp. 15.000?", 
                                            "mengandungHarga", "qstHarga15", "harga15")


//Penampilan
document.getElementById("pertanyaanTelur").innerHTML = pertanyaanTelurRadio.tampil();
document.getElementById("pertanyaanManis").innerHTML = pertanyaanManisRadio.tampil();
document.getElementById("pertanyaanSoft").innerHTML = pertanyaanSoftRadio.tampil();
document.getElementById("pertanyaanHarga").innerHTML = pertanyaanHargaRadio.tampil();
document.getElementById("buttonMenu").innerHTML = buttonMenu.tampil();


//Deklarasi Class Input Sweet
let inputNumberMuffin = new InputNumber("Muffin", "qtyMuffin");
let inputNumberFruitCrepes = new InputNumber("Fruit Crepes", "qtyFruitCrepes");
let inputNumberKueBalok = new InputNumber("Kue Balok", "qtyKueBalok");
let inputNumberBrownies = new InputNumber("Brownies", "qtyBrownies");
let inputNumberDonat = new InputNumber("Donat", "qtyDonat");
let inputNumberKlemben = new InputNumber("Klemben", "qtyKlemben");

let inputNumberCinnamonRoll = new InputNumber("Cinnamon Roll", "qtyCinnamonRoll");
let inputNumberKueLapis = new InputNumber("Kue Lapis", "qtyKueLapis");
let inputNumberKueCucur = new InputNumber("Kue Cucur", "qtyKueCucur");
let inputNumberEgglessCake = new InputNumber("Eggless Cake", "qtyEglessCake");
let inputNumberGoodTime = new InputNumber('Good Time Cookies', "qtyGoodTime");
let inputNumberKembangGoyang = new InputNumber('Kembang Goyang', "qtyKembangGoyang");
let inputNumberOatMeal = new InputNumber("Oat Meal Cookies", "qtyOatMeal");

//Deklarasi Class Input Savory
let inputNumberRotiAbon = new InputNumber("Roti Abon", "qtyRotiAbon")
let inputNumberPizza = new InputNumber("Pizza", "qtyPizza")
let inputNumberGarlicBread = new InputNumber("Garlic Bread", "qtyGarlicBread")
let inputNumberCroissant = new InputNumber("Croissant", "qtyCroissant")
let inputNumberRotiJagung = new InputNumber("Roti Jagung", "qtyRotiJagung")
let inputNumberVeggieCrepes = new InputNumber("Veggie Crepes", "qtyVeggieCrepes")

let inputNumberKueCantik = new InputNumber("Kue Cantik", "qtyKueCantik");
let inputNumberLumpiaBasah = new InputNumber("Lumpia Basah", "qtyLumpiaBasah");
let inputNumberKueBawang = new InputNumber("Kue Bawang", "qtyKueBawang");
let inputNumberPotatoChips = new InputNumber("Potato Chips", "qtyPotatoChips");

//Sweet Treats
let muffin = new Menu("Muffin", "muffin.jpg", true, true, true, true, 10000, inputNumberMuffin);
let kueBalok = new Menu("Kue Balok", "kueBalok.jpg", true, true, true, true, 14000, inputNumberKueBalok);
let brownies = new Menu("Brownies", "brownies.jpg", true, true, true, false, 18000, inputNumberBrownies);
let donat = new Menu("Donat", "donat.jpg", true, true, true, false, 16000, inputNumberDonat);
let cinnamonRoll = new Menu("Cinnamon Roll", "cinnamonRoll.jpg", true,true,true, false,18000, inputNumberCinnamonRoll);
let klemben = new Menu("Klemben", "klemben.png",true, true, false, true, 10000, inputNumberKlemben);
let fruitCrepes = new Menu("Fruit Crepes", "fruitCrepes.jpg",true, true, false, false, 15000, inputNumberFruitCrepes);
let kueLapis = new Menu("Kue Lapis", "kueLapis.jpg", false, true, true, true, 10000, inputNumberKueLapis);
let kueCucur = new Menu("Kue Cucur", "kueCucur.jpeg", false,true,true,true, 8000, inputNumberKueCucur);
let egglessCake = new Menu("Eggless Cake", "eglessSpongeCake.jpg", false, true, true, false, 20000, inputNumberEgglessCake);
let goodTime = new Menu("Good Time Cookies", "goodTimeCookies.jpg", false, true, false,true, 10000, inputNumberGoodTime);
let kembangGoyang = new Menu("Kembang Goyang", "kembangGoyang.jpg", false, true, false, true, 7000, inputNumberKembangGoyang);
let oatMeal = new Menu("Oat Meal Cookies", "oatMealCookies.jpg", false, true, false, false, 17000, inputNumberOatMeal);

///Savory
let pizzaSlice = new Menu("Pizza Slice", "pizzaSlice.jpg", true, false, true, true, 13000, inputNumberPizza);
let veggieCrepes = new Menu("Veggie Crepes", "savoryCrepes.jpg", true, false, false, false, 16000, inputNumberVeggieCrepes);
let rotiAbon = new Menu("Roti Abon", "rotiAbon.jpg", true, false, true, false, 17000, inputNumberRotiAbon);
let rotiJagung = new Menu("Roti Jagung", "rotiJagung.jpeg",true, false, true, false, 16000, inputNumberRotiJagung);
let croissant = new Menu("Croissant", "croissant.jpeg", true, false, false, true, 14000, inputNumberCroissant);
let garlicBread = new Menu("Garlic Bread", "garlicBread.jpg", true, false, false, false, 17000, inputNumberGarlicBread);
let kueCantik = new Menu("Kue Cantik", "kueCantik.jpg", false, false, true, true, 8000, inputNumberKueCantik);
let lumpiaBasah = new Menu("Lumpia Basah", "lumpiaBasah.jpg", false, false, true, false, 20000, inputNumberLumpiaBasah);
let kueBawang = new Menu("Kue Bawang", "kueBawang.jpg", false, false, false, true, 7000, inputNumberKueBawang);
let potatoChips = new Menu("Potato Chips", "potatoChips.jpg", false, false, false, false, 16000, inputNumberPotatoChips);

rekomendasi.listMenu.push(muffin, kueBalok, brownies, donat, cinnamonRoll, klemben, fruitCrepes,
    kueLapis, kueCucur, egglessCake, goodTime, kembangGoyang, oatMeal, pizzaSlice, veggieCrepes, rotiAbon,
    rotiJagung, croissant, garlicBread, kueCantik, lumpiaBasah, kueBawang, potatoChips);

function Pesan(){
    document.getElementById("tabelNota").style.visibility = "visible";
    pesananCustomer.setArray();
    pesananCustomer.hitungTotalHarga();
    pesananCustomer.tampil();
    pesananCustomer.resetAll();
}
function TampilkanRekomendasi(){
    rekomendasi.getRekomendasi();
    buttonPesan.show();
}


