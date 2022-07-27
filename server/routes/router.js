const express = require('express');
const router = express.Router();
const _ = require('lodash');

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 * @description geting login page
 * @method GET /
 */

router.get('/login', services.login_page);
router.get('/login_employer', services.login_page_emp);


/**
 * @description login user
 * @method POST /
 */

router.post('/login', controller.connect_user);
router.post('/login_employer', controller.connect_employers);

router.get('/userhome/id/:id', services.home);
router.get('/userhome_employer/id/:id', services.home_employer);
router.get('/logout', services.logout);




router.get('/bouquet', controller.get_fleur);
router.post('/set_commande/id/:id', controller.set_commande);
router.get('/get_commande/id/:id', controller.get_commande);

router.post('/get_commande_detail/id/3', controller.get_commande_detail);

router.get('/panier/id/:id', services.panier);

router.post('/set_commandeperso/id/:id', controller.set_commandeperso);

router.get('/commande_personaliser/id/:id', services.commande_personaliser);

router.get('/get_commandeperso/id/:id', controller.get_commandeperso);

router.post('/delete_commande', controller.delete_commande);

// routes for employers

router.get('/get_Allcommande', controller.get_Allcommande);
router.get('/get_Allcommandeperso', controller.get_Allcommandeperso);
router.post('/update_commande', controller.update_commande);


router.get('/cmd_en_cours', services.cmd_en_cours);
router.get('/cmd_done', services.cmd_done);

//router.post('/update_commande_done', controller.update_commande_done)
module.exports = router;