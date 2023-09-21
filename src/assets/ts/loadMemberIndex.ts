/**
 * this file populates the homepage with members and their data! yay!
 */

interface MemberData {
    index: number,
    moniker: string,
    url: string,
    button: string | null
}

interface ExpectedJSON {
    status: number,
    data: MemberData[]
}


function fillTable(data: ExpectedJSON): void {
    let memberTable = document.getElementById("member-index");
    console.log(data);
    for (let memberData of data.data) {
        let memberRow = document.createElement("tr");

        // populate row
        let memberIdxCell = document.createElement("td");
        memberIdxCell.innerText = "" + memberData.index;

        let memberLinkcell = document.createElement("td");
        memberLinkcell.innerHTML = `<a href=${memberData.url} target="_blank">${memberData.moniker}</a>`;

        // assemble
        memberRow.appendChild(memberIdxCell);
        memberRow.appendChild(memberLinkcell);
        
        memberTable.appendChild(memberRow);
    }
}

const xmlhttp = new XMLHttpRequest();

xmlhttp.onload = function(): void {
    fillTable(JSON.parse(this.responseText));
};

xmlhttp.open("GET", "/api/members");
xmlhttp.send();