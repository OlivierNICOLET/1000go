class Joueur{
    constructor(pseudo_, id_, idNext_){
        this.id = id_;
        this.pseudo = pseudo_;
        this.etat = new Etat();
        this.cartes = [];
        this.idNext = idNext_;
        this.comptePoints = 0;
    }

    //
    afficherJoueur(){
        console.log(this.pseudo, this.id, this.idNext);
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
        this.comptePoint += points;
    }

    //
    playCard(index){
        var cartePlayed = this.cartes[index];
        this.cartes[index] = null;
        var newCartes = [];
        for(var i=0; i < this.cartes.length; i++){
            if(this.cartes[i]){
                newCartes.push(this.cartes[i]);
            }
        }

        this.cartes = newCartes;
        return cartePlayed;
    }
}