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

function Item(id, src, titre, prix, disponible) {
    this.id_client = $('#id_client').text().trim(); // document.querySelector('#id_client').nodeValue;
    this.id = id;
    this.src = src;
    this.titre = titre;
    this.prix = prix;
    this.disponible = disponible;
    this.q = 1;
    this.panier = null;
    this.commande = {
        quantite: 0,
        id_bouquet: 0,
    }

    this.item = () => {
        let glob = createDivWithClass('glob');
        let item = document.createElement('div');
        item.className = 'item'; //createDivWithClass('item')
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
        item.id = this.id;


        this.addQuantity = () => {
            if (this.panier) {
                this.q = $('.info_quantity').text() * 1;
                //const dispo = $('.disponible').text() * 1;
                (this.disponible === 0 ?
                    ($('.info_quantity').text("0"),
                        $('.info_prix').text("0")) :
                    ( /* $('.info_quantity').text() * 1 */
                        (this.q >= this.disponible ? this.q = this.disponible : this.q = this.q + 1),
                        $('.info_quantity').text(this.q),
                        $('.info_prix').text(this.prix * this.q)))

            }
        }

        this.minusQuantity = () => {
            if (this.panier) {
                this.q = $('.info_quantity').text() * 1;
                //const dispo = $('.disponible').text() * 1;
                (this.disponible === 0 ?
                    ($('.info_quantity').text("0"),
                        $('.info_prix').text("0")) :
                    ( /* $('.info_quantity').text() * 1 */
                        (this.q === 1 ? this.q = 1 : this.q = this.q - 1),
                        $('.info_quantity').text(this.q),
                        $('.info_prix').text(this.prix * this.q)))
            }
        }

        this.commander = () => {
            /* this.q = $('.info_quantite').text() * 1 */
            if (this.panier) {
                const obj = {
                    id_client: this.id_client,
                    id_bouquet: this.id,
                    quantite: this.q,
                    prix: this.q * this.prix,
                }
                console.log("commander " + JSON.stringify(this.commande) + " obj " + JSON.stringify(obj));
                $.post("http://localhost:8080/set_commande/id/" + this.id_client, obj, (data, status) => {
                    if (data.data === "OK") {
                        swal("Bien enregistrer", "votre commande est bien enregistrée", "success")
                            .then(() => {
                                window.location = '/panier/id/' + this.id_client;
                            });
                    } else {
                        swal("Erreur", "une erreur s'est produite, veuillez réssayer", "error")
                            .then(() => {
                                window.location = '/userhome/id/' + this.id_client;
                            })
                    }
                });
            };
        };


        this.annuler = () => {
            let annuler = document.querySelector('.annuler');
            annuler.addEventListener('click', () => {
                $('body').css("background-color", 'rgba(255, 255, 255)');
                $(".item").css({ "opacity": '1', "cursor": 'pointer', "z-index": '0' });
                //$(".information").fadeToggle(0);
                this.panier = false;
                $('.info_quantity').text("1");
                console.log(this.panier);
                $(".information").attr("hidden", true);
                $('#g, #d').css({ "z-index": '1' });

            })
        }

        item.addEventListener("click", () => {
            this.panier = true;
            console.log(this.panier, " id client ", this.id_client + " mon id " + this.id);
            console.log("item clicked " + this.id);
            $('body, .item').css({ "background-color": 'rgba(0, 0, 0, 0.8)', "z-index": '1', "cursor": 'default' });
            $(".item").css({ "opacity": '0.5' });
            $('.info_titre').text(this.titre);
            let src = this.src;
            $("#img").attr("src", this.src);
            $('.info_prix').text(this.prix);
            $(".disponible").text(this.disponible);

            document.querySelector('#plus').addEventListener('click', this.addQuantity);
            //$("#plus").click(this.addQuantity);
            document.querySelector('#minus').addEventListener('click', this.minusQuantity)
                //$('#minus').click(this.minusQuantity);

            if (this.disponible === 0) {
                $('.cmd').attr("disabled", true);
                $('.cmd').css({ "opacity": ".5" });
            } else {
                $('.cmd').attr({ "disabled": false });
                $('.cmd').css({ "opacity": "1" });
                document.querySelector('.cmd').addEventListener('click', this.commander);
                //$('.cmd').click(this.commander);
            }

            $(".information").attr("hidden", false);
            /*  if ($(".information").prop("hidden") === false) { */
            this.annuler();
            /*  } */
            //$(".information").fadeToggle(100);

        });

        glob.appendChild(item);
        return item;
    };

    console.log(this.id_client);
}

