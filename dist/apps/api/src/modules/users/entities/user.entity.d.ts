export declare enum Rol {
    LEADER = "leader",
    FOLLOWER = "follower",
    SWITCH = "switch",
    ADMIN = "admin"
}
export declare enum Nivel {
    NUEVO = "nuevo",
    INICIACION = "iniciacion",
    SOCIAL_COMODO = "social_comodo",
    INTERMEDIO = "intermedio",
    AVANZADO = "avanzado"
}
export declare enum Estilo {
    BACHATA_SENSUAL = "bachata_sensual",
    BACHATA_TRADICIONAL = "bachata_tradicional",
    SALSA_LINEA = "salsa_linea",
    SALSA_CUBANA = "salsa_cubana"
}
export declare class User {
    id: string;
    alias: string;
    ciudad: string;
    rol: Rol;
    nivel: Nivel;
    estilos: string[];
    academiaId?: string;
    fcmToken: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=user.entity.d.ts.map