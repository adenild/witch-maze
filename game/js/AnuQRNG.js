class AnuQRNG {
    constructor(seed) {
        this.seed = seed;
    }
    random() {
        var url = "https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint16";
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false); // false for synchronous request
        xmlHttp.send(null);
        var obj = JSON.parse(xmlHttp.responseText);
        return obj.data.pop()/65535;
    }
}
