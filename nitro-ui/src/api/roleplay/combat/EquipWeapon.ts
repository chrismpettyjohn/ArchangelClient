import { EquipWeaponComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function EquipWeapon(playerWeaponId: number): void {
    SendMessageComposer(new EquipWeaponComposer(playerWeaponId));
}
