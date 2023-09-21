import { members } from "./members/index.js";

export function onRequestGet() {
    let member = members[Math.floor(Math.random() * members.length)];

    return Response.redirect(member.url);
}
