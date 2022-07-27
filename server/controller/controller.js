//const User = require('../model/model');
const { json } = require('body-parser');
const mongodb = require('mongodb');
const connectDB = require('../database/connexion');

const url = "mongodb://localhost:27017/users"


exports.connect_user = (req, res) => {
    console.log("email " + req.body.data.email + " password " + req.body.data.password);
    let email = req.body.data.email;
    let password = req.body.data.password;
    connectDB.getConnection((err, con) => {
        if (err) throw err;
        const query = "SELECT * FROM clients WHERE email = ? and password = ?";
        con.query(query, [email, password], (err, result) => {
            con.release();
            if (err) throw err;
            if (result.length > 0) {
                req.session.user = email;
                console.log("session " + req.session.user)
                console.log("id uszr" + result[0].id);
                req.flash('id_client', result[0].id);
                res.status(200).send({ id: result[0].id })
                    //res.redirect('/userhome').send({ id: result[0].id });
            } else {
                console.log(result.length)
                req.session.user = null;
                res.status(200).send({ data: "NO" })
            };
            console.log(result);

        });
    });
};

exports.connect_employers = (req, res) => {
    console.log("emailllll " + req.body.data.email + " password " + req.body.data.password);
    let email = req.body.data.email;
    let password = req.body.data.password;
    connectDB.getConnection((err, con) => {
        if (err) throw err;
        const query = "SELECT * FROM employers WHERE email = ? and password = ?";
        con.query(query, [email, password], (err, result) => {
            con.release();
            if (err) throw err;
            if (result.length > 0) {
                console.log("id " + result);
                req.session.employer = req.body.email;
                req.flash('id_employer', result[0].id);
                res.status(200).send({ id: result[0].id })
                    // res.redirect('/userhome_employer');
            } else {
                console.log(result.length)
                req.session.employer = null;
                res.send({ data: "NO" });
            };

        });
    });
}


exports.get_fleur = (req, res) => {
    connectDB.getConnection((err, con) => {
            if (err) throw err;
            const query = "SELECT * FROM bouquet";
            con.query(query, (err, result) => {
                con.release();
                if (err) throw err;
                //console.log(result);
                res.header('Access-Control-Allow-Origin', '*')
                res.send(JSON.stringify(result));
            })
        })
        /*   mongodb.connect(url, (err, dbase) => {
              let db = dbase.db('users');
              const result = db.collection('bouquet').find().toArray((err, rss) => {
                  if (err) throw err;
                  console.log("fleur " + rss);
                  res.send(JSON.stringify(rss));
              });
          }) */
};

exports.set_commande = (req, res) => {
    console.log("id client " + req.params.id + " quantity " + req.body.quantite + " " + req.body.prix);
    connectDB.getConnection((err, con) => {
        try {
            let now = new Date();
            let date = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() +
                " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            const value = [
                [req.params.id, req.body.id_bouquet, req.body.quantite, req.body.prix, date],
            ]
            const id = req.body.id_bouquet * 1;
            const quantity = req.body.quantite;
            const prix = req.body.prix * 1;
            /* con.query("SELECT id_bouquet FROM commande", (err, result) => {
             */
            /*   try { */
            con.release();
            let query = "";
            /* let index = result.findIndex((e) => e.id_bouquet === (id * 1));
            console.log("index " + index);
            if (index === -1) { */
            console.log("inserr");
            query = "INSERT INTO commande (id_client, id_bouquet, quantity, prix, date) VALUES ?";
            con.query(query, [value], (err, result) => {
                //if (err) throw err;
                //console.log(result.affectedRows);
                res.header('Access-Control-Allow-Origin', '*')
                res.status(200).send({ data: "OK" });
                console.log("bien");
            });
            /* } else {
                query = "UPDATE commande SET quantity = ?, prix = ?, date = ?  WHERE id_bouquet = ?";
                con.query(query, [quantity, prix, date, id], (err, result) => {
                    //con.release();
                    if (err) throw err;
                    console.log(result.affectedRows + " recu " + req.body.quantite);
                    res.header('Access-Control-Allow-Origin', '*')
                    res.status(200).send({ data: "UPDATED" });
                });
            }; */
            /*  } catch (err) {
                 res.status(200).send({ data: "NO" });
             } */
            /*  }) */
        } catch (err) {
            res.status(200).send({ data: "NO" });
        }
    });
};

exports.get_commande = (req, res) => {
    console.log("client " + req.params.id)
    connectDB.getConnection((err, con) => {
        if (err) throw err;
        con.query("SELECT * FROM commande WHERE id_client = " + req.params.id, (err, result) => {
            con.release();
            if (err) throw err;
            res.send(JSON.stringify(result));
        });
    });
};

