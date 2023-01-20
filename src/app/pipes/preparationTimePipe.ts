import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'preparationTime'})
export class PreparationTimePipe implements PipeTransform {
    transform(time: number): string {
        const hours = Math.floor(time/60);
        const minutes = time % 60;
        return `${hours}h ${minutes}m`

    }
}