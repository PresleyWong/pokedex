import { Stack, Button, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'


const MuiButton = () => {
    return (
        <Stack spacing={4}>
            <Stack spacing={2} direction='row'>
                <Button variant='text'>Button</Button>
                <Button variant='contained'>Button</Button>
                <Button variant='outlined'>Button</Button>
            </Stack>

            <Stack spacing={2} direction='row'>
                <Button variant='contained' color='primary'>Button</Button>
                <Button variant='contained' color='secondary'>Button</Button>
                <Button variant='contained' color='info'>Button</Button>
                <Button variant='contained' color='error'>Button</Button>
                <Button variant='contained' color='success'>Button</Button>
            </Stack>
            <Stack spacing={2}>
                <Button variant='contained' startIcon={<SendIcon />} size='small'>Send</Button>
                <Button variant='contained' endIcon={<SendIcon />} size='medium' >Send</Button>
                <Button variant='contained' endIcon={<SendIcon />} size='large' >Send</Button>
            </Stack>
        </Stack >
    )
}

export default MuiButton