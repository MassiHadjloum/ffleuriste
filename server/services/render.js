exports.login_page = (req, res, next) => {
    res.render('login');
}
exports.login_page_emp = (req, res, next) => {
    res.render('login_employer');
}


//geting home login home user page 
exports.home = (req, res) => {
    /*     if (req.session.user) { */
    res.render('userhome', { user: req.session.user, id_client: req.params.id });;
    //res.render('userhome', { user: req.session.user, id_client: req.flash('id_client') });
    /*  } else {
         res.send("Unauthorized user");
     } */
}

exports.home_employer = (req, res) => {
    /* if (req.session.employer) {
        res.render('userhome_employer', { employer: req.session.employer, id_employer: req.flash('id_employer') })
    } */
    res.render('userhome_employer', { employer: req.session.employer, id_employer: req.params.id });
}



//logout user and rederected to login page
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.redirect('/login');
        }
    })
}

let id_client = null;

exports.panier = (req, res) => {
    id_client = req.flash('id_client');
    res.render('panier', { id_client: req.params.id });
    /*   if (req.session.user) {

      } else {
          res.send("session terminated");
      } */
}

exports.commande_personaliser = (req, res) => {
    res.render('cmd_perso', { id_client: req.params.id });
}

exports.cmd_en_cours = (req, res) => {
    res.render('cmd_encours_empl', { employer: req.session.employer, id_employer: req.flash('id_employer') });
};

exports.cmd_done = (req, res) => {
    res.render('cmd_done_empl', { employer: req.session.employer, id_employer: req.flash('id_employer') })
}