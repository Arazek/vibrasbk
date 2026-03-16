import { VotesService } from './votes.service';
import { CreateVoteDto } from './dtos/create-vote.dto';
import { UpdateVoteDto } from './dtos/update-vote.dto';
import { VerifyAttendanceDto } from './dtos/verify-attendance.dto';
export declare class VotesController {
    private votesService;
    constructor(votesService: VotesService);
    castVote(req: any, dto: CreateVoteDto): Promise<import("./entities/intention-vote.entity").IntentionVote>;
    updateVote(req: any, id: string, dto: UpdateVoteDto): Promise<import("./entities/intention-vote.entity").IntentionVote>;
    verifyAttendance(req: any, dto: VerifyAttendanceDto): Promise<import("./entities/attendance-verification.entity").AttendanceVerification>;
}
//# sourceMappingURL=votes.controller.d.ts.map