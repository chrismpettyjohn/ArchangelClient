import { useState } from "react";
import { Flex, Text } from "../../../../common";
import { useWantedList } from "../../../../hooks/roleplay/use-wanted-list"
import { WantedListAddUser } from "../../../../api/roleplay/police/WantedListAddUser";
import { Button } from "react-bootstrap";
import { FaPlusCircle, FaPlusSquare, FaTimes } from "react-icons/fa";
import { UserSelect } from "../../../roleplay/UserSelect";
import { RoomUsersListRow } from "@nitro-rp/renderer";
import { CrimeSelect } from "../../../roleplay/CrimeSelect";
import { WantedListRemoveUser } from "../../../../api/roleplay/police/WantedListRemoveUser";

export interface MostWantedProps {
    goBack(): void;
}

export function MostWanted({ goBack }: MostWantedProps) {
    const bounties = useWantedList();
    const [adding, setAdding] = useState(false);
    const [crimeID, setCrimeID] = useState<number>();
    const [user, setUser] = useState<RoomUsersListRow>();

    function onCancel() {
        setAdding(false);
        setCrimeID(undefined);
        setUser(undefined);
    }

    function onAddUser() {
        if (!user || !crimeID) {
            return;
        }
        WantedListAddUser(user.username, crimeID);
        onCancel();
    }

    if (adding) {
        return (
            <>
                <Text bold fontSize={4}>Add to wanted list</Text>
                <br />
                <Flex center column style={{ gap: 10, padding: 16 }}>
                    <Flex column fullWidth>
                        <Text bold fontSize={6} variant="white">Suspect</Text>
                        <UserSelect userID={user?.id} onChange={setUser} />
                    </Flex>
                    <Flex column fullWidth>
                        <Text bold fontSize={6} variant="white">Crime</Text>
                        <CrimeSelect crimeID={crimeID} onChange={setCrimeID} />
                    </Flex>
                    <Flex fullWidth justifyContent="end" gap={2}>
                        <Button variant="dark" size="sm" onClick={onCancel}>
                            <FaTimes style={{ marginRight: 8 }} />
                            <Text fontSize={6} variant="white">Cancel</Text>
                        </Button>
                        <Button variant="success" size="sm" onClick={onAddUser}>
                            <FaPlusCircle style={{ marginRight: 8 }} />
                            <Text fontSize={6} variant="white">Add Suspect</Text>
                        </Button>
                    </Flex>
                </Flex>
            </>
        )
    }

    return (
        <>
            <Flex justifyContent="between">
                <Flex center>
                    <Text bold fontSize={4}>Most Wanted</Text>
                </Flex>
                <Flex center>
                    <Button variant="success" size="sm" onClick={() => setAdding(true)}>
                        <FaPlusSquare style={{ marginRight: 8 }} />
                        <Text fontSize={6} variant="white">Add</Text>
                    </Button>
                </Flex>
            </Flex>
            <br />
            <table className="table table-striped table-sm table-text-small text-white m-0">
                <tbody>
                    <tr>
                        <th>
                            <Text bold variant="white">Suspect</Text>
                        </th>
                        <th>
                            <Text bold variant="white">Crime</Text>
                        </th>
                        <th>
                            <Text bold variant="white">Jail TIme</Text>
                        </th>
                        <th>
                            <Text bold variant="white">Added By</Text>
                        </th>
                        <th>
                            <Text bold variant="white">Actions</Text>
                        </th>
                    </tr>
                    {
                        bounties.map(bounty => (
                            <tr key={`bounty_${bounty.userId}`}>
                                <td>
                                    <Text bold underline pointer variant="white">
                                        {bounty.username}
                                    </Text>
                                </td>
                                <td>
                                    <Text variant="white">
                                        {bounty.crime}
                                    </Text>
                                </td>
                                <td>
                                    <Text variant="white">
                                        10 mins
                                    </Text>
                                </td>
                                <td>
                                    <Text bold underline pointer variant="white">
                                        bob
                                    </Text>
                                </td>
                                <td>
                                    <Text underline pointer onClick={() => WantedListRemoveUser(bounty.username, bounty.crime)} variant="white">
                                        Remove
                                    </Text>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}