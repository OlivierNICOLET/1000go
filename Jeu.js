EtatTour = { //Enum des états de la machine à état du tour
    "Transition" : 0,
    "Pioche" : 1,
    "Pose" : 2,
    "FinTour" : 3,    
    "FinDuGame" : 4,    
}


class Jeu{
    constructor(){        
        this.piocheHandler = new PiocheHandler(); //Générateur de pioche
        this.pioche = []; //Pioche contenant toutes les cartes du jeu
        this.listeJoueurs = []; //Liste des joueurs
        this.nJoueurs = 0; //Nombre de joueurs dans la partie
        this.joueurActif = 0; //Id du joueur actif
        this.nCartesMain = 6; //Nombre de carte au départ dans la main
        this.scoreVictoire = 1000; //Score de victoire
        this.jeuEnCours = true; //Condition pour continuer la partie
        this.gagnant = ""; //Nom du gagnant
        this.nomsJoueurs = []; //Noms des joueurs
        this.nomIa = "Yu-Gi-Oh"; //Nom de l'IA
    }


    initJeu(){

        ///////////GENERATION PIOCHE/////////////////////
        this.pioche = this.piocheHandler.generatePioche();
       
        ///////////GENERATION JOUEURS////////////////////
        this.nJoueurs = prompt("Veuillez entrer le nombre de joueurs (1 pour jouer contre l'IA): \n"); 

        if(this.nJoueurs == 1){
            this.listeJoueurs.push(new Joueur(this.nomIa, 0, 1, true)); //Si on joue contre l'IA, on crée un joueur qui aura son booléen ia à true
            this.nomsJoueurs.push(prompt(`Veuillez entrer le nom du joueur 1\n`));
            this.listeJoueurs.push(new Joueur(this.nomsJoueurs[0], 1, 0, false));
        } else {
            for (var i = 0; i < this.nJoueurs; i++){
                this.nomsJoueurs.push(prompt(`Veuillez entrer le nom du joueur ${i}\n`));
            }
            for(var i=0; i < this.nJoueurs; i++){
                if(i == this.nJoueurs - 1){
                    this.listeJoueurs.push(new Joueur(this.nomsJoueurs[i], i, 0, false));
                    break;
                }
                this.listeJoueurs.push(new Joueur(this.nomsJoueurs[i], i, i+1, false));            
            }
        }
                
        if(this.nJoueurs == 1){ //Si on joue contre une IA, il y a 2 joueurs (joueur + ia)
            this.nJoueurs = 2;
        }
        
        /////////////DISTRIBUTION CARTES////////////////////
        for(var i=0; i < this.nJoueurs; i++){
            for(var j=0; j < this.nCartesMain; j++){
                this.distributeCard(this.listeJoueurs[i], this.randCard()); //On distribue au joueur une carte aléatoire de la pioche
            }
        }

        /////////////DEROULEMENT JEU//////////////////////
        while(this.jeuEnCours){ // Tant que la partie continue, on enchaine les tours
            if(!this.listeJoueurs[this.joueurActif].isIa()){ // On regarde si le joueur est une IA
                this.tour(this.listeJoueurs[this.joueurActif]);
                this.changementJoueur(); //On passe au joueur suivant
            } else {
                this.tourIa(this.listeJoueurs[this.joueurActif]);
                this.changementJoueur();
            }
        }

        alert(`Le gagnant est ${this.gagnant}`); //Une fois la partie déterminée on affiche le gagnant
        
    }

   
    changementJoueur(){ //Le joueur actif devient le joueur suivant
        this.joueurActif = this.listeJoueurs[this.joueurActif].idNext;
    }

