"use client";

import { Message, Prompt } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, BoxProps, Typography } from "@mui/material";

interface Props extends BoxProps {
  columns: GridColDef[];
  rows: any[];
  title?: string;
  dataGridProps?: Partial<React.ComponentPropsWithoutRef<typeof DataGrid>>;
}

function Table({ rows, columns, title, dataGridProps = {}, ...rest }: Props) {
  return (
    <Box {...rest}>
      {title && (
        <Typography variant="h4" component="h4" gutterBottom>
          {title}
        </Typography>
      )}
      <Box width="100%" height={384}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          {...dataGridProps}
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

const messageColumns: GridColDef<Message>[] = [
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

interface MessagesTableProps extends Omit<Props, "columns" | "rows"> {
  messages: Message[];
  columns?: Props["columns"];
  rows?: Props["rows"];
}

export function MessageTable({ messages, ...rest }: MessagesTableProps) {
  return (
    <Table
      title="Messages"
      rows={messages}
      columns={messageColumns}
      {...rest}
    />
  );
}

////////////////////////////////////////////////////////////////////////////////
// PromptTable                                                                //
////////////////////////////////////////////////////////////////////////////////

const promptColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 64 },
  { field: "content", headerName: "Prompt" },
];

interface PromptsTableProps extends Omit<Props, "columns" | "rows"> {
  prompts: Prompt[];
  rows?: Props["rows"];
  columns?: Props["columns"];
}

export function PromptTable({ prompts, ...rest }: PromptsTableProps) {
  return (
    <Table title="Prompts" rows={prompts} columns={promptColumns} {...rest} />
  );
}
