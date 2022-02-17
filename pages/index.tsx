import {fetchMembers} from "../src/framework/firebase/store";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {DocumentData, QuerySnapshot} from "firebase/firestore";

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

export default function Index({members}) {

    return (
        <>
            <div style={{margin: 8}}>
                <Typography variant="subtitle1">角酒マイクラサーバ</Typography>
                <Typography variant="body1">Vtuber {members?.length} 人で遊んでいるマルチサーバー「KadoServer」です。</Typography>
            </div>
            <div style={{margin: 8}}>
                <TableContainer component={Paper} sx={{width: ['100%', '100%', '70%']}}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No.</StyledTableCell>
                                <StyledTableCell>名前</StyledTableCell>
                                <StyledTableCell>リンク</StyledTableCell>
                                <StyledTableCell>役割</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {members ? members.map(member => {
                                        const twitter = member.twitterURL ? <a href={member.twitterURL}>
                                            <img style={{width: 20, height: 20, marginRight: 8}} src="/images/twitter.png"/>
                                        </a> : "";
                                        const youTube = member.youTubeURL ? <a href={member.youTubeURL}>
                                            <img style={{width: 20, height: 20, marginRight: 8}} src="/images/youtube.png"/>
                                        </a> : "";
                                        const twitch = member.twitchURL ? <a href={member.twitchURL}>
                                            <img style={{width: 20, height: 20, marginRight: 8}} src="/images/twitch.png"/>
                                        </a> : "";

                                        return <StyledTableRow key={member.id}>
                                            <StyledTableCell>{member.no}</StyledTableCell>
                                            <StyledTableCell>{member.nickname}</StyledTableCell>
                                            <StyledTableCell>{twitter}{youTube}{twitch}</StyledTableCell>
                                            <StyledTableCell>{member.role}</StyledTableCell>
                                        </StyledTableRow>
                                    }
                                ) :
                                null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

type Member = {
    id: string,
    no: number,
    nickname: string,
    twitterURL: string,
    youTubeURL: string,
    twitchURL: string,
    role: string,
}

// Index ページがリクエストされた場合に、SSR でメンバー一覧を取得して、クライアントにページを返す
export async function getServerSideProps() {
    const toJSON = (querySnapshot: QuerySnapshot<DocumentData>): Member[] => {
        return querySnapshot.docs.map(row => ({
            id: row.id,
            no: row.get("no"),
            nickname: row.get("nickname"),
            twitterURL: row.get("twitterURL"),
            youTubeURL: row.get("youTubeURL"),
            twitchURL: row.get("twitchURL"),
            role: row.get("role"),
        }))
    }

    const querySnapshot = await fetchMembers();
    const members = toJSON(querySnapshot);

    return {props: {members}};
}

