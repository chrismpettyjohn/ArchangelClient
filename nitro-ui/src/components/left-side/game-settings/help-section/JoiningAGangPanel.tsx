import { Text } from "../../../../common";
import { FaUserFriends, FaSkullCrossbones, FaMoneyBillWave, FaBolt } from "react-icons/fa";

export function JoiningAGangPanel() {
    return (
        <>
            <Text bold fontSize={4} variant="white">Join a Gang</Text>
            <p>Joining a gang in Nueva Esperanza can offer protection, profits, and a place to belong, but it’s a dangerous path.</p>
            <br />

            <Text bold fontSize={4} variant="white">Gang Benefits</Text>
            <div>
                <FaUserFriends style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">Allies = Gain protection and backup from gang members</Text>
            </div>
            <div>
                <FaMoneyBillWave style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">Income = Earn from gang activities and share in profits</Text>
            </div>
            <br />

            <Text bold fontSize={4} variant="white">Risks</Text>
            <div>
                <FaSkullCrossbones style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">Violence = Be prepared for dangerous confrontations</Text>
            </div>
            <div>
                <FaBolt style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">Wanted Level = Increased attention from law enforcement</Text>
            </div>
            <p>Consider the costs carefully before joining a gang; once in, it's tough to get out.</p>
        </>
    );
}
