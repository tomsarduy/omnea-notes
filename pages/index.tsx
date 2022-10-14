import { Note } from "../interfaces";
import Layout from "../components/Layout";
import Container from "@mui/material/Container";
import { Alert, Grid, Skeleton, Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

type Data = {
    notes: Note[];
};

const fetchNotesQuery = gql`
    query {
        notes {
            id
            text
        }
    }
`;

function SkeletonBody({ elementNumber = 12 }) {
    return (
        <>
            {Array(elementNumber)
                .fill(0)
                .map((_) => (
                    <Grid zeroMinWidth item xs={2} sm={4} md={4}>
                        <Skeleton variant="rectangular" height={100} />
                    </Grid>
                ))}
        </>
    );
}

function NotesIndex() {
    const { loading, error, data } = useQuery<Data>(fetchNotesQuery);
    return (
        <Layout>
            <Container sx={{ mt: 10 }}>
                <Typography variant="h4" gutterBottom>
                    Notes
                </Typography>
                <Grid
                    alignItems="stretch"
                    justifyContent="center"
                    container
                    spacing={4}
                    columns={{ xs: 1, sm: 8, md: 12 }}
                >
                    {loading && <SkeletonBody />}
                    {error && (
                        <Alert
                            style={{ width: "100%", marginTop: "24px" }}
                            variant="filled"
                            severity="error"
                        >
                            Error fetching your notes
                        </Alert>
                    )}
                    {data?.notes
                        .filter((note) => !!note.text)
                        .map((note) => (
                            <Grid
                                zeroMinWidth
                                item
                                xs={2}
                                sm={4}
                                md={4}
                                key={note.id}
                            >
                                <Typography
                                    sx={{
                                        wordWrap: "break-word",
                                        backgroundColor: "#ccc",
                                        padding: "8px",
                                    }}
                                >
                                    {note.text}
                                </Typography>
                            </Grid>
                        ))}
                </Grid>
            </Container>
        </Layout>
    );
}

export default NotesIndex;
