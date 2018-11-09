class Etat{
    constructor(){
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