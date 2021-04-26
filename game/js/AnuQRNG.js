class AnuQRNG {
    constructor(seed,controle='player') {
        this.seed = seed;
        this.lista = [];
        //this.url = "https://qrng.anu.edu.au/API/jsonI.php?length=1024&type=uint16";
        if (controle == 'player') {
          this.url = "https://www.random.org/integers/?num=20&min=1000000&max=3000000&col=1&base=10&format=plain&rnd=new"
        }
        else{
          this.url = "https://www.random.org/integers/?num=960&min=1000000&max=3000000&col=1&base=10&format=plain&rnd=new"
        }
        
        //this.random_numbers = this.random();
    }
    // random() {
    //   if (this.random_numbers.length == 0) {
    //     this.random_numbers = this.get_number();
    //   }
    //   return this.random_numbers.pop()/1000000;
    // }

    random(controle=false) {
        if (controle==false){
            console.log(this.lista)
            if (this.lista.length > 8){
                let numeros;
                numeros = this.lista.slice(Math.max(this.lista.length - 4, 0));
                this.lista.length = this.lista.length - 4;
                return numeros;
            }
            else{
              var xmlHttp = new XMLHttpRequest();
              xmlHttp.open("GET", this.url, false); // false for synchronous request
              xmlHttp.send(null);
              this.lista = xmlHttp.responseText.split('\n');
              this.lista.pop();
              for (let index = 0; index < this.lista.length; index++) {
                this.lista[index] = this.lista[index]/1000000;
              }
              let numeros;
              numeros = this.lista.slice(Math.max(this.lista.length - 4, 0));
              this.lista.length = this.lista.length - 4;

              return numeros;
            }
        }
        else{ // controle
          if (this.lista.length >= 4) {
            let numeros;
            numeros = this.lista.slice(Math.max(this.lista.length - 4, 0));
            this.lista.length = this.lista.length - 4;
            return numeros;
            // Presente pro struct. 
          }
          else{
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", this.url, false); // false for synchronous request
            xmlHttp.send(null);
            this.lista = xmlHttp.responseText.split('\n');
            this.lista.pop();
            for (let index = 0; index < this.lista.length; index++) {
              this.lista[index] = this.lista[index]/1000000;
            }
            let numeros;
            numeros = this.lista.slice(Math.max(this.lista.length - 4, 0));
            this.lista.length = this.lista.length - 4;
            
            return numeros;
          }
        }
        
    }
}
