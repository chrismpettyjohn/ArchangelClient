import { FaCrosshairs, FaFistRaised, FaHeart, FaShieldAlt, FaSyncAlt } from "react-icons/fa";
import { Text } from "../../../../common";
import { CITY_NAME } from "../../../../constant";

export function HowToFightPanel() {
    return (
        <>
            <Text bold fontSize={4} variant="white">How to Fight</Text>
            <p>
                Fighting in {CITY_NAME} requires skill and strategy. Here are the essentials to get you started:
            </p>
            <br />
            <Text bold fontSize={4} variant="white">Combat Basics</Text>
            <div>
                <FaFistRaised style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">i = Toggle Combat Mode</Text>
            </div>
            <div>
                <FaCrosshairs style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">Left Click = Attack</Text>
                <Text fontSize={5} style={{ marginLeft: 20 }}>*Must be in combat mode</Text>
            </div>
            <div>
                <FaShieldAlt style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">hold Shift = Block/Defend</Text>
            </div>
            <div>
                <FaSyncAlt style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">r = Reload</Text>
            </div>
            <br />
            <Text bold fontSize={4} variant="white">Health & Healing</Text>
            <div>
                <FaHeart style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">h = Use Medkit</Text>
            </div>
            <br /><br />
            <p>
                Remember, once in combat mode, you’re visible as a combatant, so stay aware of your surroundings and always be prepared!
            </p>
        </>
    );
}
