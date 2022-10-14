import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "@mui/material";

const pages = [
    { title: "Notes", href: "/" },
    { title: "Add Note", href: "/notes/add" },
];

const Header = () => (
    <AppBar position="static">
        <Container maxWidth="lg">
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    Omnea
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                    {pages.map(({ title, href }) => (
                        <Link
                            sx={{ color: "inherit", mr: 2, ml: 2 }}
                            key={title}
                            href={href}
                        >
                            {title}
                        </Link>
                    ))}
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
);
export default Header;
