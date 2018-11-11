EtatTour = {
    "Transition" : 0,
    "Pioche" : 1,
    "Pose" : 2,
    "FinTour" : 3,    
    "FinDuGame" : 4,    
}


class Jeu{


    constructor(){        
        this.piocheHandler = new PiocheHandler();    
        this.pioche = [];
        this.listeJoueurs = [];
        this.nJoueurs = 6;
        this.joueurActif = 0;
        this.nCartesMain = 6;
        this.scoreVictoire = 1000;
        this.jeuEnCours = true;
        this.gagnant = "";
        this.nomsJoueurs = [];
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
        this.nJoueurs = prompt("Veuillez entrer le nombre de joueurs (EN CHIFFRE STP): \n");

        for (var i = 0; i < this.nJoueurs; i++){
            this.nomsJoueurs.push(prompt(`Veuillez entrer le nom du joueur ${i}\n`));
        }
                

        for(var i=0; i < this.nJoueurs; i++){
            if(i == this.nJoueurs - 1){
                this.listeJoueurs.push(new Joueur(this.nomsJoueurs[i], i, 0));
                break;
            }
            this.listeJoueurs.push(new Joueur(this.nomsJoueurs[i], i, i+1));            
        }

        /*
        for(var i = 0; i < this.listeJoueurs.length; i++){
            this.listeJoueurs[i].afficherJoueur();
        }
        */

        /////////////DISTRIBUTION CARTES////////////////////
        for(var i=0; i < this.nJoueurs; i++){
            for(var j=0; j < this.nCartesMain; j++){
                this.distributeCard(this.listeJoueurs[i], this.randCard());
            }
        }

        /////////////DEROULEMENT JEU//////////////////////
        while(this.jeuEnCours){
            this.tour(this.listeJoueurs[this.joueurActif]);
            this.changementJoueur();
        }

        alert(`Le gagnant est ${this.gagnant}`);
        
    }

    //
    changementJoueur(){
        this.joueurActif = this.listeJoueurs[this.joueurActif].idNext;
    }

    

    tour(joueur){
        var etat = EtatTour.Transition;
        console.log(this.pioche.length);
        switch(etat){
            case EtatTour.Transition:
                alert(`Tour de ${joueur.getPseudo()} \n`);                    
                etat = EtatTour.Pioche;                
            case EtatTour.Pioche:
                this.distributeCard(joueur, this.randCard());
                etat = EtatTour.Pose;
            case EtatTour.Pose:
                var noCardPlayed = true;                
                var nCartesJouables = 0;      

                for(var i=0;i<joueur.cartes.length;i++){
                    if(this.canPlay(joueur, joueur.cartes[i].getType())){
                        nCartesJouables++;
                    }
                }    
                
                while(noCardPlayed){                              
                    if(nCartesJouables == 0){
                        var index = prompt(`${this.affichagePromptEtatTourDefausse(joueur)}`);
                        if(index && joueur.cartes[index]){                 
                            this.defausse(joueur, index);
                            etat = EtatTour.FinTour;
                            noCardPlayed = false;
                        }
                    } else {
                        var index = prompt(`${this.affichagePromptEtatTourPose(joueur)}`);
                        if(index && joueur.cartes[index] && this.canPlay(joueur, joueur.cartes[index].getType())){                 
                            this.play(joueur, index);
                            etat = EtatTour.FinTour;
                            noCardPlayed = false;
                        }
                    }
                }

            case EtatTour.FinTour:
                if(this.isFinDuGame()){
                    this.jeuEnCours = false;
                    break
                };

                etat = null;
                break;
        }
    }

    //
    isFinDuGame(){
        var finDuGame = false;
        var maxPoint = 0;
        var maxIndex = 0;

        for(var i=0; i < this.nJoueurs; i++){
            if(this.listeJoueurs[i].getPoints() >= this.scoreVictoire){
                this.gagnant = this.listeJoueurs[i].getPseudo();
                finDuGame = true;
                break;
            }            
        }

        if(this.pioche.length == 0){
            for(var i=0; i < this.nJoueurs; i++){
                if(this.listeJoueurs[i].getPoints() > maxPoint){
                    maxPoint = this.listeJoueurs[i].getPoints();
                    maxIndex = i;
                }            
            }
            this.gagnant = this.gagnant = this.listeJoueurs[maxIndex].getPseudo();
            finDuGame = true;
        }

        return finDuGame;
    }

    //
    affichagePromptEtatTourPose(joueur){
        return this.rappelPoints() + this.askJoueurForPlayableCard(joueur);        
    }

    //
    affichagePromptEtatTourDefausse(joueur){
        return this.rappelPoints() + this.askJoueurForCardDefausse(joueur);        
    }

    //
    rappelPoints(){
        var liste = "";

        liste += `Scores et états:\n`;

        for(var i=0; i < this.nJoueurs; i++){
            liste += `${this.listeJoueurs[i].id} : ${this.listeJoueurs[i].getPseudo()} : ${this.listeJoueurs[i].getPoints()} Go${this.listeJoueurs[i].etat.showEtat()}`;
            liste += `\n`;
        }

        liste += `\n`;
        return liste;
    }

