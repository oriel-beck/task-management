import { Sort } from "@angular/material/sort";
import { ExtendedTask } from "./store/task.store";

export function sortExtendedTasks(data: ExtendedTask[], sort: Sort) {
    const isAsc = sort.direction === 'asc';
    if (!sort.direction) return data;
    return data.sort((a, b) => {
        let comparison = 0;
        // General comparison for other fields (assuming string or number)
        const valueA = a[sort.active as keyof typeof a];
        const valueB = b[sort.active as keyof typeof b];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            comparison = valueA.localeCompare(valueB);
        } else {
            comparison = (valueA < valueB ? -1 : (valueA > valueB ? 1 : 0));
        }

        return isAsc ? comparison : -comparison;
    });
}