    tourIa(joueur){ //Déroulement du tour pour une IA
        var etat = EtatTour.Transition;
        switch(etat){
            case EtatTour.Transition:                  
                etat = EtatTour.Pioche;                
            case EtatTour.Pioche:
                this.distributeCard(joueur, this.randCard()); //Le joueur pioche une carte aléatoire
                etat = EtatTour.Pose;
            case EtatTour.Pose:
                var noCardPlayed = true;                
                var nCartesJouables = 0;
                var indexJouables = [];      

                for(var i=0;i<joueur.cartes.length;i++){ //Pour toutes les cartes de la main, on détermine si elle est jouable ou non
                    if(this.canPlay(joueur, joueur.cartes[i].getType())){
                        nCartesJouables++;
                        indexJouables.push(i);
                    }
                }    
                
                while(noCardPlayed){ //Tant qu'aucun choix n'a été fait, on demande au joueur de prendre une décision                             
                    if(nCartesJouables == 0){ //Si aucune carte jouable, l'IA choisit une carte à défausser, aléatoirement
                        var randomized = Math.floor(Math.random() * Math.floor(joueur.cartes.length-1));
                        this.defausse(joueur, randomized);
                        etat = EtatTour.FinTour;
                        noCardPlayed = false;
                    } else {                        
                        var randomized = Math.floor(Math.random() * Math.floor(indexJouables.length-1));
                        if(
                            joueur.cartes[randomized].getType() == TypeEnum.Para ||
                            joueur.cartes[randomized].getType() == TypeEnum.Helico ||
                            joueur.cartes[randomized].getType() == TypeEnum.CoucheTot ||
                            joueur.cartes[randomized].getType() == TypeEnum.SanteDeFer 
                        ){                                
                            this.distributeCard(joueur, this.randCard()); //Si l'IA a joué une carte d'immunité, elle pioche une carte
                        }
                        this.play(joueur, randomized); //L'ia joue la carte et la retire de sa main
                        etat = EtatTour.FinTour;
                        noCardPlayed = false;
                    }
                }

            case EtatTour.FinTour:
                if(this.isFinDuGame()){ //On vérifie si une condition de fin de jeu est réalisé
                    this.jeuEnCours = false;
                    break
                };

                etat = null;
                break;
        }
    }

    tour(joueur){ //Tour d'un joueur
        var etat = EtatTour.Transition;
        switch(etat){
            case EtatTour.Transition:
                alert(`Tour de ${joueur.getPseudo()} \n`); //On affiche quel joueur doit jouer                    
                etat = EtatTour.Pioche;                
            case EtatTour.Pioche:
                this.distributeCard(joueur, this.randCard()); //Pioche d'une carte aléatoire
                etat = EtatTour.Pose;
            case EtatTour.Pose:
                var noCardPlayed = true;                
                var nCartesJouables = 0;      

                for(var i=0;i<joueur.cartes.length;i++){
                    if(this.canPlay(joueur, joueur.cartes[i].getType())){ //Vérification de la jouabilité des cartes
                        nCartesJouables++;
                    }
                }    
                
                while(noCardPlayed){                              
                    if(nCartesJouables == 0){
                        var index = prompt(`${this.affichageTourJoueur(joueur)}${this.affichagePromptEtatTourDefausse(joueur)}`);
                        if(index && joueur.cartes[index]){ //Si aucune carte jouable, on demande au joueur de défausser une carte
                            this.defausse(joueur, index);
                            etat = EtatTour.FinTour;
                            noCardPlayed = false;
                        }
                    } else {
                        var index = prompt(`${this.affichageTourJoueur(joueur)}${this.affichagePromptEtatTourPose(joueur)}`);
                        if(index && joueur.cartes[index] && this.canPlay(joueur, joueur.cartes[index].getType())){  
                            if(
                                joueur.cartes[index].getType() == TypeEnum.Para ||
                                joueur.cartes[index].getType() == TypeEnum.Helico ||
                                joueur.cartes[index].getType() == TypeEnum.CoucheTot ||
                                joueur.cartes[index].getType() == TypeEnum.SanteDeFer 
                            ){                                
                                this.distributeCard(joueur, this.randCard()); //Si le joueur joue une carte d'immunité, il pioche
                            }               
                            this.play(joueur, index); //Le joueur joue sa carte et la retire de sa main
                            etat = EtatTour.FinTour;
                            noCardPlayed = false;
                        }
                    }
                }

            case EtatTour.FinTour:
                if(this.isFinDuGame()){ //Vérification des conditions de fin de jeu
                    this.jeuEnCours = false;
                    break
                };

                etat = null;
                break;
        }
    }

 
    isFinDuGame(){ // Vérification des conditions de fin de jeu
        var finDuGame = false;
        var maxPoint = 0;
        var maxIndex = 0;

        for(var i=0; i < this.nJoueurs; i++){
            if(this.listeJoueurs[i].getPoints() >= this.scoreVictoire){ //Si un joueur à plus que le score minimum de victoire, il est décalaré gagnant
                this.gagnant = this.listeJoueurs[i].getPseudo();
                finDuGame = true;
                break;
            }            
        }

        if(this.pioche.length == 0){ //Si la picohe est vide
            for(var i=0; i < this.nJoueurs; i++){ 
                if(this.listeJoueurs[i].getPoints() > maxPoint){
                    maxPoint = this.listeJoueurs[i].getPoints();
                    maxIndex = i;
                }            
            }
            this.gagnant = this.gagnant = this.listeJoueurs[maxIndex].getPseudo(); //Le joueur avec le plus grand score gagne
            finDuGame = true;
        }

        return finDuGame;
    }

    
    affichageTourJoueur(joueur){ //Affichage du joueur courant
        var txt = "";
        txt += `**** Tour de ${joueur.getPseudo()} ****\n`;
        return txt;
    }

   
    affichagePromptEtatTourPose(joueur){ //Affichage des scores et demande au joueur de jouer une carte
        return this.rappelPoints() + this.askJoueurForPlayableCard(joueur);        
    }

   
    affichagePromptEtatTourDefausse(joueur){ //Affichage des scores et demande au joueur de défausser une carte
        return this.rappelPoints() + this.askJoueurForCardDefausse(joueur);        
    }
    
