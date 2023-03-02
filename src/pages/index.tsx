import React, { useState, useEffect, createContext } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import ModalForm from "@/components/ModalForm";
import ClientOnly from "./clientOnly";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Roboto",
    backgroundColor: "#fff4fc",
  },
  title: {
    margin: "0",
    fontWeight: 600,
    color: "#666267",
  },
  subtitle: {
    fontWeight: 600,
    color: "#666267",
  },
}));

type Brand = {
  codigo: string;
  nome: string;
};

type Model = {
  codigo: string;
  nome: string;
};

type Year = {
  codigo: string;
  nome: string;
};

interface CarSelectionContextProps {
  brands: Brand[];
  selectedBrand: string;
  setSelectedBrand: Function;
  models: Model[];
  selectedModel: string;
  setSelectedModel: Function;
  years: Year[];
  selectedYear: string;
  setSelectedYear: Function;
}

export const CarSelectionContext = createContext<CarSelectionContextProps>({
  brands: [],
  selectedBrand: "",
  setSelectedBrand: () => {},
  models: [],
  selectedModel: "",
  setSelectedModel: () => {},
  years: [],
  selectedYear: "",
  setSelectedYear: () => {},
});

const HomePage = ({}) => {
  const classes = useStyles();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [years, setYears] = useState<Year[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    async function fetchBrands() {
      const response = await fetch(
        "https://parallelum.com.br/fipe/api/v1/carros/marcas"
      );
      const data = await response.json();
      setBrands(data);
    }
    fetchBrands();
  }, []);

  useEffect(() => {
    async function fetchModels() {
      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos`
      );
      const data = await response.json();
      setModels(data.modelos);
    }
    if (selectedBrand) {
      fetchModels();
    }
  }, [selectedBrand]);

  useEffect(() => {
    async function fetchYears() {
      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos/${selectedModel}/anos`
      );
      const data = await response.json();
      setYears(data.map((year: any) => year));
    }
    if (selectedBrand && selectedModel) {
      fetchYears();
    }
  }, [selectedBrand, selectedModel]);

  return (
    <ClientOnly>
      <div className={classes.container}>
        <CarSelectionContext.Provider
          value={{
            brands,
            selectedBrand,
            setSelectedBrand,
            models,
            selectedModel,
            setSelectedModel,
            years,
            selectedYear,
            setSelectedYear,
          }}
        >
          <h1 className={classes.title}>Tabelo Fipe</h1>
          <p className={classes.subtitle}>
            Consulte o valor de um veículo de forma gratuita
          </p>
          <ModalForm />
        </CarSelectionContext.Provider>
      </div>
    </ClientOnly>
  );
};

export default HomePage;
