class Carte {
    constructor(type_, nom_) {
        this.type = type_;
        this.nom = nom_;
    }

    afficherCarte() {
        console.log(this.nom);
    }
}