import { useRouter } from 'next/router';
import {
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Roboto',
    backgroundColor: '#fff4fc',
    color: '#585552'
  },
  modalResult: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3fbf3',
    padding: '2.5rem 0 1.5rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
  },
  modalTitle: {
    textAlign: 'center'
  },
  carPrice: {
    color: '#FFF',
    backgroundColor: '#1c9884',
    padding: '14px 24px',
    borderRadius: '2rem',
    margin: '0px',
  },
  alert: {
    color: '#7c817a',
  }
}));

const ResultPage = () => {
  const router = useRouter();
  const { carBrand, carModel, carModelYear, carValue } = router.query;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.modalResult}>
        <h1 className={classes.modalTitle}>Tabela Fipe: Preço {carBrand} {carModel} {carModelYear}</h1>
        <h2 className={classes.carPrice}>{carValue}</h2>
        <p className={classes.alert}>Este é o preço de compra do veículo</p>
      </div>
    </div>
  );
};

export default ResultPage;
