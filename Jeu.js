class Jeu{


    constructor(){        
        this.piocheHandler = new PiocheHandler();    
        this.pioche = [];
        this.listeJoueurs = [];
        this.nJoueurs = 6;
    }


    initJeu(){

        ///////////GENERATION PIOCHE/////////////////////
        this.pioche = this.piocheHandler.generatePioche();
        for(var i=0; i < this.pioche.length; i++){
            this.pioche[i].afficherCarte();
        }

        ///////////GENERATION JOUEURS////////////////////
        var nomsJoueurs = ["Toto","Tqtq","Trtr","Tutu","Titi","Tvtv"];        

        for(var i=0; i < this.nJoueurs; i++){
            if(i == this.nJoueurs - 1){
                this.listeJoueurs.push(new Joueur(nomsJoueurs[i], i, 0));
                break;
            }
            this.listeJoueurs.push(new Joueur(nomsJoueurs[i], i, i+1));            
        }

        for(var i = 0; i < this.listeJoueurs.length; i++){
            this.listeJoueurs[i].afficherJoueur();
        }
    }
}