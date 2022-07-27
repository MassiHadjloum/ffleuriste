/**
 * 
 * @param {string} name
 * @return {HTMLelement}
 */
createDivWithClass = (name) => {
    let div = document.createElement('div');
    div.setAttribute('class', name);
    return div;
}

let state = {
    checker: null,
    checkeditem: true,
    commande: {
        prix: 0,
        id_bouquet: [],
    },
    cssclass: {
        "opacity": '0.6',
        "border": '0.4em solid rgba(27, 69, 146, 0.8)'
    },
    cssNormal: {
        "opacity": '1',
        "border": 'none'
    }

}

function Item(id, src, titre, prix) {

    this.id = id;
    this.src = src;
    this.titre = titre;
    this.prix = prix;
    this.q = 1;
    this.panier = null;
    this.commande = {
        prix: 0,
        id_bouquet: [],
    }

    this.item = () => {
        let item = createDivWithClass('item')
        let image = createDivWithClass('image');
        let body = createDivWithClass('body');
        let title = createDivWithClass('title');
        let prix = createDivWithClass('prix');
        let img = document.createElement("img");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");

        img.src = this.src;
        image.appendChild(img);
        h3.innerHTML = this.titre;
        title.appendChild(h3);
        p.innerHTML = this.prix;
        prix.appendChild(p);
        body.appendChild(title);
        body.appendChild(prix);
        item.appendChild(image);
        item.appendChild(body);

        let divcheck = createDivWithClass('checked');
        imgcheck = document.createElement('img');
        imgcheck.src = '/img/checked.png';
        imgcheck.hidden = true;
        imgcheck.id = this.id + 1000;
        imgcheck.classList.add('check');
        // setHiddenProperty(this.imgcheck)
        divcheck.appendChild(imgcheck);

        item.id = this.id;
        item.classList.add('.checkitem');
        item.appendChild(divcheck);

        let cheked = false;
        item.addEventListener('click', () => {
            let idx = 0;
            ((state.checker) ?
                (!cheked /* && state.checkeditem */ ?
                    (
                        state.commande.id_bouquet.push(this.id),
                        state.commande.prix += this.prix,
                        console.log(state.commande.id_bouquet + "   "),
                        $('.inform').text(state.commande.prix),
                        $(`#${this.id+1000}`).prop("hidden", false),
                        console.log("hidden " + $(`#${this.id+1000}`).prop("hidden") + " in select " + !cheked + " state " + state.checker),
                        $(`#${this.id}`).css({ "opacity": '1' }),
                        state.checkeditem = true,
                        cheked = true
                    ) :
                    (
                        console.log(" cheked  " + !cheked + " index " + idx),
                        (state.commande.id_bouquet.length > 0) ? (
                            idx = state.commande.id_bouquet.findIndex((e) => this.id === e),
                            state.commande.id_bouquet.splice(idx, 1),
                            state.commande.prix -= this.prix
                        ) : cheked = false,
                        console.log(state.commande.id_bouquet + "   "),
                        $('.inform').text(state.commande.prix),
                        $(`#${this.id+1000}`).prop("hidden", true),
                        console.log("hidden " + $(`#${this.id+1000}`).prop("hidden") + " in deselect " + !cheked + " state " + state.checker),
                        $(`#${this.id}`).css({ "opacity": '0.6' }),
                        state.checkeditem = false,
                        cheked = false
                    )

                ) : null)
        });
        return item;
    };
};

initializeTable = (table) => {
    for (let i = 0; i < table.length; i) {
        table.pop();
    }
}

sendData = (data) => {
    const id_client = $('#id_client').text().trim();
    $.post('http://localhost:8080/set_commandeperso/id/' + id_client, {...state.commande }, (dat, status) => {
        if (dat.data === "OK") {
            swal("Bien enregistrer", "votre commande est bien enregistrée", "success")
                .then(() => {
                    window.location = '/panier/id/' + id_client
                })
        } else {
            swal("Erreur", "une erreur s'est produite, veuillez réssayer", "error")
                .then(() => {
                    window.location = '/commande_personaliser/id/' + id_client
                })
        }
        console.log(dat.data === "OK")
    })
};


let select = false;
selectImg = () => {
    console.log(state.checker);

    document.querySelector('.send').addEventListener('click', () => {
        if (state.commande.id_bouquet.length > 0) {
            //$('.send').prop('disabled', false);
            console.log("send");
            sendData(state.commande.id_bouquet)
        } else {
            //$('.send').prop('disabled', 'true');
            console.log("no send");
        }
    })

    document.querySelector('.select').addEventListener('click', () => {
        !select ? (
                $('.item').css(state.cssclass),
                state.checker = true,
                select = true,
                $('.select').text('Annuler')


            ) :
            (
                $('.item').css(state.cssNormal),
                $('.inform').text(0),
                state.checker = false,
                state.commande.id_bouquet.forEach((e) => {
                    $(`#${e+1000}`).prop("hidden", false)
                }),
                $('.check').prop('hidden', true),
                initializeTable(state.commande.id_bouquet),
                /* state.commande.prix = 0,
                 console.log(state.commande + "      " + $('.check').prop('hidden')), */
                select = false,
                $('.select').text('Select')
            );
    });

}

$(document).ready(() => {

    console.log("client numero " + $('#id_client').text().trim());
    let tr = document.createElement('tr');


    let myPromise = new Promise((resolve, reject) => {
        $.get('http://localhost:8080/bouquet', (response) => {
            let d = JSON.parse(response);
            resolve(d);
        })
    });

    myPromise.then((data) => {
            data.map((e, index) => {
                let item = new Item(e.id, e.src, e.titre, e.prix).item();
                item.addEventListener('mouseover', () => {
                    $('.item').css({ "width": '300px', "height": '330px' });

                    $(`#${e.id}`).css({ transform: 'scale(1.1, 1.1)', "border": '5px solid #34495e' });
                    $('.body').css({ "height": '80px' });
                });
                item.addEventListener('mouseleave', () => {
                    $(`#${e.id}`).css({ transform: 'scale(1, 1)', "border": 'none' });
                })
                let tdd = document.createElement('td');

                tdd.appendChild(item);
                tr.appendChild(tdd);

                ((((index + 1) % 5) === 0) ? ($('tbody').append(tr), tr = document.createElement('tr')) : null)

            });
            selectImg();

        })
        .catch((err) => {
            console.log(err);
        })
})