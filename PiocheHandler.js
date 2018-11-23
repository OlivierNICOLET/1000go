class PiocheHandler {    

    constructor() {
        
        this.carteHandler = new CarteHandler(); //La pioche utilise un générateur de carte pour se remplir

        //Liste du nombre de chaque type de carte dans la pioche
        //n Datas
        this.n25go = 10;
        this.n50go = 10;
        this.n75go = 10;
        this.n100go = 12;
        this.n200go = 4;

        //n Attaques
        this.nPanne = 3;
        this.nTravauxTr = 3;
        this.nMaladie = 3;
        this.nReseauDown = 5;
        this.nFeteDeTrop = 4;

        //n Defense
        this.nPileAtomique = 6;
        this.nBusMagique = 6;
        this.nMotDuDocteur = 6;
        this.nReseauUp = 14;
        this.nParacetamol = 6;

        //n Immus
        this.nCoucheTot = 1;
        this.nHelico = 1;
        this.nSanteDeFer = 1;
        this.nProxy = 1;

        this.pioche = [];
    }


    generatePioche(){
        //Génération de toutes les cartes et ajout dans la pioche pour tous les types

        //Generation datas
        for(var i = 0; i < this.n25go; i++){
            this.pioche.push(this.carteHandler.createData25());
        }
        for(var i = 0; i < this.n50go; i++){
            this.pioche.push(this.carteHandler.createData50());
        }
        for(var i = 0; i < this.n75go; i++){
            this.pioche.push(this.carteHandler.createData75());
        }
        for(var i = 0; i < this.n100go; i++){
            this.pioche.push(this.carteHandler.createData100());
        }
        for(var i = 0; i < this.n200go; i++){
            this.pioche.push(this.carteHandler.createData200());
        }

        //Generation attaques
        for(var i = 0; i < this.nPanne; i++){
            this.pioche.push(this.carteHandler.createPanneReveil());
        }
        for(var i = 0; i < this.nTravauxTr; i++){
            this.pioche.push(this.carteHandler.createTravauxTram());
        }      
        for(var i = 0; i < this.nMaladie; i++){
            this.pioche.push(this.carteHandler.createMaladie());
        }
        for(var i = 0; i < this.nReseauDown; i++){
            this.pioche.push(this.carteHandler.createReseauDown());
        }
        for(var i = 0; i < this.nFeteDeTrop; i++){
            this.pioche.push(this.carteHandler.createFeteDeTrop());
        }

        //Generation défenses
        for(var i = 0; i < this.nPileAtomique; i++){
            this.pioche.push(this.carteHandler.createPileAtomique());
        }
        for(var i = 0; i < this.nBusMagique; i++){
            this.pioche.push(this.carteHandler.createBusMagique());
        }
        for(var i = 0; i < this.nMotDuDocteur; i++){
            this.pioche.push(this.carteHandler.createMotDocteur());
        }
        for(var i = 0; i < this.nReseauUp; i++){
            this.pioche.push(this.carteHandler.createReseauUp());
        }
        for(var i = 0; i < this.nParacetamol; i++){
            this.pioche.push(this.carteHandler.createParacetamol());
        }

        //Generation immus
        for(var i = 0; i < this.nCoucheTot; i++){
            this.pioche.push(this.carteHandler.createCoucheTot());
        }
        for(var i = 0; i < this.nHelico; i++){
            this.pioche.push(this.carteHandler.createHelicoptere());
        }
        for(var i = 0; i < this.nSanteDeFer; i++){
            this.pioche.push(this.carteHandler.createSanteDeFer());
        }
        for(var i = 0; i < this.nProxy; i++){
            this.pioche.push(this.carteHandler.createProxy());
        }

        return this.pioche;
    }
}