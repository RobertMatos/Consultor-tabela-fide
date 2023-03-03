import { useRouter } from "next/router";
import React, { useContext } from "react";
import { CarSelectionContext } from "@/pages";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    width: "35vw",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem 3.5rem",
    backgroundColor: "#fff",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  select: {},
  button: {
    marginTop: "1rem",
    padding: "0.5rem 2rem",
    textTransform: "none",
  },
}));

const ModalForm = () => {
  const classes = useStyles();
  const router = useRouter();
  const {
    brands,
    selectedBrand,
    setSelectedBrand,
    models,
    selectedModel,
    setSelectedModel,
    years,
    selectedYear,
    setSelectedYear,
  } = useContext(CarSelectionContext);

  const handleBrandChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedBrand(event.target.value as string);
    setSelectedModel("");
  };

  const handleModelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedModel(event.target.value as string);
  };

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedYear(event.target.value as string);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos/${selectedModel}/anos/${selectedYear}`
    );
    const data = await response.json();
    console.log(data);
    router.push({
      pathname: "/result",
      query: {
        carBrand: data.Marca,
        carModel: data.Modelo,
        carModelYear: data.AnoModelo,
        carValue: data.Valor,
      },
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <FormControl variant="filled" fullWidth margin="normal">
        <InputLabel id="brand-select-label">Marca</InputLabel>
        <Select
          className={classes.select}
          labelId="brand-select-label"
          id="brand-select"
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          {brands.map((brand) => (
            <MenuItem key={brand.codigo} value={brand.codigo}>
              {brand.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="filled" fullWidth margin="normal">
        <InputLabel id="model-select-label">Modelo</InputLabel>
        <Select
          className={classes.select}
          labelId="model-select-label"
          id="model-select"
          value={selectedModel}
          onChange={handleModelChange}
          disabled={!selectedBrand}
        >
          {models.map((model) => (
            <MenuItem key={model.codigo} value={model.codigo}>
              {model.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedBrand && selectedModel && (
        <FormControl variant="filled" fullWidth margin="normal">
          <InputLabel id="year-select-label">Ano</InputLabel>
          <Select
            className={classes.select}
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <MenuItem key={year.codigo} value={year.codigo}>
                {year.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Button
        className={classes.button}
        type="submit"
        variant="contained"
        color="primary"
        disabled={!selectedBrand || !selectedModel || !selectedYear}
      >
        Consultar preço
      </Button>
    </form>
  );
};

export default ModalForm;
