const express = require('express');
const router = express.Router();
const protocol = require('../utils/connection');
const { body, query, validationResult } = require('express-validator');
const {fromString} = require('uuidv4');

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
router.get("/powiatwulkanowy/api/LiczbyNieodczytanych", (req, res) => {
    res.json([
            {
                "globalKey": "a4fb6872-e99c-4d06-b64a-f8523929cc79",
                "liczbaWiadomosci": 2
            }
        ]
    )
});
//router.get("/powiatwulkanowy/api/OdebraneSkrzynka", (req, res) => {});
//router.get("/powiatwulkanowy/api/WyslaneSkrzynka", (req, res) => {});
//router.get("/powiatwulkanowy/api/UsunieteSkrzynka", (req, res) => {});
//router.get("/powiatwulkanowy/api/KopieSkrzynka", (req, res) => {});
router.get("/powiatwulkanowy/api/DdsArchive", (req, res) => {});
router.get([
    "/powiatwulkanowy/api/Odebrane",
    "/powiatwulkanowy/api/OdebraneSkrzynka",
], (req, res) => {
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
router.get([
    "/powiatwulkanowy/api/Wyslane",
    "/powiatwulkanowy/api/WyslaneSkrzynka",
], (req, res) => {
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
router.get([
    "/powiatwulkanowy/api/Usuniete",
    "/powiatwulkanowy/api/UsunieteSkrzynka",
], (req, res) => {
    const UsunieteWia = require("../../data/uonetplus-wiadomosciplus/Usuniete").map(item => {
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
        UsunieteWia
    )
});
router.get("/powiatwulkanowy/api/WiadomoscSzczegoly", query('apiGlobalKey').isUUID(4).withMessage({message: "Nie zapomniałeś o ID skrzynki?"}), (req, res) => {
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
router.get("/powiatwulkanowy/api/OdebraneArchiwum", (req, res) => {
    const OdebraneArchiwumWia = require("../../data/uonetplus-wiadomosciplus/OdebraneArchiwum").map(item => {
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
        OdebraneArchiwumWia
    )
});
router.get("/powiatwulkanowy/api/WyslaneArchiwum", (req, res) => {
    const WyslaneArchiwumWia = require("../../data/uonetplus-wiadomosciplus/WyslaneArchiwum").map(item => {
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
        WyslaneArchiwumWia
    )
});
router.get("/powiatwulkanowy/api/UsunieteArchiwum", (req, res) => {
    const UsunieteArchiwumWia = require("../../data/uonetplus-wiadomosciplus/UsunieteArchiwum").map(item => {
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
        UsunieteArchiwumWia
    )
});
router.get("/powiatwulkanowy/api/Ustawienia", query('apiGlobalKey').isUUID(4).withMessage({message: "Nie zapomniałeś o ID skrzynki?"}), (req, res) => {
    const reqID = req.query.apiGlobalKey
    const UstawieniaWia = require("../../data/uonetplus-wiadomosciplus/Ustawienia")
    function WiadoSearch(GlobalKey) {
        return UstawieniaWia.filter(
          function(UstawieniaWia) {
            return UstawieniaWia.apiGlobalKey == GlobalKey
          }
        );
      }
      var found = WiadoSearch(reqID)
      UstawieWia = found.map(item => {
        return {
            "stopka": item.stopka,
            "trybWysylaniaPowiadomien": item.trybWysylaniaPowiadomien
        }
    });
    res.json(UstawieWia[0])
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
    res.status(204)
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
router.get("/powiatwulkanowy/api/Kopia", (req, res) => {    
    const KopieWia = require("../../data/uonetplus-wiadomosciplus/KopiaWia").map(item => {
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
    KopiaWia
)
});;
router.get("/powiatwulkanowy/api/Uczniowie", (req, res) => {
    res.json([])
});
router.get("/powiatwulkanowy/api/Opiekunowie", (req, res) => {
    res.json([])
});
router.get("/powiatwulkanowy/api/GrupaAdresatow", (req, res) => {});
router.get("/powiatwulkanowy/api/GrupyAdresatow", (req, res) => {});
router.get("/powiatwulkanowy/api/Pracownicy", (req, res) => {    
    const user = require("../../data/api/ListaUczniow")[1];
    const recipients = require("../../data/api/dictionaries/Pracownicy");
    res.json(recipients.map(item => {
        return {
            "skrzynkaGlobalKey": fromString(item.Id.toString()),
            "nazwa": `${item.Nazwisko} ${item.Imie} - P - (${user.JednostkaSprawozdawczaSkrot})`
        };
    }));
});
router.get("/powiatwulkanowy/api/WiadomoscNowa", (req, res) => {});
router.get("/powiatwulkanowy/api/WiadomoscOdpowiedzPrzekaz", (req, res) => {});
router.get("/powiatwulkanowy/api/WiadomoscArchiwumOdpowiedzPrzekaz", (req, res) => {});
router.get("/powiatwulkanowy/api/MoveTrash", (req, res) => {});
router.get("/powiatwulkanowy/api/RestoreTrash", (req, res) => {});
router.get("/powiatwulkanowy/api/DeleteArchiwum", (req, res) => {});
router.get("/powiatwulkanowy/api/RestoreTrashArchiwum", (req, res) => {});
router.get("/powiatwulkanowy/api/OdebraneWydruk", (req, res) => {});
router.get("/powiatwulkanowy/api/WyslaneWydruk", (req, res) => {});
router.get("/powiatwulkanowy/api/WiadomoscOdbiorcy", (req, res) => {});
router.get("/powiatwulkanowy/api/OdebraneSzczegolyArchiwum", (req, res) => {    
    const reqID = req.query.idWiadomosc
    const WiadomosciSzczego = require("../../data/uonetplus-wiadomosciplus/OdebraneWiaSzczegolyArchiwum")
    function WiadoSearch(idWiadomo) {
        return WiadomosciSzczego.filter(
          function(WiadomosciSzczego) {
            return WiadomosciSzczego.id == idWiadomo
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
            "zalaczniki": [
                {
                    "url": "https://1drv.ms/u/s!AmvjLDq5anT2psJ4nujoBUyclWOUhw",
                    "nazwaPliku": "nazwa_pliku.pptx"
                },
                {
                    "url": "https://wulkanowy.github.io/",
                    "nazwaPliku": "wulkanowy.txt"
                },
                {
                    "url": "https://github.com/wulkanowy/wulkanowy",
                    "nazwaPliku": "wulkanowy(2).txt"
                }
            ],
            "id": item.id
        }
    });
    
    res.json(Wiado[0])
});;  
router.get("/powiatwulkanowy/api/WyslaneSzczegolyArchiwum", (req, res) => {    
    const reqID = req.query.idWiadomosc
    const WiadomosciSzczego = require("../../data/uonetplus-wiadomosciplus/WyslaneWiaSzczegolyArchiwum")
    function WiadoSearch(idWiadomo) {
        return WiadomosciSzczego.filter(
          function(WiadomosciSzczego) {
            return WiadomosciSzczego.id == idWiadomo
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
            "zalaczniki": [
                {
                    "url": "https://1drv.ms/u/s!AmvjLDq5anT2psJ4nujoBUyclWOUhw",
                    "nazwaPliku": "nazwa_pliku.pptx"
                },
                {
                    "url": "https://wulkanowy.github.io/",
                    "nazwaPliku": "wulkanowy.txt"
                },
                {
                    "url": "https://github.com/wulkanowy/wulkanowy",
                    "nazwaPliku": "wulkanowy(2).txt"
                }
            ],
            "id": item.id
        }
    });
    
    res.json(Wiado[0])
});
router.get("/powiatwulkanowy/api/UsunieteSzczegolyArchiwum", (req, res) => {    
    const reqID = req.query.idWiadomosc
    const WiadomosciSzczego = require("../../data/uonetplus-wiadomosciplus/UsunieteWiaSzczegolyArchiwum")
    function WiadoSearch(idWiadomo) {
        return WiadomosciSzczego.filter(
          function(WiadomosciSzczego) {
            return WiadomosciSzczego.id == idWiadomo
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
            "zalaczniki": [
                {
                    "url": "https://1drv.ms/u/s!AmvjLDq5anT2psJ4nujoBUyclWOUhw",
                    "nazwaPliku": "nazwa_pliku.pptx"
                },
                {
                    "url": "https://wulkanowy.github.io/",
                    "nazwaPliku": "wulkanowy.txt"
                },
                {
                    "url": "https://github.com/wulkanowy/wulkanowy",
                    "nazwaPliku": "wulkanowy(2).txt"
                }
            ],
            "id": item.id
        }
    });
    
    res.json(Wiado[0])
});

module.exports = router;
