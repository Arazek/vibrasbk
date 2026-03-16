import { Venue } from '../../venues/entities/venue.entity';
export declare class RecurringEvent {
    id: string;
    tipo: string;
    venue: Venue;
    venueId: string;
    nombre: string;
    fotoUrl: string;
    diaSemana: number | null;
    proximaFecha: string | null;
    fechaInicio?: string;
    horaInicio: string;
    horaPicoEstimado: string;
    estilos: string[];
    activo: boolean;
}
//# sourceMappingURL=recurring-event.entity.d.ts.map