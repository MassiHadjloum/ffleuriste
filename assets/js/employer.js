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

function Item(id, src, titre, prix) {
    this.id = id;
    this.src = src;
    this.titre = titre;
    this.prix = prix;

    this.item = () => {
        let item = createDivWithClass('itemm')
        let image = createDivWithClass('imagem');
        let body = createDivWithClass('bodym');
        let title = createDivWithClass('titlem');
        let prix = createDivWithClass('prixm');
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

        return item;
    }
}

function CmdLine(placement, id_cmd, id, bouquet, quantity, prix, date, status) {
    this.placement = placement;
    this.id = id;
    this.id_cmd = id_cmd;
    this.bouquet = bouquet;
    this.quantity = quantity;
    this.date = date;
    this.prix = prix;
    this.status = status;


    this.cmd = () => {
        let td = [];
        let tr = document.createElement("tr");

        for (let i = 0; i < 8; i++) {
            td.push(document.createElement('td'));
        }
        td[0].innerHTML = this.id;
        td[0].style.borderLeft = "1px solid rgb(4, 214, 102)";
        td[0].style.borderRight = "1px solid rgb(4, 214, 102)";

        td[1].innerHTML = this.bouquet;
        td[2].innerHTML = this.quantity;
        td[3].innerHTML = this.date;
        td[4].innerHTML = this.prix + " $";
        td[5].innerHTML = this.status;
        td[5].classList = "statue";
        td[5].id = this.id + this.bouquet;

        let message = createDivWithClass('message');
        let span = document.createElement("span");
        span.innerHTML = "cliquer pour voir les details";
        span.classList = "msgshow";
        message.appendChild(span);

        let img = document.createElement("img");
        img.src = "/img/information.png";
        img.classList = "detail";
        img.alt = "info";
        message.appendChild(img);
        //td[6].appendChild(img);

        td[6].appendChild(message);
        /*  let img = document.createElement("img");
         img.src = "img/information.png";
         img.classList = "detail";
         img.alt = "info";
         td[6].appendChild(img); */

        /*  let dimg = document.createElement('img');
         dimg.src = "img/play-button.svg";
         dimg.classList = "delete";
         dimg.alt = "traitement"; */

        let messaged = createDivWithClass('messaged');
        let spand = document.createElement("span");
        spand.innerHTML = "suppression impossible, traitement terminé";
        spand.classList = "msgshowd";
        this.status === "non traité" ? spand.hidden = true : spand.hidden = false;
        messaged.appendChild(spand);

        let dimg = document.createElement('img');
        dimg.src = "/img/play-button.svg";
        dimg.classList = "delete";
        dimg.alt = "delete";

        messaged.appendChild(dimg)
        td[7].appendChild(messaged);
        td[7].style.borderRight = "1px solid rgb(4, 214, 102)";
        // td[7].appendChild(dimg);

        /* td[7].appendChild(tip);
        td[7].id = this.id;

        $(`#${this.id} :hover`).css({
            'visibility': 'visible'
        })
 */


        //td[7].style.borderRight = "1px solid rgb(4, 214, 102)";

        td.forEach((e, index) => {
            tr.appendChild(e);
        })

        let annuler = document.querySelector('.annuler');
        annuler.addEventListener('click', () => {
            $('.bdcmd').css("background-color", 'rgba(255, 255, 255)');
            $(".item").css({ "opacity": '1', "cursor": 'pointer' });
            //$(".information").fadeToggle(0);
            this.panier = false;
            /*  $('table tr').hover(() => {
                 console.log("hover")
                 $('tr').css({ "background-color": '#06d6a0' });
             }) */
            $('#img').attr("src", "");
            $(".information").attr("hidden", true);
            $('.itemm').css({ "display": "none" });
        })

        // to get details about bouquet
        /*   this.get_detail = async function() {
              console.log("id bouquet " + this.bouquet)
              $.post('http://localhost:8080/get_commande_detail/id/3', { id_bq: this.bouquet }, (data, status) => {
                  let daya = JSON.parse(data);
                  $('#img').attr("src", daya[0].src);
                  $('#prix').text(this.quantity * daya[0].prix);
              })
          };    */

        this.get_detail = async function() {
            console.log("id bouquet " + this.bouquet + " id " + this.id)
            table = "", id_bq = null, inf = null;
            (this.placement === 'perso') ? (table = "perso", id_bq = this.id_cmd) :
            (table = "define", id_bq = this.bouquet);
            $.post('http://localhost:8080/get_commande_detail/id/3', { id_bq: id_bq, table: table }, (data, status) => {
                let daya = JSON.parse(data);
                (table === "define") ?
                (
                    $('.define').prop('hidden', false),
                    $('.perso').prop('hidden', true),

                    $('#img').attr("src", daya[0].src),
                    $('#prix').text(this.quantity * daya[0].prix)
                ) : (
                    console.log(daya),
                    $('.define').prop('hidden', true),

                    $('.perso').prop('hidden', false),
                    inf = $('.items'),
                    daya.forEach((e, index) => {
                        let items = new Item(e.id, e.src, e.titre, e.prix).item();
                        inf.append(items);
                    }),
                    $('#prix').text(this.prix)
                )
            })
        };

        //let tds = document.getElementsByTagName('td');
        td[6].addEventListener("click", () => {
            this.get_detail();
            $('body ').css({ "background-color": 'rgba(0, 0, 0, 0.6)', "z-index": '1', "cursor": 'default' });
            /*   $('table tr').hover(() => {
                  console.log("hover")
                  $('tr').css({ "borderColor": 'rgba(0, 0, 0, 0.6)', "backgroundColor": 'rgba(0, 0, 0, 0.2)' })
              }) */
            $(".information").attr("hidden", false);
            if ($(".information").prop("hidden") === false) {
                annuler;
            }
            console.log(this.id)
        });

        td[7].addEventListener('click', () => {
            const id = this.id + this.bouquet;
            let url = "",
                table = "",
                action = "encours";
            (this.placement === 'perso') ? (table = "perso") : (table = "define");
            $(`#${id}`).text("traitement en cours");
            $.post("http://localhost:8080/update_commande", { id: id, table: table, action: action }, (data, status) => {
                console.log(data);
                swal("Traitement commancé", "la commande est en cours de traitement", "success")
                    .then(() => {
                        window.location = "http://localhost:8080/cmd_en_cours";
                    })
                    .catch(() => {

                    });

            });
        });


        return tr;
    }
}

