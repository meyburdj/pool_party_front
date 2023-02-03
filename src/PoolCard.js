import { Card, CardContent, CardActions, CardMedia, Button, Typography } from '@mui/material';
// import currency from "currency.js";
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

/**
 * PoolCard: renders an individual pool card.
 *
 * Props:
 * - pool: object for a single pool
 *
 * State: N/A
 *
 * PoolCardList -> [PooLCard, PooLCard, ... ]
 */

function PoolCard({ pool }) {

    return (

        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={pool.image_url}
                title={pool.image_url}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {pool.size.toUpperCase()} pool in {pool.city.toUpperCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {pool.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Chat with Host</Button>
                <Button size="small">Join the Party!</Button>
            </CardActions>
        </Card>
    );
}


export default PoolCard;

//TODO: add chat function to onClick button. add reserve function to onclick button