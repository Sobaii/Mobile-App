import { ExtractResponse } from "./stubs/ocr-service-dev/ocr_service_pb";

export function computeAvgExpenseConfidence(expense: ExtractResponse.AsObject): number {
    let sum = 0;
    let count = 0;

    for (const key in expense) {
        if (expense.hasOwnProperty(key)) {
            const field = expense[key as keyof ExtractResponse.AsObject];
            if (field && field.confidence !== undefined) {
                sum += field.confidence;
                count++;
            }
        }
    }

    if (count === 0) {
        return 0;
    }

    return (sum / count) * 100;
}