let perso = false;
switchCommande = () => {
    $('.btn_cmd').click(() => {
        $('.commandes').fadeToggle("slow");
        $('#aucp').animate({
            left: '105%'
        }, "slow");

        if (!perso) {
            $('.btn_cmd').text("Commande fabriquer");
            $('.btn').css({ "width": "13%", "height": "60px" });
            //  $(".aucune").prop('hidden', true);
            perso = true;
        } else {
            $('.btn_cmd').text("Commande");
            $('.btn').css({ "width": "10%", "height": "40px" });
            perso = false;
        }
        console.log("fadein");
    });
};

let defineAnnimation = () => {
    $("#aucp").css({ "color": "red" })
    $('#aucp').animate({
        left: '+=10px'
    }, 2000);
};


//window.setInterval(defineAnnimation, 100)

$(document).ready(() => {
    $("#home").prop('hidden', true);
    console.log("client numero " + $('#id_client').text().trim())
    let url = "";
    let def = null;
    switchCommande(def);


    let myPromise = new Promise((resolve, reject) => {
        $.get('http://localhost:8080/get_Allcommande', (response) => {
            console.log(response)
            let cmds = JSON.parse(response);
            if (cmds.length > 0 && cmds.findIndex((e) => e.status === "non traité") !== -1) {
                def = true;
            } else {
                def = false;
            }
            resolve(cmds);
        })
    });

    myPromise.then((cmds) => {
            console.log(def)
            if (def) {
                console.log("ttttt " + cmds[0].id_client)
                $(".aucunep").attr('hidden', true)
            } else {
                $(".aucunep").prop('hidden', false);
            };

            cmds.map((cmd, index) => {
                if (cmd.status === "non traité") {
                    let tr = new CmdLine('define', cmd.id_client + cmd.id_bouquet, cmd.id_client, cmd.id_bouquet,
                        cmd.quantity, cmd.prix, cmd.date, cmd.status).cmd();
                    $('.tbody').append(tr);
                };
            });
        })
        .catch((err) => {
            console.log(err);
        });

    let myPromise1 = new Promise((resolve, reject) => {
        $.get('http://localhost:8080/get_Allcommandeperso', (response) => {
            console.log(response)
            let cmds = JSON.parse(response);
            if (cmds.length > 0 && cmds.findIndex((e) => e.statue === "non traité") !== -1) {
                $(".aucune").prop('hidden', true);
            } else {
                $(".aucune").prop('hidden', false);
            }
            resolve(cmds);
        })
    });

    myPromise1.then((cmds) => {
            cmds.map((cmd, index) => {
                if (cmd.statue === "non traité") {
                    let tr = new CmdLine('perso', cmd.id_cmd, cmd.id_client, cmd.bqtprs,
                        '/', cmd.prix, cmd.date, cmd.statue).cmd();
                    $('.tbodyp').append(tr);
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });



    //setInterval(defineAnnimation, 1000);
})