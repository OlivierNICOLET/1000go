class Joueur{
    constructor(pseudo_, id_, idNext_, ia_){
        this.id = id_;
        this.pseudo = pseudo_;
        this.etat = new Etat();
        this.cartes = [];
        this.idNext = idNext_;
        this.comptePoints = 0;
        this.ia = ia_;
    }

    //Liste de getter et setter pour le joueur

    //
    isIa(){
        return this.ia;
    }

    //
    getIdNext(){
        return this.idNext;
    }

    //
    afficherJoueur(){
        console.log(this.pseudo, this.id, this.idNext, this.ia);
    }

    //
    isReseauUp(){
        return this.etat.isReseauUp();
    }

    isFeteDeTrop(){
        return this.etat.isFeteDeTrop();
    }

    //
    getPseudo(){
        return this.pseudo;
    }

    setPseudo(pseudo_){
        this.pseudo = pseudo_;
    }

    //
    getEtat(){
        return this.etat;
    }

    //
    getCartes(){
        return this.cartes;
    }

    //
    getPoints(){
        return this.comptePoints;
    }

    addPoints(points){
        this.comptePoints += points;
    }

    playCard(index){ //Lorsqu'on joue une carte, on la retire de la main du joueur, et met à jour dynamiquement la main du joueur
        var cartePlayed = this.cartes[index];
        this.cartes[index] = null;
        var newCartes = [];
        for(var i=0; i < this.cartes.length; i++){
            if(this.cartes[i]){
                newCartes.push(this.cartes[i]);
            }
        }

        this.cartes = newCartes;
    }
}