class AnuQRNG {
    constructor(seed,controle='player') {
        this.seed = seed;
        //this.url = "https://qrng.anu.edu.au/API/jsonI.php?length=1024&type=uint16";
        if (controle == 'player') {
          this.url = "https://www.random.org/integers/?num=4&min=1000000&max=3000000&col=1&base=10&format=plain&rnd=new"  
        }
        else{
          this.url = "https://www.random.org/integers/?num=1120&min=1000000&max=3000000&col=1&base=10&format=plain&rnd=new"  
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
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open("GET", this.url, false); // false for synchronous request
          xmlHttp.send(null);

          lista = xmlHttp.responseText.split('\n');
          lista.pop();
          for (let index = 0; index < lista.length; index++) {
            lista[index] = lista[index]/1000000;
          }
          console.log('player');
          console.log(lista);
          
          
          return lista;
        }
        else{ // controle
          if (lista.length >= 4) {
            let numeros;
            numeros = lista.slice(Math.max(lista.length - 4, 0));
            lista.length = lista.length - 4;
            return numeros;
            // Presente pro struct. 
          }
          else{
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", this.url, false); // false for synchronous request
            xmlHttp.send(null);
            lista = xmlHttp.responseText.split('\n');
            lista.pop();
            for (let index = 0; index < lista.length; index++) {
              lista[index] = lista[index]/1000000;
            }
            let numeros;
            numeros = lista.slice(Math.max(lista.length - 4, 0));
            lista.length = lista.length - 4;
            console.log('controle');
            console.log(lista);

            return numeros;
          }
        }
        
    }
}
