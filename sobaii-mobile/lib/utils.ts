import { ExtractResponse } from "./stubs/ocr-service-dev/ocr_service_pb";

export function computeAvgExpenseConfidence(expense: ExtractResponse.AsObject): number {
    let sum = 0;
    let count = 0;

    for (const key in expense) {
        if (!expense.hasOwnProperty(key)) {
            continue
        }
        const field = expense[key as keyof ExtractResponse.AsObject];
        if(!field || field instanceof String || typeof field === 'string') {
            continue
        }
        if((field.text === "" && field.confidence === 0)) {
            continue
        }
        sum += field.confidence;
        count++;
    }

    if (count === 0) {
        return 0;
    }

    return Math.round(((sum / count) + Number.EPSILON) * 100) / 100;
}