import { Text } from "../../../../common";
import { FaTractor, FaFish, FaTree, FaHardHat, FaUserSecret, FaDollarSign } from "react-icons/fa";
import { CITY_NAME } from "../../../../constant";

export function MakingMoneyPanel() {
    return (
        <>
            <Text bold fontSize={4} variant="white">Making Money</Text>
            <p>In {CITY_NAME}, earning a living can be honest, risky, or a mix of both. Choose your path wisely:</p>
            <br />

            <Text bold fontSize={4} variant="white">Legitimate Work</Text>
            <div>
                <FaHardHat style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">Jobs = Find stable work for steady income</Text>
            </div>
            <div>
                <FaTractor style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">Farming = Grow and sell crops</Text>
            </div>
            <div>
                <FaFish style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">Fishing = Catch and sell fish at markets</Text>
            </div>
            <div>
                <FaTree style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">Tree Chopping = Harvest wood for profit</Text>
            </div>
            <div>
                <FaDollarSign style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">Mining = Extract valuable resources to sell</Text>
            </div>

            <br />
            <Text bold fontSize={4} variant="white">Criminal Paths</Text>
            <div>
                <FaUserSecret style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">Robbery = Target individuals or businesses</Text>
            </div>
            <br /><br /><br />
            <p>Choose wisely between honest and criminal paths; each comes with its own risks and rewards.</p>
        </>
    );
}
