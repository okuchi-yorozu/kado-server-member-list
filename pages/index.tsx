import {LoginButton, LogoutButton, SaveButton} from "../src/framework/components/Button";
import {addMember, deleteMember, fetchMembers} from "../src/framework/firebase/store";
import {useEffect, useState} from "react";
import {QueryDocumentSnapshot} from "firebase/firestore";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useAuthContext} from "../src/framework/context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    }
}))

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

export default function Home() {
    const user = useAuthContext();

    const [isLoading, setLoading] = useState(true);

    const [members, setMembers] = useState<Array<QueryDocumentSnapshot>>([]);
    const [no, setNo] = useState('');
    const [nickname, setNickname] = useState('');
    const [twitterURL, setTwitterURL] = useState('');
    const [youTubeURL, setYouTubeURL] = useState('');
    const [twitchURL, setTwitchURL] = useState('');
    const [role, setRole] = useState('');
    const saveFirestore = () => {
        addMember(parseInt(no,10), nickname, twitterURL, youTubeURL, twitchURL, role).then((docRef) => {
            console.log({docRef});
            setLoading(true)
            setNickname("");
            setTwitterURL("");
            setYouTubeURL("");
            setTwitchURL("");
            setRole("");
        })
    }
    useEffect(() => {
        if (isLoading) {
            fetchMembers().then(snapshot => {
                    setMembers(snapshot.docs)
                }
            )
        }

        setLoading(false);
    }, [isLoading])

    return (
        <>
            <div style={{margin: 8}}>
                <Typography variant="subtitle1">角酒マイクラサーバ</Typography>
                <Typography variant="body1">Vtuber {members?.length} 人で遊んでいるマルチサーバー「KadoServer」です。</Typography>
            </div>
            <div style={{margin: 8}}>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No.</StyledTableCell>
                                <StyledTableCell>名前</StyledTableCell>
                                <StyledTableCell>リンク</StyledTableCell>
                                <StyledTableCell>役割</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {members ? members.map(doc => {
                                        const twitterURL = doc.get("twitterURL");
                                        const youTubeURL = doc.get("youTubeURL");
                                        const twitchURL = doc.get("twitchURL");

                                        const twitter = twitterURL ? <a href={twitterURL}>
                                            <img style={{width: 20, height: 20, marginRight: 8}} src="/images/twitter.png"/>
                                        </a> : "";
                                        const youTube = youTubeURL ? <a href={youTubeURL}>
                                            <img style={{width: 20, height: 20, marginRight: 8}} src="/images/youtube.png"/>
                                        </a> : "";
                                        const twitch = twitchURL ? <a href={twitchURL}>
                                            <img style={{width: 20, height: 20, marginRight: 8}} src="/images/twitch.png"/>
                                        </a> : "";

                                        return <StyledTableRow key={doc.id}>
                                            <StyledTableCell>{doc.get("no")}</StyledTableCell>
                                            <StyledTableCell>{doc.get("nickname")}</StyledTableCell>
                                            <StyledTableCell>{twitter}{youTube}{twitch}</StyledTableCell>
                                            <StyledTableCell>{doc.get("role")}</StyledTableCell>
                                            <StyledTableCell><DeleteIcon
                                                onClick={() => deleteMember(doc.id).then(() => setLoading(true))}/></StyledTableCell>
                                        </StyledTableRow>
                                    }
                                ) :
                                null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div style={{margin: 8}}>
                {user.currentUser?.displayName}
            </div>
            <div style={{margin: 8}}>
                {user.currentUser ? <LogoutButton/> : <LoginButton/>}
            </div>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                <div>
                    <TextField
                        sx={{m: 1, width: '25ch'}}
                        label="No."
                        size="small"
                        value={no}
                        onChange={(event) => setNo(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <TextField
                        sx={{m: 1, width: '25ch'}}
                        label="名前"
                        size="small"
                        value={nickname}
                        onChange={(event) => setNickname(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <TextField
                        sx={{m: 1, width: '25ch'}}
                        label="Twitter"
                        size="small"
                        value={twitterURL}
                        onChange={(event) => setTwitterURL(event.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        sx={{m: 1, width: '25ch'}}
                        label="YouTube"
                        size="small"
                        value={youTubeURL}
                        onChange={(event) => setYouTubeURL(event.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        sx={{m: 1, width: '25ch'}}
                        label="Twitch"
                        size="small"
                        value={twitchURL}
                        onChange={(event) => setTwitchURL(event.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        sx={{m: 1, width: '25ch'}}
                        label="役割"
                        size="small"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                    />
                </div>
            </Box>
            <div style={{margin: 8}}>
                <SaveButton onclick={saveFirestore}/>
            </div>
        </>
    )
}
