import { BoxDetailsProps } from "../../../redux/groupList";

export function analyzeDetails(details: BoxDetailsProps[]) {
    const totalBoxes = details.length;
    let totalSwitches = 0;
    let totalPorts = 0;
    const statusCounts = {
        unconnected: 0,
        active: 0,
        inactive: 0,
        faulty: 0
    };

    details.forEach(box => {
        box.switches.forEach(switchObj => {
            totalSwitches += 1;
            totalPorts += switchObj.total_ports;

            switchObj.ports.forEach(port => {
                if (port.status in statusCounts) {
                    statusCounts[port.status] += 1;
                }
            });
        });
    });

    return [
        {lebal: "Total Boxes", total: totalBoxes, bg_color: "bg-dark-subtle"}, 
        {lebal: "Total Switches", total: totalSwitches, bg_color: "bg-success-subtle"}, 
        {lebal: "Total Ports", total: totalPorts, bg_color: "bg-primary-subtle"}, 
        {lebal: "Active Ports", total: statusCounts.active, bg_color: "bg-info-subtle"}, 
        {lebal: "Inactive Ports", total: statusCounts.inactive, bg_color: "bg-secondary-subtle"},
        {lebal: "Unconnected Ports", total: statusCounts.unconnected, bg_color: "bg-warning-subtle"},
        {lebal: "Faulty Ports", total: statusCounts.faulty, bg_color: "bg-danger-subtle"},
    ];
}

const calcLastMonday = (currentDate: Date) =>{
    // Calculate the difference between the current day of the week and Monday
    const currentDayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const daysUntilMonday = (currentDayOfWeek + 6) % 7; // Calculate the number of days to subtract

    // Subtract the calculated difference from the current date to get the most recent Monday
    const mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDate.getDate() - daysUntilMonday);

    // Set hours, minutes, seconds, and milliseconds to zero to represent midnight
    mondayDate.setHours(0, 0, 0, 0);

    return mondayDate;
};