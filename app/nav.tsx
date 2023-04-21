"use client";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function SideBar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        style: { width: "240px", backgroundColor: "rgba(0, 0, 0, 0.87)" },
      }}
    >
      <Typography variant="h6" className="mb-4 p-4">
        @dingus
      </Typography>
      <List>
        <Link href="/" className="block" passHref>
          <ListItemButton>
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>
        <Link href="/messages" className="block" passHref>
          <ListItemButton>
            <ListItemText primary="Messages" />
          </ListItemButton>
        </Link>
        <Link href="/prompts" className="block" passHref>
          <ListItemButton>
            <ListItemText primary="Prompts" />
          </ListItemButton>
        </Link>
      </List>
    </Drawer>
  );
}
