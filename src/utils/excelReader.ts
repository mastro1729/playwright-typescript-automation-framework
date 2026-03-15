import * as ExcelJS from "exceljs";

export async function readRowAsObject(filePath: string, sheetName: string, rowNumber: number): Promise<Record<string, any>> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.getWorksheet(sheetName);
    if(!sheet){
        throw new Error('sheet "${sheetName}" not found in ${filePath}');
    }
    const headerRow = sheet.getRow(1);
    const dataRow = sheet.getRow(rowNumber);

    const data: Record<string, any> = {};

    headerRow.eachCell((cell, colIndex) =>{
        const key = (cell.value ?? "").toString().trim();
        const value =dataRow.getCell(colIndex).value;
        data[key] = typeof value === "object" && "text" in (value as any) ? (value as any).text: value;
    });

    return data;
}