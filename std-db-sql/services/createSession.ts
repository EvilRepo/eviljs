import { assertInteger, assertObjectOptional } from '@eviljs/std-lib/assert'
import { createToken } from '@eviljs/std-node/crypto'
import { Db, WriteResult } from '..'
import { Session } from './Session'

/*
* Creates a session for an user account.
*
* EXAMPLE
* createSession(db, 123)
*/
export async function createSession(db: Db<CreateSessionServices>, accountId: number, model?: CreateSessionModel) {
    assertInteger(accountId, 'accountId')
    assertObjectOptional(model, 'model')

    const $Session = db.Session ?? Session
    const $createToken = db.createToken ?? createToken
    const token = $createToken()
    const query = [
        `INSERT INTO \`${$Session.Table}\`
            (account, token)
            VALUES (?, ?)
        `, [accountId, token]
    ] as const
    const result = await db.query(...query) as WriteResult

    // We return the session token.
    return token
}

// Types ///////////////////////////////////////////////////////////////////////

export type CreateSessionServices = {
    Session?: Session
    createToken?(): string
}

export interface CreateSessionModel {
}