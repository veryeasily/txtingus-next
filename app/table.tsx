"use client";

import { Message, Prompt } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  columns: GridColDef[];
  rows: any[];
  title?: string;
}

function Table({ rows, columns, title, ...rest }: Props) {
  return (
    <Box>
      {title && (
        <Typography variant="h4" component="h4" gutterBottom>
          {title}
        </Typography>
      )}
      <Box width="100%" height={384} {...rest}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
        />
      </Box>
    </Box>
  );
}

////////////////////////////////////////////////////////////////////////////////
// MessageTable                                                               //
////////////////////////////////////////////////////////////////////////////////

const roleLookup = {
  system: "System",
  user: "User",
  assistant: "Assistant",
};

const messageColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 64 },
  {
    field: "role",
    headerName: "Role",
    width: 96,
    valueGetter: (params) =>
      roleLookup[params.value as keyof typeof roleLookup],
  },
  { field: "content", headerName: "Message", flex: 1 },
];

interface MessagesTableProps {
  messages: Message[];
}

export function MessageTable({ messages, ...rest }: MessagesTableProps) {
  return <Table title="Messages" rows={messages} columns={messageColumns} {...rest} />;
}

////////////////////////////////////////////////////////////////////////////////
// PromptTable                                                                //
////////////////////////////////////////////////////////////////////////////////

const promptColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 64 },
  { field: "content", headerName: "Prompt" },
];

interface PromptsTableProps {
  prompts: Prompt[];
}

export function PromptTable({ prompts, ...rest }: PromptsTableProps) {
  return <Table title="Prompts" rows={prompts} columns={promptColumns} {...rest} />;
}
