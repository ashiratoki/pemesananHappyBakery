//Deklarasi Class dan Array
class Pemesanan{
    public arrayPesanan : Array<any>
    public totalHarga : number
    constructor(){
        this.arrayPesanan = [];
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
    }

    resetAll(){
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
    }
}

//Array Pemesanan
let pesananCustomer = new Pemesanan();
let menu = new Array()

abstract class Input{
    protected type: string;
    protected id: string;
    protected valueInput: any;
    protected idHTML: string;

    constructor(type: string){
        this.type = type;
    }

    abstract getValue();
    abstract tampil();
}

class InputNumber extends Input{
    constructor(id: string, idHTML : string){
        super("number");
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

class InputRadio extends Input{
    private name : string
    private value : string

    constructor( name: string, id: string, idHTML: string, value: string){
        super("radio");
        this.id = id;
        this.idHTML = idHTML;
        this.name = name;
        this.value = value
    }

    tampil(){
        return `<input type="${this.type}" name="${this.name}" id="${this.idHTML}" value="${this.value}">`
    }

    getValue(){
        let booleanChoice = (<HTMLInputElement>document.getElementById(this.idHTML)).checked
        if(booleanChoice){
            this.valueInput = (<HTMLInputElement>document.getElementById(this.idHTML)).value
            return this.valueInput
        }else{
            this.valueInput = "null"
            return this.valueInput
        }
    }
}

class Menu{
    protected nama: string;
    protected harga: number;
    public qtyArray: Array<any>;
    public qtySemua: number;
    public subTotalArray : Array<any>;
    public subTotalSemua : number;

    constructor(nama : string, harga: number){
        this.nama = nama;
        this.harga = harga;
        this.subTotalArray = []
        this.qtyArray = []
    }

    addQty(numberParam){
        this.qtyArray.push(numberParam)
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

    hitungSemua(qtyParam){
        this.addQty(qtyParam);
        this.addSubTotal();
        this.hitungQtyTotalSemua();
        this.hitungSubTotalSemua();
        this.addToArray();
    }
  
}

class Button {
    public id : string;
    public functionOnClick : string;
    public padding : string;
    

    constructor(id : string, functionOnClick : string, padding: string){
        this.id = id
        this.padding = padding
        this.functionOnClick = functionOnClick
    }
    tampil(){
        return ` <button onclick="${this.functionOnClick}" style="padding:${this.padding}px;"> ${this.id} </button> `
    }
}

//Deklarasi Tanggal
let date = new Date();
let text = `Tanggal : ${date.getDate()} - ${(date.getMonth()) + 1} - ${date.getFullYear()}`
document.getElementById("tanggal").innerHTML = text;

//Deklarasi Class Button
let buttonGo = new Button('Go Rekomendasi', "location.href='rekomendasi.html';", '15')
let buttonCetakNota = new Button("Pesan", 'CetakNota()', '25')

//Penampilan Button
document.getElementById('buttonCetakNota').innerHTML = buttonCetakNota.tampil()

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
let inputNumberMatcha = new InputNumber("Matcha", "qtyMatcha");
let inputNumberChocolate = new InputNumber("Chocolate", "qtyChocolate");
let inputNumberLemonTea = new InputNumber("Lemon Tea", "qtyLemonTea");
let inputNumberCoffee = new InputNumber("Coffee", "qtyCoffee");
let inputNumberMilkTea = new InputNumber("Milk Tea", "qtyMilkTea");

//Penampilan Class Input Minuman
document.getElementById("matcha").innerHTML = inputNumberMatcha.tampil();
document.getElementById("chocolate").innerHTML = inputNumberChocolate.tampil();
document.getElementById("lemonTea").innerHTML = inputNumberLemonTea.tampil();
document.getElementById("coffee").innerHTML = inputNumberCoffee.tampil();
document.getElementById("milkTea").innerHTML = inputNumberMilkTea.tampil();

//Deklarasi Class Input Radio
let inputRadioRasaSweet = new InputRadio("rasa", "sweetRadio", "rasaSweet", "sweet");
let inputRadioRasaSavory = new InputRadio("rasa", "savoryRadio", "rasaSavory", "savory");
let inputRadioTeksturSoft = new InputRadio("tekstur", "softRadio", "teksturSoft", "soft");
let inputRadioTeksturCrunchy = new InputRadio("tekstur", "crunchyRadio", "teksturCrunchy", "crunchy");

//Deklrasi Rasa dan Tekstur , Button Go
document.getElementById("buttonGo").innerHTML = buttonGo.tampil();

//Deklarasi Class Menu Sweet Treats
let muffin = new Menu("Muffin", 10000);
let fruitCrepes = new Menu("Fruit Crepes", 15000,);
let kueBalok = new Menu("Kue Balok", 14000);
let brownies = new Menu("Brownies", 18000);
let donat = new Menu("Donat", 16000);
let klemben = new Menu("Klemben", 10000);

let cinnamonRoll = new Menu("Cinnamon Roll", 18000);
let kueLapis = new Menu("Kue Lapis", 10000);
let kueCucur = new Menu("Kue Cucur", 8000);
let eglessCake = new Menu("Egless Cake", 20000);
let goodTime = new Menu("Good Time Cookies", 10000);
let kembangGoyang = new Menu("Kembang Goyang", 7000);
let oatMeal = new Menu("Oat Meal Cookies", 17000);

//Deklarasi Class Menu Savory Treats
let rotiAbon = new Menu("Roti Abon", 17000);
let pizza = new Menu("Pizza", 13000);
let garlicBread = new Menu("Garlic Bread", 17000);
let croissant = new Menu("Croissant", 14000);
let rotiJagung = new Menu("Roti Jagung", 16000);
let veggieCrepes = new Menu("Veggie Crepes", 16000);

let kueCantik = new Menu("Kue Cantik", 8000);
let lumpiaBasah = new Menu("Lumpia Basah", 20000);
let kueBawang = new Menu("Kue Bawang", 7000);
let potatoChips = new Menu("Potato Chips", 16000);

//Deklarasi Class Menu Minuman
let matcha = new Menu("Matcha", 15000);
let chocolate = new Menu("Chocolate", 15000);
let lemonTea = new Menu("Lemon Tea", 17000)
let coffee = new Menu("Coffee", 12000,);
let milkTea = new Menu("Milk Tea", 20000)

//Push ke dalam menu
menu.push(muffin, fruitCrepes, kueBalok, brownies, donat, klemben, 
         rotiAbon, pizza, garlicBread, croissant, rotiJagung, veggieCrepes,
         matcha, chocolate, lemonTea, coffee, milkTea);

function CetakNota(){
    pesananCustomer.setArray();
    pesananCustomer.hitungTotalHarga();
    pesananCustomer.tampil();
    pesananCustomer.resetAll();
}

let divButtonCetakNota = document.getElementById("buttonCetakNota").innerHTML
buttonCetakNota.functionOnClick = "CetakNota()";
divButtonCetakNota = buttonCetakNota.tampil()
