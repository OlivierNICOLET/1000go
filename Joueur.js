class Joueur{
    constructor(pseudo_, id_, idNext_){
        this.id = id_;
        this.pseudo = pseudo_;
        this.etat = new Etat();
        this.cartes;
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
        return this.comptePoint;
    }

    addPoints(points){
        this.comptePoint += points;
    }

    //
    takeCard(index){
        return this.cartes[index];
    }
}