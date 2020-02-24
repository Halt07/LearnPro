lang = {
    "en" : {
        "mainMenu" : {
            "title" : "LearnPro - Learning Together",
            "buttons" : ["Count With You Fish", "Classics", "Help", "About", "Languages", "Back"],
            "language" : ["English", "French"],
            "forfun" : ["Snake"],
            "about" : `<h1 class="solid">About</h1>
            <p>LearnPro Developed by<br/>Bryan Christensen</p>
            <p><a href="https://www.freepik.com/free-photos-vectors/logo">Logo vector created by kreativkolors - www.freepik.com</a></p>
            <p>All other assets not specified above by Bryan Christensen</p>`,
        },
        "fishCounter" : {
            "title" : "1 Fish, 2 Fish, Count With You Fish",
            "buttons" : ["New Game", "High Scores", "Help", "About", "Go Home", "Back"],
            "help" : `<h1>Help</h1>
            <p>The ↑ key is used for moving forward<br />
                The ← and → keys are used for turning
            </p>`,
            "about" : `<h1>About</h1>
            <p>Game Developed by<br/>Bryan Christensen</p>
            <p>Background Music by Alexandr Zhelanov: opengameart.org/users/alexandr-zhelanov</p>
            <p>Background Image by Mathew Mason: freeimages.com/photo/underwater-at-aitutaki-1389117</p>
            <p>All other assets not specified above by Bryan Christensen</p>`
        },

    },

    "fr" : {
        "mainMenu" : {
            "title" : "LearnPro - Apprendre Ensemble",
            "buttons" : ["Compter Poissons", "Jeux Classiques", "Aide", "Infos", "Langues", "Retour"],
            "language" : ["Anglais", "Français"],
            "forfun" : ["Le Serpent"],
            "about" : `<h1 class="solid">Les Infos</h1>
            <p>LearnPro Developé par<br/>Bryan Christensen</p>
            <p><a href="https://www.freepik.com/free-photos-vectors/logo">Logo vector créé par kreativkolors - www.freepik.com</a></p>
            <p>Tous les autres atouts pas encore specifié créé par Bryan Christensen</p>`,
        },
        "fishCounter" : {
            "title" : "1 Poisson, 2 Poissons, Compter des Poissons",
            "buttons" : ["Nouvelle Partie", "Récords", "Aide", "Infos", "Menu Principal", "Retour"],
            "help" : `<h1>Aide</h1>
            <p>The ↑ key is used for moving forward<br />
                The ← and → keys are used for turning
            </p>`,
            "about" : `<h1>Les Infos</h1>
            <p>Jeu Developé par<br/>Bryan Christensen</p>
            <p>La Musique de Fond conçue par Alexandr Zhelanov: opengameart.org/users/alexandr-zhelanov</p>
            <p>L'Image de Fond créé par Mathew Mason: freeimages.com/photo/underwater-at-aitutaki-1389117</p>
            <p>Tous les autres atouts pas encore specifié créé par Bryan Christensen</p>`,
        },

    },
}

if (typeof(Storage) !== "undefined") {
    if (!localStorage.LearnProLang) {
        localStorage.LearnProLang = "en";
    }
}

function ChangeLanguage(language){
    if (typeof(Storage) !== "undefined") {
            localStorage.LearnProLang = language;
    }
    ChangeHome(localStorage.LearnProLang);
}


function ChangeHome(language){
    let tag = document.getElementById("home-title");
    tag.textContent = lang[language]["mainMenu"].title;

    tag = document.getElementById("id-fish");
    tag.textContent = lang[language]["mainMenu"].buttons[0];

    tag = document.getElementById("id-forfun");
    tag.textContent = lang[language]["mainMenu"].buttons[1];

    tag = document.getElementById("id-help");
    tag.textContent = lang[language]["mainMenu"].buttons[2];

    tag = document.getElementById("id-about");
    tag.textContent = lang[language]["mainMenu"].buttons[3];
    
    tag = document.getElementById("id-language");
    tag.textContent = lang[language]["mainMenu"].buttons[4];

    tag = document.getElementById("language");
    tag = tag.getElementsByTagName("h1")[0];
    tag.innerHTML = lang[language]["mainMenu"].buttons[4];

    tag = document.getElementById("id-english");
    tag.textContent = lang[language]["mainMenu"].language[0];

    tag = document.getElementById("id-francais");
    tag.textContent = lang[language]["mainMenu"].language[1];

    tag = document.getElementById("forfun");
    tag = tag.getElementsByTagName("h1")[0];
    tag.innerHTML = lang[language]["mainMenu"].forfun;

    tag = document.getElementById("aboutmain");
    tag.innerHTML = lang[language]["mainMenu"].about;

    tag = document.getElementsByClassName("id-back");
    for(let i = 0; i < tag.length; i++){
        tag[i].textContent = lang[language]["mainMenu"].buttons[5];
    }
}

function ChangeFish(language){
    let tag = document.getElementById("fish-title");
    tag.textContent = lang[language]["fishCounter"].title;

    tag = document.getElementById("id-new-game");
    tag.textContent = lang[language]["fishCounter"].buttons[0];

    tag = document.getElementById("id-high-scores");
    tag.textContent = lang[language]["fishCounter"].buttons[1];

    tag = document.getElementById("id-help");
    tag.textContent = lang[language]["fishCounter"].buttons[2];

    tag = document.getElementById("id-about");
    tag.textContent = lang[language]["fishCounter"].buttons[3];
    
    tag = document.getElementById("id-home");
    tag.textContent = lang[language]["fishCounter"].buttons[4];

    tag = document.getElementById("high-scores");
    tag = tag.getElementsByTagName("h1")[0];
    tag.innerHTML = lang[language]["fishCounter"].buttons[1];

    tag = document.getElementById("helpmain");
    tag.innerHTML = lang[language]["fishCounter"].help;

    tag = document.getElementById("aboutmain");
    tag.innerHTML = lang[language]["fishCounter"].about;

    tag = document.getElementsByClassName("id-back");
    for(let i = 0; i < tag.length; i++){
        tag[i].textContent = lang[language]["fishCounter"].buttons[5];
    }
}