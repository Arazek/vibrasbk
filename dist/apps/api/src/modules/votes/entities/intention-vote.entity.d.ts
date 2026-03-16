export declare enum VoteEstado {
    VOY = "voy",
    TAL_VEZ = "tal_vez",
    NO_VOY = "no_voy"
}
export declare class IntentionVote {
    id: string;
    userId: string;
    eventId: string;
    semanaIso: string;
    estado: VoteEstado;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=intention-vote.entity.d.ts.map