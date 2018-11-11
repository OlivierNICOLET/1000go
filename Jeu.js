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
                this.distributeCard(this.listeJoueurs[i], this.randCard());
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
                this.distributeCard(joueur, this.randCard());
                etat = EtatTour.Pose;
            case EtatTour.Pose:
                var noCardPlayed = true;
                while(noCardPlayed){
                    var index = prompt(`${this.affichagePromptEtatTour(joueur)}`);
                    if(index && joueur.cartes[index] && this.canPlay(joueur, joueur.cartes[index].getType())){                 
                        this.play(joueur, index);
                        etat = EtatTour.FinTour;
                        noCardPlayed = false;
                    }
                }
            case EtatTour.FinTour:
                etat = null;
                break;
        }
    }
    //
    affichagePromptEtatTour(joueur){
        return this.rappelPoints() + this.askJoueurForCard(joueur);
        
    }

    //
    askJoueurForCard(joueur){
        var listeCartes = "";
        listeCartes += `Veuillez choisir une carte (0,1,...,${joueur.cartes.length}) parmis: \n`;
        for(var i=0;i<joueur.cartes.length;i++){
            listeCartes += `${i} : ${joueur.cartes[i].getNom()} \n`;
        }

        return listeCartes;
    }

    rappelPoints(){
        var rappel = "";
        rappel += "Rappel des points: \n";
        this.listeJoueurs.forEach((joueur) => {
            rappel += `${joueur.id} : ${joueur.getPseudo()} : ${joueur.getPoints()} Go`;
            if(joueur.isReseauUp()){
                rappel += " => Réseau up\n"
            } else {
                rappel += "\n";
            }
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

    distributeCard(joueur, card){
        joueur.cartes.push(card);
    }

    //
    choseTarget(){
        var noPlayerChosen = true;
        while(noPlayerChosen){
            var index = prompt(`${this.rappelPoints()}`);
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
            }
        } else {
            return (cardType == TypeEnum.ReseauUp);
        }
    }


    play(joueur, index){
        switch(joueur.cartes[index].getType()){
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
                var target = this.choseTarget();
                if(!target.etat.isCoucheTot()){
                    target.etat.setPanneReveil(true);
                }
                break;
            case TypeEnum.TravauxTram:
                var target = this.choseTarget();
                if(!target.etat.isHelicotere()){
                    target.etat.setTravauxTram(true);
                }
                break;
            case TypeEnum.Maladie:
                var target = this.choseTarget();
                if(!target.etat.isSanteDeFer()){
                    target.etat.setMaladie(true);
                }
                break;
            case TypeEnum.ReseauDown:
                var target = this.choseTarget();
                if(!target.etat.isProxy()){
                    target.etat.setReseauUp(false);
                }
                break;
            case TypeEnum.FeteDeTrop:
                var target = this.choseTarget();
                if(!target.etat.isProxy()){
                    target.etat.setFeteDeTrop(true);
                }
                break;
            case TypeEnum.PileAto: 
                var target = this.choseTarget();
                target.etat.setPanneReveil(false); 
                break;
            case TypeEnum.BusMa:
                var target = this.choseTarget();
                target.etat.setTravauxTram(false);
                break;
            case TypeEnum.Docteur:
                var target = this.choseTarget();
                target.etat.setMaladie(false);
                break;
            case TypeEnum.ReseauUp:
                var target = this.choseTarget();
                target.etat.setReseauUp(true);
                break;
            case TypeEnum.Para:
                var target = this.choseTarget();
                target.etat.setFeteDeTrop(false);
                break;
            case TypeEnum.CoucheTot:
                var target = this.choseTarget();
                target.etat.setCoucheTot(true);
                break;
            case TypeEnum.Helico:
                var target = this.choseTarget();
                target.etat.setHelico(true);
                break;
            case TypeEnum.SanteDeFer:
                var target = this.choseTarget();
                target.etat.setSanteDeFer(true);
                break;
            case TypeEnum.Proxy:
                var target = this.choseTarget();
                target.etat.setProxy(true);
                break;
            
        }
    }

}