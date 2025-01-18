export class Log {
    logCode: string
    observedImage: File | null
    logDate: string
    logDetail: string
    fieldCodes: string[]
    cropCodes: string[]
    staffIds: string[]

    constructor(logCode: string, cropDate: string, observedImage: File | null = null, logDate: string, logDetail: string, fieldCodes: string[], cropCodes: string[], staffIds: string[]) {
        this.logCode = logCode
        this.logDate = cropDate
        this.observedImage = observedImage
        this.logDate = logDate
        this.logDetail = logDetail
        this.fieldCodes = fieldCodes
        this.cropCodes = cropCodes
        this.staffIds = staffIds
    }
}