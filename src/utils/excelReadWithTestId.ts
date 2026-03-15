import * as XLSX from "xlsx";

export function readSheetData(filePath: string, sheetName: string) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
        throw new Error('sheet "${sheetName}" not found in ${filePath}');
    }

    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    return jsonData;

}

export function getDataByTCID(data: any[], tcid: string) {
    return data.find((row: any) =>
        row.TCID == tcid);


}