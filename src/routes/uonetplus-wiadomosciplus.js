const express = require('express');
const router = express.Router();
const protocol = require('../utils/connection');

router.get("/api", (req, res) => {
    const base = protocol(req) + "://" + req.get('host') + "/powiatwulkanowy";
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