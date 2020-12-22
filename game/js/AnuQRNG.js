class AnuQRNG {
    constructor(seed) {
        this.seed = seed;
        //this.url = "https://qrng.anu.edu.au/API/jsonI.php?length=1024&type=uint16";
        this.url = "https://www.random.org/integers/?num=4&min=1000000&max=2000000&col=1&base=10&format=plain&rnd=new"
        //this.random_numbers = this.random();
    }
    // random() {
    //   if (this.random_numbers.length == 0) {
    //     this.random_numbers = this.get_number();
    //   }
    //   return this.random_numbers.pop()/1000000;
    // }

    random() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", this.url, false); // false for synchronous request
        xmlHttp.send(null);
        let lista;
        lista = xmlHttp.responseText.split('\n');
        lista.pop();
        for (let index = 0; index < lista.length; index++) {
          lista[index] = lista[index]/1000000;
        }
        console.log(lista);
        
        
        return (lista);
    }
}
