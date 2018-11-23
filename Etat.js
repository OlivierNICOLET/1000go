class Etat{
    constructor(){ //Liste des états d'un joueur
        this.reseauUp = false;
        this.panneReveil = false;
        this.travauxTram = false;
        this.maladie = false;
        this.feteDeTrop = false;
        this.coucheTot = false;
        this.helicoptere = false;
        this.santeDeFer = false;
        this.proxy = false;
    }  

    //
    showEtat(){ //Méthode pour l'affichage des états dans le rappel des scores
        var liste = "";

        if(this.isReseauUp()){
            liste += ` ; Réseau up`;
        }
        if(this.isPanneReveil()){
            liste += ` ; Panne de Réveil`;
        }
        if(this.isMaladie()){
            liste += ` ; Maladie`;
        }
        if(this.isTravauxTram()){
            liste += ` ; Travaux Tramway`;
        }
        if(this.isFeteDeTrop()){
            liste += ` ; Fête de trop`;
        }
        if(this.isCoucheTot()){
            liste += ` ; Couche tôt`;
        }
        if(this.isHelicoptere()){
            liste += ` ; Hélicoptère`;
        }
        if(this.isSanteDeFer()){
            liste += ` ; Santé de fer`;
        }
        if(this.isProxy()){
            liste += ` ; Proxy`;
        }

        return liste;
    }

    //Liste de getter et setter pour les états

    //
    isReseauUp(){
        return this.reseauUp;
    }

    setReseauUp(bool){
        this.reseauUp = bool;
    }

    //
    isPanneReveil(){
        return this.panneReveil;
    }

    setPanneReveil(bool){
        this.panneReveil = bool;
    }

    //
    isTravauxTram(){
        return this.travauxTram;
    }

    setTravauxTram(bool){
        this.travauxTram = bool;
    }
    
    //
    isMaladie(){
        return this.maladie;
    }

    setMaladie(bool){
        this.maladie = bool;
    }
    
    //
    isFeteDeTrop(){
        return this.feteDeTrop;
    }

    setFeteDeTrop(bool){
        this.feteDeTrop = bool;
    }

    //
    isCoucheTot(){
        return this.coucheTot;
    }

    setCoucheTot(bool){
        this.coucheTot = bool;
    }

    //
    isHelicoptere(){
        return this.helicoptere;
    }

    setHelicoptere(bool){
        this.helicoptere = bool;
    }

    //
    isSanteDeFer(){
        return this.santeDeFer;
    }

    setSanteDeFer(bool){
        this.santeDeFer = bool;
    }

    //
    isProxy(){
        return this.proxy;
    }

    setProxy(bool){
        this.proxy = bool;
    }    
}