    //
    askJoueurForPlayableCard(joueur){
        var listeCartes = "";
        listeCartes += `Veuillez jouer une carte (0,1,...,${joueur.cartes.length - 1}) parmi: \n`;
        for(var i=0;i<joueur.cartes.length;i++){
            if(this.canPlay(joueur, joueur.cartes[i].getType())){
                listeCartes += `${i} : ${joueur.cartes[i].getNom()} \n`;
            } else {
                listeCartes += `${i} : ${joueur.cartes[i].getNom()} (Injouable)\n`;
            }
        }
        listeCartes += `\n`;
        return listeCartes;
    }

    //
    askJoueurForCardDefausse(joueur){
        var listeCartes = "";
        listeCartes += `Veuillez défausser une carte (0,1,...,${joueur.cartes.length - 1}) parmi: \n`;
        for(var i=0;i<joueur.cartes.length;i++){
            listeCartes += `${i} : ${joueur.cartes[i].getNom()} (Injouable)\n`;
        }
        listeCartes += `\n`;
        return listeCartes;
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

    distributeCard(joueur, card){
        joueur.cartes.push(card);
    }

    //
    choseTarget(card){
        var noPlayerChosen = true;
        while(noPlayerChosen){
            var index = prompt(`Choisissez le joueur cible de ${card.getNom()}: \n${this.rappelPoints()}`);
            if(index && this.listeJoueurs[index]){                 
                noPlayerChosen = true;
                return this.listeJoueurs[index];
            }
        }        
    }

    //
    canPlay(joueur, cardType){
        if(joueur.isReseauUp()){
            if(joueur.isFeteDeTrop()){
                return !(
                    cardType == TypeEnum.Data75 ||
                    cardType == TypeEnum.Data100 ||
                    cardType == TypeEnum.Data200
                );
            } else if(
                joueur.etat.isPanneReveil() ||
                joueur.etat.isTravauxTram() ||
                joueur.etat.isMaladie()
            ){
                return !(
                    cardType == TypeEnum.Data25 ||
                    cardType == TypeEnum.Data50 ||
                    cardType == TypeEnum.Data75 ||
                    cardType == TypeEnum.Data100 ||
                    cardType == TypeEnum.Data200
                );
            } else {
                return true;
            }
        } else {
            return (cardType == TypeEnum.ReseauUp);
        }
    }

    play(joueur, index){
        var carte = joueur.cartes[index];
        switch(carte.getType()){
            case TypeEnum.Data25:
                joueur.addPoints(25);
                joueur.playCard(index);
                break;
            case TypeEnum.Data50:
                joueur.addPoints(50);
                joueur.playCard(index);
                break;
            case TypeEnum.Data75:
                joueur.addPoints(75);
                joueur.playCard(index);
                break;
            case TypeEnum.Data100:
                joueur.addPoints(100);
                joueur.playCard(index);
                break;
            case TypeEnum.Data200:
                joueur.addPoints(200);
                joueur.playCard(index);
                break;
            case TypeEnum.PanneReveil:                
                var target = this.choseTarget(carte);
                if(!target.etat.isCoucheTot()){
                    target.etat.setPanneReveil(true);
                    joueur.playCard(index);
                }
                break;
            case TypeEnum.TravauxTram:
                var target = this.choseTarget(carte);
                if(!target.etat.isHelicotere()){
                    target.etat.setTravauxTram(true);
                    joueur.playCard(index);
                }
                break;
            case TypeEnum.Maladie:
                var target = this.choseTarget(carte);
                if(!target.etat.isSanteDeFer()){
                    target.etat.setMaladie(true);
                    joueur.playCard(index);
                }
                break;
            case TypeEnum.ReseauDown:
                var target = this.choseTarget(carte);
                if(!target.etat.isProxy()){
                    target.etat.setReseauUp(false);
                    joueur.playCard(index);
                }
                break;
            case TypeEnum.FeteDeTrop:
                var target = this.choseTarget(carte);
                if(!target.etat.isProxy()){
                    target.etat.setFeteDeTrop(true);
                    joueur.playCard(index);
                }
                break;
            case TypeEnum.PileAto: 
                var target = this.choseTarget(carte);
                target.etat.setPanneReveil(false); 
                joueur.playCard(index);
                break;
            case TypeEnum.BusMa:
                var target = this.choseTarget(carte);
                target.etat.setTravauxTram(false);
                joueur.playCard(index);
                break;
            case TypeEnum.Docteur:
                var target = this.choseTarget(carte);
                target.etat.setMaladie(false);
                joueur.playCard(index);
                break;
            case TypeEnum.ReseauUp:
                var target = this.choseTarget(carte);
                target.etat.setReseauUp(true);
                joueur.playCard(index);
                break;
            case TypeEnum.Para:
                var target = this.choseTarget(carte);
                target.etat.setFeteDeTrop(false);
                joueur.playCard(index);
                break;
            case TypeEnum.CoucheTot:
                var target = this.choseTarget(carte);
                target.etat.setCoucheTot(true);
                joueur.playCard(index);
                break;
            case TypeEnum.Helico:
                var target = this.choseTarget(carte);
                target.etat.setHelicoptere(true);
                joueur.playCard(index);
                break;
            case TypeEnum.SanteDeFer:
                var target = this.choseTarget(carte);
                target.etat.setSanteDeFer(true);
                joueur.playCard(index);
                break;
            case TypeEnum.Proxy:
                var target = this.choseTarget(carte);
                target.etat.setProxy(true);
                joueur.playCard(index);
                break;            
        }
    }

    defausse(joueur, index){
        this.pioche.push(joueur.cartes[index]);
        joueur.playCard(index);
    }

}