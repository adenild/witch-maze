class AnuQRNG {
    constructor(seed) {
        this.seed = seed;
        this.url = "https://qrng.anu.edu.au/API/jsonI.php?length=1024&type=uint16";
        this.random_numbers = this.get_numbers();
    }
    random() {
      if (this.random_numbers.length == 0) {
        this.random_numbers = this.get_numbers();
      }
      return this.random_numbers.pop()/65535;
    }

    get_numbers() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", this.url, false); // false for synchronous request
        xmlHttp.send(null);
        var obj = JSON.parse(xmlHttp.responseText);
        return obj.data;
    }
}
