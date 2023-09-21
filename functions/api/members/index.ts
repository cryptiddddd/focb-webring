const members = [
    {
        "index": 0,
        "button": "https://wormboy3.neocities.org/assets/images/button.png",
        "moniker": "wormboy",
        "url": "https://wormboy3.neocities.org/"
    },
    {
        "index": 1,
        "button": "https://evertecetera.neocities.org/images/ETCbutton.png",
        "moniker": "etc",
        "url": "https://everetcetera.neocities.org/"
    }, 
    {
        "index": 2,
        "button": "https://keplari.neocities.org/paracosmbutton.gif",
        "moniker": "epcot",
        "url": "https://keplari.neocities.org/"
    }, 
    {
        "index": 3,
        "button": null,
        "moniker": "ruby",
        "url": "https://sweetpeasprite.neocities.org/"
    },
    {
        "index": 4,
        "button": "https://wormboy3.neocities.org/assets/images/buttons/visitmossland.png",
        "moniker": "moss",
        "url": "https://mossland.neocities.org"
    },
    {
        "index": 5,
        "button": null,
        "moniker": "divorce florida",
        "url": "https://divorceflorida.neocities.org/"
    },
    {
        "index": 6,
        "button": null,
        "moniker": "spark",
        "url": "https://sparkdust.neocities.org/"
    }
];

function onRequestGet() {
    return Response.json({status: 200, data: members});
}

export { onRequestGet, members };