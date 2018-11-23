class Carte {
    constructor(type_, nom_) {
        this.type = type_;
        this.nom = nom_;
    }

    //Liste de getter et setter pour une carte

    afficherCarte() {
        console.log(this.nom);
    }

    //
    getType(){
        return this.type;
    }

    setType(type_){
        this.type = type_;
    }

    //
    getNom(){
        return this.nom;
    }

    setNom(nom_){
        this.nom = nom_;
    }
}