    rappelPoints(){ //Affichage des points et des états de chaque joueur
        var liste = "";

        liste += `Scores et états:\n`;

        for(var i=0; i < this.nJoueurs; i++){
            liste += `${this.listeJoueurs[i].id} : ${this.listeJoueurs[i].getPseudo()} : ${this.listeJoueurs[i].getPoints()} Go${this.listeJoueurs[i].etat.showEtat()}`;
            liste += `\n`;
        }

        liste += `\n`;
        return liste;
    }

    askJoueurForPlayableCard(joueur){ //Affichage de la main et de la jouabilité de chaque carte
    var listeCartes = "";             //Demande à l'usager de jouer une carte
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

    
    askJoueurForCardDefausse(joueur){//Affichage de la main et de la jouabilité de chaque carte
        var listeCartes = "";        //Demande à l'usager de défausser une carte
        listeCartes += `Veuillez défausser une carte (0,1,...,${joueur.cartes.length - 1}) parmi: \n`;
        for(var i=0;i<joueur.cartes.length;i++){
            listeCartes += `${i} : ${joueur.cartes[i].getNom()} (Injouable)\n`;
        }
        listeCartes += `\n`;
        return listeCartes;
    }

    
    randCard(){ //Génération d'un index aléatoire pour la pioche
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

    distributeCard(joueur, card){ //Le joueur pioche une carte
        joueur.cartes.push(card);
    }
    
    choseTarget(card){ //Affichage des adversaire et de leurs états, et demande au joueur de choisir une cible pour sa carte
        var noPlayerChosen = true; 
        if(this.listeJoueurs[this.joueurActif].isIa()){
            return this.listeJoueurs[Math.floor(Math.random() * Math.floor(this.listeJoueurs.length - 1))];
        } else {
            while(noPlayerChosen){
                var index = prompt(`${this.affichageTourJoueur(this.listeJoueurs[this.joueurActif])}Choisissez le joueur cible de ${card.getNom()}: \n${this.rappelPoints()}`);
                if(index && this.listeJoueurs[index]){                 
                    noPlayerChosen = true;
                    return this.listeJoueurs[index];
                }
            }    
        }    
    }

    canPlay(joueur, cardType){ //Détermination de la jouabilité d'une carte par un joueur, en se basant sur son état
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

    play(joueur, index){ //Application des effets de la carte jouée
        var carte = joueur.cartes[index];
        switch(carte.getType()){
            case TypeEnum.Data25: //Pour les cartes de transferts, on met à jour le compte de point du joueur
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
            case TypeEnum.PanneReveil: //Pour les cartes d'attaque, on choisit une cible et on applique les effets               
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
            case TypeEnum.PileAto: //Pour les cartes de défense et d'immunité, on choisit une cible et on retire les effets
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

    defausse(joueur, index){ //Quand on se défausse d'une carte, on remet la carte dans la pioche
        this.pioche.push(joueur.cartes[index]);
        joueur.playCard(index);
    }

}