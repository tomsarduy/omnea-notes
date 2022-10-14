import Layout from "../../components/Layout";
import Container from "@mui/material/Container";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const insertNoteMutation = gql`
    mutation insertNote($object: notes_insert_input!) {
        insert_notes_one(
            object: $object
            on_conflict: { constraint: notes_pkey }
        ) {
            id
            text
        }
    }
`;

function AddNote() {
    const [addNote, { loading, error, data }] = useMutation(insertNoteMutation);
    const [note, setNote] = useState("");
    return (
        <Layout>
            <Container sx={{ mt: 10 }}>
                <Typography variant="h4" gutterBottom>
                    Add Note
                </Typography>
                <Grid container maxWidth={500}>
                    {data && (
                        <Alert
                            sx={{ mb: 4 }}
                            variant="outlined"
                            severity="success"
                        >
                            Note saved in the database!
                        </Alert>
                    )}
                    {error && (
                        <Alert variant="outlined" severity="error">
                            Error trying to save your note
                        </Alert>
                    )}

                    <form>
                        <TextField
                            disabled={loading}
                            value={note}
                            fullWidth
                            label="Note"
                            multiline
                            rows={4}
                            variant="filled"
                            onChange={(e) => setNote(e.target.value)}
                        />
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                if (loading) {
                                    return;
                                }
                                addNote({
                                    variables: { object: { text: note } },
                                });
                                setNote("");
                            }}
                            sx={{ mt: 2 }}
                            variant="contained"
                        >
                            {loading ? "..." : "Save Note"}
                        </Button>
                    </form>
                </Grid>
            </Container>
        </Layout>
    );
}

export default AddNote;
