/*
this file is written for members of the friends of cranebot webring to easily include a webring widget on their page!

initially written in typescript, compiled.

initially written by.... WORMBOY!
*/

// begin config variables.
const SITENAME = "";
const WRAPPER_ID = "";

const AUTOSTYLE = true;
const CSS_PATH = "https://friends-of-cranebot.pages.dev/assets/css/widget.css";
const VERBOSE = false;

// end config variables.

var widgetWrapper = document.getElementById(WRAPPER_ID);

if (widgetWrapper === null) {
    console.error(`id "${WRAPPER_ID}" could not be found on the current document. please reconfigure.`);
}

// interfaces for typescript.
interface MemberData {
    index: number,
    button: string | null,
    moniker: string,
    url: string
}

// memberpackage being the whole package, memberdata being for a single member.
interface MemberPackage {
    member: MemberData,
    next: MemberData,
    previous: MemberData,
    webring: object;
}

/**
 * builds and places the webring's widget on the page.
 * @param memberPackage complete set of expected member data.
 */
function createWidget(memberPackage: MemberPackage): void {
    widgetWrapper.innerHTML = `<div id="focbwr-inner">
    <p>friends of cranebot!</p>
    <div>
        <a href="${memberPackage.previous.url}">\u27F5 prev</a>
        <a href="https://friends-of-cranebot.pages.dev/api/random/">random</a>
        <a href="${memberPackage.next.url}">next \u27F6</a>
    </div>
</div>`

    if (AUTOSTYLE) {
        let link = document.createElement("link");
        link.rel= "stylesheet";
        link.href = CSS_PATH;

        document.head.appendChild(link);
    }
}

const request = new XMLHttpRequest();

request.onload = function (): void {
    if (VERBOSE) console.log("focbwr: package received.");

    let jsonResponse = JSON.parse(this.responseText);
    if (jsonResponse.status == 200) return createWidget(jsonResponse.data);

    // otherwise...
    console.error(`focbwr: ${jsonResponse.status} ${jsonResponse.message}`);
    if (VERBOSE) console.error(`focbwr: member "${SITENAME}" could not be found on the friends of cranebot webring. reconfigure the "SITENAME" variable. reference https://friends-of-cranebot.pages.dev/. contact crane if something is wrong.`);
};

if (VERBOSE) console.log(`focbwr: requesting data for "${SITENAME}"`);

request.open("GET", `https://friends-of-cranebot.pages.dev/api/members/${SITENAME}`);
request.send();