exports.get_commande_detail = (req, res) => {
    console.log("id bouquet demander " + req.body.id_bq);
    let sql = "";
    try {
        if (req.body.table === 'define') {
            sql = "SELECT * FROM bouquet WHERE id = " + req.body.id_bq;
            connectDB.getConnection((err, con) => {
                //if (err) throw err;
                con.query(sql, (err, result) => {
                    con.release();
                    if (err) throw err;
                    console.log(result);
                    res.status(200).send(JSON.stringify(result));
                });
            })
        } else {
            sql = "SELECT bqtprs FROM commandeperso WHERE id_cmd = " + req.body.id_bq
            connectDB.getConnection((err, con) => {
                if (err) throw err;
                con.query(sql, (err, result) => {
                    con.release();
                    console.log(result);
                    if (err) throw err;

                    sql = "SELECT id_bouquet FROM bouquetperso WHERE id_cmd = " + result[0].bqtprs;
                    let ids = [];
                    con.query(sql, (err, result) => {
                        if (err) throw err;
                        console.log(result);
                        result.map(id => ids.push(id.id_bouquet));
                        con.query("SELECT * FROM bouquet WHERE id in (" + [ids] + ")", (err, resultt) => {
                            if (err) throw err;
                            console.log(resultt)
                            res.status(200).send(JSON.stringify(resultt));
                        });
                    });
                });
            });
        };
    } catch (err) {
        res.status(200).send({ data: "NO" });
    };

};


exports.set_commandeperso = (req, res) => {
    console.log(req.body + " " + req.params.id);
    let id = 0;
    let data = [];
    connectDB.getConnection((err, con) => {
        if (err) throw err;
        con.query("SELECT max(id_cmd) as id FROM bouquetperso", (err, result) => {
            try {
                con.release();
                //if (err) throw err;
                id = result[0].id + 1
                console.log(JSON.stringify(result) + " " + id);
                req.body.id_bouquet.forEach((e) => {
                    data.push([id, e * 1]);
                });
                console.log(data)
                const sql = "INSERT INTO bouquetperso VALUES ?";
                con.query(sql, [data], (err, result) => {
                    if (err) throw err;
                    console.log("la commande est bien inserer ");
                });
                let now = new Date();
                let date = now.getFullYear() + "-" + (now.getMonth() * 1 + 1) + "-" + now.getDate() +
                    " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
                const value = [
                    [req.body.prix, req.params.id, id, date, "non traité"]
                ]
                const sql1 = "INSERT INTO commandeperso (prix, id_client, bqtprs, date, statue) VALUES ? ";
                con.query(sql1, [value], (err, result) => {
                    if (err) throw err;
                    console.log("la commande est vraimnt bien inserer");
                    res.status(200).send({ data: "OK" });
                });
            } catch (err) {
                res.status(200).send({ data: "NO" });
            }
        });
    });
};

exports.get_commandeperso = (req, res) => {
    console.log("id " + req.params.id);
    connectDB.getConnection((err, con) => {
        if (err) throw err;
        con.query("SELECT * FROM commandeperso WHERE id_client = " + req.params.id, (err, result) => {
            con.release();
            if (err) throw err;
            console.log(result);
            res.send(JSON.stringify(result));
        });
    });
};


exports.get_Allcommande = (req, res) => {
    connectDB.getConnection((err, con) => {
        if (err) throw err;
        con.query("SELECT * FROM commande", (err, result) => {
            con.release();
            if (err) throw err;
            console.log(result);
            res.send(JSON.stringify(result));
        });
    });
};

exports.get_Allcommandeperso = (req, res) => {
    connectDB.getConnection((err, con) => {
        if (err) throw err;
        con.query("SELECT * FROM commandeperso", (err, result) => {
            con.release();
            if (err) throw err;
            console.log(result);
            res.send(JSON.stringify(result));
        });
    });
};

exports.update_commande = (req, res) => {
    console.log("in define " + req.body.id + " table" + req.body.table);
    let sql = "";
    if (req.body.table === "perso") {
        if (req.body.action === "done") {
            sql = "update commandeperso set statue = 'traitement términé' WHERE id_client + bqtprs = " + req.body.id;
        } else {
            sql = "update commandeperso set statue = 'traitement en cours' WHERE id_client + bqtprs = " + req.body.id;
        }
    } else if (req.body.table === "define") {
        if (req.body.action === "done") {
            sql = "update commande set status = 'traitement términé' WHERE id_client + id_bouquet = " + req.body.id;
        } else {
            sql = "update commande set status = 'traitement en cours' WHERE id_client + id_bouquet = " + req.body.id;
        }
    }
    //(req.query.table === "perso") ? sql = "update_commande_perso": sql = "update_commande_ define"
    connectDB.getConnection((err, con) => {
        if (err) throw err;
        con.query(sql, (err, result) => {
            con.release();
            if (err) throw err;
            console.log(result);
            res.send({ data: "OK" });
        });
    });
};


exports.delete_commande = (req, res) => {
    console.log("in define " + req.body.id + " table" + req.body.table);
    let sql = "";
    if (req.body.table === 'define') {
        sql = "DELETE FROM commande WHERE id_client + id_bouquet = " + req.body.id;
    } else {
        sql = "DELETE FROM commandeperso WHERE id_cmd = " + req.body.id;
    }
    connectDB.getConnection((err, con) => {
        if (err) throw err;
        con.query(sql, (err, result) => {
            con.release();
            if (err) throw err;
            console.log(result);
            res.send({ data: "OK" });
        });
    });
}