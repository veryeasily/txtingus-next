"use client";

import { cn } from "@/lib/utils";
import BaseTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Message } from "@prisma/client";

interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: Message[];
}

export default function Table({ messages, className, ...rest }: TableProps) {
  return (
    <div
      data-component="table"
      className={cn("flex flex-col", className)}
      {...rest}
    >
      <div className="relative overflow-x-auto">
        <table className="w-full border border-white text-sm text-left text-white dark:text-white">
          <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr className="border-b border-white">
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr
                key={message.id}
                className="bg-white border-b last:border-b-0 dark:bg-gray-800 dark:border-white"
                onClick={() => {
                  navigator.clipboard.writeText(message.content);
                }}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white"
                >
                  {message.id}
                </th>
                <td className="px-6 py-4">{message.role}</td>
                <td className="px-6 py-4">{message.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
