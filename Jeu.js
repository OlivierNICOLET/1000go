EtatTour = {
    "Transition" : 0,
    "Pioche" : 1,
    "Pose" : 2,
    "FinTour" : 3,    
}


class Jeu{


    constructor(){        
        this.piocheHandler = new PiocheHandler();    
        this.pioche = [];
        this.listeJoueurs = [];
        this.nJoueurs = 6;
        this.joueurActif = 0;
        this.nCartesMain = 6;
        this.jeuEnCours = true;
    }


    initJeu(){

        ///////////GENERATION PIOCHE/////////////////////
        this.pioche = this.piocheHandler.generatePioche();
       /* 
       for(var i=0; i < this.pioche.length; i++){
            this.pioche[i].afficherCarte();
        }
        */

        ///////////GENERATION JOUEURS////////////////////
        var nomsJoueurs = ["Toto","Tqtq","Trtr","Tutu","Titi","Tvtv"];        

        for(var i=0; i < this.nJoueurs; i++){
            if(i == this.nJoueurs - 1){
                this.listeJoueurs.push(new Joueur(nomsJoueurs[i], i, 0));
                break;
            }
            this.listeJoueurs.push(new Joueur(nomsJoueurs[i], i, i+1));            
        }

        /*
        for(var i = 0; i < this.listeJoueurs.length; i++){
            this.listeJoueurs[i].afficherJoueur();
        }
        */

        /////////////DISTRIBUTION CARTES////////////////////
        for(var i=0; i < this.nJoueurs; i++){
            for(var j=0; j < this.nCartesMain; j++){
                this.distributeCard(this.listeJoueurs[i]);
            }
        }

        /////////////DEROULEMENT JEU//////////////////////
        while(this.jeuEnCours){
            this.tour(this.listeJoueurs[this.joueurActif]);
            this.changementJoueur();
        }
        
    }

    //
    changementJoueur(){
        this.joueurActif = this.listeJoueurs[this.joueurActif].idNext;
    }

    

    tour(joueur){
        var etat = EtatTour.Transition;
        switch(etat){
            case EtatTour.Transition:
                alert(`Tour de ${joueur.getPseudo()} \n`);                    
                etat = EtatTour.Pioche;
                
            case EtatTour.Pioche:
                etat = EtatTour.Pose;
            case EtatTour.Pose:
                var card = prompt(`${this.affichagePromptEtatTour(joueur)}`);
                etat = EtatTour.FinTour;
            case EtatTour.FinTour:
                etat = null;
                break;
        }
        console.log("fin switch");
    }
    //
    affichagePromptEtatTour(joueur){
        return this.rappelPoints() + this.askJoueurForCard(joueur);
        
    }

    //
    askJoueurForCard(joueur){
        var listeCartes = "";
        listeCartes += `Veuilley choisir une carte (0,1,...,${joueur.cartes.length}) parmis: \n`;
        for(var i=0;i<joueur.cartes.length;i++){
            listeCartes += `${i} : ${joueur.cartes[i].getNom()} \n`;
        }

        return listeCartes;
    }

    rappelPoints(){
        var rappel = "";
        rappel += "Rappel des points: \n";
        this.listeJoueurs.forEach((joueur) => {
            rappel += `${joueur.getPseudo()} : ${joueur.getPoints()} Go \n`;
        });

        return rappel;
    }

    //
    randCard(){
        var randIndex = Math.floor(Math.random() * Math.floor(this.pioche.length - 1));
        var randCard = this.pioche[randIndex];
        this.pioche[randIndex] = null;

        var newPioche = [];
        for(var i=0; i < this.pioche.length; i++){
            if(this.pioche[i]){
                newPioche.push(this.pioche[i]);
            }
        }

        this.pioche = newPioche;
        return randCard;
    }

    distributeCard(joueur){
        joueur.cartes.push(this.randCard());
    }
}