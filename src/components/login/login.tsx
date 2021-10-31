import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material"

export const Login = () => {
    return <Grid container justifyContent='center'>
        <Grid item xs={4}>
            <FormControl>
                {/*<FormLabel...>*/}
                    <FormGroup>
                        <TextField
                            label='Email'
                            margin="normal"
                            />
                        <TextField
                            label='Password'
                            margin="normal"
                            type="password"
                        />
                        <FormControlLabel control={<Checkbox name="rememberMe" /> } label={'Remember me'}
                        />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
            </FormControl>
        </Grid>
    </Grid>
}