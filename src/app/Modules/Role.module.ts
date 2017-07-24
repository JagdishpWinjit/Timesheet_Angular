export class Role {
    GCRecord: string;
    OID: number;
    RollNo: number;
    RollName: string;
    OptimisticLockField: string;
    constructor(OID: number, RollName: string) {
        this.OID = OID;
        this.RollName = RollName;
    }
}