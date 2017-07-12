export class Category {
    GCRecord: string;
    OID: number;
    CategoryName: string;
    OptimisticLockField: string;

    constructor(OID: number, CategoryName: string) {
        this.OID = OID;
        this.CategoryName = CategoryName;
    }
}