// 🔹 PANIER (chargement depuis localStorage)
let panier = JSON.parse(localStorage.getItem("panier")) || [];

// 🔹 SAUVEGARDE
function save() {
    localStorage.setItem("panier", JSON.stringify(panier));
}

// 🔹 AJOUTER AU PANIER
function ajouterPanier(nom, prix) {
    let produit = panier.find(p => p.nom === nom);

    if (produit) {
        produit.quantite++;
    } 
    else {
        panier.push({ nom, prix, quantite: 1 });
    }

    save();

    console.log("PANIER APRES AJOUT :", panier); 

    afficherPanier();
    showMessage(nom + " ajouté au panier ✅");
}


function afficherPanier() {

    // 🔥 NOUVEAU : recharge le panier depuis localStorage
    panier = JSON.parse(localStorage.getItem("panier")) || [];

    let liste = document.getElementById("liste-panier");
    let total = document.getElementById("total");
    let count = document.getElementById("count");

    if (!liste) return;

    liste.innerHTML = "";

    let somme = 0;
    let nb = 0;

    panier.forEach((p, i) => {

        let li = document.createElement("li");

        li.innerHTML = `
            <strong>${p.nom}</strong><br>
            ${p.prix} FCFA x ${p.quantite}
            <br>
            <button class="button-qut" onclick="changerQuantite(${i}, -1)">➖</button>
            <button class="button-qut" onclick="changerQuantite(${i}, 1)">➕</button>
            <button class="button-li" onclick="supprimerProduit(${i})">❌</button>
        `;

        liste.appendChild(li);

        somme += p.prix * p.quantite;
        nb += p.quantite;
    });

    // 🔥 petit bonus sécurité
    if (total) total.textContent = somme;
    if (count) count.textContent = nb;
}

// 🔹 CHANGER QUANTITÉ
function changerQuantite(index, action) {
    panier[index].quantite += action;

    if (panier[index].quantite <= 0) {
        panier.splice(index, 1);
    }

    save();
    afficherPanier();
}

// 🔹 SUPPRIMER PRODUIT
function supprimerProduit(index) {
    panier.splice(index, 1);
    save();
    afficherPanier();
}

// 🔹 OUVRIR PANIER
function ouvrirPanier() {
    let box = document.getElementById("panier-box");
    box.style.display = "block";
    /*box.style.transform = "translateY(-10px)";*/
    box.style.transform = "translate(-50%, -50%)";
}


// 🔹 FERMER PANIER
function fermerPanier() {
    document.getElementById("panier-box").style.display = "none";
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

function commander() {
    if (panier.length === 0) {
        alert("Panier vide !");
        return;
    }

    alert("Commande validée 🎉");
    
    let message = "Bonjour, je veux commander :%0A"; 
    
    let total = 0;

    panier.forEach(item => {
        
        message += `- ${item.nom} x ${item.quantite} = ${item.prix * item.quantite} FCFA %0A`;
        total += item.prix * item.quantite;
        
    });

    message += `%0A💰 Total : ${total} FCFA`; 

    
    // 🔴 Remplace par TON numéro WhatsApp (format international)
    let numero = "2250103820631";

    let url = `https://wa.me/${numero}?text=${message}`;

    // 🔥 Ouvre WhatsApp
    window.open(url, "_blank");

    // (optionnel) vider panier après commande
    panier = [];
    save();
    afficherPanier();
}

// 🔹 MESSAGE VISUEL
function showMessage(txt) {

    let msg = document.createElement("div");
    msg.textContent = txt;

    msg.style.position = "fixed";
    msg.style.bottom = "20px";
    msg.style.right = "20px";
    msg.style.background = "green";
    msg.style.color = "white";
    msg.style.padding = "10px";
    msg.style.borderRadius = "10px";

    document.body.appendChild(msg);

    setTimeout(() => {
        msg.remove();
    }, 2000);
}

// 🔹 MENU (UNE SEULE FOIS !)
function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}

// 🔹 RECHERCHE
function rechercher() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let produits = document.querySelectorAll(".produit");

    produits.forEach(p => {
        let nom = p.querySelector("h3").textContent.toLowerCase();
        p.style.display = nom.includes(input) ? "block" : "none";
    });
}

// 🔹 CHARGEMENT PAGE
window.onload = function () {

    afficherPanier();

    // 🔽 FERME LE MENU APRÈS CLIC SUR UN LIEN
    const liens = document.querySelectorAll("#menu a");

    liens.forEach(function(lien) {
        lien.addEventListener("click", function() {
            document.getElementById("menu").classList.remove("active");
        });
    });

};

/*IMAGE CLIQUABLE*/
function agrandirImage(src) {
    const viewer = document.getElementById("image-viewer");
    const img = document.getElementById("image-agrandie");

    img.src = src;
    viewer.style.display = "block";

    document.body.classList.add("no-scroll"); // 🔥 bloque la page
}

function fermerImage() {
    document.getElementById("image-viewer").style.display = "none";

    document.body.classList.remove("no-scroll"); // 🔥 débloque
}
