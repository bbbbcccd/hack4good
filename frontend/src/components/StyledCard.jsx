import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme, outofstock }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    opacity: outofstock == "true" ? 0.6 : 1,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    },
    backgroundColor: "aliceblue"
}));

export default StyledCard;