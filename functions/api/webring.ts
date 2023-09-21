const webringData = {
    button: null,
    motd: "happy birthday to us!",
    url: "https://friends-of-cranebot.pages.dev/"
}

function onRequestGet() {
    return Response.json({
        status: 200,
        data: webringData
    })
}

export { webringData, onRequestGet };