animation = () => {
    $(`#${this.id}:hover`).css({ "width": '400px', "height": '430px' })
}

$(document).ready(() => {


    $('#range').val('100');
    animation();
    let data = null;

    console.log("clienttttttttttt " + $('#id_client').text().trim());
    let myPromise = new Promise((resolve, reject) => {
        $.get('http://localhost:8080/bouquet', (response) => {
            console.log(typeof(JSON.parse(response)));
            let dat = JSON.parse(response);

            resolve(dat)
        });
    });


    myPromise.then((dat) => {
            data = dat;
            console.log(data);
            let items = createDivWithClass('items');


            dat.map((e, idx) => {
                let item = new Item(e.id, e.src, e.titre, e.prix, e.disponible).item();
                item.addEventListener('mouseover', () => {
                    $('.item').css({ "width": '390px', "height": '420px' });
                    //$('.image').css({ "height": '370px' });
                    //$(`#${e.id}`).css({ "width": '450px', "height": '450px', "border": '5px solid black' });
                    $(`#${e.id}`).css({ transform: 'scale(1.1, 1.1)', "border": '5px solid #34495e' });
                    $('.body').css({ "height": '80px' });
                });
                item.addEventListener('mouseleave', () => {
                    //$(`#${e.id}`).css({ "width": '390px', "height": '420px', "border": "none" });
                    $(`#${e.id}`).css({ transform: 'scale(1, 1)', "border": 'none' });
                })
                items.appendChild(item);


            });
            $('.carou').css({ 'overflow': 'hidden' });
            $(".carou").append(items);


        })
        .catch((err) => {
            console.log(err)
        })

    setTimeout(() => {
        let d = 0;
        let item = document.querySelectorAll('.item');

        $('#range').click(() => {
            d = 0;
            let tab = [];
            const value = $('#range').val();
            data.map((elem, idx) => {
                elem.prix > value ? $(`#${elem.id}`).css({ 'display': 'none' }) :
                    (
                        $(`#${elem.id}`).css({ 'display': 'block' }),
                        tab.push(elem.id)
                    )
                if ($(`#${elem.id}`).css('display') === 'block') d = d + 1;

            });
            console.log("dddddddd " + d + tab);

            d > 3 ?
                (
                    $('.btnd, .btng').css({ 'display': 'block' })
                    //$('.carou').css({ 'overflow-x': 'scroll' })
                ) :
                (
                    //$('.carou').css({ 'overflow': 'hidden' }),
                    $('.btnd, .btng').css({ 'display': 'none' }),
                    $('.items').css({ "margin": '0 auto' })
                )
                //$('#d, #g').css({ 'display': 'none' });


        });
        let id = 0;
        let bool = false;
        $('#d').click(() => {

            let item = document.querySelectorAll('.item');
            //let d = $('.item').css('display') === 'block';
            console.log(item.length + " dddd " + item[0].getAttribute('style').split(';')[4]);
            //css({ 'display': 'none' })
            id < item.length ?
                (
                    //$(`#${id}`).fadeOut("slow"),
                    (document.querySelector('.item').offsetLeft > -3480 ?
                        $('.item').animate({
                            left: '-=9.5%'
                        }, 1000) :
                        null),
                    id = id + 1
                ) : id = id - 1;
        });
        $('#g').click(() => {
            console.log(document.querySelector('.item').offsetLeft);
            id > 0 ?
                (
                    (document.querySelector('.item').offsetLeft < 80 ?
                        $('.item').animate({
                            left: '+=9.5%'
                        }, 1000) :
                        null),
                    id = id - 1
                    //$(`#${id}`).fadeIn("slow")
                ) :
                id = 0;
        });

    }, 500);











});