class Main {
    start() {
        console.log("LE 1000 Go: ");

        //Création de la partie
        var jeu = new Jeu();

        //Lancement de la partie
        jeu.initJeu();
        jeu.randCard(jeu.pioche);
    }
}