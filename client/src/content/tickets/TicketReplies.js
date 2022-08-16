import { axiosInstance } from "../../network/axios";
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import Scrollbar from 'src/components/Scrollbar';
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/label-has-for */
import {
    Tooltip,
    IconButton,
    Box,
    Button,
    styled,
    InputBase,
    useTheme,
    Divider,
    Typography,
    Card
} from '@mui/material';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const CardWrapperPrimary = styled(Card)(
    ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
    ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

const MessageInputWrapper = styled(InputBase)(
    ({ theme }) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(1)};
    width: 100%;
`
);

const Input = styled('input')({
    display: 'none'
});


const RootWrapper = styled(Box)(
    ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`
);


const ChatWindow = styled(Box)(
    () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
);


export default function TicketReplies() {
    const url = "http://localhost:8000/";
    const theme = useTheme();
    const params = useParams()
    const { auth } = useSelector((state) => ({ ...state }));
    const replyRef = useRef(null)

    const [replies, setReplies] = useState([])
    useEffect(async () => {
        await axiosInstance
            .get(`/reply/${params.id}`)
            .then((res) => {
                setReplies(res.data)
            }
            )
            .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        replyRef.current?.scrollIntoView()
    }, [replies])

    const [file, setFile] = useState(null)
    const [reply, setReply] = useState({
        ticketId: params.id,
        text: '',
        userId: auth.userId
    });

    const handelFormChange = (e) => {
        if (e.target.name === 'text') {
            setReply({
                ...reply,
                text: e.target.value
            });
        } if (e.target.name === 'attachment') {
            setFile(e.target.files[0]);
        }
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("ticketId", reply.ticketId)
        data.append("text", reply.text)
        data.append("userId", reply.userId)
        data.append("file", file)
        console.log(data)
        try {
            await axiosInstance.post('/reply', data)
            window.location.reload(false)
        }
        catch (err) {
            console.log(err.response.data)
        }
    };

    const momentAgo = (date) => {
        const timeAgo = moment(date).fromNow();
        return timeAgo
    }

    return (
        <>
            <Helmet>
                <title>HelpDesk Replies</title>
            </Helmet>
            <RootWrapper className="Mui-FixedWrapper">
                <ChatWindow>
                    <Box flex={1}>
                        <Scrollbar>
                            {replies.map((reply, i) => {
                                return (
                                    <Box p={3} key={reply._id}>
                                        {reply.userId.userName === auth.userName ? (
                                            <Box
                                                display="flex"
                                                alignItems="flex-start"
                                                justifyContent="flex-start"
                                                py={3}
                                            >
                                                <Box
                                                    display="flex"
                                                    alignItems="flex-start"
                                                    flexDirection="column"
                                                    justifyContent="flex-start"
                                                    ml={2}
                                                >
                                                    {reply.userId.userName}
                                                    <CardWrapperSecondary>
                                                        {reply.text}
                                                    </CardWrapperSecondary>
                                                    {reply.attachment && (
                                                        <CardWrapperSecondary>
                                                            <img src={`${url}${reply.attachment.path}`} height="50" alt={`attachement${[i + 1]}`} />
                                                        </CardWrapperSecondary>
                                                    )}
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            pt: 1,
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <ScheduleTwoToneIcon
                                                            sx={{
                                                                mr: 0.5
                                                            }}
                                                            fontSize="small"
                                                        />
                                                        {momentAgo(reply.createdAt)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Box
                                                display="flex"
                                                alignItems="flex-start"
                                                justifyContent="flex-end"
                                                py={3}
                                            >
                                                <Box
                                                    display="flex"
                                                    alignItems="flex-end"
                                                    flexDirection="column"
                                                    justifyContent="flex-end"
                                                    mr={2}
                                                >
                                                    {reply.userId.userName}
                                                    <CardWrapperPrimary>
                                                        {reply.text}
                                                    </CardWrapperPrimary>
                                                    {reply.attachment && (
                                                        <CardWrapperSecondary>
                                                            <img src={`${url}${reply.attachment.path}`} height="50" alt={`attachement${[i + 1]}`} />
                                                        </CardWrapperSecondary>
                                                    )}
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            pt: 1,
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <ScheduleTwoToneIcon
                                                            sx={{
                                                                mr: 0.5
                                                            }}
                                                            fontSize="small"
                                                        />
                                                        {momentAgo(reply.createdAt)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}

                                    </Box>
                                )
                            })}
                            <div ref={replyRef}><br /></div>
                        </Scrollbar>
                    </Box>
                    <Divider />
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <Box
                            sx={{
                                background: theme.colors.alpha.white[50],
                                display: 'flex',
                                alignItems: 'center',
                                p: 2
                            }}
                        >
                            <Box flexGrow={1} display="flex" alignItems="center">
                                <MessageInputWrapper
                                    autoFocus
                                    placeholder="Write your message here..."
                                    fullWidth
                                    name="text"
                                    value={reply.text}
                                    aria-describedby="text"
                                    onChange={(e) => handelFormChange(e)}
                                />
                            </Box>
                            <Box>
                                <Input accept="image/*" id="messenger-upload-file" type="file" multiple name="attachment" onChange={(e) => handelFormChange(e)} />
                                <Tooltip arrow placement="top" title="Attach a file">
                                    <label htmlFor="messenger-upload-file">
                                        <IconButton sx={{ mx: 1 }} color="primary" component="span">
                                            <AttachFileTwoToneIcon fontSize="small" />
                                        </IconButton>
                                    </label>
                                </Tooltip>
                                <Button startIcon={<SendTwoToneIcon />} variant="contained"
                                    type="submit"
                                >
                                    Send
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </ChatWindow>
            </RootWrapper>
        </>
    );
}

