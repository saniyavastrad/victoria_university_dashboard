"use client";

import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import {
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";

type AnalysedRow = {
  moduleName: string;
  studentCount: number;
  percentagePlaceholder?: string;
  commentPlaceholder?: string;
};

export default function TeachingLearningPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [rows, setRows] = useState<AnalysedRow[]>([]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleExportReport = async () => {
    if (rows.length === 0) return;

    const tableRows: TableRow[] = [];

    // Header row
    tableRows.push(
      new TableRow({
        children: [
          "Module Name",
          "Student Number",
          "Student Percentage",
          "Comment",
        ].map(
          (text) =>
            new TableCell({
              children: [
                new Paragraph({
                  text,
                  bold: true,
                }),
              ],
            })
        ),
      })
    );

    // Data rows
    rows.forEach((row) => {
      tableRows.push(
        new TableRow({
          children: [
            row.moduleName,
            String(row.studentCount),
            row.percentagePlaceholder ?? "-",
            row.commentPlaceholder ?? "-",
          ].map(
            (text) =>
              new TableCell({
                children: [new Paragraph(String(text))],
              })
          ),
        })
      );
    });

    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: tableRows,
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        insideHorizontal: {
          style: BorderStyle.SINGLE,
          size: 1,
          color: "000000",
        },
        insideVertical: {
          style: BorderStyle.SINGLE,
          size: 1,
          color: "000000",
        },
      },
    });

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Student Attendance Report",
              heading: "Heading1",
            }),
            new Paragraph(" "),
            table,
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "student-attendances-report.docx");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const analysed: AnalysedRow[] = workbook.SheetNames.map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        // Get sheet as 2D array of cell values
        const rowsArray = XLSX.utils.sheet_to_json<(string | number | null)[]>(
          sheet,
          {
            header: 1,
            defval: null,
          }
        );

        let studentCount = 0;
        let headerRowIndex = -1;
        let nameColIndex = -1;
        let totalColIndex = -1;

        if (rowsArray.length > 0) {
          for (let r = 0; r < rowsArray.length; r++) {
            const row = rowsArray[r];
            const nameIndex = row.findIndex(
              (cell) =>
                typeof cell === "string" && cell.trim().toLowerCase() === "name"
            );
            const totalIndex = row.findIndex(
              (cell) =>
                typeof cell === "string" && cell.trim().toLowerCase() === "total"
            );
            if (nameIndex !== -1) {
              headerRowIndex = r;
              nameColIndex = nameIndex;
            }
            if (totalIndex !== -1) {
              totalColIndex = totalIndex;
            }

            if (headerRowIndex !== -1 && nameColIndex !== -1 && totalColIndex !== -1) {
              break;
            }
          }

          if (headerRowIndex !== -1 && nameColIndex !== -1) {
            // Count non-empty cells in the Name column below the header row
            for (let r = headerRowIndex + 1; r < rowsArray.length; r++) {
              const cell = rowsArray[r]?.[nameColIndex];
              if (
                cell !== null &&
                cell !== undefined &&
                String(cell).trim().length > 0
              ) {
                studentCount += 1;
              }
            }
          }
        }

        let commentPlaceholder = "-";
        let percentagePlaceholder: string | undefined = undefined;

        if (
          headerRowIndex !== -1 &&
          totalColIndex !== -1 &&
          rowsArray.length > headerRowIndex + 1
        ) {
          let below75Count = 0;
          let zeroCount = 0;
          let totalSum = 0;
          let totalCount = 0;

          for (let r = headerRowIndex + 1; r < rowsArray.length; r++) {
            const totalCell = rowsArray[r]?.[totalColIndex];
            if (totalCell === null || totalCell === undefined) continue;

            const raw = String(totalCell).trim();
            if (raw.length === 0) continue;

            // Clean the string (remove % and whitespace) then convert
            const cleaned = raw.replace(/%/g, "").trim();
            let value = Number(cleaned);
            if (isNaN(value)) continue;

            // If the underlying value is a fraction (e.g. 0.92 formatted as 92%),
            // treat it as a percentage by scaling to 0–100 range.
            if (value > 0 && value <= 1) {
              value = value * 100;
            }

            // Contribute to sheet-level average
            totalSum += value;
            totalCount += 1;

            if (value === 0) {
              zeroCount += 1;
            } else if (value < 75) {
              below75Count += 1;
            }
          }

          if (totalCount > 0) {
            const avg = totalSum / totalCount;
            // Round to one decimal place for display
            percentagePlaceholder = `${avg.toFixed(1)}%`;
          }

          if (below75Count > 0 || zeroCount > 0) {
            const parts: string[] = [];
            if (below75Count > 0) {
              parts.push(
                `${below75Count} ${
                  below75Count === 1 ? "below" : "are below"
                } 75%`
              );
            }
            if (zeroCount > 0) {
              parts.push(
                `${zeroCount} ${zeroCount === 1 ? "is" : "are"} 0%`
              );
            }
            commentPlaceholder = parts.join(" and ");
          }
        }

        return {
          moduleName: sheetName,
          studentCount,
          percentagePlaceholder,
          commentPlaceholder,
        };
      });

      console.log("Analysed sheets", analysed);

      setRows(analysed);

      // Notify the user that processing has completed
      alert("Excel file uploaded and analysed successfully!");
    };

    reader.readAsArrayBuffer(file);

    // reset input so selecting the same file again still triggers onChange
    event.target.value = "";
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-4">
      <Card className="border-sky-100 bg-sky-50/70">
        <CardHeader className="flex flex-col gap-2 pb-3">
          <CardTitle className="text-xl font-semibold tracking-tight">
            Student Attendances
          </CardTitle>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Dashboard</span>
            <ChevronRight className="h-3 w-3" />
            <span>Quality Modules</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-foreground">Student Attendances</span>
          </div>
        </CardHeader>
      </Card>

      <div className="flex items-center justify-between">
        <div />

        <Button
          variant="ghost"
          className="bg-red-700 text-white hover:bg-red-800"
          onClick={handleButtonClick}
        >
          Upload Excel
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx"
        className="hidden"
        onChange={handleFileChange}
      />

      {rows.length > 0 && (
        <>
          <div className="mt-4 overflow-x-auto rounded-md border bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="px-4 py-2">Module Name</th>
                  <th className="px-4 py-2">Student Number</th>
                  <th className="px-4 py-2">Student Percentage</th>
                  <th className="px-4 py-2">Comment</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={`${row.moduleName}-${index}`}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2 align-top">{row.moduleName}</td>
                    <td className="px-4 py-2 align-top">{row.studentCount}</td>
                    <td className="px-4 py-2 align-top">
                      {row.percentagePlaceholder ?? "-"}
                    </td>
                    <td className="px-4 py-2 align-top">
                      {row.commentPlaceholder ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              variant="ghost"
              className="bg-red-700 text-white hover:bg-red-800"
              onClick={handleExportReport}
            >
              Export Report
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
