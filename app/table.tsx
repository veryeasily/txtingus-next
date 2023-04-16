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
      <TableContainer component={Paper}>
        <BaseTable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow
                key={message.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  navigator.clipboard.writeText(message.content);
                }}
              >
                <TableCell component="th" scope="row">
                  {message.id}
                </TableCell>
                <TableCell align="right">{message.role}</TableCell>
                <TableCell align="right">{message.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </BaseTable>
      </TableContainer>
    </div>
  );
}

// export default function Table({ messages, className, ...rest }: TableProps) {
//   return (
//     <div
//       data-component="table"
//       className={cn("flex flex-col", className)}
//       {...rest}
//     >
//       <TableContainer component={Paper}>
//         <BaseTable sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell align="right">Role</TableCell>
//               <TableCell align="right">Message</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {messages.map((message) => (
//               <TableRow
//                 key={message.id}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                 onClick={() => {
//                   navigator.clipboard.writeText(message.content);
//                 }}
//               >
//                 <TableCell component="th" scope="row">
//                   {message.id}
//                 </TableCell>
//                 <TableCell align="right">{message.role}</TableCell>
//                 <TableCell align="right">{message.content}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </BaseTable>
//       </TableContainer>
//     </div>
//   );
// }
