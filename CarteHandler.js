TypeEnum = { //Enumération des types des cartes
    "Data25" : 1,
    "Data50" : 2,
    "Data75" : 3,
    "Data100" : 4,
    "Data200" : 5,
    "PanneReveil" : 6,
    "TravauxTram" : 7,
    "Maladie" : 8,
    "ReseauDown" : 9,
    "FeteDeTrop" : 10,
    "PileAto" : 11,
    "BusMa" : 12,
    "Docteur" : 13,
    "ReseauUp" : 14,
    "Para" : 15,
    "CoucheTot" : 16,
    "Helico" : 17,
    "SanteDeFer" : 18,
    "Proxy" : 19,
}

class CarteHandler { //Le CarteHandler est une Factory de Carte

    //Méthodes de création des cartes

    //Data
    createData25(){
        return new Carte(
            TypeEnum.Data25,
            "25 Go"
        )
    };
    createData50(){
        return new Carte(
            TypeEnum.Data50,
            "50 Go"
        )
    };
    createData75(){
        return new Carte(
            TypeEnum.Data75,
            "75 Go"
        )
    };
    createData100(){
        return new Carte(
            TypeEnum.Data100,
            "100 Go"
        )
    };
    createData200(){
        return new Carte(
            TypeEnum.Data200,
            "200 Go"
        )
    };

    //Attaque
    createPanneReveil(){
        return new Carte(
            TypeEnum.PanneReveil,
            "Panne de reveil"
        )
    };
    createTravauxTram(){
        return new Carte(
            TypeEnum.TravauxTram,
            "Travaux du tramway"
        )
    };
    createMaladie(){
        return new Carte(
            TypeEnum.Maladie,
            "Maladie"
        )
    };
    createReseauDown(){
        return new Carte(
            TypeEnum.ReseauDown,
            "Réseaux down"
        )
    };
    createFeteDeTrop(){
        return new Carte(
            TypeEnum.FeteDeTrop,
            "Fête de trop"
        )
    };

    //Defense
    createPileAtomique(){
        return new Carte(
            TypeEnum.PileAto,
            "Pile atomique"
        )
    };
    createBusMagique(){
        return new Carte(
            TypeEnum.BusMa,
            "Bus magique"
        )
    };
    createMotDocteur(){
        return new Carte(
            TypeEnum.Docteur,
            "Mot du docteur"
        )
    };
    createReseauUp(){
        return new Carte(
            TypeEnum.ReseauUp,
            "Réseau up"
        )
    };
    createParacetamol(){
        return new Carte(
            TypeEnum.Para,
            "Paracetamol"
        )
    };

    //Immu
    createCoucheTot(){
        return new Carte(
            TypeEnum.CoucheTot,
            "Couche tôt"
        )
    };
    createHelicoptere(){
        return new Carte(
            TypeEnum.Helico,
            "Hélicoptère"
        )
    };
    createSanteDeFer(){
        return new Carte(
            TypeEnum.SanteDeFer,
            "Santé de fer"
        )
    };
    createProxy(){
        return new Carte(
            TypeEnum.Proxy,
            "Proxy"
        )
    };


}