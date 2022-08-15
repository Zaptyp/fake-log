const express = require('express');
const router = express.Router();
const protocol = require('../utils/connection');

router.get("/", (req, res) => {
    const base = protocol(req) + "://" + req.get('host') + "/powiatwulkanowy/api";
    res.json({
        status: "success",
        data: {
            endpoints: [
                "/OdebraneNowe",
                "/WyslaneNowe",
                "/LiczbyNieodczytanych",
                "/OdebraneSkrzynka",
                "/WyslaneSkrzynka",
                "/UsunieteSkrzynka",
                "/KopieSkrzynka",
                "/DdsArchive",
                "/Odebrane",
                "/Wyslane",
                "/Usuniete",
                "/Kopie",
                "/OdebraneArchiwum",
                "/WyslaneArchiwum",
                "/UsunieteArchiwum",
                "/Ustawienia",
                "/Stopka",
                "/StatystykiLogowan",
                "/Skrzynki",
                "/Kopia",
                "/OdebraneSzczegolyArchiwum",
            ].map(item => {
                return base + item;
            })
        }
    });
});

router.get("/OdebraneNowe", (req, res) => {

});
router.get("/WyslaneNowe", (req, res) => {});
router.get("/LiczbyNieodczytanych", (req, res) => {});
router.get("/OdebraneSkrzynka", (req, res) => {});
router.get("/WyslaneSkrzynka", (req, res) => {});
router.get("/UsunieteSkrzynka", (req, res) => {});
router.get("/KopieSkrzynka", (req, res) => {});
router.get("/DdsArchive", (req, res) => {});
router.get("/Odebrane", (req, res) => {
    const OdebraneWia = require("../../data/uonetplus-wiadomosciplus/Odebrane").map(item => {
        return {
            "apiGlobalKey": item.apiGlobalKey,
            "korespondenci": item.korespondenci,
            "temat": item.temat,
            "data": item.data,
            "skrzynka": item.skrzynka,
            "hasZalaczniki": item.hasZalaczniki,
            "przeczytana": item.przeczytana,
            "nieprzeczytanePrzeczytanePrzez": item.nieprzeczytanePrzeczytanePrzez,
            "wazna": item.wazna,
            "uzytkownikRola": item.uzytkownikRola,
            "id": item.id,
        };
    });
    res.json([
        OdebraneWia
    ])
});
router.get("/Wyslane", (req, res) => {});
router.get("/Usuniete", (req, res) => {});
router.get("/Kopie", (req, res) => {});
router.get("/OdebraneArchiwum", (req, res) => {});
router.get("/WyslaneArchiwum", (req, res) => {});
router.get("/UsunieteArchiwum", (req, res) => {});
router.get("/Ustawienia", (req, res) => {});
router.get("/Stopka", (req, res) => {});
router.get("/StatystykiLogowan", (req, res) => {});
router.get("/Skrzynki", (req, res) => {});
router.get("/Kopia", (req, res) => {});
router.get("/OdebraneSzczegolyArchiwum", (req, res) => {});

module.exports = router;
