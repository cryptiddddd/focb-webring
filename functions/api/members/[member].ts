import { members } from "./index.js";
import { webringData } from "../webring.js";

interface ValidParams {
    member: string;
}

interface EventContext {
    request: Request;
    functionPath: string;
    params: ValidParams;
}

/**
 * generates a json response for a missing member.
 * @param memberName queried member name [lowercase]
 * @returns json error response.
 */
function memberNotFound(memberName: string): Response {
    return Response.json({
        status: 404,
        message: `member "${memberName}" was not found.`
    })
}

/**
 * handles a GET request on /api/members/{member-name}
 * @param context request context
 * @returns json response
 */
export function onRequestGet(context: EventContext) {
    // get the member name in lowercase.
    const memberName = context.params.member.toLowerCase();
    let memberData = null;

    for (let memberEntry of members) {
        // find a match
        if (memberEntry.moniker === memberName) {
            memberData = memberEntry;
            break;
        }
    }

    // no member found.
    if (memberData === null) return memberNotFound(memberName);

    // else, we can organize and send data.

    // all indexing assumes 2 or more webring members
    let nextIdx = memberData.index < members.length - 1 ? memberData.index + 1 : 0;
    let prevIdx = memberData.index != 0 ? memberData.index - 1 : members.length - 1;

    console.log(prevIdx);
    
    let responsePackage = {
        status: 200,
        data: {
            member: memberData,
            next: members[nextIdx],
            previous: members[prevIdx],
            webring: webringData
        }
    }

    return Response.json(responsePackage);
}