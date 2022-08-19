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
                "/Uczniowie",
                "/Opiekunowie",
                "/GrupaAdresatow",
                "/GrupyAdresatow",
                "/Pracownicy",
                "/WyslaneNowe",
                "/LiczbyNieodczytanych",
                "/OdebraneSkrzynka",
                "/WyslaneSkrzynka",
                "/UsunieteSkrzynka",
                "/KopieSkrzynka",
                "/DdsArchive",
                "/Odebrane",
                "/WiadomoscNowa",
                "/WiadomoscOdpowiedzPrzekaz",
                "/WiadomoscArchiwumOdpowiedzPrzekaz",
                "/MoveTrash",
                "/RestoreTrash",
                "/DeleteArchiwum",
                "/RestoreTrashArchiwum",
                "/OdebraneWydruk",
                "/WyslaneWydruk",
                "/Cache",
                "/Wyslane",
                "/Usuniete",
                "/Kopie",
                "/WiadomoscSzczegoly",
                "/OdebraneArchiwum",
                "/WyslaneArchiwum",
                "/UsunieteArchiwum",
                "/Ustawienia",
                "/Stopka",
                "/StatystykiLogowan",
                "/Skrzynki",
                "/Kopia",
                "/WiadomoscOdbiorcy",
                "/OdebraneSzczegolyArchiwum",
                "/WyslaneSzczegolyArchiwum",
                "/UsunieteSzczegolyArchiwum",
            ].map(item => {
                return base + item;
            })
        }
    });
});

router.get("/powiatwulkanowy/api/Cache", (req, res) => {
    const CacheWiado = require("../../data/uonetplus-wiadomosciplus/CacheLinki").map(item => {
        return {
            "elementy": item.elementy,
            "nazwa": item.nazwa,
            "link": item.link,
            "modul": item.modul,
        };
    });
    res.json(
        {
            "links": CacheWiado,
            "oneDriveClientId": "2851111-8456-4dbf-80c9-866742c86df",
            "googleDriveClientId": "",
            "googleDriveApiKey": "",
            "wiadomoscPowitalnaOn": false
        }
    )
});
router.get("/powiatwulkanowy/api/OdebraneNowe", (req, res) => {
    res.json([])
});
router.get("/powiatwulkanowy/api/WyslaneNowe", (req, res) => {
    res.json([])
});
router.get("/powiatwulkanowy/api/LiczbyNieodczytanych", (req, res) => {});
router.get("/powiatwulkanowy/api/OdebraneSkrzynka", (req, res) => {});
router.get("/powiatwulkanowy/api/WyslaneSkrzynka", (req, res) => {});
router.get("/powiatwulkanowy/api/UsunieteSkrzynka", (req, res) => {});
router.get("/powiatwulkanowy/api/KopieSkrzynka", (req, res) => {});
router.get("/powiatwulkanowy/api/DdsArchive", (req, res) => {});
router.get("/powiatwulkanowy/api/Odebrane", (req, res) => {
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
    res.json(
        OdebraneWia
    )
});
router.get("/powiatwulkanowy/api/Wyslane", (req, res) => {
    const WyslaneWia = require("../../data/uonetplus-wiadomosciplus/Wyslane").map(item => {
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
    res.json(
        WyslaneWia
    )
});
router.get("/powiatwulkanowy/api/Usuniete", (req, res) => {});
router.get("/powiatwulkanowy/api/Kopie", (req, res) => {});
router.get("/powiatwulkanowy/api/WiadomoscSzczegoly", (req, res) => {
    const reqID = req.query.apiGlobalKey
    const WiadomosciSzczego = require("../../data/uonetplus-wiadomosciplus/WiaSzczegoly")
    function WiadoSearch(GlobalKey) {
        return WiadomosciSzczego.filter(
          function(WiadomosciSzczego) {
            return WiadomosciSzczego.apiGlobalKey == GlobalKey
          }
        );
      }
    var found = WiadoSearch(reqID)
    Wiado = found.map(item => {
        return {
            "data": item.data,
            "apiGlobalKey": item.apiGlobalKey,
            "nadawca": item.nadawca,
            "odbiorcy": item.odbiorcy,
            "temat": item.temat,
            "tresc": item.tresc,
            "odczytana": item.odczytana,
            "zalaczniki": item.zalaczniki,
            "id": item.id
        }
    });
    res.json(Wiado[0])
});
router.get("/powiatwulkanowy/api/OdebraneArchiwum", (req, res) => {});
router.get("/powiatwulkanowy/api/WyslaneArchiwum", (req, res) => {});
router.get("/powiatwulkanowy/api/UsunieteArchiwum", (req, res) => {});
router.get("/powiatwulkanowy/api/Ustawienia", (req, res) => {
    const UstawieniaWia = require("../../data/uonetplus-wiadomosciplus/Ustawienia").map(item => {
        return {
            "stopka": item.stopka,
            "trybWysylaniaPowiadomien": item.trybWysylaniaPowiadomien
        }
    });
    res.json(
        UstawieniaWia
    )
});
router.get("/powiatwulkanowy/api/Stopka", (req, res) => {
    const StopkaWia = require("../../data/uonetplus-wiadomosciplus/Stopka").map(item => {
        return {
            "skrzynkaGlobalKey": item.skrzynkaGlobalKey,
            "tresc": item.tresc,
        }
    });
    res.json(
        StopkaWia
    )
});
router.get("/powiatwulkanowy/api/StatystykiLogowan", (req, res) => {
    res.json([])
});
router.get("/powiatwulkanowy/api/Skrzynki", (req, res) => {
    const SkrzynkiWia = require("../../data/uonetplus-wiadomosciplus/Skrzynki").map(item => {
        return {
            "globalKey": item.globalKey,
            "nazwa": item.nazwa,
            "typUzytkownika": item.typUzytkownika
        }
    });
    res.json(
        SkrzynkiWia
    )
});
router.get("/powiatwulkanowy/api/Kopia", (req, res) => {});
router.get("/powiatwulkanowy/api/OdebraneSzczegolyArchiwum", (req, res) => {});

module.exports = router;
