import { BoxDetailsProps } from "../../../redux/groupList";

interface GetSwitchByIdProps{
    details: BoxDetailsProps[];
    switchId: number;
};

export function getSwitchById({details, switchId}: GetSwitchByIdProps) {
    // Iterate through each box in the details array
    for (let i = 0; i < details.length; i++) {
        const switches = details[i].switches;
        // Iterate through each switch in the current box
        for (let j = 0; j < switches.length; j++) {
            // Check if the current switch's ID matches the given switch ID
            if (switches[j].switch_id === switchId) {
                // Return the switch object if a match is found
                return switches[j];
            }
        }
    }
    // Return null if no matching switch object is found
    return null;
}