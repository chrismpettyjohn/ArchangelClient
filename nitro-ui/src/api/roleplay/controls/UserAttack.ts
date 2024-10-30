import { UserAttackComposer } from "@nitro-rp/renderer";
import { SendMessageComposer } from "../../nitro";

export function UserAttack(x: number, y: number, z: number) {
    SendMessageComposer(new UserAttackComposer(x, y, z))
}