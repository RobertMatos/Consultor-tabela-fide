import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalForm from '@/components/ModalForm';
import { CarSelectionContext } from '@/pages';

const brands = [
  {
    codigo: '1',
    nome: 'Brand 1',
  },
  {
    codigo: '2',
    nome: 'Brand 2',
  },
];

const models = [
  {
    codigo: '1',
    nome: 'Model 1',
  },
  {
    codigo: '2',
    nome: 'Model 2',
  },
];

const years = [
  {
    codigo: '1',
    nome: 'Year 1',
  },
  {
    codigo: '2',
    nome: 'Year 2',
  },
];

const setSelectedBrand = jest.fn();
const setSelectedModel = jest.fn();
const setSelectedYear = jest.fn();

const renderComponent = (props?: any) => {
  return render(
    <CarSelectionContext.Provider
      value={{
        brands,
        selectedBrand: '',
        setSelectedBrand,
        models,
        selectedModel: '',
        setSelectedModel,
        years,
        selectedYear: '',
        setSelectedYear,
      }}
    >
      <ModalForm {...props} />
    </CarSelectionContext.Provider>
  );
};

test('renders form with select inputs', () => {
  const { getByText, getByLabelText } = renderComponent();

  expect(getByText('Selecione a marca')).toBeInTheDocument();
  expect(getByLabelText('Marca')).toBeInTheDocument();
  expect(getByText('Selecione o modelo')).toBeInTheDocument();
  expect(getByLabelText('Modelo')).toBeInTheDocument();
  expect(getByText('Selecione o ano')).toBeInTheDocument();
  expect(getByLabelText('Ano')).toBeInTheDocument();
});

test('calls setSelectedBrand when brand is selected', () => {
  const { getByLabelText } = renderComponent();

  fireEvent.change(getByLabelText('Marca'), {
    target: { value: '1' },
  });

  expect(setSelectedBrand).toHaveBeenCalledWith('1');
});

test('calls setSelectedModel when model is selected', () => {
  const { getByLabelText } = renderComponent();

  fireEvent.change(getByLabelText('Marca'), {
    target: { value: '1' },
  });

  fireEvent.change(getByLabelText('Modelo'), {
    target: { value: '1' },
  });

  expect(setSelectedModel).toHaveBeenCalledWith('1');
});

test('calls setSelectedYear when year is selected', () => {
  const { getByLabelText } = renderComponent();

  fireEvent.change(getByLabelText('Marca'), {
    target: { value: '1' },
  });

  fireEvent.change(getByLabelText('Modelo'), {
    target: { value: '1' },
  });

  fireEvent.change(getByLabelText('Ano'), {
    target: { value: '1' },
  });

  expect(setSelectedYear).toHaveBeenCalledWith('1');
});
